<template>
    <view class="content">
        <view class="contentHead" :style="'background-color:'+ headBackground+';'+'height:'+headHeight+';'+'position:'+headPosition">
            <!-- 状态栏 -->
            <view class="status_bar"></view>
            <view class="head">
                <view class="returnImg" @click="returnClick">
                    <image class="returnImg_" src="/static/fanhui1.png" mode=""></image>
                </view>
                <!-- 根据身份显示不同的搜素内容 -->
                <input v-if="id =='node'" v-model="searchContent" class="searchInput" type="text" placeholder="请输入要查找的节点"
                    placeholder-class="placeSearchInput" />
                <input v-if="id =='shop'" v-model="searchContent" class="searchInput" type="text" placeholder="请输入要查找的商家"
                    placeholder-class="placeSearchInput" />
                <input v-if="id =='agent'" v-model="searchContent" class="searchInput" type="text" placeholder="请输入要查找的合伙人"
                    placeholder-class="placeSearchInput" />
               <text class="otherTitle" :style="'color:'+ headOtherText.color" @click="otherClick">{{headOtherText.text}}</text>
            </view>
        </view>
        <view style="position: relative;top: 130rpx;" v-if="!isHistory">
            <block v-for="(item,index) in nodeList" v-if="id ='node'">
                <view class="list" @click="closeMark(index)">
                    <view class="consumerDetail">
                        <view class="consumerDetail_">
                            <text>{{item.username}}</text>
                        </view>
                        <text class="iconfont icon-you"></text>
                    </view>
                </view>
            </block>
            <block v-for="(item,index) in shopList" v-if="id =='shop'">
                <view class="list" @click="closeMark(index)">
                    <image class="consumerPhoto" :src="item.avatarUrl ? item.avatarUrl : '/static/headImg.png'" mode=""></image>
                    <view class="consumerDetail">
                        <view class="consumerDetail_">
                            <text>{{item.nickName}}</text>
                            <view class="count">
                                <text>合伙人数：{{item.fans}}</text>
                            </view>
                        </view>
                        <text class="iconfont icon-you"></text>
                    </view>
                </view>
            </block>
            <block v-for="(item,index) in shopList" v-if="id =='agent'">
                <view class="list" @click="closeMark(index)">
                    <image class="consumerPhoto" :src="item.avatarUrl ? item.avatarUrl : '/static/headImg.png'" mode=""></image>
                    <view class="consumerDetail">
                        <view class="consumerDetail_">
                            <text>{{item.nickName}}</text>
                            <view class="count">
                                <text>合伙人数：{{item.fans}}</text>
                            </view>
                        </view>
                        <text class="iconfont icon-you"></text>
                    </view>
                </view>
            </block>
        </view>
        <view class="history" v-if="isHistory">
            <view class="historyText">
                <text>历史搜索</text>
                <text class="iconfont icon-shanchu" @click="clearHistory"></text>
            </view>
            <view class="historyList">
                <block v-for="(item,index) in historyList" :key="index">
                    <view @click="goHistoryList(index)">{{item}}</view>
                </block>
            </view>
        </view>
        <view class="noList" v-if="isShow">
            <image class="noListImg" src="/static/not/search.png" mode=""></image>
        </view>
        <view class="extensionBox" v-show="isMark && id!='node'">
            <text class="iconfont icon-guanbi1" @click="closeMark()"></text>
            <view class="detail">
                <view class="detail_">
                    <image class="detailPhoto" :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/headImg.png'"
                        mode=""></image>
                    <view class="detail_name">
                        <text>{{userInfo.nickName}}</text>
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
        <view class="extensionBox" v-show="isMark && id=='node'">
            <text class="iconfont icon-guanbi1" @click="closeMark()"></text>
            <view class="detail">
                <view class="detail_">
                    <view class="station"></view>
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
        <view class="mark" v-show="isMark" @click="closeMark()"></view>
    </view>
</template>

<script>
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    export default {
        data() {
            return {
                headOtherText: {
                    color: '#FFF',
                    text: '搜索'
                },
                headBackground: '#000',
                headHeight: '129.16rpx',
                headPosition: 'fixed',
                searchContent: '',
                nodeList: [],
                shopList: [],
                historyList: [],
                isShow: false,
                // 显示搜索历史
                isHistory: true,
                id: '',
                userInfo: [],
                isMark: false,
                actived: 0,
            }
        },
        onLoad(option) {
            this.id = option.id;
            this.historyList = uni.getStorageSync('search:history')
            this.actived = option.actived
        },
        watch: {
            searchContent(newValue, oldValue) {
                if (newValue == '') {
                    this.isHistory = true;
                    this.isShow = false;
                }
            }
        },
        methods: {
            otherClick() {
                if (this.searchContent == '') {
                    return false
                }
                this.isHistory = false;
                this.isShow = false;
                this.nodeList = [];
                this.shopList = [];
                this.setHistory(this.searchContent);
                switch (this.id) {
                    case 'node':
                        this.searchNode(this.searchContent);
                        break;
                    case 'shop':
                        this.searchShop(this.searchContent);
                        break;
                    default:
                        this.searchAgent(this.searchContent);
                        break;
                }
            },
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            //处理searchNode节点url的封装
            getUrl(actived) {
                if (this.actived == 0) {
                    return `/api/user_relation/jiedian`

                } else {
                    return `api/user_relation/indirect`
                }
            },
            searchNode(content) {
                let url = this.getUrl(this.actived)
                let obj = {
                    username: content,
                    token: uni.getStorageSync('data').token,
                    page: 1
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let data = res.data.data
                        if (data.length == 0) {
                            this.isShow = true;
                            return false
                        }
                        this.nodeList = data;
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                });
            },
            searchShop(content) {
                let url = `/api/user_relation/searchShopUser`
                let obj = {
                    search: content,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let data = res.data
                        if (data.length == 0) {
                            this.isShow = true;
                            return false
                        }
                        this.shopList = data;
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            searchAgent(content) {
                let url = `/api/user_relation/searchUser`
                let obj = {
                    search: content,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let data = res.data
                        if (data.length == 0) {
                            this.isShow = true;
                            return false
                        }
                        this.shopList = data;
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                }, err => {
                    otherAPI.toast('请求失败，请稍后再试', 'none', false, 1500);
                })
            },      
            setHistory(val) {
                let searchHistory = uni.getStorageSync('search:history');
                if (!searchHistory) searchHistory = [];
                let serachData = val;
                // 判断数组是否存在，如果存在，那么将放到最前面
                for (var i = 0; i < searchHistory.length; i++) {
                    if (searchHistory[i] === serachData) {
                        searchHistory.splice(i, 1);
                        break;
                    }
                }
                searchHistory.unshift(serachData);
                if (searchHistory.length > 10) {
                    searchHistory.splice(i, 1);
                }
                uni.setStorage({
                    key: 'search:history',
                    data: searchHistory
                });
                this.historyList = uni.getStorageSync('search:history')
            },
            closeMark(index = '') {
                if (index !== '') {
                    switch (this.id) {
                        case 'node':
                            this.userInfo = this.nodeList[index]
                            this.getInfo(this.nodeList[index].my_code)
                            break;
                        case 'shop':
                            this.userInfo = this.shopList[index]
                            break;
                        default:
                            this.userInfo = this.shopList[index]
                            break;
                    }
                }
                this.isMark = !this.isMark;
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
                });
            },
            clearHistory() {
                uni.removeStorage({
                    key: 'search:history'
                });
                this.historyList = []
            },
            copy() {
                uni.setClipboardData({
                    data: this.userInfo.my_code,
                    success: function() {
                        otherAPI.toast('复制成功', 'none', false, 1500)
                    }
                });
            },
            handleNum(num) {
                return Math.floor(num * 100) / 100
            },

            //点击历史记录
            goHistoryList(index) {
                this.isHistory = false;
                this.isShow = false;
                this.nodeList = [];
                this.shopList = [];
                if (this.id == 'node') {
                    // this.isHistory = false;
                    // this.isShow = false;
                    // this.nodeList = [];
                    // this.shopList = [];
                    this.searchNode(this.historyList[index]);
                } else if (this.id == 'shop') {
                    // this.isHistory = false;
                    // this.isShow = false;
                    // this.nodeList = [];
                    // this.shopList = [];
                    this.searchShop(this.historyList[index])
                } else if (this.id == 'agent') {
                    // this.isHistory = false;
                    // this.isShow = false;
                    // this.nodeList = [];
                    // this.shopList = [];
                    this.searchAgent(this.historyList[index])
                }
                // this.otherClick()
            }
        }
    }
</script>

<style>
    /* #ifdef APP-VUE || H5 */
    page {
        width: 100%;
        height: 100%;
        background-color: #000000;
    }

    .contentHead {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 998;
    }

    .head {
        width: 694.44rpx;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }

    .returnImg {
        position: absolute;
        left: 0;
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
    }

    .returnImg_ {
        width: 22.91rpx;
        height: 41.66rpx;
    }

    .otherTitle,
    .otherIcon {
        position: absolute;
        right: 0rpx;
        font-size: 27.77rpx;
    }

    .searchInput {
        width: 542.5rpx;
        height: 62.5rpx;
        background-color: #22376c;
        border-radius: 34.72rpx;
        color: #9fb1f4;
        font-size: 27.77rpx;
        padding-left: 20rpx;
    }

    .placeSearchInput {
        padding-left: 50rpx;
        font-size: 27.77rpx;
        color: #9fb1f4;
        position: absolute;
    }

    .placeSearchInput::after {
        content: "";
        width: 15.02rpx;
        height: 1.38rpx;
        background-color: #9fb1f4;
        position: absolute;
        top: 30rpx;
        left: 30rpx;
        transform: rotate(40deg);
    }

    .placeSearchInput::before {
        content: ' ';
        position: absolute;
        top: 6rpx;
        left: 11rpx;
        width: 20.83rpx;
        height: 20.83rpx;
        border: 1px solid #9fb1f4;
        border-radius: 20.83rpx;
    }

    .history {
        width: 694.44rpx;
        margin: auto;
        position: relative;
        top: 150rpx;
        font-size: 27.77rpx;
    }

    .historyText {
        color: #62749f;
        display: flex;
        justify-content: space-between;
    }

    .historyList view {
        display: inline-block;
        max-width: 664.44rpx;
        margin-left: 18.88rpx;
        margin-top: 23.88rpx;
        padding: 10rpx 15rpx;
        background-color: #031329;
        border-radius: 34.72rpx;
        color: #46567d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        margin: auto;
        padding-top: 350rpx;
    }

    .noListImg {
        width: 416.66rpx;
        height: 416.66rpx;
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

    .detail_ .station {
        width: 145.83rpx;
        height: 145.83rpx;
        display: block;
        margin: auto;
        position: relative;
        top: -20rpx;
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
        width: 377.77rpx;
        height: 93.33rpx;
        display: flex;
        justify-content: space-between;
        position: relative;
        top: -20rpx;
        left: 50%;
        transform: translateX(-50%);
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

    .mark {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #000308;
        opacity: .6;
        z-index: 99;
    }

    /* #endif */
</style>
