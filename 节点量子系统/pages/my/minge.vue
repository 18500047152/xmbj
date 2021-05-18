<!-- 赠送名额详情 -->
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
                <text :class="[actived==0?'active':'']" @click="activeClick('0','1')">商家赠送名额</text>
                <text :class="[actived==1?'active':'']" @click="activeClick('1','2')">合伙人赠送名额</text>
            </view>
        </view>
        <!-- tab栏切换结束 -->
        <!-- 商家赠送名额数量开始 -->
        <view class="newMarginTop">
            <block v-if="actived==0?true:false">
                <view class="shopGive">
                    <view class="shopGive-title">
                        <view class="allNum">
                            商家赠送总名额：{{shopTotalCode}}个
                        </view>
                        <view class="surplusNum">
                            还剩<text class="surplus-num">{{shopResidue}}</text>个
                        </view>
                    </view>
                    <view class="shopGive-content" v-for="(item2,index2) in shopList" :key='index2'>
                        <view class="contentNum">
                            <text class="user">【{{item2.mobile}}】</text>于<text class="time" decode>{{item2.update_time}}</text>已使用</view>
                    </view>
                </view>
            </block>
            <!-- 商家赠送名额数量结束 -->
            <!-- 合伙人赠送名额数量开始 -->
            <block v-if="actived==1?true:false">
                <view class="shopGive">
                    <view class="shopGive-title">
                        <view class="allNum">
                            合伙人赠送总名额：{{agentTotalCode}}个
                        </view>
                        <view class="surplusNum">
                            还剩<text class="surplus-num">{{agentResidue}}</text>个
                        </view>
                    </view>
                    <view class="shopGive-content" v-for="(item2,index2) in agentList" :key='index2'>
                        <view class="contentNum">
                            <text class="user">【{{item2.mobile}}】</text>于<text class="time" decode>{{item2.update_time}}</text>已使用
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <!-- 合伙人赠送名额数量结束 -->
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
                    title: '赠送商家/合伙人使用情况',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                //tab栏
                actived: 0,
                //控制发送ajax商家赠送/合伙人赠送[1是商家,2是合伙人]
                type: 1,
                //商家赠送名额数据
                shopList: [],
                //商家赠送总名额
                shopTotalCode: '',
                //商家还剩多少名额
                shopResidue: '',
                //合伙人赠送名额数据
                agentList: [],
                //商家赠送总名额
                agentTotalCode: '',
                //商家还剩多少名额
                agentResidue: '',
                //商家总页数
                shopLastPage: '',
                //商家当前页数
                shopPage: 1,
                //合伙人总页数
                agentLastPage: '',
                //合伙人当前页数
                agentPage: 1,
            }
        },
        onShow() {
            //token值
            const data = uni.getStorageSync('data').token
            let type = this.type;
            //请求商家/合伙人数据
            this.getShareCodeUse(1, 1);
        },
        //赠送商家/合伙人滚动条触底事件
        onReachBottom() {
            //获取商家赠送名额
            if (this.type == 1) {
                if (this.shopLastPage - this.shopPage < 1) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.shopPage++;
                    //积分滚动条触底发送ajax        
                    this.getShareCodeUse(1, this.shopPage)
                }
            } else if (this.type == 2) {
                if (this.agentLastPage - this.agentPage < 1) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.agentPage++;
                    //转入滚动条触底发送ajax        
                    this.getShareCodeUse(2, this.agentPage)
                }
            }
        },
        methods: {
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            //商家/合伙人赠送使用情况
            getShareCodeUse(type, page) {
                let url = `/api/user_relation/share_code_use`;
                let obj = {
                    type: type,
                    page: page,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (this.type == 1) {
                        if (this.shopPage == 1) {
                            //商家赠送名额数据
                            this.shopList = res.data.data;
                            //商家赠送总名额
                            this.shopTotalCode = res.data.total_code;
                            //商家剩余名额
                            this.shopResidue = res.data.residue;
                            //商家总页数
                            this.shopLastPage = res.data.last_page;

                        } else {
                            //商家赠送名额数据                        
                            this.shopList = this.shopList.concat(res.data.data)
                            //商家赠送总名额
                            this.shopTotalCode = res.data.total_code;
                            //商家剩余名额
                            this.shopResidue = res.data.residue;
                            //商家总页数
                            this.shopLastPage = res.data.last_page;
                        }
                    } else {
                        if (this.agentPage == 1) {
                            //合伙人赠送名额数据
                            this.agentList = res.data.data;
                            //合伙人赠送总名额
                            this.agentTotalCode = res.data.total_code;
                            //合伙人剩余名额
                            this.agentResidue = res.data.residue;
                            //合伙人总页数
                            this.agentLastPage = res.data.last_page;

                        } else {
                            //商家赠送名额数据
                            this.agentList = this.agentList.concat(res.data.data)
                            //商家赠送总名额
                            this.agentTotalCode = res.data.total_code;
                            //商家剩余名额
                            this.agentResidue = res.data.residue;
                            //商家总页数
                            this.agentLastPage = res.data.last_page;
                        }
                    }
                });
            },
            //tob栏
            activeClick(index, type) {
                this.actived = index;
                this.type = type;
                //获取页数              
                // this.shopList=[],
                // this.agentList=[],      
                this.shopPage = 1
                this.agentPage = 1
                this.getShareCodeUse(type, 1)
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

    /* tab栏 */
    .shopBottom {
        width: 100%;
        position: fixed;
        /* top: 129.16rpx; */
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

    /* tab栏 */
    .shopGive {
        width: 630rpx;
        background-color: #09162f;
        margin: 23rpx 30rpx;
        padding: 0 30rpx 3rpx;
        border-radius: 10rpx;
    }

    /* 标题样式 */
    .shopGive-title {
        height: 100rpx;
        line-height: 100rpx;
        display: flex;
        justify-content: space-between;
        color: #ebeced;
        font-size: 30rpx;
        border-bottom: 1rpx solid #13234c;

    }

    .surplus-num {
        color: #e1972d;
    }

    /* 内容样式 */
    .contentNum {
        font-size: 26rpx;
        margin: 33rpx 0;
        color: #46567d;

    }

    .shopGive-content .contentNum .user {
        color: #5c8bd5;
    }

    .time {
        margin-right: 12rpx;
    }

    /* 商家赠送名额为0 */
    .lingNum {
        width: 630rpx;
        background-color: #09162f;
        margin: 23rpx 30rpx;
        padding: 0 30rpx;
        height: 100rpx;
        line-height: 100rpx;
        font-size: 30rpx;
        color: #ebeced;
        border-radius: 10rpx;
    }

    .newMarginTop {
        padding-top: 220rpx;
    }
</style>
