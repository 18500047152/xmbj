<template>
    <view class="">
        <!-- 我是发票页面 -->
        <!-- head头部开始 -->
        <view class="base">
            <view class="newHead">
                <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" />
            </view>
        <!-- head头部结束 -->
        <!-- <image :src="userDZBFP.takePicturesImage[0]" mode=""></image> -->
        <!-- 发表代码发票编号 开始-->
		
			<view class="InvoiceInformation">
			    <block v-if="active==0">
			        <view>
			            <text class="user" space="emsp">发票代码</text><input class='phoneInput' type="text" v-model="userZZBFP.fpCode"
			                placeholder="请输入发票代码" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
			        </view>
			        <view>
			            <text class="user">发票号</text><input class='passInput' type="text" v-model="userZZBFP.fpNumber"
			                placeholder="请输入发票号" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
			        </view>
			    </block>
			    <block v-else>
			        <view>
			            <text class="user" space="emsp">发票代码</text><input class='phoneInput' type="text" v-model="userDZBFP.fpCode"
			                placeholder="请输入发票代码" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
			        </view>
			        <view>
			            <text class="user">发票号</text><input class='passInput' type="text" v-model="userDZBFP.fpNumber"
			                placeholder="请输入发票号" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
			        </view>
			    </block>
			</view>
			<!-- 发表代码发票编号 结束-->
			<!-- 发表类型 开始-->
			<view class="InvoiceType">
			    <view class="InvoiceType-title">发票类型</view>
			    <view>
			        <image @click='isActive(0)' class="quan" :src="active==0?'../../static/quan2.png':'../../static/quan1.png'"
			            mode=""></image> 纸质版发票
			    </view>
			    <view>
			        <image @click='isActive(1)' class="quan" :src="active==1?'../../static/quan2.png':'../../static/quan1.png'"
			            mode=""></image></text>电子版发票
			    </view>
			</view>
		</view>
        
        <!-- 发表类型 结束-->
        <!-- 纸质版发票样式 -->
        <view class="InvoiceInformation paperInvoice" v-if="active == 0">
            <view>
                <text class="user" space="emsp">快递名称</text><input class='phoneInput' type="text" v-model="userZZBFP.kdName"
                    placeholder="请输入快递名称" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
            </view>
            <view>
                <text class="user">快递单号</text><input class='passInput' type="text" v-model="userZZBFP.kdNumber"
                    placeholder="请输入快递单号" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
            </view>
            <!-- 提交按钮 -->
            <button :class="[{extract:isZZB},'loginBtn']" @click="loginBtn">提交</button>
        </view>
        <!-- 纸质版发票样式 -->
        <!-- 电子版发票样式 -->
        <view class="takePictures" v-else :style="{height: picheight, color:color}">
            <view class="uni-upload-img " :class="{isOverFlow:overFlow}">
                <view class="view-image" v-for="(image,index) in userDZBFP.takePicturesImage" :key="index">
                    <image class="uni-uploader__img " :src="image" :data-src="image"></image>
                    <!-- <view class="imageX" @tap="delect(index)">X</view> -->
                     <image class="imageX" @tap="delect(index)"  src="../../static/imageClose.png" mode=""></image>
                </view>
                <!-- 上传图片开始 -->
                <image class="takePictures-moren" src="../../static/takePictures.png" @click="UploadPictures"></image>
                <text class="takePictures-text" v-if="userDZBFP.takePicturesImage.length==0">请清晰的拍照上传</text>
            </view>
            <!-- 上传图片结束 -->
            <!-- 图片下面的更多/收起 -->
            <view class="gengduoAndshouqi" v-if="active==1&&userDZBFP.takePicturesImage.length>12">
                <view class="gengduo" @click="gengduo" v-if="isGengDuo">
                    查看更多{{gengDuoMsg}}张图 <image class="xiaJianTou" src="../../static/xiajiantou2.jpg" mode=""></image>
                </view>
                <view class="gengduo" @click="shouqi" v-else>
                    收起 <image class="shangJianTou" src="../../static/xiajiantou2.jpg" mode=""></image>
                </view>
            </view>
            <!-- 提交按钮 -->
            <button :class="[{extract:isExtract},'loginBtn']" @click="loginBtn">提交</button>
        </view>
        <!-- 电子版的查看更多 -->  
        <!-- 提交按钮弹框 -->
        <view class="extensionBox" v-show="isMark">
            <view class="extensionBox-title">
                提交成功<text class="iconfont icon-guanbi1" @click="closeMark()"></text>
            </view>
            <view class="detail">
                <view class="detail_">
                    <view class="detail_name">
                        您的提现申请已提交，提现款项将于3个工作日到达您的账户，请注意查收
                    </view>
                    <view class="zhiDao" @click="goWithdrawMoney">
                        知道了
                    </view>
                </view>

            </view>
        </view>
    </view>
</template>

<script>
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    import Head from '../common/head.vue'
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '填写发票',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                //固定导航栏
                headPosition: 'fixed',
                //纸质发票信息
                userZZBFP: {
                    fpCode: "",
                    fpNumber: "",
                    kdName: "",
                    kdNumber: "",
                },
                //电子发票信息
                userDZBFP: {
                    fpCode: "",
                    fpNumber: "",
                    //上传图片的数组
                    takePicturesImage: []
                },
                active: 0,
                //控制提交按钮,弹出来的框
                isMark: false,
                //上传图片的数组
                // takePicturesImage: [],
                //控制溢出隐藏
                overFlow: false,
                //查看更多msg
                gengDuoMsg: 0,
                //查看更多
                isGengDuo: true,
                //纸质版按钮点亮样式
                isZZB: false,
                //电子版的按钮点亮
                isExtract: false,
                //give后端的数据
                giveH: {},
                isLodingImage: false,
				picheight: '',
				color: ''
            }
        },
        onLoad(options) {
            this.giveH = JSON.parse(options.giveH);        
        },
        onShow() {
            this.getUserBtn();		
        },
		mounted() {
			
			const query = uni.createSelectorQuery().in(this);
			let _this = this
			uni.getSystemInfo({
			    success: function (res) {
					// 屏幕宽度
					_this.screenwidth = res.screenWidth
					// 屏幕高度
					_this.screenheight = res.screenHeight					
					query.select('.base').boundingClientRect(data => {
						// .base 宽度
						_this.width = data.width
						// .base 高度
						_this.height = data.height
                        _this.picheight = (_this.screenheight - _this.height) + 'px'
					}).exec();
					_this.color = '#f4f4f4'
			    }
			});
		},
        //监听纸质版发票/电子版发票的信息,如果没有填写,按钮不可点击
        watch: {
            //纸质版发票监听
            userZZBFP: {
                handler: function(newval, oldval) {
                    if (newval.fpCode.length == 0 || newval.fpNumber.length == 0 || newval.kdName.length == 0 ||
                        newval.kdNumber.length == 0) {
                        this.isZZB = false;
                        return false
                    } else {
                        this.isZZB = true;
                    }
                },
                deep: true
            },
            //电子版发票监听
            userDZBFP: {
                handler: function(newval, oldval) {
                    if (newval.fpCode.length == 0 || newval.fpNumber.length == 0 || newval.takePicturesImage.length ==
                        0) {
                        this.isExtract = false;
                        return false
                    } else {
                        this.isExtract = true;
                    }
                },
                deep: true
            }

        },
        methods: {
            // 选中发票类型小圈圈
            isActive(active) {               
                this.active = active;
                this.getUserBtn()
            },
            //封装用户信息，如果有一项没有填写按钮不可点击
            getUserBtn() {
                if (this.active == 0) {
                    if (this.userZZBFP.fpCode.length == 0 || this.userZZBFP.fpNumber.length == 0 || this.userZZBFP.kdName
                        .length == 0 || this.userZZBFP.kdNumber.length == 0) {
                        this.isZZB = false;
                    } else {
                        this.isZZB = true;
                    }
                } else if (this.active == 1) {
                    if (this.userDZBFP.fpCode.length == 0 || this.userDZBFP.fpNumber.length == 0 || this.userDZBFP.takePicturesImage
                        .length == 0) {
                        this.isExtract = false;
                    } else {
                        this.isExtract = true;
                    }

                }
            },
            //上传图片
            UploadPictures() {
                uni.chooseImage({
                    count: 9, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], //从相册/拍照选择
                    success: res => {
                        // 将选择的本地图片返回的路径，存入到newArr数组，
                        let newArr = res.tempFilePaths;
                        //遍历newArr数组，每次上传都在最后进行拼接
                        for (let i in newArr) {
                            this.userDZBFP.takePicturesImage.push(newArr[i])
                            if (this.userDZBFP.takePicturesImage.length > 12) {
                                this.overFlow = true
                                this.isGengDuo = true
                                this.gengDuoMsg = this.userDZBFP.takePicturesImage.length - 12
                            }
                        }
                    }
                })
            },
            //[删除图片]图片上面的x
            delect(index) {
                this.userDZBFP.takePicturesImage.splice(index, 1);
                if (this.userDZBFP.takePicturesImage.length > 12) {
                    this.overFlow = true
                    this.isGengDuo = true
                    this.gengDuoMsg = this.userDZBFP.takePicturesImage.length - 12
                } else {
                    this.overFlow = false
                    this.isGengDuo = false
                }
            },
            //点击查看更多
            gengduo() {
                this.overFlow = false
                this.isGengDuo = false
            },
            //点击收起
            shouqi() {
                this.overFlow = true
                this.isGengDuo = true
            },
            //点击提交按钮
            loginBtn() {
                //按钮验证
                if (this.active == 0) {
                    if (this.userZZBFP.fpCode.length <= 0) {
                        otherAPI.toast('请填写发票代码', 'none', false, 1500);
                        return false;
                    }
                    if (this.userZZBFP.fpNumber.length <= 0) {
                        otherAPI.toast('请填写发票号', 'none', false, 1500);
                        return false;
                    }
                    if (this.userZZBFP.kdName.length <= 0) {
                        otherAPI.toast('请填写快递名称', 'none', false, 1500);
                        return false;
                    }
                    if (this.userZZBFP.kdNumber.length <= 0) {
                        otherAPI.toast('请填写快递单号', 'none', false, 1500);
                        return false;
                    }
                } else if (this.active == 1) {
                    if (this.userDZBFP.fpCode.length <= 0) {
                        otherAPI.toast('请填写发票代码', 'none', false, 1500);
                        return false;
                    }
                    if (this.userDZBFP.fpNumber.length <= 0) {
                        otherAPI.toast('请填写发票号', 'none', false, 1500);
                        return false;
                    }
                    if (this.userDZBFP.takePicturesImage.length <= 0) {
                        otherAPI.toast('请上传图片', 'none', false, 1500);
                        return false;
                    }
                }

                uni.showLoading({
                    title: '正在加载,请稍后',
                    mask: true,
                    icon: "none"
                })            
                //提交纸质版
                if (this.active == 0) {
                    //判断下是对公账户this.giveH.cash_type==20/还是支付宝this.giveH.cash_type==10         
                    //纸质版数据,添加到giveH
                    this.giveH.invoice_type = 10;
                    this.giveH.invoice_code = this.userZZBFP.fpCode;
                    this.giveH.invoice_num = this.userZZBFP.fpNumber;
                    this.giveH.expressage_name = this.userZZBFP.kdName;
                    this.giveH.expressage_num = this.userZZBFP.kdNumber;
                    if (this.giveH.cash_type == 20) {
                        //判断对公账户-->纸质版                   
                        let url = `api/company_cash/add`;
                        let obj = {
                            token: uni.getStorageSync('data').token,
                            cash_type: this.giveH.cash_type,
                            bank_name: this.giveH.bank_name,
                            bank_card: this.giveH.bank_card,
                            card_user_name: this.giveH.card_user_name,
                            province_name: this.giveH.province_name,
                            city_name: this.giveH.city_name,
                            branch_name: this.giveH.branch_name,
                            invoice_type: this.giveH.invoice_type,
                            expressage_name: this.giveH.expressage_name,
                            expressage_num: this.giveH.expressage_num,
                            ids: this.giveH.ids.split(","),
                            money: this.giveH.money,
                            invoice_code: this.giveH.invoice_code,
                            invoice_num: this.giveH.invoice_num,
                        }
                        httpRequest_.post(url, obj).then(res => {
                            if (res.code == 1) {
                                uni.hideLoading()
                                this.isMark = true
                            } else if (res.code == 0) {
                                otherAPI.toast(res.msg, 'none', false, 2000);
                            }
                        })
                    } else if (this.giveH.cash_type == 10) {
                        //判断支付宝账户-->纸质版 
                        let url = `api/company_cash/add`;
                        let obj = {
                            token: uni.getStorageSync('data').token,
                            cash_type: this.giveH.cash_type,
                            bank_name: this.giveH.bank_name,
                            bank_card: this.giveH.bank_card,
                            ids: this.giveH.ids.split(","),
                            money: this.giveH.money,
                            invoice_type: this.giveH.invoice_type,
                            expressage_name: this.giveH.expressage_name,
                            expressage_num: this.giveH.expressage_num,
                            invoice_code: this.giveH.invoice_code,
                            invoice_num: this.giveH.invoice_num,
                        }
                        httpRequest_.post(url, obj).then(res => {                           
                            if (res.code == 1) {
                                uni.hideLoading()
                                this.isMark = true
                            } else if (res.code == 0) {
                                otherAPI.toast(res.msg, 'none', false, 2000);
                            }
                        })
                    }
                } else if (this.active == 1) {
                    //newImages是上传图片的id数组
                    const newImages = [];
                    for (let i in this.userDZBFP.takePicturesImage) {
                        uni.uploadFile({
                            url: 'http://devjd.yunduoke.cn/index.php?s=/api/upload/image',
                            formData: {
                                wxapp_id: 10001,
                                token: uni.getStorageSync('data').token
                            },
                            filePath: this.userDZBFP.takePicturesImage[i],
                            fileType: 'image',
                            name: 'iFile',
                            success: (res) => {                               
                                newImages.push(JSON.parse(res.data).data.file_id);
                                //把图片绑定到外面
                                this.giveH.img_ids = newImages
                                if (i == this.userDZBFP.takePicturesImage.length - 1) {
                                    //提交电子版
                                    this.giveH.invoice_type = 20;
                                    this.giveH.invoice_code = this.userDZBFP.fpCode;
                                    this.giveH.invoice_num = this.userDZBFP.fpNumber;
                                    // this.giveH.img_ids = newImages
                                    if (this.giveH.cash_type == 20) {
                                        //判断对公账户                   
                                        let url = `api/company_cash/add`;
                                        let obj = {
                                            token: uni.getStorageSync('data').token,
                                            cash_type: this.giveH.cash_type,
                                            bank_name: this.giveH.bank_name,
                                            bank_card: this.giveH.bank_card,
                                            card_user_name: this.giveH.card_user_name,
                                            province_name: this.giveH.province_name,
                                            city_name: this.giveH.city_name,
                                            branch_name: this.giveH.branch_name,
                                            invoice_type: this.giveH.invoice_type,
                                            ids: this.giveH.ids.split(","),
                                            money: this.giveH.money,
                                            invoice_code: this.giveH.invoice_code,
                                            invoice_num: this.giveH.invoice_num,
                                            img_ids: this.giveH.img_ids,
                                        }
                                        httpRequest_.post(url, obj).then(res => {
                                            if (res.code == 1) {
                                                uni.hideLoading()
                                                this.isMark = true            
                                            } else if (res.code == 0) {
                                                otherAPI.toast(res.msg, 'none', false, 2000);
                                            }

                                        })
                                    } else if (this.giveH.cash_type == 10) {
                                        //判断支付宝账户
                                        let url = `api/company_cash/add`;
                                        let obj = {
                                            token: uni.getStorageSync('data').token,
                                            cash_type: this.giveH.cash_type,
                                            bank_name: this.giveH.bank_name,
                                            bank_card: this.giveH.bank_card,
                                            ids: this.giveH.ids.split(","),
                                            money: this.giveH.money,
                                            invoice_type: this.giveH.invoice_type,
                                            invoice_code: this.giveH.invoice_code,
                                            invoice_num: this.giveH.invoice_num,
                                            img_ids: this.giveH.img_ids,
                                        }
                                        httpRequest_.post(url, obj).then(res => {
                                            if (res.code == 1) {
                                                uni.hideLoading()
                                                this.isMark = true          
                                            } else if (res.code == 0) {
                                                otherAPI.toast(res.msg, 'none', false, 2000);
                                            }

                                        })
                                    }
                                }
                            },
                            fail: (err) => {
                                uni.showModal({
                                    content: "报错了",
                                    showCancel: false
                                });
                            }
                        });
                    }
                }

                // }, 2000);           
            },
            //点击提交弹框知道了,去提现页面
            goWithdrawMoney() {            
                this.userZZBFP={
                    fpCode: "",
                    fpNumber: "",
                    kdName: "",
                    kdNumber: "",
                },
                this.userDZBFP={
                    fpCode: "",
                    fpNumber: "",
                    //上传图片的数组
                    takePicturesImage: []
                },
                
                this.isMark = false;
                uni.navigateTo({
                    url: 'withdrawMoney'
                })
            },
            //点击提交弹框的X
            closeMark() {
                this.isMark = false
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
        }

    }
</script>

<style>
    page {
        width: 100%;
        /* height: 100%; */
        background-color: #000b1b;
        /* border-top: 0.0001rpx solid #000b1b; */
        /* overflow: hidden; */
    }
	.base{
		padding:0 0 30rpx;
	}
    /* newHead固定 */
    .newHead {
        /*  position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 128rpx;
        background-color: #000b1b;
        z-index: 10000; */
    }

    .InvoiceInformation {
        width: 630rpx;
        margin: auto;
        background-color: #08172d;
        border-radius: 10rpx;
        color: #dee1ef;
        padding: 0 30rpx;
        /* vertical-align: 10rpx; */
    }


    .InvoiceInformation view {
        height: 100rpx;
        line-height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 31.94rpx;
    }

    .InvoiceInformation view:nth-child(1) {
        border-bottom: 1rpx solid #13234c;
    }

    .InvoiceInformation view input {
        text-align: right;
        font-size: 31.94rpx;
    }

    .InformationClass {
        color: #4C5C85;
    }

    /* 发票类型 */
    .InvoiceType {
        width: 690rpx;
        margin: auto;
        background-color: #08172d;
        height: 202rpx;
        margin-top: 158rpx;
        border-radius: 10rpx;
        color: #dee1ef;
        box-sizing: border-box;
        padding: 30rpx;
        /* vertical-align: 10rpx; */
    }

    .InvoiceType {
        font-size: 31.94rpx;
        height: 100rpx;
        line-height: 40rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
    }

    .quan {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        margin-right: 14rpx;
        vertical-align: -7rpx;
        border-radius: 50%;
        /* box-sizing: border-box; */
        /* padding: 5rpx; */
        position: relative;
    }


    /* 纸质上传 */

    /* 拍照上传 */
    .takePictures {
        width: 690rpx;
        /* background-color: red; */
        margin: auto;
        color: #566791;
        font-size: 24rpx;
        /* display: flex;    
        position: relative; */
        overflow: scroll;
		padding-bottom: 180rpx;
		box-sizing: border-box;

    }

    .uni-upload-img {
        display: flex;
        flex-wrap: wrap;
    }

    .isOverFlow {
        height: 510rpx;
		/* height: 100%; */
        overflow: hidden;
    }

    .takePictures-moren {
        width: 150rpx;
        height: 150rpx;
    }

    .takePictures-text {
        color:#566791 ;
        margin-left: 30rpx;
        line-height: 150rpx;
    }

    .view-image {
        width: 150rpx;
        height: 150rpx;
        margin: 0rpx 30rpx 30rpx 0;
    }

    .uni-uploader__img {
        position: relative;
        width: 150rpx;
        height: 150rpx;
    }

    .view-image:nth-child(4n+4) {
        margin-right: 0;
    }

    .imageX {
        position: relative;
        top: -151rpx;
        left: 109rpx;
        text-align: center;
        line-height: 44rpx;
        width: 38rpx;
        height: 38rpx;
        background-color: rgba(136, 148, 178, 0.5);
        color: #fff;
        border-radius: 50%;
    }

    .gengduo {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #566791;
        text-align: center;
		padding: 30rpx 0 0;
    }

    /* 提交按钮 */
    .loginBtn {
        background-color: #0a1a3c;
        color: #4c5c85;
        font-size: 32rpx;
        width: 690rpx;
        height: 100rpx;
        line-height: 100rpx;
        margin: 23rpx auto;
        position: absolute;
        bottom: 23rpx;
        left: 30rpx;
    }

    /* 提交按钮点亮 */
    .extract {
        color: #eceaf8;
        background-color: #152c65;
    }

    /* 提交弹框 */
    .extensionBox {
        width: 560rpx;
        /* height: 415rpx; */
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 199;
        background: rgba(33, 49, 106, 0.8);
        border: 4rpx solid #3e5f8e;
        border-radius: 10rpx;
        padding: 30rpx;
        box-sizing: border-box;
    }

    .extensionBox-title {
        font-size: 40rpx;
        color: #e4e8f7;
        text-align: center;
        height: 128rpx;
        line-height: 128rpx;
        margin-top: -30rpx;
    }

    .icon-guanbi1 {
        font-size: 35rpx;
        color: #9fb1f4;
        position: absolute;
        top: -18rpx;
        right: 30rpx;
    }

    .extensionBox .detail {
        width: 500rpx;
        /* height: 250rpx; */
        background-color: #394b8f;
        margin: 0 auto;
    }

    .extensionBox .detail_ {
        margin: auto;
        width: 444.44rpx;
        /* height: 320rpx;    */
    }


    .extensionBox .detail_ .detail_name {
        padding: 25rpx 0;
        display: flex;
        line-height: 50rpx;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 26rpx;
        color: #9fb1f4;
        border-bottom: 0.69rpx solid #31427d;
    }

    .zhiDao {
        line-height: 100rpx;
        font-size: 30rpx;
        color: #68fffe;
        text-align: center;
    }

    /* 下箭头 */
    .xiaJianTou,
    .shangJianTou {
        width: 22rpx;
        height: 14rpx;
        margin-left: 13rpx;
    }

    .shangJianTou {
        transform: rotate(180deg);
    }
</style>
