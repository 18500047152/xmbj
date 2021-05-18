<!-- 可用积分 -->
<template>
    <view>
        <!-- head头部开始 -->
        <view class="newHead">
            <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" />
        </view>
        <!-- head头部结束 -->
        <!-- tab栏切换开始 -->
        <view class="shopBottom">
            <view class="shopClass">
                <text :class="[actived==0?'active':'']" @click="activeClick('0','10')">积分记录</text>
                <text :class="[actived==1?'active':'']" @click="activeClick('1','20')">转入记录</text>
                <text :class="[actived==2?'active':'']" @click="activeClick('2','30')">赠出记录</text>
            </view>
        </view>
        <!-- tab栏切换结束 -->
        <view class="newMarginTop">
            <!-- 积分记录开始 -->
            <block v-if="actived==0?true:false">
                <view class="Integral-record" v-for='(item,index) in IntegralRecord' :key="index">
                    <view class="Integral-record-title">
                        {{item.memo}}
                    </view>
                    <!-- <view class="Integral-record-title" v-if='!item.mobile'>
                        开通节点，获得<text class="scope">{{item.score}}</text>积分
                    </view>
                    <view class="Integral-record-title" v-else>
                        邀请【{{item.mobile}}】成为{{item.user_type == 1 ? '节点' : item.user_type == 10 ? '商家' : '合伙人'}}，获得<text class="scope">{{item.score}}</text>积分
                    </view> -->
                    <view class="Integral-record-content">
                        <text class="time">{{item.create_time}}</text>
                    </view>
                </view>

                <!-- 数量为0时,显示图片 -->
                <image class="wsjImg" src="../../static/jifen.png" mode="widthFix" v-if="Object.keys(IntegralRecord).length == 0"></image>
            </block>
            <!-- 积分记录结束 -->
            <!-- 转入记录开始 -->
            <block v-if="actived==1?true:false">
                <view class="Transfer-record" v-for='(item,index) in TransferRecord' :key="index">
                    <view class="Transfer-record-title">
                        <text class="yqId">节点ID：{{item.relation_user_id}}</text>
                        <view>
                            转入<text class="content in">+{{item.score}}</text>积分
                        </view>
                    </view>
                    <view class="Transfer-record-content">
                        <text class="user">{{item.mobile}}</text>
                        <text class="time">{{item.create_time}}</text>
                    </view>
                </view>
                <!-- 数量为0时,显示图片 -->
                <image class="wsjImg" src="../../static/jifen.png" mode="widthFix" v-if="Object.keys(TransferRecord).length == 0"></image>
            </block>
            <!-- 转入记录结束 -->
            <!-- 赠出记录开始 -->
            <block v-if="actived == 2 ? true : false">
                <view class="Donation-record" v-for='(item,index) in DonationRecord' :key="index">
                    <view class="Donation-record-title">
                        <text class="yqId">节点ID：{{item.relation_user_id}}</text>
                        <view>
                            赠出<text class="content out">-{{item.score}}</text>积分
                        </view>
                    </view>
                    <view class="Donation-record-content">
                        <text class="user">{{item.mobile}}</text>
                        <text class="time">{{item.create_time}}</text>
                    </view>
                </view>
                <!-- 数量为0时,显示图片 -->
                <image class="wsjImg" src="../../static/jifen.png" mode="widthFix" v-if="Object.keys(DonationRecord).length == 0"></image>
            </block>
        </view>
        <!-- 赠出记录结束 -->
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
                    title: '可用积分',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                //固定导航栏
                headPosition: 'fixed',
                //tab栏
                actived: 0,
                //控制发送ajax积分/转入/赠出
                type: 10,
                //积分记录数据
                IntegralRecord: [],
                //积分记录页数
                IntegralPage: 1,
                //积分记录总页数
                IntegralLastPage: '',
                //转入记录数据
                TransferRecord: [],
                //转入记录页数
                TransferPage: 1,
                //转入记录总页数
                TransferLastPage: '',
                //赠出记录数据
                DonationRecord: [],
                //赠出记录页数
                DonationPage: 1,
                //赠出记录总页数
                DonationLastPage: '',
            }
        },

        //页面加载完毕
        onShow() {
            //token值
            const data = uni.getStorageSync('data').token
            //获取type值
            let type = this.type
            //获取页面加载默认加载1页数据
            this.getLists(type, 1)
        },
        onReachBottom() {
            //获取积分记录
            if (this.type == 10) {
                if (this.IntegralLastPage - this.IntegralPage < 1) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.TransferPage++;
                    //积分滚动条触底发送ajax        
                    this.getLists(10, this.TransferPage)
                }
            } else if (this.type == 20) {
                if (this.TransferLastPage - this.TransferPage < 1) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.TransferPage++;
                    //转入滚动条触底发送ajax        
                    this.getLists(20, this.TransferPage)
                }
            } else if (this.type == 30) {
                if (this.DonationLastPage - this.DonationPage < 1) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.DonationPage++;
                    //赠出滚动条触底发送ajax        
                    this.getLists(30, this.DonationPage)
                }
            }
        },
        methods: {
            //积分记录/转入/赠出接口
            getLists(type, page) {
                let url = `api/user.score_change/lists`;
                let obj = {
                    type: type,
                    page: page,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    //获取的是积分记录数据
                    if (this.type == 10) {
                        if (this.IntegralPage == 1) {
                            //获取转入记录数据
                            this.IntegralRecord = res.data.list.data
                            //获取转入记录总页数
                            this.IntegralLastPage = res.data.list.last_page
                        } else {
                            this.IntegralRecord = this.IntegralRecord.concat(res.data.list.data)
                            this.IntegralLastPage = res.data.list.last_page
                        }
                    } else if (this.type == 20) {
                        if (this.TransferPage == 1) {
                            //获取转入记录数据
                            this.TransferRecord = res.data.list.data
                            //获取转入记录总页数
                            this.TransferLastPage = res.data.list.last_page
                        } else {
                            this.TransferRecord = this.TransferRecord.concat(res.data.list.data)
                            this.TransferLastPage = res.data.list.last_page
                        }
                    } else if (this.type == 30) {
                        if (this.DonationPage == 1) {
                            //获取赠出记录总数据
                            this.DonationRecord = res.data.list.data
                            //获取赠出记录总页数
                            this.DonationLastPage = res.data.list.last_page
                        } else {
                            this.DonationRecord = this.DonationRecord.concat(res.data.list.data)
                            this.DonationLastPage = res.data.list.last_page
                        }
                    }
                })
            },

            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            //tob栏
            activeClick(index, type) {
                // this.headPosition = index == 1 ? '' : 'fixed'
                //通过index索引值,进行切换
                this.actived = index;
                this.type = type;
                //获取页数
                this.IntegralPage = 1
                this.TransferPage = 1
                this.DonationLastPage = 1
                this.getLists(type, 1)
            },
        }
    }
</script>

<style>
    page {
        background: #000B1D;
    }

    /* newHead固定 */
    .newHead {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 128rpx;
        background-color: #000b1b;
        z-index: 10000;
    }

    .shopBottom {
        width: 100%;
        position: fixed;
        /* top: 0; */
        border-bottom: 0.69rpx solid #14294b;
        z-index: 998;
        background-color: #000b1b;
        padding-top: 128rpx;
    }

    .shopClass {
        display: flex;
        justify-content: space-between;
        width: 610rpx;
        margin: auto;
        color: #46567d;
        font-size: 31.94rpx;
    }

    .shopClass text {
        padding: 25rpx 0;
    }

    .shopClass .active {
        color: #FFF;
        position: relative;
    }

    .shopClass .active::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2.77rpx;
        background-color: #e4992d;
    }

    /* 积分记录样式 */
    .Integral-record {
        width: 630rpx;
        background-color: #09162f;
        margin: 20rpx 30rpx;
        padding: 20rpx 30rpx;
        border-radius: 10rpx;
        color: #ebeced;
        font-size: 28rpx;
    }

    .Integral-record-title {
        line-height: 50rpx;
    }

    .Integral-record-content {
        height: 50rpx;
        line-height: 50rpx;
    }

    .text-color {
        color: #e1972d;
    }

    .Integral-record-content,
    .Transfer-record-content,
    .Donation-record-content {
        color: #384660;
    }

    /* 转入记录 */
    .Transfer-record {
        width: 630rpx;
        background-color: #09162f;
        margin: 20rpx 30rpx;
        padding: 0 30rpx;
        border-radius: 10rpx;
        color: #ebeced;
        font-size: 28rpx;
    }

    .Transfer-record-title {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1rpx solid #13234c;
        display: flex;
        justify-content: space-between;
    }

    .in {
        color: #e4992d;
        margin: 0 10rpx;
    }

    .Transfer-record-content {
        height: 99rpx;
        line-height: 99rpx;
        display: flex;
        justify-content: space-between;

    }

    /* 赠出记录DonationRecord */
    .Donation-record {
        width: 630rpx;
        background-color: #09162f;
        margin: 20rpx 30rpx;
        padding: 0 30rpx;
        border-radius: 10rpx;
        color: #ebeced;
        font-size: 28rpx;
    }

    .Donation-record-title {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1rpx solid #13234c;
        display: flex;
        justify-content: space-between;
    }

    .out {
        color: #29c0cd;
        margin: 0 10rpx;
    }

    .Donation-record-content {
        height: 99rpx;
        line-height: 99rpx;
        display: flex;
        justify-content: space-between;
    }

    /* image图片 */
    image {
        width: 100%;
    }

    .wsjImg {
        width: 416.66rpx;
        height: 416.66rpx;
        margin: auto;
        display: block;
        margin-top: 226rpx;
    }

    .newMarginTop {
        padding-top: 220rpx;
    }

    .scope {
        color: #e4992d;
        margin: 0 5rpx;
    }
</style>
