<template>
    <view class="body">
        <Head style='top:0rpx' :headTitle="headTitle" :headOtherIcon="headOtherIcon" :headReturn="headReturn"
            :headPosition="headPosition" :headBackground='headBackground' @returnClick="returnClick" @otherClick="otherClick" />
        <view class="shopBottom">
            <view class="shopClass">
                <text :class="[actived==0?'active':'']" @click="activeClick('0')">直属商家</text>
                <text :class="[actived==1?'active':'']" @click="activeClick('1')">间接商家</text>
            </view>
        </view>
        <view style="position: relative;top: 215rpx;margin-bottom: 93.75rpx;">
            <block v-for="(item,index) in shopList.info">
                <!-- <view class="list" @click="closeMark(index)"> -->
                <view class="list">
                    <!-- <image class="consumerPhoto" :src="item.point_info.shop.shop_info && item.point_info.shop.shop_info.logo_file.file_path ? item.point_info.shop.shop_info.logo_file.file_path : '/static/headImg.png'" mode=""></image> -->
                    <image class="consumerPhoto" :src="item.logoimg" mode=""></image>
                    <view class="consumerDetail">
                        <view class="consumerDetail_">
                            <text>{{item.shopInfoName}}</text>
                            <view class="count">
                                <text>合伙人数：{{item.fans}}</text>
                            </view>
                        </view>
                        <!-- <text class="iconfont icon-you"></text> -->
                    </view>
                </view>
            </block>
        </view>
        <view class="bottom">
            <text v-if="actived == 0">直属商家： <text class="orange">{{shopList.count? shopList.count:0}}</text></text>
            <text v-if="actived == 1">间接商家： <text class="orange">{{shopList.count? shopList.count:0}}</text></text>
        </view>
        <view class="noList" v-if="isShow">
            <image class="noListImg" :src="actived == 0? '/static/not/shop.png' : '/static/not/indirectShop.png'" mode=""></image>
            <view class="invite" @click="invite" v-if="actived == 0">邀请</view>
        </view>
        <!-- <view class="extensionBox" v-show="isMark">
			<text class="iconfont icon-guanbi1" @click="closeMark()"></text>
			<view class="detail">
				<view class="detail_">
					<image class="detailPhoto" :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/headImg.png'" mode=""></image>
					<view class="detail_name">
						<text>{{userInfo.nickName ? userInfo.nickName : '暂无名称'}}</text>
						<view>
							<text class="inviteCode">邀请ID：{{userInfo.invite_code}}</text>
							<text class="iconfont icon-fuzhi" @click="copy"></text>
						</view>
					</view>
					<view class="profitBox">
						<view class="lastMongthProfit">
							<text>上月预估收益</text>
							<text class="profitMoney">￥{{handleNum(userInfo.month)}}</text>
						</view>
						<view class="totalProfit">
							<text>累计预估收益</text>
							<text class="profitMoney">￥{{handleNum(userInfo.total)}}</text>
						</view>
					</view>
				</view>
				<view class="time">
					注册时间：{{userInfo.create_time}}
				</view>
			</view>
		</view> -->
        <!-- <view class="mark" v-show="isMark" @click="closeMark()"></view> -->
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
                    title: '我的商家',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headOtherIcon: {
                    color: '#FFF',
                    icon: 'icon-sousuo',
                    size: '45rpx',
                    url: '/pages/list/search?id=shop'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000000',
                actived: 0,
                shopList: {},
                pages: 1,
                reachStatus: false,
                isShow: false,
                isMark: false,
                userInfo: [],
                isload: false, // 点击防抖
                //reachStatus:true 页面刷新防止滚动条触底事件加载page++
                reachStatus: true
            }
        },
        onReady() {
            this.getShop();
            this.getCount();

        },
        methods: {
            getCount() {

                let url = `/api/user_relation/pointUserCount`
                let obj = {
                    token: uni.getStorageSync('data').token,
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.headTitle.title = '我的商家(' + res.data.business + ')'
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            getShop() {
                let url = `/api/user_relation/businessDirect`
                let obj = {
                    token: uni.getStorageSync('data').token,
                    page: this.pages,
                    dataType: this.actived == 0 ? 10 : 20,
                    point_invite_code: 'JEQV1PS'
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let data = res.data
                        if (this.pages > 1) {
                            if (data.info.length == 0) {
                                this.reachStatus = true;
                                return false
                            } else {
                                data.info.forEach(item => {
                                    this.shopList.info.push(item);
                                })
                            }
                        } else {
                            //新添加的this.reachStatus = false;解决切换成另一个,滚动条不加载
                            this.reachStatus = false;
                            if (data.info.length == 0) {
                                this.isShow = true;
                                return false
                            }
                            this.shopList = data;                           
                            for (let i = 0; i < this.shopList.info.length; i++) {
                                let logo = this.shopList.info[i].point_info?.shop?.shop_info?.logo_file?.file_path || '/static/headImg.png'
                                this.shopList.info[i].logoimg = logo // 头像
                                this.shopList.info[i].shopInfoName = this.shopList.info[i].point_info?.shop?.shop_info?.name || '暂无名称'
                            }
                        }
                    } else {
                        this.isShow = true;
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
                this.isload = false
            },
            getUserInfo(userId) {
                let url = `/api/user_relation/getUserInfo`
                let obj = {
                    token: uni.getStorageSync('data').token,
                    user_id: userId
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.userInfo = res.data
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            activeClick(index) {
                if (this.isload == false) {
                    this.isload == true
                    // this.headPosition = index == 1 ? '' : 'fixed'
                    this.actived = index
                    this.pages = 1;
                    this.shopList = {};
                    this.isShow = false;
                    otherAPI.loading('加载中', true)
                    this.getShop();
                }
            },
            closeMark(index = '') {
                if (index !== '') {
                    this.getUserInfo(this.shopList.info[index].user_id)
                }
                this.isMark = !this.isMark;
            },
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            copy() {
                uni.setClipboardData({
                    data: this.userInfo.invite_code,
                    success: function() {
                        otherAPI.toast('复制成功', 'none', false, 1500)
                    }
                });
            },
            invite() {
                uni.navigateTo({
                    url: '/pages/extension/index?param=shop'
                });
            },
            otherClick(url) {
                uni.navigateTo({
                    url: url
                });
            },
            handleNum(num) {
                return Math.floor(num * 100) / 100
            }
        },
        onReachBottom() {         
            if (!this.reachStatus) {
                this.pages++;
                this.getShop();
            }
        }
    }
</script>

<style>
    page {
        width: 100%;
        /* height: 100%; */
        background-color: #000000;
    }

    .body {
        width: 100%;
        background-color: #000000;
        /* position: absolute; */
    }

    .shopBottom {
        width: 100%;
        position: fixed;
        top: 129.16rpx;
        border-bottom: 0.69rpx solid #14294b;
        z-index: 998;
        background-color: #000000;
    }

    .shopClass {
        display: flex;
        justify-content: space-between;
        width: 506.94rpx;
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

    .list {
        display: flex;
        flex-direction: row;
        width: 694.44rpx;
        margin: auto;
        padding: 30rpx 0;
    }

    .consumerPhoto {
        width: 112rpx;
        height: 104rpx;
        border-radius: 50%;
    }

    .consumerDetail {
        width: 611.11rpx;
        margin-left: 24.3rpx;
        color: #FFFFFF;
        font-size: 31.94rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .consumerDetail_ {
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .consumerDetail .count {
        display: flex;
        justify-content: space-between;
        width: 416.66rpx;
        font-size: 27.77rpx;
        color: #46567d;
    }

    .icon-you {
        color: #596a93;
        font-size: 37.77rpx;
    }

    .noList {
        width: 416.66rpx;
        position: relative;
        top: 350rpx;
        left: 50%;
        transform: translateX(-50%);
    }

    .noListImg {
        width: 416.66rpx;
        height: 416.66rpx;
    }

    .invite {
        margin: auto;
        width: 208.33rpx;
        line-height: 83.33rpx;
        text-align: center;
        border-radius: 83.33rpx;
        border: 3rpx solid #5c8bd5;
        color: #5c8bd5;
        font-size: 34.72rpx;
    }

    .extensionBox {
        width: 562.5rpx;
        height: 631.94rpx;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 199;
        background: rgba(33, 49, 106, 0.8);
        border: 4rpx solid #3e5f8e;
        border-radius: 10rpx;
    }

    .icon-guanbi1 {
        font-size: 35rpx;
        color: #9fb1f4;
        position: absolute;
        top: 20rpx;
        right: 20rpx;
    }

    .extensionBox .detail {
        width: 500rpx;
        height: 465.27rpx;
        background-color: #394b8f;
        margin: 125rpx auto 0;
    }

    .extensionBox .detail_ {
        margin: auto;
        width: 444.44rpx;
        height: 354.16rpx;
        border-bottom: 0.69rpx solid #31427d;
    }

    .extensionBox .detail_ .detailPhoto {
        border-radius: 50%;
        width: 145.83rpx;
        height: 145.83rpx;
        display: block;
        margin: auto;
        position: relative;
        top: -72.91rpx;
        border: 5rpx solid #5580bf;
    }

    .extensionBox .detail_ .detail_name {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        top: -52rpx;
        font-size: 37.5rpx;
        color: #ebeced;
    }

    .inviteCode {
        color: #9fb1f4;
        font-size: 27.77rpx;
    }

    .icon-fuzhi {
        color: #9fb1f4;
        font-size: 27.77rpx;
        margin-left: 16.94rpx;
    }

    .profitBox {
        height: 93.33rpx;
        display: flex;
        justify-content: space-between;
        position: relative;
        top: -20rpx;
    }

    .profitBox .lastMongthProfit,
    .profitBox .totalProfit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 27.77rpx;
        color: #9fb1f4;
    }

    .profitMoney {
        font-size: 37.5rpx;
        color: #68fffe;
    }

    .time {
        line-height: 111rpx;
        font-size: 27.77rpx;
        color: #9fb1f4;
        text-align: center;
    }

    .bottom {
        width: 100%;
        line-height: 93.75rpx;
        position: fixed;
        bottom: 0;
        text-align: center;
        background-color: #031124;
        z-index: 998;
        color: #ebeced;
        font-size: 31.94rpx;
        border-top: 0.69rpx solid #596a93;
    }

    .bottom .orange {
        color: #e4992d;
        font-weight: bold;
    }

    .mark {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #000308;
        opacity: .6;
        z-index: 99;
    }
</style>
