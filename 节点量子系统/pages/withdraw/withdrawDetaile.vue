<template>
    <view>
        <Head :headTitle="headTitle" :headReturn="headReturn" :headPosition="headPosition" :headBackground='headBackground'
            @returnClick="returnClick" @otherClick="otherClick">
        </Head>

        <view style="position: absolute;margin-top: 160rpx;width: 100%;">
            <view class="box">
                <!-- 第一行 -->
                <block v-if="userCashInfo.cash_type==10">
                    <view class="box-1">
                        <view class="box-1-row">提现方式：支付宝</view>
                        <view class="box-1-row">公司名称：{{userCashInfo.bank_name}}</view>
                        <view class="box-1-row">支付宝：{{userCashInfo.bank_card}}</view>
                        <view class="box-1-row">金额：{{userCashInfo.money | numFilter}}元</view>
                    </view>
                </block>
                <block v-if="userCashInfo.cash_type==20">
                    <view class="box-1">
                        <view class="box-1-row">提现方式：对公账户</view>
                        <view class="box-1-row">银行开户名：{{userCashInfo.bank_name}}</view>
                        <view class="box-1-row">银行账号：{{userCashInfo.bank_card}}</view>
                        <view class="box-1-row">金额：{{userCashInfo.money | numFilter}}元</view>
                    </view>
                </block>
                <!-- 第二行 -->
                <view class="box-2">
                    <view class="box-2-row">发票代码：{{userCashInfo.invoice_code}}</view>
                    <view class="box-2-row">发票号：{{userCashInfo.invoice_num}}</view>
                    <view class="box-2-row" v-if="userCashInfo.invoice_type==10">快递名称：{{userCashInfo.expressage_name}}</view>
                    <view class="box-2-row" v-if="userCashInfo.invoice_type==10">快递单号：{{userCashInfo.expressage_name}}</view>
                    <!-- 图 -->
                    <view class=" newImage" v-if="isImage && userCashInfo.invoice_type==20">
                        <view class="images" @click="toImgArr(index)" v-for="(item,index) in userCashInfo.image" :key="index">
                            <image class="newImages" :src="item.file_path"></image>
                        </view>
                    </view>
                </view>

                <!-- 右上角状态 -->
                <image v-if="userCashInfo.is_cash==0" class="statusImg" src="/static/Tixian/tx1.png" mode=""></image>
                <image v-if="userCashInfo.is_cash==1" class="statusImg" src="/static/Tixian/tx2.png" mode=""></image>
                <image v-if="userCashInfo.is_cash==2" class="statusImg" src="/static/Tixian/tx3.png" mode=""></image>
                <image v-if="userCashInfo.is_cash==3" class="statusImg" src="/static/Tixian/tx4.png" mode=""></image>
            </view>
            <!-- 提现失败原因：后台返回的内容展示 -->
            <view class="errMsg" v-if="userCashInfo.is_cash==3 && userCashInfo.remarks ">
                <view>
                    提现失败原因：<text style="color: #5c8bd5;">{{userCashInfo.remarks}}</text>
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
                    title: '提现详情',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000b1b',
                //从提现明细传过来的id,通过id获取接口
                id: '',
                userCashInfo: [],
                //控制图片是否显示
                isImage: false,
            }
        },
        onLoad(options) {
            // return;
            // this.id=options.id;
            this.getCashInfo(options.id)
        },
        methods: {
            toImgArr(index) {
                //点击跳转,把图片数组传过去-->获取用户信息,把里面的图片找到,遍历放到数组内,传过去  
                const newImage = this.userCashInfo.image;
                const newArr = [];
                for (let i in newImage) {
                    newArr.push(newImage[i].file_path)
                }            
                //点击当前图片的index
                const newIndex = index;             
                uni.navigateTo({
                    url: "./images?newArr=" + newArr + '&index=' + newIndex
                })
            },
            //提现详情api/company_cash/cash_info
            //收益明细
            getCashInfo(id) {
                let url = `api/company_cash/cash_info`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    company_cash_id: id,
                }
                httpRequest_.get(url, obj).then(res => {
                    this.userCashInfo = res.data.info;
                    if (this.userCashInfo.image.length == 0) {
                        this.isImage = false
                    } else {
                        this.isImage = true;
                    }
                })
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
        },
    }
</script>

<style lang="scss">
    page {
        background-color: #000B1B;
        font-family: system-ui; // 统一字体，删除随意不影响
    }

    .box {
        width: 690rpx;
        // min-height: 464rpx;
        background-color: rgba(79, 126, 201, 0.2);
        border-radius: 6rpx;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        padding: 20rpx 30rpx;
        position: relative;

        .box-1 {
            padding: 20rpx 0;
            border-bottom: solid 1px #13234c;
            display: flex;
            flex-flow: column;

            .box-1-row {
                color: #586a95;
                font-size: 28rpx;
                margin: 4rpx 0;
            }
        }

        .box-2 {
            padding: 20rpx 0;
            display: flex;
            flex-flow: column;
            padding-top: 20rpx;

            .box-2-row {
                display: flex;
                flex-flow: row;
                align-items: center;
                color: #586a95;
                font-size: 28rpx;
                margin: 4rpx 0;
            }

            .images {
                width: 150rpx;
                height: 150rpx;
                background-color: #142947;
                border-radius: 4rpx;
                // margin: 0rpx 4rpx;
                margin-top: 10rpx;
            }
        }

        .statusImg {
            position: absolute;
            top: 0;
            right: 40rpx;
            width: 172rpx;
            height: 132rpx;
        }
    }

    .errMsg {
        margin: 20rpx auto;
        width: 690rpx;
        min-height: 100rpx;
        background-color: rgba(79, 126, 201, .2);
        border-radius: 6rpx;
        font-size: 28rpx;
        display: flex;
        flex-flow: row;
        padding: 20rpx;
        padding-left: 30rpx;
        align-items: center;
        box-sizing: border-box;
        color: #586a95;
    }

    .newImage {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .images:nth-child(4n+4) {
        margin-right: 0;
    }

    .newImages {
        width: 100%;
        height: 100%;
    }
</style>
