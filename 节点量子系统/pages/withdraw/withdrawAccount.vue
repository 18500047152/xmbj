<template>
    <view class="">
        <!-- 我是佣金提现页面 -->
        <!-- head头部开始 -->
        <view class="newHead">
            <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" />
        </view>
        <!-- head头部结束 -->
        <!-- 提现方式 -->
        <view class="method">
            <view class="method-title">提现方式</view>
            <view>
                <image @click='isActive(0)' class="quan" :src="active==0?'../../static/quan2.png':'../../static/quan1.png'"
                    mode=""></image>对公账户
            </view>
            <view>
                <image @click='isActive(1)' class="quan" :src="active==1?'../../static/quan2.png':'../../static/quan1.png'"
                    mode=""></image>支付宝
            </view>
        </view>
        <!-- 对公账号的所有样式样式 开始-->
        <view class="userBank" v-if="active==0">
            <view class="userBank-xinxi">
                <text class="user" space="emsp">开户名</text><input class='phoneInput' type="text" v-model="userDGZH.khName"
                    placeholder="请填写公司的开户名称" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
            </view>
            <view class="userBank-xinxi">
                <!--银行账号应该是纯数字把?这里的input框用的纯数字-->
                <text class="user">银行账号</text><input class='passInput' type="number" v-model="userDGZH.yhCode"
                    placeholder="请填写银行账号" placeholder-class="InformationClass" />
            </view>
            <view class="userBank-xinxi">
                <text class="user">开户银行</text>
                <view style="display: flex;flex-direction: row;align-items: center;">
                    <picker @change="bindPickerChange" :value="blankList.index" :range="blankList.array">
                        <view class="uni-input">{{blankList.array[blankList.index]}}</view>
                    </picker>
                    <text class="iconfont icon-you"></text>
                </view>
            </view>
            <view class="userBank-liandong">
                <!-- 开户地，插件联动 -->
                <text class="user">
                    <text>开户地</text>
                    <text v-if="isValue" class="btns" @tap="openAddres2">请选择所在省、市
                        <text class="iconfont icon-you"></text>
                    </text>
                    <text class="btns" style="color:#dee1ef ;" @tap="openAddres2" v-if="!isValue">{{userDGZH.pickerText}}</text>
                </text>
                <simple-address style="position: absolute;" ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault"
                    @onConfirm="onConfirm" themeColor="#2c85f4"></simple-address>
                <!-- 开户地，插件联动 -->
            </view>

            <view class="userBank-xinxi">
                <text class="user">分行</text><input class='passInput' type="text" v-model="userDGZH.fhName" placeholder="示例:长安支行建国门内大街分理处"
                    placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
            </view>
        </view>
        <!-- 对公账号的所有样式结束 -->
        <!-- 支付宝提现样式 -->
        <view class="userBank" v-else>
            <view class="userBank-xinxi">
                <text class="user" space="emsp">公司名称</text><input class='phoneInput' type="text" v-model="userZFB.gsName"
                    placeholder="与公司申请的支付宝名称一致" placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
            </view>
            <view class="userBank-xinxi quDiaoXian">
                <text class="user">支付宝号</text>
                <input class='passInput' type="text" v-model="userZFB.zfbCode" placeholder="公司的对公支付宝帐号"
                    placeholder-class="InformationClass" onKeypress='javascript:if(event.keyCode == 32)event.returnValue = false;' />
            </view>
        </view>    
        <!-- 支付宝提现样式 -->
        <!--  对公账号与支付宝的提现金额[他俩用一个样式] -->
        <view class="money">
            <text>提现金额</text>
            <text class="moneyNumber">¥{{money}}
            </text>
        </view>
        <!-- 对公账号的下一步按钮 -->
        <block v-if='active==0'>
            <button :class="[{extract:isDGZH},'loginBtn']" @click="loginBtn">下一步</button>
        </block>
        <!-- 支付宝的下一步按钮 -->
        <block v-else>
            <button :class="[{extract:isExtract},'loginBtn']" @click="loginBtn">下一步</button>
        </block>
        <!-- 统一的下一步按钮弹框 -->
        <view class="extensionBox" v-show="isMark">
            <view class="extensionBox-title">
                确认是否修改<text class="iconfont icon-guanbi1" @click="closeMark()"></text>
            </view>
            <view class="detail">
                <view class="detail_">
                    <view class="detail_name">
                        请确定您填写的公司名称和支付宝号与公司申请的对公支付宝信息一致
                    </view>
                    <view class="quxiaoAndqueding">
                        <view @click="quXiao">取消</view>
                        <view class="queding" @click="queDing">确定</view>
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
    //引入插件联动
    import simpleAddress from '@/components/simple-address/simple-address.vue';
    export default {
        components: {
            Head,
            // 地区联动
            simpleAddress
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '提现佣金',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                //固定导航栏
                headPosition: 'fixed',
                //对公账号信息
                userDGZH: {
                    khName: "",
                    yhCode: '',
                    fhName: "",
                    pickerText: '',
                },

                //支付宝信息
                userZFB: {
                    gsName: "",
                    zfbCode: "",

                },
                money: 222,
                active: 0,
                //控制下一步按钮,弹出来的框
                isMark: false,
                //银行
                blankList: {
                    array: [
                        '招商银行',
                        '中国工商银行',
                        '中国农业银行',
                        '中国银行',
                        '中国建设银行',
                        '平安银行',
                        '交通银行',
                        '中信银行',
                        '兴业银行',
                        '光大银行',
                        '民生银行',
                        '中国邮政储蓄银行',
                        '上海浦东发展银行',
                        '广发银行',
                        '华夏银行',
                        '北京银行',
                        '上海银行',
                        '宁波银行',
                        '江苏银行',
                        '广州银行'
                    ],
                    index: 0,
                },
                //插件联动数据
                cityPickerValueDefault: [0, 0, 1],
                //插件联动地址->sheng/shi
                // sheng: '',
                // shi: '',
                //isValue是做联动选择地址后,默认提示语与地址的切换显示
                isValue: true,
                //对公账户的按钮点亮
                isDGZH: false,
                //支付宝的按钮点亮
                isExtract: false,
                //give后端的数据
                giveH: {}
            }
        },
        onLoad(options) {
            //接收佣金提现传过来的订单ID还有总金额          
            this.giveH = options;
            this.money = options.money;
            //用户默认信息
            if (this.active == 0) {
                this.getUserInfo(20);
            } else if (this.active == 1) {
                this.getUserInfo(10);
            }
        },
        //页面加载时进行判断如果对公账户/支付宝有默认数据，就点亮下一步按钮      
        onShow() {
            this.getUserBtn()
        },
        //监听对公账号/支付宝页面的信息,如果没有填写,按钮不可点击
        watch: {
            //对公账号
            userDGZH: {
                handler: function(newval, oldval) {
                    if (newval.khName.length == 0 || newval.yhCode.length == 0 || newval.fhName.length == 0 ||
                        newval.pickerText.length == 0) {
                        this.isDGZH = false;
                        return false
                    } else {
                        this.isDGZH = true;
                    }
                },
                deep: true
            },
            //支付宝账号
            userZFB: {
                handler: function(newval, oldval) {
                    if (newval.gsName.length == 0 || newval.zfbCode.length == 0) {
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
            //默认信息
            // api/company_cash/user_info
            getUserInfo(cash_type) {
                let url = `api/company_cash/user_info`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    // time: this.getTime()
                    cash_type: cash_type
                }
                httpRequest_.get(url, obj).then(res => {
                    if (this.active == 0) {
                        this.userDGZH.yhCode = res.data.data.info.bank_card;
                        this.userDGZH.khName = res.data.data.info.bank_name;
                        //分行
                        this.userDGZH.fhName = res.data.data.info.branch_name;

                        this.userDGZH.pickerText = res.data.data.info.province_name + '-' + res.data.data.info.city_name;
                        //判断开户地
                        if (this.userDGZH.pickerText == '' && this.userDGZH.pickerText.length > 0) {
                            this.isValue = true;
                        } else {
                            this.isValue = false;
                        }
                    } else if (this.active == 1) {
                        this.userZFB.zfbCode = res.data.data.info.bank_card;
                        this.userZFB.gsName = res.data.data.info.bank_name;
                    }
                })
            },
            // 选中发票类型小圈圈
            isActive(active) {
                this.active = active;
                //点击对公账号/支付宝，查看是否有默认值，有默认值点亮按钮
                this.getUserBtn();
                //获取默认信息            
                if (this.active == 0) {
                    this.getUserInfo(20);
                } else if (this.active == 1) {
                    this.getUserInfo(10);
                }
            },
            //封装
            getUserBtn() {
                if (this.active == 0) {
                    // 单独判断开户地/默认值与真实地址显示切换  
                    if (this.userDGZH.pickerText.length == 0) {
                        this.isValue = true
                    } else {
                        this.isValue = false
                    }
                    // 整体判断开户名/银行账号/开户地/分行,如果有一个没有填写按钮不开点亮  
                    if (this.userDGZH.khName.length == 0 || this.userDGZH.yhCode.length == 0 || this.userDGZH.fhName.length ==
                        0 || this.userDGZH.pickerText.length == 0) {
                        this.isDGZH = false;
                        return false

                    } else {
                        this.isDGZH = true;
                    }
                } else if (this.active == 1) {
                    if (this.userZFB.gsName.length == 0 || this.userZFB.zfbCode.length == 0) {
                        this.isExtract = false;
                    } else {
                        this.isExtract = true;
                    }

                }
            },
            //银行
            bindPickerChange(e) {
                this.blankList.index = e.detail.value;
            },
            //插件地区联动方法开始↓
            openAddres2() {
                // 根据 label 获取
                var index = this.$refs.simpleAddress.queryIndex(['北京市', '北京市', '东城区'], 'label');               
                this.cityPickerValueDefault = index.index;
                this.$refs.simpleAddress.open();
            },           
            onConfirm(e) {              
                this.isValue = false;
                this.userDGZH.pickerText = e.labelArr[0] + "-" + e.labelArr[1];              
            },
            //插件地区联动方法结束↑
            //点击下一步按钮
            loginBtn() {
                if (this.active == 0) {
                    if (this.userDGZH.khName.length <= 0) {
                        otherAPI.toast('请填写公司的开户名称', 'none', false, 1500);
                        return false;
                    }
                    if (this.userDGZH.yhCode.length <= 0) {
                        otherAPI.toast('请填写银行账号', 'none', false, 1500);
                        return false;
                    }
                    if (this.userDGZH.pickerText.length <= 0) {
                        otherAPI.toast('请填写开户地', 'none', false, 1500);
                        return false;
                    }
                    if (this.userDGZH.fhName.length <= 0) {
                        otherAPI.toast('请填写分行', 'none', false, 1500);
                        return false;
                    }
                    if (!this.money) {
                        otherAPI.toast('请确认金额', 'none', false, 1500);
                        return false;
                    }
                } else if (this.active == 1) {
                    if (this.userZFB.gsName.length <= 0) {
                        otherAPI.toast('请填写公司名称', 'none', false, 1500);
                        return false;
                    }
                    if (this.userZFB.zfbCode.length <= 0) {
                        otherAPI.toast('请填写支付宝号', 'none', false, 1500);
                        return false;
                    }
                    if (!this.money) {
                        otherAPI.toast('请确认金额', 'none', false, 1500);
                        return false;
                    }
                }
                this.isMark = true
            },
            //点击下一步弹框的X
            closeMark() {
                this.isMark = false
            },
            //点击下一步弹框的取消
            quXiao() {
                this.isMark = false
            },
            //点击下一步弹框的确定
            queDing() {
                //清空金额
                //this.money='',
                //点击确定弹框取消
                this.isMark = false
                //传参
                if (this.active == 0) {
                    // const giveD=this.giveH;                    
                    //对公账户传参
                    this.giveH.cash_type = 20;
                    this.giveH.bank_name = this.userDGZH.khName;
                    this.giveH.bank_card = this.userDGZH.yhCode;
                    this.giveH.card_user_name = this.blankList.array[this.blankList.index];
                    this.giveH.province_name = this.userDGZH.pickerText.split('-')[0];
                    this.giveH.city_name = this.userDGZH.pickerText.split('-')[1];
                    this.giveH.branch_name = this.userDGZH.fhName;                
                } else if (this.active == 1) {
                    //支付宝账户传参
                    this.giveH.cash_type = 10;
                    this.giveH.bank_name = this.userZFB.gsName;
                    this.giveH.bank_card = this.userZFB.zfbCode;
                }
                uni.navigateTo({
                    url: './withdrawBill?giveH=' + JSON.stringify(this.giveH)
                })
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

    /* newHead固定 */
    /* .newHead {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 128rpx;
        background-color: #000b1b;
        z-index: 10000;
    } */

    /* 提现方式 */
    .method {
        width: 630rpx;
        height: 100rpx;
        line-height: 100rpx;
        margin: auto;
        background-color: #08172d;
        /* margin-top: 158rpx; */
        margin-top: 30rpx;
        border-radius: 10rpx;
        color: #dee1ef;
        padding: 0 30rpx;
        font-size: 31.94rpx;
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

    /* 银行 */
    .userBank {
        font-size: 31.94;
        width: 630rpx;
        margin: 20rpx auto 0;
        background-color: #08172d;
        border-radius: 10rpx;
        padding: 0 30rpx;
    }

    /* 对公账号下面的信息 */
    .userBank .userBank-xinxi,
    .userBank .userBank-liandong {
        height: 100rpx;
        line-height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 31.94rpx;
        border-bottom: 1px solid #13234c;
        color: #dee1ef;
    }

    /* 开户地 */
    .userBank .userBank-liandong .user {

        width: 100%;
        font-size: 31.94rpx;
        /* color: red; */
    }

    .userBank view:nth-child(5) {
        border-bottom: none
    }

    .userBank view input {
        text-align: right;
        font-size: 31.94rpx;
    }

    /* 提现金额 */
    .money {
        width: 630rpx;
        height: 100rpx;
        line-height: 100rpx;
        margin: auto;
        background-color: #08172d;
        border-radius: 10rpx;
        color: #dee1ef;
        padding: 0 30rpx;
        font-size: 31.94rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;
    }

    .Inputmoney {
        font-size: 36rpx;
        width: 20%;
        color: #e4992d;
        text-align: right;
    }

    .moneyNumber {
        font-size: 32rpx;
        color: #e4992d;
        margin-left: auto;
        vertical-align: -5rpx;
    }


    /* 下一步按钮 */
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

    /* 下一步按钮点亮 */
    .extract {
        color: #eceaf8;
        background-color: #152c65;
    }


    .InformationClass {
        color: #4C5C85;
    }

    /* 示例文字太多，不增加input宽度，显示不全 */
    input {
        width: 80%;
    }


    /* 下一步弹框 */
    .extensionBox {
        width: 560rpx;
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
        background-color: #394b8f;
        margin: 0 auto;
    }

    .extensionBox .detail_ {
        margin: auto;
        width: 444.44rpx;
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

    .quxiaoAndqueding {
        line-height: 68rpx;
        font-size: 30rpx;
        display: flex;
        padding: 16rpx 0;
        color: #9fb1f4;
    }

    .quxiaoAndqueding view {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .queding {
        color: #68fffe;
        border-left: 1rpx solid #31427d;
    }

    /* 开户地 */
    .btns {
        color: #4C5C85;
        float: right;
        /* text-align: right; */
        /* margin-left: 269rpx; */
    }
    .quDiaoXian{
        border-bottom: none !important;
    }
</style>
