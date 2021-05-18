<!-- 消息列表 -->
<template>
    <view>
        <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" />
        <!-- 佣金通知 -->
        <view class="item" @click="toPage('/pages/news/commision')">
            <view class="mark">
                <image class="markImg" src='../../static/commission.png'></image>
                <view class='new' v-if="YJMsgNew == true"></view>
            </view>
            <view class="info">
                <view class="title">佣金通知</view>
                <view class='record'>{{YJMsg}}</view>
            </view>
            <text class="iconfont icon-you more"></text>
        </view>

        <!-- 邀请通知 -->
        <view class="item" @click="toPage('/pages/news/invite')">
            <view class="mark">
                <image class="markImg" src='../../static/invite.png'></image>
                <view class='new' v-if="YQMsgNew == true"></view>
            </view>
            <view class="info">
                <view class="title">邀请通知</view>
                <view class='record'>{{YQMsg}}</view>
            </view>
            <text class="iconfont icon-you more"></text>
        </view>

        <!-- 公告通知 -->
        <view class="item" @click="toPage('/pages/news/notice')">
            <view class="mark">
                <image class="markImg" src='../../static/gonggao.png'></image>
            </view>
            <view class="info">
                <view class="title">公告通知</view>
                <view class='record'>{{GGMsg}}</view>
            </view>
            <text class="iconfont icon-you more"></text>
        </view>
    </view>
</template>

<script>
    import Head from '../common/head.vue'
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '消息',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000',
                // 8-11 *gjq
                YJMsgNew: false,
                YJMsg: "还没有任何消息~",
                YQMsgNew: false,
                YQMsg: "还没有任何消息~",
                GGMsgNew: false,
                GGMsg: "还没有任何消息~",
                // 8-11 *gjq
            }
        },
        onShow() {
            // 页面请求 08-11 *gjq
            this.getPageData()
        },
        methods: {
            toPage(url) {
                otherAPI.nav(url);
            },

            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            // API METHODS 08-11 *gjq
            async getPageData() { // 最新通知请求
                let url = `/api/operation.message/message_type_one`;
                let obj = {
                    token: uni.getStorageSync('data').token
                    // msg_type: 1 // 1佣金通知， 2邀请通知
                }
                let newYJ = () => {
                    obj.msg_type = 1
                    httpRequest_.get(url, obj).then(res => {
                        if (res.code == 1) {
                            // 显示消息点
                            this.YJMsgNew = true
                            this.YJMsg = res.data.res.msg_content
                        } else {
                            this.YJMsgNew = false
                            YJList()
                        }
                    })
                }
                let newYQ = () => {
                    obj.msg_type = 2
                    httpRequest_.get(url, obj).then(res => {
                        if (res.code == 1) {
                            // 显示消息点
                            this.YQMsgNew = true
                            this.YQMsg = res.data.res.msg_content
                        } else {
                            this.YQMsgNew = false
                            YQList()
                        }
                    })
                }

                let newGG = () => { // 最新公告请求
                    let url = `/api/operation.notice/new_one`;
                    // let obj = {
                    //     token: uni.getStorageSync('data').token,
                    // }
                    httpRequest_.get(url, obj).then(res => {
                        if (res.code == 1) {
                            this.GGMsg = res.data.res.operation_introduction
                        }
                    })
                }
                await newYJ()
                await newYQ()
                await newGG()

                // 08-14
                let YJList = () => {
                    let url = `/api/operation.message/get_message`;
                    let obj = {
                        token: uni.getStorageSync('data').token,
                        msg_type: 1 // 1 佣金通知
                    }
                    httpRequest_.get(url, obj).then(res => {
                        if (res.code == 1) {
                            this.YJMsg = res?.data?.lists?.data[0]?.msg_content || this.YJMsg 
                        }
                    })
                }
                let YQList = () => {
                    let url = `/api/operation.message/get_message`;
                    let obj = {
                        token: uni.getStorageSync('data').token,
                        msg_type: 2 // 1 佣金通知
                    }
                    httpRequest_.get(url, obj).then(res => {
                        if (res.code == 1) {
                            this.YQMsg = res?.data?.lists?.data[0]?.msg_content || this.YQMsg
                        }
                    })
                }
            },
        }
    }
</script>

<style>
    page {
        background: #18191d;
    }

    .item {
        width: 690rpx;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        margin: 45rpx auto 0;
        align-items: center;

    }

    .mark {
        width: 100rpx;
        height: 100rpx;
        position: relative;
    }

    .markImg {
        width: 100rpx;
        height: 100rpx;
    }

    .new {
        position: absolute;
        top: 0;
        left: 76rpx;
        width: 20rpx;
        height: 20rpx;
        border: 5rpx solid #000;
        background: #ffd111;
        border-radius: 20rpx;
    }

    .info {
        width: 510rpx;
        height: 100rpx;
        display: inline-flex;
        justify-content: space-around;
        flex-direction: column;
    }

    .title {
        color: #c9ced4;
        font-size: 30rpx;
    }

    .record {
        color: #6b7177;
        font-size: 26rpx;
        width: 510rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
    }

    .more {
        color: #797b7e;
    }
</style>
