<template>
    <view class="body">
        <Head :headTitle="headTitle" :headOtherIcon="headOtherIcon" :headBackground="headBackground" :headReturn="headReturn"
            :headPosition="headPosition" @returnClick="returnClick" @otherClick="otherClick" />
        <!-- Ding部固定  大节点显示-->
        <view class="shopBottom" v-if="levelIdentity == 20">
            <view class="shopClass">
                <text :class="[actived==0?'active':'']" @click="activeClick('0')">直属节点</text>
                <text :class="[actived==1?'active':'']" @click="activeClick('1')">间接节点</text>
            </view>
        </view>
        <!-- Ding部固定 大节点显示 -->
        <view style="position: relative;padding-bottom: 200rpx;" :style="levelIdentity == 20 ? 'top: 220rpx;' : 'top: 130rpx;'">
            <!-- 直属节点/间接节点渲染的数据 -->
            <block v-for="(item,index) in nodeList.data">
                <view class="list" @click="closeMark(index)">
                    <view class="consumerDetail">
                        <view class="consumerDetail_" style="display: flex;flex-flow: row;justify-content: space-between;flex: 1;align-items: center;">
                            <view class="consumerDetail_name">{{item.username}}</view>
                            <text v-if="item.parent" style="padding-right: 20rpx;">邀请人:{{item.parent.phone}}</text>
                        </view>
                        <text class="iconfont icon-you"></text>
                    </view>
                </view>
            </block>
        </view>
        <!-- 底部固定 大节点显示 -->
        <view class="bottom" v-if="levelIdentity == 20">
            <text v-if="actived == 0">直属节点： <text class="orange">{{fotterNumber}}</text></text>
            <text v-if="actived == 1">间接节点： <text class="orange">{{fotterNumber}}</text></text>
        </view>
        <!-- 底部固定 大节点显示 -->
        <!-- 当直属节点为0是显示图片 -->
        <!-- <view class="noList" v-if="nodeList.length == 0"> -->
        <view class="noList" v-if="isShow">
            <!-- 直属节点图片 -->
            <image v-if="actived == 0 " class="noListImg" src="/static/not/notNode.png" mode=""></image>
            <view v-if="actived == 0 " class="invite" @click="invite">邀请</view>
            <!-- 间接节点图片 -->
            <image v-if="actived == 1 " class="noListImg" src="/static/not/indirectNode.png" mode=""></image>
        </view>
        <view class="extensionBoxMark" v-show="isMark">
            <view class="extensionBox">
                <text class="iconfont icon-guanbi1" @click.stop="closeMark()"></text>
                <view class="detail">
                    <view class="detail_">
                        <view class="detail_name">
                            <text>{{userInfo.username}}</text>
                            <view>
                                <text class="inviteCode">邀请ID：{{userInfo.my_code}}</text>
                                <text class="iconfont icon-fuzhi" @click="copy"></text>
                            </view>
                        </view>
                        <view class="profitBox">
                            <view class="lastMongthProfit">
                                <text>商家数</text>
                                <text class="profitMoney">{{userInfo.info ? userInfo.info.business : 0}}</text>
                            </view>
                            <view class="totalProfit">
                                <text>合伙人数</text>
                                <text class="profitMoney">{{userInfo.info ? userInfo.info.partner : 0}}</text>
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
                    title: '我的节点',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headOtherIcon: {
                    color: '#FFF',
                    icon: 'icon-sousuo',
                    size: '45rpx',
                    url: '/pages/list/search?id=node'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000000',
                // 推广
                nodeList: [],
                userInfo: [],
                page: 1,
                reachStatus: false,
                isShow: false,
                isMark: false,
                actived: 0,
                levelIdentity: 10, //从缓存中获取身份10是小节点20大节点
                fotterNumber: 0, // 底部节点数量
                isload: false, // 点击防抖
                //reachStatus:true 页面刷新防止滚动条触底事件加载page++
                reachStatus: true,
                //控制导航栏返回与搜索的,默认为true,可以点击,如果为false不可以点击
                isBack: true,
            }
        },
        onReady() {
            //从缓存中获取身份10是小节点20大节点
            this.getinfo()
            console.log('........',document.body);
            
        },
        methods: {
   
            getinfo() {
                //获取用户ID拿到身份
                let url = `/api/user/get_user_id`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    user_id: uni.getStorageSync('data').user_id.user_id
                }
                httpRequest_.get(url, obj).then(res => {
                    this.levelIdentity = res.data.userInfo.level
                    //  req
                    this.getJiedian();
                    //获取节点总数
                    this.getCount()
                })
            },
            //请求我的节点总数
            getCount() {
                let url = `/api/user_relation/pointUserCount`
                let obj = {
                    token: uni.getStorageSync('data').token,
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.headTitle.title = '我的节点(' + res.data.jie + ')'
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                });
            },

            getJiedian() { // 直属节点
                let url = `/api/user_relation/jiedian`
                let obj = {
                    token: uni.getStorageSync('data').token,
                    page: this.page
                }
                httpRequest_.get(url, obj).then(res => {

                    if (res.code == 1) {
                        this.fotterNumber = res.data.total
                        let data = res.data
                        if (this.page > 1) {
                            if (data.data.length == 0) {
                                this.reachStatus = true;
                                return false
                            } else {
                                data.data.forEach(item => {
                                    this.nodeList.data.push(item);
                                });
                            }
                        } else {
                            if (data.data.length == 0) {
                                this.isShow = true;
                                return false
                            } else {
                                this.isShow = false;
                            }
                            this.nodeList = data;
                        }
                    } else {
                        this.isShow = true;
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }

                })

                this.isload = false
            },
            getJiedian2() { // 间接节点
                let url = `/api/user_relation/indirect`
                let obj = {
                    token: uni.getStorageSync('data').token,
                    page: this.page
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.fotterNumber = res.data.total
                        let data = res.data
                        if (this.page > 1) {
                            if (data.data.length == 0) {
                                this.reachStatus = true;
                                return false
                            } else {
                                data.data.forEach(item => {
                                    this.nodeList.data.push(item);
                                });
                            }
                        } else {
                            //新添加的this.reachStatus = false;解决切换成另一个,滚动条不加载
                            this.reachStatus = false;
                            if (data.data.length == 0) {
                                this.isShow = true;
                                return false
                            }
                            this.nodeList = data;
                        }
                    } else {
                        this.isShow = true;
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })

                this.isload = false
            },
            getInfo(code) {
                let url = `/api/user_relation/pointCount`
                let obj = {
                    token: uni.getStorageSync('data').token,
                    point_invite_code: code
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.userInfo.info = res.data
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            closeMark(index = '') { 
                if (index !== '') {
                    this.userInfo = this.nodeList.data[index]
                    this.getInfo(this.nodeList.data[index].my_code)
                }
               
                this.isMark = !this.isMark;
                this.isBack=!this.isBack;
            },
            returnClick() {
                if (this.isBack) {
                    uni.navigateBack({
                        delta: 1
                    });
                } else {
                    return false
                }
            },
            invite() {
                uni.navigateTo({
                    url: '/pages/extension/index?param=node'
                });
            },
            copy() {

                uni.setClipboardData({
                    data: this.userInfo.my_code,
                    success: function() {
                        otherAPI.toast('复制成功', 'none', false, 1500)
                    }
                });
            },
            otherClick(url) {
                //从节点页面跳到搜索页面,传了个参数actived[0代码直属,1代表间接],来区分搜索页面,搜直属还是搜间接
                if (this.isBack) {
                    const newUrl = url + "&actived=" + this.actived
                    uni.navigateTo({
                        url: newUrl
                    });
                } else {
                    return false;
                }

            },
            activeClick(index) { // 点击切换
                if (this.isload == false) {
                    this.isload = true
                    this.nodeList = [];
                    this.actived = index
                    this.page = 1;
                    if (this.actived == 0) { // 0 请求直属
                        this.getJiedian();

                    } else if (this.actived == 1) { // 1 请求间接
                        this.getJiedian2()
                    }
                    otherAPI.loading('加载中', true)
                }
                //点击直属节点栏,判断数组的长度如果为0,就isMark=true
                if (this.actived == 0) {}

            },
        },
        onReachBottom() {
            if (!this.reachStatus) {
                this.page++;
                this.getJiedian();
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
        width: 100%;
        background-color: #000000;
        
    }

    .list {
        display: flex;
        flex-direction: row;
        width: 694.44rpx;
        margin: auto;
        padding: 30rpx 0;
        z-index: 0;
    }

    .consumerDetail {
        width: 100%;
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

    .consumerDetail_name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 50vw;
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
        font-size: 35.77rpx;
    }

    .noList {
        width: 100%;
        position: relative;
        top: 280rpx;
        left: 50%;
        transform: translateX(-50%);
    }

    .noListImg {
        width: 416.66rpx;
        height: 416.66rpx;
        display: block;
        margin: auto;
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
        height: 500rpx;
        background-color: red;
          /* background: rgba(255, 0, 0, 0.6); */
          background: rgba(0, 0, 0, 0.3);
          position: fixed;
          top: 0;
          width: 100%;
           height: 100%;
          z-index: 9999999999;
    }

    .extensionBox {
        width: 562.5rpx;
        height: 600rpx;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 199;
        /* background: rgba(33, 49, 106, 0.8); */
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
        height: 440rpx;
        background-color: #394b8f;
        margin: 100rpx auto 0;
    }

    .extensionBox .detail_ {
        margin: auto;
        width: 444.44rpx;
        height: 320rpx;
        border-bottom: 0.69rpx solid #31427d;
    }

    .extensionBox .detail_ .detail_name {
        padding: 38rpx 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
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
        width: 377.77rpx;
        margin: 20rpx auto 0;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
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
        line-height: 120rpx;
        font-size: 27.77rpx;
        color: #9fb1f4;
        text-align: center;
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
</style>
