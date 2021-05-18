<template>
    <view>
        <!-- <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" /> -->
        <Head :headTitle="headTitle"  />
        <view class="myBorder">
            <view class="myInfo">
                <image class="myImg" src="/static/morentouxiangNew.png" mode=""></image>
                <view class="myBox">
                    <text class="myName">{{name}}</text>
                    <view class="myOther">
                        <view class="myPhone">
                            <!-- <text class="iconfont icon-shouji1"></text> -->
                            <text>手机号 {{phone}}</text>
                        </view>
                        <text class="myCode">邀请码 {{code}}</text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 佣金提现/可用积分 -->
        <view class="tiXianAndJiFen">
            <view class="tixianjifen" @click="navClick('/pages/withdraw/withdrawMoney')">
                <view class="total-content">
                    <text class="totalRevenue">
                        <text>佣金提现</text>
                    </text>
                    <text class="newMoney">{{user.money}}</text>
                </view>
            </view>
            <view class="tixianjifen" @click="navClick('/pages/my/point')">
                <view class="total-content">
                    <text class="totalRevenue">
                        <text class="newColor">可用积分</text>
                    </text>
                    <text class="newMoney">{{user.score}}</text>
                </view>
            </view>
        </view>
        <!-- <view class="rectangle commission" @click="navClick('/pages/withdraw/withdrawMoney')">
            <view class="ticon">
                <image class="iconimg" src='../../static/commision.png'></image>
                <text>佣金提现</text>
            </view>
            <view>
                <text class="num">{{user.money}}</text>
                <text class="iconfont icon-you"></text>
            </view>
        </view>

        <view class="rectangle commission" @click="navClick('/pages/my/point')">
            <view class="ticon">
                <image class="iconimg" src='../../static/point.png'></image>
                <text>可用积分</text>
            </view>
            <view>
                <text class="num">{{user.score}}</text>
                <text class="iconfont icon-you"></text>
            </view>
        </view>
 -->
 <!-- 转赠积分跟收藏客服 -->
    <view class="zhuanZengAndShouCang">
        <view class='zhuangZeng-item' @click="navClick('/pages/my/give')">
            <image src='../../static/zhuanzengjifenNew.png'></image>
            <text>转赠积分</text>
        </view>
        <view class='zhuangZeng-item'>
            <image src='../../static/shoucang2New.png' @click="navClick('/pages/my/operate')"></image>
            <text>赞/收藏</text>
        </view>
        <view class='zhuangZeng-item'>
            <image src='../../static/wodekefu2New.png' @click="navClick('/pages/my/service')"></image>
            <text>我的客服</text>
        </view>
    </view>
 
       <!-- <view class="rectangle commission" @click="navClick('/pages/my/give')">
            <view class="ticon">
                <image class="iconimg" src='../../static/zeng.png'></image>
                <text>转赠积分</text>
            </view>
            <view>
                <text class="iconfont icon-you"></text>
            </view>
        </view> -->
		<view class="rectangle">
			<view class="commission" @click="navClick('/pages/my/minge')">
			    <view class="ticon">
			        <image class="iconimg" src='../../static/jifenshiyongqingkuang.png'></image>
			        <text>赠送商家/合伙人使用情况</text>
			    </view>
			    <view>
			        <text class="iconfont icon-you"></text>
			    </view>
			</view>
			<view class="commission" @click="navClick('content?type=20')">
			    <view class="ticon">
			        <image class="iconimg" src='../../static/xieyi.png'></image>
			        <text>用户协议</text>
			    </view>
			    <view>
			        <text class="iconfont icon-you"></text>
			    </view>
			</view>
			<view class="commission" @click="navClick('content?type=10')">
			    <view class="ticon">
			        <image class="iconimg" src='../../static/yinsi.png'></image>
			        <text>隐私政策</text>
			    </view>
			    <view>
			        <text class="iconfont icon-you"></text>
			    </view>
			</view>
		</view>
        

        <view class="logout" @click="clickMark">
            退出
        </view>
        <view class="logoutBox" :animation="animationData">
            <view class="tips_">
                <text class="tipsText">退出后不会删除该任何历史数据，下次登录依然可以使用本账号</text>
                <text class="logoutText" @click="logout">退出账户</text>
            </view>
            <text class="cancel" @click="clickMark">取消</text>
        </view>
        <view class="mark" v-if="isShow" @click="clickMark"></view>
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
                    title: '个人中心',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                info: [],
                animation: '',
                animationData: '',
                isShow: false,
                user: {}
            }
        },
        onShow() {
            // 获取用户信息（积分需要实时获取）
            this.getUser()
            // getApp().globalData.navStatus = false
        },
        onReady() {
            this.info = uni.getStorageSync('data').user_id;
            this.animation = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            })
        },
        computed: {
            name() {
                if (this.info) {
                    return this.info.username
                }
            },
            phone() {
                if (this.info) {
                    return this.info.phone
                    //	return this.info.phone
                }
            },
            code() {
                if (this.info) {
                    return this.info.my_code
                }
            },
            //佣金提现
            money() {
                if (this.info) {
                    return this.info.money
                }
            },
            //可用积分
            score() {
                if (this.info) {
                    return this.info.score
                }
            },
        },
        watch: {
            isShow(newValue, oldValue) {
                if (newValue == true) {
                    this.animation.translateY(-uni.upx2px(340)).step()
                    this.animationData = this.animation.export()
                } else {
                    this.animation.translateY(uni.upx2px(340)).step()
                    this.animationData = this.animation.export()
                }
            }
        },
        methods: {
            logout() {
                this.isShow = !this.isShow
                uni.setStorageSync('data', '');
                uni.setStorageSync('phone', this.info.phone);
                otherAPI.toast('退出成功', 'none', false, 1500)
                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/login/login'
                    });
                }, 1500)
            },
            clickMark() {
                this.isShow = !this.isShow
            },
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            navClick(url) {
                otherAPI.nav(url);
            },

            // 获取用户数据
            getUser() {
                let url = `api/user/get_user_id`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    user_id: uni.getStorageSync('data').user_id.user_id,
                }
                httpRequest_.get(url, obj).then(res => {
                    this.user = res.data.userInfo
                });
            }
        },
    }
</script>

<style>
    page {
        width: 100%;
        height: 100%;
       background: url(../../static/myindexbjNew2.jpg);
        background-size: 100% 600rpx;
        background-repeat: no-repeat;
        background-color: #18191D;
    }

    .myBorder {
        margin: auto;
        width: 690rpx;
        height: 210rpx;
    }

    .myInfo {
        /* width: 610rpx; */
        height: 145rpx;
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        top: 30rpx;
    }

    .myInfo .myImg {
        width: 146rpx;
        height: 146rpx;
    }

    .myBox {
        height: 100rpx;
        width: 480rpx;
        margin-left: 25rpx;
        display: flex;
        justify-content: space-between;

        flex-direction: column;
    }

    .myName {
        color: #ffffff;
        font-size: 36rpx;

    }

    .myOther {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #ccc;
        font-size: 26rpx;

    }

    .icon-shouji1 {
        font-size: 26rpx;
        position: relative;
        top: 2rpx;
    }

    .sesameSeed {
        width: 575rpx;
        height: 130rpx;
        margin: 10rpx auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #a4b4d7;
        font-size: 24rpx;
    }

    .icon-jifenguizeguankong {
        color: #6571a8;
    }

    .seedText {
        margin-left: 15rpx;
        font-size: 26rpx;
    }

    .seedNum {
        font-size: 40rpx;
    }

    .rectangle {
        margin: auto;
        width: 690rpx;
        background-color: #212428;
        color: #FFFFFF;
    }

    .commission {
        width: 630rpx;
		margin: 0 auto;
		height: 120rpx;
		border-bottom: 1px solid #292c30;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        color: #fff;

    }
	.commission:last-child{
		border: none;
	}
	.ticon{
		display: inline-flex;
		align-items: center;
	}
    .iconimg {
        width: 34rpx;
        height: 34rpx;
        margin-right: 20rpx;
    }

    .num {
        color: #29c0cd;
        margin-right: 10rpx;
    }

    .logout {
		height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30rpx;
		margin: 20rpx auto 0;
		width: 690rpx;
		background-color: #212428;
		color: #FFFFFF;
    }

    .logoutBox {
        position: fixed;
        bottom: -340rpx;
        left: 10rpx;
        width: 730rpx;
        height: 340rpx;
        background-color: #FFF;
        z-index: 100;
        border-radius: 15rpx 15rpx 0 0;
    }

    .logoutBox .tips_ text {
        display: block;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30rpx;
    }

    .logoutBox .cancel {
        border-top: 10rpx solid #c7c7c8;
        display: block;
        height: 100rpx;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34rpx;
    }

    .tipsText {
        height: 120rpx;
        padding: 0 60rpx;
        color: #666;
        border-bottom: 0.69rpx solid #c7c7c8;
    }

    .logoutText {
        height: 100rpx;
        font-size: 36rpx;
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

    /* 新的佣金提现积分 */
    .tiXianAndJiFen {
        width: 690rpx;
        height: 140rpx;
        margin: auto;
        color: #fff;
        display: flex;
        justify-content: space-between;
    }

    .tixianjifen {
        width: 334rpx;
		height: 140rpx;
        border-radius: 10rpx;
        background: url(../../static/yongjintixianbjNew.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-left: 35rpx;
        box-sizing: border-box;
    }

    .tixianjifen:nth-child(2) {
        background: url(../../static/keyongjifenbjNew.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
    }

    .total-content {
        display: flex;

        flex-direction: column;
    }

    .totalRevenue {
        margin-top: 30rpx;
        font-size: 26rpx;
        color: #c7e5ff;
       line-height: 25rpx;
    }
   .newColor{
        color: #e0fbf9;
    }
    .newMoney{
        font-size: 40rpx;
        color: #fff;
        line-height: 33rpx;
        margin-top: 20rpx;
    }
    /* 转赠收藏 */
    .zhuanZengAndShouCang{
        width: 690rpx;
        height: 200rpx;
        margin: 20rpx auto;
        background-color: #212428;
        border-radius: 10rpx;
        display: flex;
        
    }
    .zhuangZeng-item{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .zhuangZeng-item image{
        width: 70rpx;
        height: 70rpx;
    }
    .zhuangZeng-item text{
        font-size: 24rpx;
        color: #fff;
        margin-top: 25rpx;
    }
	.iconfont{
		font-size: 36rpx;
		margin-right: -4rpx;
	}
</style>
