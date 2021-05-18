<!-- 公告详情 -->
<template>
    <view>
        <!-- head头部开始 -->
        <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" :headPosition="headPosition"
            :headBackground="headBackground" />
        <!-- head头部结束 -->
        <view class="detail">
            <view class="detail-title">
                <view class="title">
                    {{detail.operation_title}}
                </view>
                <view class="time">
                    {{detail.create_time}}
                </view>
            </view>
            <view class="jianJie">
                {{detail.operation_introduction}}
            </view>
            <view class="detail-content">
                <rich-text :nodes="detail.operation_content "></rich-text>
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
                    title: '通知详情',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#18191D',
                detail: {}
            }
        },
        //接收公告通知传递过来的参数
        onLoad(options) {
            this.id = options.id
            this.getDetail(options.id)
        },
        //接收公告通知传递过来的参数
        // onReady() {
        //      let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
        //      let curRoute = routes[routes.length - 1].route //获取当前页面路由
        //      let curParam = routes[routes.length - 1].options; //获取路由参数
        // },

        methods: {
            // 获取数据
            getDetail(id) {
                let url = `api/operation.notice/detail`;
                let obj = {
                    operation_id: id
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.detail = res.data.info
                    }
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
        background: #18191D;
    }

    .detail {
        padding: 30rpx;
        padding-top: 128rpx;
    }

    .detail .detail-title .title {
        color: #CCD0D5;
        font-size: 42rpx;
        font-weight: bold;
    }

    .detail .detail-title .time {
        color: #606267;
        font-size: 26rpx;
        margin-top: 45rpx;
    }

    /* 简介 */
    .jianJie {
        color: #C2C7CC;
        font-size: 37.5rpx;
        padding: 70rpx 0 35rpx;
        border-bottom: 1rpx solid #001b42;
        line-height: 60rpx;
    }

    /* 文本框 */
    .detail-content {
        line-height: 60rpx;
        margin-top: 37rpx;
        color: #C2C7CC;
    }
</style>
