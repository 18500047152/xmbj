<template>
    <view class="content">
        <view class="contentHead" :style="'background-color:'+ headBackground+';'+'height:'+headHeight+';'+'position:'+headPosition">
            <!-- 状态栏 -->
            <view class="status_bar"></view>
            <view class="head">
                <view class="returnImg" @click="returnClick">
                    <image class="returnImg_" src="/static/fanhui1.png" mode=""></image>
                </view>
                <input v-model="searchContent" class="searchInput" type="text" placeholder="请输入关键字" placeholder-class="placeSearchInput" />
                <!-- 搜索 -->
                <text class="otherTitle" :style="'color:'+ headOtherText.color" @click="otherClick">{{headOtherText.text}}</text>
            </view>
        </view>
        <view class="news" v-if="!isHistory">
            <!-- 这个是搜索处理显示的内容 -->
            <template v-if="lists.length > 0">
                <view class="news_item" v-for="(item, index) in lists" :key="index" @click="toDetail(item.type, item.article_id)">
                    <template v-if='item.type == 10'>
                        <template v-if='item.image'>
                            <view class="article">
                                <view class="info">
                                    <view class="title">
                                        <rich-text :nodes="item.article_title"></rich-text>
                                    </view>
                                    <view class="tag">
                                        <text>{{item.virtual_views}}热度</text>
                                        <text>{{item.view_time}}</text>
                                    </view>
                                </view>
                                <image class="img" :src="item.image.file_path"></image>
                            </view>
                        </template>
                        <template v-else>
                            <view class="normal">
                                <view class="n_title">
                                    <rich-text :nodes="item.article_title"></rich-text>
                                </view>
                                <view class="tag">
                                    <text>{{item.virtual_views}}热度</text>
                                    <text>{{item.view_time}}</text>
                                </view>
                            </view>
                        </template>
                    </template>
                    <template v-else>
                        <view class="video">
                            <!-- <image class="v_img" :src="item.video.file_path  + '?vframe/png/offset/0%7CimageView2/1/w/270/h/324'"></image> -->
                            <image v-if='item.image' class="v_img" :src="item.image.file_path"></image>
                            <image v-else class="v_img" src="http://static.yunduoke.cn/202009031506405430.mp4?vframe/png/offset/0%7CimageView2/1/w/690/h/390"></image>
							<image class="cover_img" src="../../static/play.png"></image>
							<view class="cover">
								<view class="v_title">
								    <rich-text :nodes="item.article_title"></rich-text>
								</view>
							</view>
                        </view>
                    </template>
                </view>
            </template>
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
        <view class="noList" v-if="nodata">
            <image class="noListImg" src="/static/nosearch.png" mode=""></image>
        </view>
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
                headBackground: '#18191d',
                headHeight: '129.16rpx',
                headPosition: 'fixed',
                searchContent: '',
                //搜索内容
                lists: [],
                historyList: [],
                // 显示搜索历史
                isHistory: true,
                // id: '',
                userInfo: [],
                isMark: false,
                actived: 0,

                // 搜索无结果，显示缺省图
                nodata: false,
                page: 1,
                lastpage: 1
            }
        },
        onLoad(option) {
            // this.id = option.id;
            this.historyList = uni.getStorageSync('newssearch:history')
            this.actived = option.actived
        },
        watch: {
            searchContent(newValue, oldValue) {
                if (newValue == '') {
                    this.isHistory = true;
                }
            }
        },
        methods: {
            //滚动条触底事件
            onReachBottom() {
                if (this.page == this.lastpage) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.page++;
                    this.getLists(this.searchContent, this.page)
                }
            },

            // 点击搜索
            otherClick() {
                this.page = 1
                if (this.searchContent == '') {
                    otherAPI.toast('请输入关键字', 'none', false, 1500);
                } else {
                    this.getLists(this.searchContent, 1)
                }
                this.isHistory = false;
                this.setHistory(this.searchContent);
            },

            // 获取数据
            getLists(article_title, page) {
                let url = `api/article/lists`;
                let obj = {
                    article_title: article_title,
                    page: page,
                    token: uni.getStorageSync('data').token
                }

                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        if (res.data.list.total == 0) {
                            this.nodata = true
                        }
                        if (page == 1) {
                            //获取数据
                            this.lists = res.data.list.data
                        } else {
                            this.lists = this.lists.concat(res.data.list.data)
                        }
                        this.lastpage = res.data.list.last_page
                    }
                })
            },

            // 返回按钮
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            // 设置搜索记录，前端存储，不走接口
            setHistory(val) {
                let searchHistory = uni.getStorageSync('newssearch:history');
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
                    key: 'newssearch:history',
                    data: searchHistory
                });
                this.historyList = uni.getStorageSync('newssearch:history')
            },

            // 清除历史记录
            clearHistory() {
                uni.removeStorage({
                    key: 'newssearch:history'
                });
                this.historyList = []
            },

            //点击历史记录
            goHistoryList(index) {
                this.searchContent = this.historyList[index]
                this.isHistory = false;
                this.getLists(this.historyList[index], 1)
            },

            // 进入详情
            toDetail(type, id) {
                if (type == 10) {
                    otherAPI.nav('contentDetail?article_id=' + id);
                }
                if (type == 20) {
                    otherAPI.nav('videoDetail?article_id=' + id);
                }
            }
        }
    }
</script>

<style lang="scss">
    page {
        width: 100%;
        height: 100%;
        background: #18191d;
        /*  border-top: 0.1rpx solid #000000; */
    }

    .contentHead {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 998;
        background-color: #18191d !important;
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
        width: 40rpx;
        height: 40rpx;
        display: flex;
        align-items: center;
    }

    .returnImg_ {
        width: 22.91rpx;
        height: 41.66rpx;
    }

    .otherTitle {
        position: absolute;
        right: 0rpx;
        font-size: 28rpx;
    }

    .searchInput {
        width: 542.5rpx;
        height: 70rpx !important;
        background-color: #2c2d33;
        border-radius: 34.72rpx;
        color: #979b9f;
        font-size: 28rpx;
        padding-left: 80rpx;
        box-sizing: border-box;
        color: #fff;
        background-image: url(../../static/search.png);
        background-repeat:no-repeat ;
        background-size: 30rpx 30rpx;
        background-position: 27rpx center; 
    }

    .placeSearchInput {    
        font-size: 28rpx;
        color: #979b9f;
        position: absolute;
        box-sizing: border-box;
    }
    .history {
        width: 694.44rpx;
        margin: auto;
        position: relative;
        top: 150rpx;
        font-size: 27.77rpx;
    }

    .historyText {
        color: #ccd0d5;
        display: flex;
        justify-content: space-between;
    }

    .historyList view {
        font-size: 24rpx;
        display: inline-block;
        max-width: 664.44rpx;
        margin-left: 18.88rpx;
        margin-top: 18.88rpx;
        background-color: #212428;
        border-radius: 34.72rpx;
        color: #ccd0d5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 17rpx 30rpx;
    }

    .noList {
        width: 420rpx;
        margin: auto;
        padding-top: 350rpx;
    }

    .noListImg {
        width: 420rpx;
        height: 420rpx;
    }

    /* 搜索结果 */
    .news {
        position: relative;
        top: 150rpx;
        box-sizing: border-box;
        padding: 0 30rpx 30rpx;

        .news_item {
            width: 100%;
            background-color: #212429;
            margin-bottom: 30rpx;
			border-radius: 6rpx;
        }
        .article {
            display: flex;
            justify-content: space-between;
            margin: 0 30rpx;
            padding: 24rpx 0;
        }
        .info {
            padding-right: 35rpx;
            width: 420rpx;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .title {
            color: #ccd0d5;
            font-size: 34rpx;
            width: 100%;
            line-height: 45rpx;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .keywork {
            color: #f60;
        }
        .tag {
            color: #6b7177;
            font-size: 20rpx;
            margin-top: 15rpx;
        }
		.tag text:last-child{
			margin-left: 20rpx;
		}
        .img {
            width: 210rpx;
            height: 150rpx;
            border-radius: 5rpx;
            flex-shrink: 0;
        }
        .normal {
            margin: 0 30rpx;
            padding: 24rpx 0;
        }
        .n_title {
            box-sizing: border-box;
            color: #ccd0d5;
            font-size: 34rpx;
            width: 100%;
            line-height: 45rpx;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 15rpx;
        }
        .video {
            background: #18191D;
            position: relative;
        }
		.cover{
			width: 690rpx;
			height: 390rpx;
			border-radius: 6rpx;
			background: rgba(#000000,0.3);
			position: absolute;
			left: 0;
			top: 0;
		}
        .v_title {
            position: absolute;
            top: 20rpx;
            left: 0;
            box-sizing: border-box;
            padding: 0 30rpx;
            color: #fff;
            font-size: 34rpx;
            width: 100%;
            line-height: 48rpx;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .v_img {
            width: 690rpx;
            height: 390rpx;
            display: block;
            border-radius: 6rpx;
        }
		.cover_img{
			width: 90rpx;
			height: 90rpx;
			position: absolute;
			left: 300rpx;
			top: 150rpx;
		}
    }

    span.keyword {
        color: #f60;
    }
</style>
