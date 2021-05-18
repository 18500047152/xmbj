<template>
    <view class="body">
        <Head :headTitle="headTitle" :headOtherText="headOtherText" :headReturn="headReturn" @otherClick="otherClick"
            @returnClick="returnClick" />
        <view class="extractBox">
            <view class="accountName">
                <text>户名</text>
                <input class="inputName" v-model="name" type="text" placeholder="请填写收款人户名" placeholder-class="placeClass" />
            </view>
            <view class="account">
                <text>账户</text>
                <input class="blankAccount" v-model="accountNum" type="text" placeholder="请填写收款人账户" placeholder-class="placeClass" />
            </view>
            <view class="blankName">
                <text>银行</text>
                <view style="display: flex;flex-direction: row;align-items: center;">
                    <picker  @change="bindPickerChange" :value="blankList.index" :range="blankList.array">
                        <view  class="uni-input">{{blankList.array[blankList.index]}}</view>
                    </picker>
                    <text class="iconfont icon-you"></text>
                </view>
            </view>
        </view>
        <view class="cashBox">
            <view style="width: 645.83rpx;margin: auto;">
                <text class="withdrawalAmount">提现金额</text>
                <view class="amount">
                    <text class="amountLogo">￥</text>
                    <input class="money" type="number" v-model="money" placeholder="本次可提现金额" placeholder-class="holderMoney" />
                </view>
                <view class="amountTips">
                    <text>手续费{{service}}元</text>
                    <text>可提现返利{{moneyNum}}元<text class="allAmount" @click="allshareFeeGet">全部提现</text></text>
                </view>
                <view style="padding-bottom:41.66rpx;">
                    <button @click="cash_add" :class="[{extract:isExtract && buttonStatus},'btn']">提现</button>
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
                    title: '提现到银行卡',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headOtherText: {
                    color: '#b1cef8',
                    size: '27.77rpx',
                    text: '提现明细',
                    url: '/pages/index/withdrawalDetail'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                userInfo: [],
                name: '',
                accountNum: '',
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
                money: '',
                isExtract: false,
                moneyNum: 0,
                cashStatus: false

            }
        },
        onReady() {
            this.cash_setting();
        },
        computed: {
            charge_fee_set() {
                if (this.userInfo) {
                    return this.userInfo.charge_fee_set
                }
            },
            service() {
                if (this.userInfo) {
                    return this.userInfo.service
                }
            },
            buttonStatus() {
                if (this.moneyNum == 0) {
                    return false;
                } else {
                    return true
                }
            }
        },
        watch: {
            money(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.isExtract = true;
                } else {
                    this.isExtract = false;
                }
            }
        },
        methods: {
            cash_setting() {
                let url = '/api/cash/cash_setting';
                let obj = {
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code === 1) {
                        this.userInfo = res.data.withdraw
                        this.userMoney()
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            userMoney() {
                let url = '/api/cash/userMoney';
                let obj = {
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code === 1) {
                        this.moneyNum = res.data.money
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            allshareFeeGet() {
                this.money = this.moneyNum
            },
            bindPickerChange(e) {
                this.blankList.index = e.detail.value;
            },
            // 提现
            cash_add() {
                if (this.cashStatus) {
                    return false;
                }
                if (!this.isExtract || !this.buttonStatus) {
                    return false
                }
                if (!this.name) {
                    otherAPI.toast('请填写收款人户名', 'none', false, 1500);
                    return false;
                }
                if (!this.accountNum) {
                    otherAPI.toast('请填写收款人账户', 'none', false, 1500);
                    return false;
                }
                if (this.userInfo.is_cash == 0) {
                    otherAPI.toast('未开启提现功能', 'none', false, 1500);
                    return false;
                }
                if (Number(this.money) > Number(this.userInfo.hamount)) {
                    otherAPI.toast('提现最高金额不能大于' + this.userInfo.hamount + '元', 'none', false, 1500);
                    return false;
                }
                if (Number(this.money) < Number(this.userInfo.lamount)) {
                    otherAPI.toast('提现最低金额不能小于' + this.userInfo.lamount + '元', 'none', false, 1500);
                    return false;
                }
                let url = '/api/cash/add';
                let obj = {
                    token: uni.getStorageSync('data').token,
                    bank_name: this.blankList.array[this.blankList.index],
                    bank_card: this.accountNum,
                    card_user_name: this.name,
                    service: this.userInfo.service,
                    money: this.money
                }
                this.cashStatus = true;
                httpRequest_.post(url, obj).then(res => {
                    if (res.code == 1) {
                        this.money = '';
                        this.name = '';
                        this.accountNum = '';
                        this.moneyNum = Number(this.moneyNum) - Number(this.money);
                        otherAPI.toast(res.msg, 'none', false, 1500);
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 1500)
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                }, err => {
                    this.cashStatus = false;
                });
            },
            otherClick(url) {
                otherAPI.nav(url);
            },
            returnClick() {
                uni.navigateBack({
                    delta: 1
                })
            }
        }
    }
</script>

<style>
    page {
        width: 100%;
        height: 100%;
        background-color: #000000;
        
    }

    .body {
        background-color: #000000;
    }

    .extractBox {
        width: 694.44rpx;
        margin: 10rpx auto 0;
        background-color: #030f22;
        border-radius: 10rpx;
    }

    .accountName,
    .account,
    .blankName {
        height: 104.16rpx;
        width: 659.72rpx;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #dee1ef;
        font-size: 30.55rpx;
    }

    .accountName,
    .account {
        border-bottom: 0.69rpx solid #13234c;
    }

    .inputName,
    .blankAccount {
        width: 447.22rpx;
        text-align: right;
    }

    .placeClass {
        text-align: right;
        font-size: 30.55rpx;
    }

    .cashBox {
        width: 694.44rpx;
        margin: 20.13rpx auto;
        background-color: #030f22;
        border-radius: 15rpx;
        font-size: 30.55rpx;
    }

    .cashName,
    .cashAccount {
        margin: auto;
        width: 640rpx;
        padding: 32rpx 0;
        display: flex;
        justify-content: space-between;
    }

    .cashName {
        border-bottom: 0.69rpx solid rgb(229, 229, 229);
    }

    .cashNameInput,
    .cashAccountInput {
        width: 467.77rpx;
    }

    .withdrawalAmount {
        display: block;
        padding: 34.72rpx 0;
        font-size: 27.77rpx;
        color: #dee1ef;
    }

    .amount {
        padding-bottom: 15rpx;
        display: flex;
        flex-direction: row;
        border-bottom: 0.69rpx solid #13234c;
        position: relative;
    }

    .amountLogo {
        display: flex;
        align-items: flex-end;
        font-size: 60.27rpx;
        color: #dee1ef;
    }

    .money {
        position: absolute;
        left: 65rpx;
        bottom: 16rpx;
        font-size: 61.11rpx;
        color: #dee1ef;
    }

    .holderMoney {
        font-size: 27.77rpx;
        color: #4c5c85;
    }

    .amountTips {
        padding: 31.25rpx 0 52.08rpx 0;
        display: flex;
        justify-content: space-between;
        color: #4c5c85;
        font-size: 27.77rpx;
    }

    .allAmount {
        color: #68fffe;
        margin-left: 15rpx;
    }

    .btn {
        background-color: #0a1a3c;
        color: #4c5c85;
        font-size: 31.94rpx;
    }

    .extract {
        color: #eceaf8;
        background-color: #152c65;
    }
    
    .uni-picker{
        background-color: #000000;
        border-radius: 20rpx;
    }
    
</style>
