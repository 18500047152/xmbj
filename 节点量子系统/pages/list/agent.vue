<template>
    <view class="body">

        <Head class='newHead' style='top:0rpx' :headTitle="headTitle" :headOtherIcon="headOtherIcon" :headReturn="headReturn"
            :headPosition="headPosition" :headBackground='headBackground' @returnClick="returnClick" @otherClick="otherClick" />
        <view class='newTab' style="position: fixed;width: 100%;top: 129.16rpx;z-index: 998;">
            <view class="shopBottom">
                <view class="shopClass">
                    <text :class="[actived==0?'active':'']" @click="activeClick('0')">直属合伙人</text>
                    <text :class="[actived==1?'active':'']" @click="activeClick('1')">间接合伙人</text>
                </view>
            </view>
            <view class="select">
                <view class="selectBox">
                    <view class="regTime" @click="regTimeClick">
                        <text :class="[select.regTime != 0 ? 'active' : '']">注册时间</text>
                        <view class="icon">
                            <text :class="[select.regTime == 1 ? 'active_top' : '' , 'shang']"></text>
                            <text :class="[select.regTime == 2 ? 'active_bottom' : '' , 'xia']"></text>
                        </view>
                    </view>
                    <view class="count" @click="countClick">
                        <text :class="[select.count != 0 ? 'active' : '']">合伙人数量</text>
                        <view class="icon">
                            <text :class="[select.count == 1 ? 'active_top' : '' , 'shang']"></text>
                            <text :class="[select.count == 2 ? 'active_bottom' : '' , 'xia']"></text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 2020.9.28号新改动 -->
    <!--    <view style="position: relative;top: 320rpx;margin-bottom: 93.75rpx;" :style="{'height': listHeight+'px'}" :class="{isOverflow:isOverFlow}"> -->
            <view style="position: relative;top: 320rpx;margin-bottom: 93.75rpx;" :style="{'height': listHeight+'px'}" >
            <block v-for="(item,index) in agentList.info" :key="index">
                <view class="list" @click="closeMark(index)">
                    <image class="consumerPhoto" :src="item.avatarUrl ? item.avatarUrl : '/static/headImg.png'" mode=""></image>
                    <view class="consumerDetail">
                        <view class="consumerDetail_">
                            <text>{{item.nickName?item.nickName:'暂无名称'}}</text>
                            <view class="count">
                                <text>合伙人数：{{item.fans}}</text>
                                <text v-if="actived == 1">邀请人：{{item.parent ? item.parent.grade_name: ''}}</text>
                            </view>
                        </view>
                        <text class="iconfont icon-you"></text>
                    </view>
                </view>
            </block>
        </view>
        <!-- </view> -->
        <view class="bottom">
            <text v-if="actived == 0">直属合伙人： <text class="orange">{{agentList.count ? agentList.count : 0}}</text></text>
            <text v-if="actived == 1">间接合伙人： <text class="orange">{{agentList.count ? agentList.count : 0}}</text></text>
        </view>
        <view class="noList" v-show="isShow">
            <image class="noListImg" :src="actived == 0? '/static/not/agent.png' : '/static/not/indirectAgent.png'"
                mode=""></image>
            <view class="invite" @click="invite" v-if="actived == 0">邀请</view>
        </view>
        <view class="extensionBoxMark" v-show="isMark">
            <view class="extensionBox">
                <text class="iconfont icon-guanbi1" @click="closeMark()"></text>
                <view class="detail">
                    <view class="detail_">
                        <image class="detailPhoto" :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/headImg.png'"
                            mode=""></image>
                        <view class="detail_name">
                            <text>{{userInfo.nickName}}1</text>
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
            </view>
        </view>
        <view class="mark" v-show="isMark" @click="closeMark()"></view>
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
                    title: '我的合伙人',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headOtherIcon: {
                    color: '#FFF',
                    icon: 'icon-sousuo',
                    size: '45rpx',
                    url: '/pages/list/search?id=agent'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000000',
                actived: 0,
                select: {
                    regTime: 1,
                    count: 0
                },
                type: {
                    sort: 10,
                    sort_type: 10
                },
                page: 1,
                isMark: false,
                agentList: [],
                isShow: false,
                userInfo: [],
                isload: false, // 点击防抖
                //reachStatus:true 页面刷新防止滚动条触底事件加载page++
                reachStatus: true,
                //下面的变量是2020-9-28号新添的
                isOverFlow: false,
                //屏幕高度
                screenheight: '',
                newHeadHeight: '',
                newTabHeight: '',
                newBottomHeight: '',
                listHeight: '',
                isBack: true,
            }
        },
        onReady() {
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 0
            });
            this.getAgent();
            this.getCount();



        },
        onLoad() {
            //获取屏幕高度
            const {
                windowWidth,
                windowHeight
            } = uni.getSystemInfoSync();
            this.screenheight = windowHeight
        },
     
        mounted() {
            this.getH()
        },
    
        methods: {
            getH() {
                console.log('我是onshow高度', this.screenheight)
                // 获取高度，确保数据渲染后获取正常高度，所以使用 this.$nextTick
                this.$nextTick(res => {
                    const query = uni.createSelectorQuery().in(this);
                    let _this = this
                    uni.getSystemInfo({
                        success: function(res) {
                            // 屏幕高度
                            // _this.screenheight = res.screenHeight


                            query.select('.newHead').boundingClientRect(data => {

                                _this.newHeadHeight = data.height
                            }).exec();
                            query.select('.newTab').boundingClientRect(data => {
                                _this.newTabHeight = data.height
                            }).exec();
                            query.select('.bottom').boundingClientRect(data => {
                                console.log('我是onshow高度', _this.screenheight)
                                console.log('需要减得', _this.newHeadHeight + _this.newTabHeight +
                                    _this.newBottomHeight)
                                _this.newBottomHeight = data.height

                                _this.listHeight = _this.screenheight - _this.newHeadHeight -
                                    _this.newTabHeight - _this.newBottomHeight;
                                console.log(_this.listHeight)
                            }).exec();
                        },

                    });
                })

            },
           
            getCount() {
                let url = `/api/user_relation/pointUserCount`
                let obj = {
                    token: uni.getStorageSync('data').token,
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.headTitle.title = '我的合伙人(' + res.data.partner + ')'
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                });
            },
            getAgent() {
                let url = `/api/user_relation/partnerDirect`
                let obj = {
                    token: uni.getStorageSync('data').token,
                    dataType: this.actived == 0 ? 10 : 20,
                    page: this.page,
                    type: this.type.sort,
                    sort_type: this.type.sort_type
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let data = res.data
                        if (this.page > 1) {
                            if (data.info.length == 0) {
                                this.reachStatus = true;
                                return false
                            } else {
                                data.info.forEach(item => {
                                    this.agentList.info.push(item);
                                });
                            }

                        } else {
                            //新添加的this.reachStatus = false;解决切换成另一个,滚动条不加载
                            this.reachStatus = false;
                            if (data.info.length == 0) {
                                this.isShow = true;
                                return false
                            }
                            this.agentList = data;

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
                       
                        this.userInfo = res.data;
                         console.log('res',this.userInfo)
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                }, err => {
                    otherAPI.toast('请求失败，请稍后再试', 'none', false, 1500);
                })
            },
            //这个是点击直属/间接合伙人
            activeClick(index) {
                if (this.isload == false) {
                    this.isload == true
                    this.actived = index
                    this.page = 1
                    this.agentList = [];
                    this.isShow = false;
                    otherAPI.loading('加载中', true)
                    this.getAgent();
                }
            },
            closeMark(index = '') {
                if (index !== '') {
                    this.getUserInfo(this.agentList.info[index].user_id)
                }
                this.isMark = !this.isMark;
                this.isOverFlow = !this.isOverFlow
                this.isBack = !this.isBack
            },
            regTimeClick() {
                let index = this.select.regTime == 1 ? 2 : 1;
                this.type.sort = index === 1 ? 10 : 20
                this.type.sort_type = 10
                this.select = {
                    regTime: index,
                    count: 0
                }
                this.isShow = false;
                this.page = 1
                this.agentList = [];
                otherAPI.loading('加载中', true)
                this.getAgent()
            },
            countClick() {
                let index = this.select.count == 1 ? 2 : 1;
                this.type.sort = index === 1 ? 10 : 20
                this.type.sort_type = 20
                this.select = {
                    regTime: 0,
                    count: index
                }
                this.isShow = false;
                this.page = 1
                this.agentList = [];
                otherAPI.loading('加载中', true)
                this.getAgent()
            },
            invite() {
                uni.navigateTo({
                    url: '/pages/extension/index?param=agent'
                });
            },
            otherClick(url) {
                if (this.isBack) {
                    uni.navigateTo({
                        url: url
                    });
                } else {
                    return false;
                }
            },
            returnClick() {
                if (this.isBack) {
                    uni.navigateBack({
                        delta: 1
                    });
                } else {
                    return false;
                }
            },
            copy() {
                uni.setClipboardData({
                    data: this.userInfo.invite_code,
                    success: function() {
                        otherAPI.toast('复制成功', 'none', false, 1500)
                    }
                });
            },
            handleNum(num) {
                return Math.floor(num * 100) / 100
            }
        },
        onReachBottom() {
            if (!this.reachStatus) {
                this.page++;
                this.getAgent();
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
        line-height: 100rpx;
        position: relative;
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
        font-size: 32rpx;
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
        height: 3rpx;
        background-color: #e4992d;
    }

    .select {
        width: 100%;
        font-size: 26rpx;
        color: #FFFFFF;
        position: relative;
        padding: 31.25rpx 0;
        background-color: #031124;
        z-index: 998;
    }

    .selectBox {
        width: 500rpx;
        margin: auto;
        display: flex;
        justify-content: space-between;
        color: #46567d;
    }

    .selectBox .regTime,
    .selectBox .leave,
    .selectBox .count {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .selectBox .icon {
        display: flex;
        flex-direction: column;
        font-size: 8.33rpx;
        margin-left: 10rpx;
        transform: scale(.8);
    }

    .icon .shang {
        width: 0;
        height: 0;
        border-right: 10rpx solid transparent;
        border-left: 10rpx solid transparent;
        border-bottom: 10rpx solid #46567d;
        margin-bottom: 5px;
    }

    .icon .xia {
        width: 0;
        height: 0;
        border-right: 10rpx solid transparent;
        border-left: 10rpx solid transparent;
        border-top: 10rpx solid #46567d;
    }

    .selectBox .active {
        color: #FFF;
    }

    .icon .active_top {
        border-bottom: 10rpx solid #FFF;
    }

    .icon .active_bottom {
        border-top: 10rpx solid #FFF;
    }

    .newList {
        /* margin-top: 320rpx; */
        background-color: red;
    }

    .list {
        display: flex;
        flex-direction: row;
        width: 694.44rpx;
        margin: auto;
        padding: 30rpx 0;
    }

    .consumerPhoto {
        width: 104.16rpx;
        height: 104.16rpx;
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
        margin: 500rpx auto;
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

    .extensionBoxMark {
        width: 100%;
        height: 100%;
        background-color: red;
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        z-index: 10000;
    }

    .isOverflow {
        width: 100%;
        /* height: 920rpx !important;? */
        overflow: hidden;
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
        box-sizing: border-box;
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
