<template>
    <view>
        <Head :headTitle="headTitle" :headPosition="headPosition" :headBackground="headBackground" :headReturn="headReturn"
            @returnClick="returnClick" />
        <!-- 佣金通知 -->
        <view class='boxshow'>
            <block v-if='data.length > 0'>
                <view class="item" v-for="(i, index) in data" :key='index'>
                    <view class="info">{{i.msg_content}}</view>
                    <view class="show">推广类型：<text v-if="i.type == 1">节点</text><text v-if="i.type == 10">商家</text><text
                            v-if="i.type == 20">合伙人</text></view>
                    <view class='show'>推广金额：<text>￥{{i.amount}}</text></view>
                    <view class='show'>获得返利：<text>￥{{i.commission}}</text></view>
                </view>
            </block>

            <!-- 无通知 -->
            <view class="nullMsg" v-else>
                <image class="yjmsgnot" src="../../static/yjmsgnot.png" mode=""></image>
            </view>
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
                    title: '佣金通知',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#18191D',
                data: [],
                current_page: 1,
                last_page: 1
            }
        },
        onShow() {
            this.getPageData()
        },
        methods: {
            // API METHODS 08-11 *gjq
            getPageData() {
                let url = `/api/operation.message/get_message`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    msg_type: 1, // 1 佣金通知
                    page: this.current_page
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let newArr = res.data.lists.data
                        if (this.current_page == 1) {
                            this.data = res.data.lists.data
                            this.current_page = res.data.lists.current_page
                            this.last_page = res.data.lists.last_page
                        } else {
                            this.data = this.data.concat(newArr)
                            this.last_page = res.data.lists.last_page
                        }

                        if (res.data.lists.data.length > 0) {
                            // 发送已读
                            this.readMsg()
                        }
                    }
                })
            },
            readMsg() {
                let url = `/api/operation.message/type_reade`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    msg_type: 1 // 1 佣金通知
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {}
                })
            },
            //^  API METHODS 08-11 *gjq


            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },

        },

        // 到底触发
        onReachBottom: function() {
            if (this.current_page >= this.last_page) {
                uni.showToast({
                    title: "没有更多数据了",
                    icon: 'none',
                })
            } else {
                this.current_page++
                this.getPageData()
            }
        },
    }
</script>

<style>
    page {
        background-color: #18191D;
    }

    .boxshow {
        padding: 130rpx 0 30rpx;
    }

    .item {
        box-sizing: border-box;
        width: 690rpx;
        margin: 20rpx auto 0;
        border-radius: 4rpx;
        padding: 40rpx;
        background: #212428;
    }

    .info {
        color: #ebeced;
        font-size: 30rpx;
    }

    .show {
        font-size: 26rpx;
        color: #6b7177;
        margin-top: 20rpx;
    }

    /* 08-11  */
    .nullMsg {
        font-size: 26rpx;
        text-align: center;
    }

    .yjmsgnot {
        width: 416.66rpx;
        height: 416.66rpx;
        margin: auto;
        display: block;
        margin-top: 208rpx;
    }
</style>
