<template>
    <view>
        <!-- tab栏开始 -->
        <view class="newHead">
                <Head :headTitle="headTitle" @otherClick="otherClick" :headReturn="headReturn" :newsIcon="newsIcon" :have='have' />
        </view>
        <!-- tab栏结束 -->
        <!-- 轮播图开始 -->
        <view class="lbtView">
            <swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
                <swiper-item v-for="item in bannerList" :key="item.index">
                    <image class="swiper-item" :src="item.image.file_path" mode=""></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- 轮播图结束 -->
        <!-- 用户数开始 -->
        <view :class="[{otherUserStatisticsClass:otherModel},'userStatistics']">
            <view class="userText">用户数</view>
            <view class="contennt">
                <view class="count">
                    <text class="countText">
                        累积总数
                    </text>
                    <text class="countNum">{{pointCountInfo.total_count}}</text>
                </view>
                <view class="userClass">
                    <view class="userClass_" @click="otherClick('/pages/list/node')">
						<view class="position">
							<view class="userClass_name">
							    <text>节点数 </text>
							    <text class="iconfont icon-you you"></text>
							</view>
							<text class="num">{{pointCountInfo.jie}}</text>
						</view>
                    </view>
                    <view class="userClass_" @click="otherClick('/pages/list/shop')">
                        <view class="position">
							<view class="userClass_name">
								<text>商家数 </text>
								<text class="iconfont icon-you you"></text>
							</view>
							<text class="num">{{pointCountInfo.business}}</text>
						</view>
                    </view>
                    <view class="userClass_" @click="otherClick('/pages/list/agent')">
                        <view class="position">
							<view class="userClass_name">
								<text>合伙人数 </text>
								<text class="iconfont icon-you you"></text>
							</view>
							<text class="num">{{pointCountInfo.partner}}</text>
						</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 用户数结束 -->
        <!-- 交易数开始 -->
        <view :class="[{otherTransactionClass:otherModel},'transaction']" @click="otherClick('/pages/index/myIncome')">
            <view class="transactionUserText">
                <!-- <text class="iconfont icon-tongji"></text> -->
                <text class="user">交易数</text>
            </view>
            <view class="total">
                <view class="GMV">
					<image class="jiaoyiImage" src="/static/gmvNew.png"></image>
                    <view class="total-content">
                        <text class="totalRevenue">
                            <text>GMV</text>
                        </text>
                        <text class="totalNum">{{pointBusCount.gmv | numFilter}}</text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 交易数结束 -->
        <!-- 总佣金/累计收入 -->
        <view class="yongJinAndShouRu">
            <view class="newcommission">
                <image class="Yimage" src="/static/zongyongjinNew.png"></image>
                <view class="total-content">
                    <text class="totalRevenue">
                        <text>总佣金</text>
                    </text>

                    <text class="totalNum newMoney">{{pointBusCount.total_money | numFilter}}</text>
                </view>
            </view>
            <view class="newcommission">
                <image class="Yimage" src="/static/leijishouruNew.png"></image>
                <view class="total-content">
                    <text class="totalRevenue">
                        <text>累计收入</text>
                    </text>
                    <text class="totalNum newMoney">{{pointBusCount.user_total_money | numFilter}}</text>
                </view>
            </view>
        </view>
        <!-- 量子推广图片 -->
       <view class="liangzi"  @click="closeMark" v-if="isLiangZi">
            <image src="../../static/liangzijiuchanNew.gif" mode=""></image>
        </view>
      <!--  <view class="tabBar">
                <view class="tabBar-item" @click="tabBarClick(0,'/pages/index/index')">
                    <image v-if="isTabBarActive==0" class='taBimage' src="../../static/shouye1.png" mode=""></image>
                    <image v-else class='taBimage' src="../../static/shouye.png" mode=""></image>
                    
                    <text>首页</text>
                </view>
                <view class="tabBar-item" @click="tabBarClick(1,'/pages/list/node')">
                  
                    <image v-if="isTabBarActive==1" class='taBimage' src="../../static/neican1.png" mode=""></image>
                      <image v-else class='taBimage' src="../../static/neican.png" mode=""></image>
                    <text>内参</text>
                </view>
                <view class="tabBar-item" @click="tabBarClick(2,'/pages/my/index')">
                   
                    <image v-if="isTabBarActive==2" class='taBimage' src="../../static/user1.png" mode=""></image>
                     <image v-else class='taBimage' src="../../static/user.png" mode=""></image>
                    <text>我的</text>
                </view>
        </view> -->
        <!-- 底部导航栏 -->


        <!-- 我要推广 -->
       <!-- <view @click="closeMark" class="extension"></view> -->
       <view class="extensionBox" v-show="isMark">
            <view class="text">
                量子纠缠
                <text class="iconfont icon-guanbi1" @click="closeMark"></text>
            </view>
            <view class="extensionClass">
                <text class="extensionClass_" @click="extensionClick('node')"><text class="iconfont icon-lianjie"></text>节点</text>
                <text class="extensionClass_" @click="extensionClick('shop')"><text class="iconfont icon-lianjie"></text>商家</text>
                <text class="extensionClass_" @click="extensionClick('agent')"><text class="iconfont icon-lianjie"></text>合伙人</text>
            </view>
        </view>
        <view class="mark" v-show="isMark" @click="closeMark"></view>
    </view>
</template>
<script>
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    import Head from '../common/headhome.vue'
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head               
                headTitle: {
                    title: '憨猴OS',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                newsIcon: {
                    color: '#FFFFFF',
                    icon: 'icon-wode',
                    size: '45rpx',
                    url: '/pages/news/list'
                },

                have: true,
                bannerList: [],
                pointCountInfo: [],
                pointBusCount: {},
                jiaPointBusCount: {
                    
					_GMV: 163333.00,
                    total_commission: 14584.00,
                    tatal_money: 1234567.00,
                    jie: 9000,
                    direct: 5000,
                    indirect: 5000
                },
                // 推广
                isMark: false,
                otherModel: false,
                isTabBarActive:0,
                //是否开启量子按钮
                isLiangZi:false,
            }
        },
        onLoad() {
            const data = uni.getStorageSync('data').token;
            
          this.judgePlatForm();

           
        },
        onShow() {
            const data = uni.getStorageSync('data').token
            if (data) {
                this.banner();
                this.getpointCount();
                this.getpointBusCount();
                // 获取是否有未读信息
                this.getMsg()
                if (uni.getSystemInfoSync().windowHeight > 680) {
                    this.otherModel = true
                }
            }
        },
      
        methods: {
            //判断手机型号
           judgePlatForm(){
               let platform=uni.getSystemInfoSync().platform
               if(platform=='ios'){
                    this.getData();
               }else if(platform=='android'){
                     // this.getData();
                     this.isLiangZi=true;
               }
           },
           getData() {
           	let url = '/api/user/generalize';
           	let obj = {
           		token: uni.getStorageSync('data').token
           	}
           	httpRequest_.post(url, obj).then(res => {
                if(res.data.data.content.status==1){
                    this.isLiangZi=true;
                }else{
                    this.isLiangZi=false;
                }
           	});
           },
            banner() {
               
                let url = `/api/user/slide`;
                let obj = {
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {        
                    this.bannerList = res.data.data
                })
            },
            getpointCount() {
                let url = `/api/user_relation/pointUserCount`;
                let obj = {
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {

                    if (res.code == 1) {
                        this.pointCountInfo = res.data
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            //这个接口是我的交易接口
            getpointBusCount() {
                let url = `/api/user_relation/gmv`;
                let obj = {
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.pointBusCount = res.data.data
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                });
            },
            closeMark() {
                this.isMark = !this.isMark;
            },
            extensionClick(param) {
                if (getApp().globalData.navStatus === true) {
                    return false
                }
                getApp().globalData.navStatus = true;
                uni.navigateTo({
                    url: '/pages/extension/index?param=' + param + '',
                    success: res => {
                        this.isMark = !this.isMark;
                        getApp().globalData.navStatus = false;
                    }
                });
            },
            otherClick(url) {
                otherAPI.nav(url);
            },
            getMsg() {
                let url = `/api/operation.message/message_type_one_show`;
                let obj = {
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.have = true
                    } else {
                        this.have = false
                    }
                });
            },
            //tabBar
            tabBarClick(active,url){
                this.isTabBarActive=active
                // otherAPI.nav(url);
            }
        }
    }
</script>
<style>
    @import url("../../pages/common/iconfont.css");

    page {
        width: 100%;
        height: 100%;
        background-color: #18191d;
        
    }

    /* newHead固定 */
    .newHead {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 128rpx;
        background-color: #18191d;
        z-index: 10000;
    }

    /* 轮播图 */
    .lbtView {
        width: 750rpx;
        height: 248rpx;
        margin: 158rpx auto 0;
    }

    .lbtView swiper {
        margin: 0 auto;
        width: 690rpx;
        height: 248rpx;
        border-radius: 10rpx;
        overflow: hidden;
    }

    .lbtView swiper image {
        width: 100%;
        height: 100%;

    }

    /* 用户数 */
    .userStatistics {
        width: 690rpx;
        margin: auto;
    }

    .userText {
        width: 100%;
        height: 70rpx;
		line-height: 70rpx;
        margin-top: 20rpx;
		color: #ececec;
		font-size: 34rpx;
		padding-left: 5rpx;
    }

    .contennt {
        width: 690rpx;
        height: 365rpx;
        background-image: url(../../static/userNew.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;

    }

    .icon-tongji {
        /* 用户数/交易数左边的图标大小[UI需求跟右边文字一样大] */
        font-size: 24rpx;
        color: #284289;
    }

    .count {
        height: 212rpx;
        display: flex;
        flex-direction: column;
        padding-left: 33rpx;
        box-sizing: border-box;
    }

    .count .countText {
        color: #959597;
        font-size: 28.17rpx;
        line-height: 26rpx;
        margin-top: 44rpx;

    }

    .count .countNum {
        color: #e4992d;
        font-size: 91.24rpx;
		font-weight: bold;
        display: inline-block;
        margin-top: 28rpx;
        line-height: 63rpx;
    }

    .userClass {
        margin: 0 auto;
        width: 646rpx;
        height: 152rpx;
        display: flex;
        justify-content: space-between;
        /* align-items: center; */
        text-align: center;
    }

    .userClass .userClass_ {
        flex: 1;
        font-size: 28.17rpx;
        color: #878788;
        margin-top: 0rpx;
    }
	
	.position{
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
	}

    .num {
        color: #d7d7d7;
        /* margin-left: -95rpx; */
		font-size: 36rpx;
    }

    .userClass_name {
        margin: 24rpx 0 20rpx;
    }

    .userClass_name .you {
        width: 0;
    }

    /* 交易数 */
    .transaction {
        width: 690rpx;
        margin: 0 auto;
    }

    .transactionUserText {
        width: 690rpx;
        height: 70rpx;
		line-height: 70rpx;
        margin-top: 20rpx;
		color: #ececec;
		font-size: 34rpx;
		padding-left: 5rpx;
    }

    .total {
        height: 187rpx;
        display: flex;
        flex-flow: column;
        padding-left: 32rpx;
        box-sizing: border-box;
        background-image: url(../../static/jiaoYiNew.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #959597;
        /* justify-content: center; */
    }

    .jiaoyiImage {
        width: 84rpx;
        height: 84rpx;
    }

    .total-content {
        margin-left: 24rpx;
    }

    .total .totalNum {
        color: #fff;
        font-size: 40.55rpx;
    }

    .GMV {
        display: inline-flex;
		height: 187rpx;
        align-items: center;
    }

    .totalRevenue {
        color: #959597;
        font-size: 28.17rpx;
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;
    }

    .totalRevenue .icon-you {
        width: 0;
        position: relative;
        top: 1.38rpx;
    }

    .transactionCount {
        width: 510.41rpx;
        line-height: 83.33rpx;
        margin: auto;
        color: #8691be;
        font-size: 27.77rpx;
    }

    .goldcoin {
        width: 32rpx;
        height: 32rpx;
        margin-right: 13.88rpx;
        vertical-align: -6rpx;
    }

    .transactionCountNumber {
        color: #e4992d;
        font-size: 34.72rpx;
        margin-left: 10.41rpx;
    }

    .transactionCountLine {
        height: 3rpx;
        background: linear-gradient(to right, #0d1e44, #2a477c, #0d1e44);
    }

    .incomeBox {
        width: 416.66rpx;
        height: 126.66rpx;
        margin: 10rpx auto;
        display: flex;
        flex-wrap: wrap;
    }

    .incomeBox .income_ {
        width: 50%;
        height: 28rpx;
        display: flex;
        justify-content: flex-start;
        font-size: 26rpx;
        color: #8691be;
        margin-bottom: 24rpx;
    }


    .extension {
        width: 750rpx;
        height: 180rpx;
        /* position: absolute;
        bottom: 50rpx;
        left: 50%;
        transform: translateX(-50%); */
        background-image: url(../../static/share.jpg) !important;
        background-size: 100% 100%;
        /* margin: 150rpx auto 100rpx; */
        margin: 100rpx auto 50rpx;
    }

    .extensionBox {
        width: 555.55rpx;
        height: 527.77rpx;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 199;
        background: rgba(33, 49, 106, 0.8);
        border: 4rpx solid #3e5f8e;
        border-radius: 10rpx;

    }

    .extensionBox .text {
        color: #e4e8f7;
        font-size: 41.66rpx;
        text-align: center;
        margin: 41.66rpx 0;
        position: relative;
    }

    .icon-guanbi1 {
        font-size: 35rpx;
        color: #9fb1f4;
        position: absolute;
        top: -20rpx;
        right: 20rpx;
    }

    .extensionClass {
        display: flex;
        flex-direction: column;
    }

    .extensionClass_ {
        margin: auto;
        width: 486.11rpx;
        line-height: 104.16rpx;
        text-align: center;
        display: block;
        background-color: #394b8f;
        margin-bottom: 20.83rpx;
        color: #9fb1f4;
        font-size: 34.72rpx;
    }

    .icon-lianjie {
        font-size: 35rpx;
        margin-right: 10rpx;
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

    .otherBannerCLass {
        height: 392rpx;
        background-image: url(../../static/banner1.jpg);
    }

    /* 佣金跟累计收入 */
    .yongJinAndShouRu {
        width: 690rpx;
        height: 188rpx;
        margin: 0 auto;
        display: flex;
        margin-top: 20rpx;
        margin-bottom: 175rpx;
        padding-bottom: 104rpx;  
		justify-content: space-between;
    }

    .newcommission {
        display: inline-flex;
        width: 334rpx;
        height: 188rpx;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
        border-radius: 10rpx !important;
        overflow: hidden;
        background-color: #212428;
    }

    .Yimage {
		width: 84rpx;
		height: 84rpx;
    }

    .newMoney {
        color: #fff;
        font-size: 40rpx;
    }

    /* 底部导航栏 */
  /*  .tabBar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 104rpx;
        background-color: #1c1d21;
        display: flex;
      

    }
    .tabBar-item{
         flex: 1;
         display: flex;       
         justify-content: center;
         align-items: center;
         flex-direction: column;
    }
    .taBimage{
       
        width: 46rpx;
        height: 44rpx;
    }
    .tabBar-item text{
        color: #ccc;
        font-size: 22.45rpx;
        margin-top: 10rpx;
    }
    */
	.liangzi{
       width: 130rpx;
       height: 130rpx;
       position: fixed;
       bottom:177rpx;
       right: 40rpx;
       z-index: 1111111;
	}
	.liangzi image{
       width: 100%;
       height: 100%;
	}
</style>
