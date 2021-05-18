<template>
    <view>
        <Head :headTitle="headTitle" :headBackground="headBackground" :headPosition="headPosition" :headReturn="headReturn"
            @returnClick="returnClick" />
        <view style="position: relative;top: 130rpx;">
            <block v-for="(item,index) in getcashList.data" :key="index">
                <view class="detailed_" v-if="item.service > 0">
                    <view class="detailed">
                        <view class="cashBox">
                            <text class="cashMoney">提现手续费 <text v-if="item.status.value == 30" class="fail">(失败)</text></text>
                            <text class="cashTime">{{item.create_time}}</text>
                        </view>
                        <text class="money">-{{item.service}}</text>
                    </view>
                </view>
                <view class="detailed_">
                    <view class="detailed">
                        <view class="cashBox">
                            <text class="cashMoney">余额提现 <text v-if="item.status.value == 30" class="fail">(失败)</text></text>
                            <text class="cashTime">{{item.create_time}}</text>
                        </view>
                        <text class="money">-{{item.money}}</text>
                    </view>
                    <text class="remark" v-if="item.status.value == 30">提现失败原因:{{item.remarks}}</text>
                </view>
            </block>
        </view>
        <view class="notSearchBox" v-if="isShow">
            <image class="notSearchImg" src="/static/not/notGet.png" mode=""></image>
            <text class="notSearchText" @click="returnClick">提现</text>
        </view>
    </view>
</template>

<script>
    import {
        httpRequest_,
        otherAPI
    } from '../common/API.js';
    import Head from '../common/head.vue'
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '提现明细',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000000',
                getcashList: [],
                isShow: false,
                page: 1,
                reachStatus: false
            }
        },
        onReady() {
            this.getcashlog();
        },
        methods: {
            getcashlog() {
                let url = '/api/cash/lists';
                let obj = {
                    page: this.page,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    let data = res.data.list;
                    if (res.code == 1) {
                        if (this.page > 1) {
                            if (data.data.length == 0) {
                                this.reachStatus = true;
                                return false
                            }
                            data.data.forEach(item => {
                                this.getcashList.data.push(item);
                            })
                        } else {
                            if (data.data.length == 0) {
                                this.isShow = true;
                                return false
                            }
                            this.getcashList = data;
                        }
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                })
            }
        },
        onReachBottom() {
            if (!this.reachStatus) {
                this.page++;
                this.getcashlog();
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

    .detailed_ {
        width: 694.44rpx;
        margin: auto;
        border-bottom: 0.69rpx solid #13234c;
        padding: 25rpx 0;
    }

    .detailed {
        width: 694.44rpx;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .cashBox {
        display: flex;
        flex-direction: column;
    }

    .cashMoney {
        color: #ebeced;
        font-size: 31.94rpx;
    }

    .fail {
        margin-left: 5rpx;
        color: #e29b1f;
    }

    .cashTime {
        margin-top: 10rpx;
        color: #46567d;
        font-size: 27.77rpx;
    }

    .money {
        color: #ebeced;
        font-size: 37.5rpx;
    }

    .notSearchBox {
        padding-top: 350rpx;
    }

    .notSearchImg {
        width: 416.66rpx;
        height: 416.66rpx;
        margin: auto;
        display: block;
    }

    .notSearchText {
        color: #999999;
        font-size: 30.55rpx;
        display: block;
        text-align: center;
    }

    .notSearchText {
        margin: auto;
        width: 208.33rpx;
        line-height: 83.33rpx;
        text-align: center;
        border-radius: 83.33rpx;
        border: 3rpx solid #5c8bd5;
        color: #5c8bd5;
        font-size: 34.72rpx;
    }

    .remark {
        color: #46567d;
        font-size: 27.77rpx;
    }
</style>
