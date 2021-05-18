<template>
    <view>
        <!-- 搜索 -->
<!-- 		<view class='search'>
			<input disabled placeholder="请输入关键字" @click="toSearch" />
			<image class='s_img' src='../../static/search.png'></image>
		</view> -->
		
		<view class="contentHead" :style="'background-color:'+ headBackground+';'+'height:'+headHeight">
		    <!-- 状态栏 -->
		    <view class="status_bar"></view>
		    <view class="head">
		            <!-- 状态栏 -->
				<view class='search'>
					<input disabled placeholder="请输入关键字" @click="toSearch" />
					<image class='s_img' src='../../static/search.png'></image>
				</view>
		    </view>
		</view>

		<!-- tab -->
		<view class="box">
			<view class="tab" :class="{tabTop : isTop}">
				<scroll-view class="tabscroll" scroll-x="true">
					<view class="restyle" :style="{width: width}">
						<template v-for="(item, index) in category">
							<view class="tab-item" @click="onClickTab(index)" :class="{onTabItem : onTab == index}">
								<view class="tab_title">{{item.name}}</view>
								<image class="on" v-if="onTab == index" src="../../static/on.png"></image>
								<view v-else style="height: 6rpx; width: 80rpx;"></view>
							</view>
						</template>
					</view>
				</scroll-view>
			</view>
			<view class="tab" v-if="isTop"></view>
			<swiper class="swiper-box" :current="onTab" @change="tabChange" :style="{height: height}">
				<swiper-item v-for='(news, index) in category' :key='index'>
					<scroll-view scroll-y class="news">
						<template v-if="lists.length > 0">
							<view class="news_item" v-for="(item, index) in lists" :key="index" @click="toDetail(item.type, item.article_id)">
								<template v-if='item.type == 10'>
									<template v-if='item.image'>
										<view class="article">
											<view class="info">
												<view class="title" :class="{isread : item.is_read == 1}">{{item.article_title}}</view>
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
											<view class="n_title" :class="{isread : item.is_read == 1}">{{item.article_title}}</view>
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
										<image v-else class="v_img" :src="item.video.file_path  + '?vframe/png/offset/0%7CimageView2/1/w/690/h/390'"></image>
										<image class="cover_img" src="../../static/play.png"></image>
										<view class="cover">
											<view class="v_title">{{item.article_title}}</view>
                                            <view class="v_time">
                                              <!-- {{item.show_time}} -->
                                               {{item.show_time?item.show_time:'默认时间:11:33'}}
                                            </view>
										</view>
									</view>
								</template>
							</view>
						</template>
						<template v-else>
							<image class="null" src="../../static/nonews.png" mode=""></image>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
    </view>
</template>
<script>
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    import Head from '../common/head_normal.vue'
    // 复制需要引入文件
    import uniCopy from '../common/code.js';
    export default {
        components: {
            Head
        },
        data() {
            return {
                //head
                // headTitle: {
                //     title: '内参',
                //     color: '#FFF',
                //     size: '35.93rpx'
                // },
                // headPosition: 'fixed',
                // headBackground: '#000b1b',
				
				headOtherText: {
				    color: '#FFF',
				    text: '搜索'
				},
				headBackground: '#18191d',
				headHeight: '130rpx',
				searchContent: '',
				width: '',
				
                // 固定tab
                isTop: false,
                // tab初始化选中
                onTab: 0,
				// 类别
				category: [],
				// 数据
				lists: [],
				page: 1,
				lastpage: 1,
				// 初始化高度
				height: 0,
                
            }
        },
        onLoad() {
			// 数据获取
			this.onTab = 0
			this.getCategory()
        },
        onShow() {
			
		},
		mounted() {
			
		},
        methods: {
			// tab 栏数据 获取数据
			getCategory() {
			    let url = `api/article/category`;
			    let obj = {
			        token: uni.getStorageSync('data').token,
			    }
			    httpRequest_.get(url, obj).then(res => {
			        if (res.code == 1) {
			            this.category = res.data.categoryList
						// 获取第一组数据
						this.getNews(res.data.categoryList[0].category_id, 1)
						
						this.$nextTick(res=> {
							const query = uni.createSelectorQuery().in(this);
							let _this = this
							uni.getSystemInfo({
								success: function(result) {
									query.select('.restyle').boundingClientRect(data => {
										if(result.screenWidth > data.width) {
											_this.width = result.screenWidth + 'px'
										} else {
											_this.width = data.width + 'px'
										}
									}).exec();
							    }
							});
						})
			        }
			    })
			},
			//下面的列表数据
			getNews(id, page) {
				let url = `api/article/lists`;
				let obj = {
					category_id: id,
					page: page,
				    token: uni.getStorageSync('data').token
				}
				httpRequest_.get(url, obj).then(res => {
				    if (res.code == 1) {
						if (page == 1) {
						    //获取数据
							this.lists = res.data.list.data
						} else {
						    this.lists = this.lists.concat(res.data.list.data)
						}
						this.lastpage = res.data.list.last_page
						
						// 获取高度，确保数据渲染后获取正常高度，所以使用 this.$nextTick
						this.$nextTick(res=> {
							const query = uni.createSelectorQuery().in(this);
							let _this = this
							uni.getSystemInfo({
								success: function(result) {
                                      //获取导航栏高度
                                    query.select('.contentHead').boundingClientRect(data => {
                                    
                                        _this.contentHead = data.height
                                       
                                    }).exec();
                                    //获取tab高度
                                    query.select('.tab').boundingClientRect(data => {
                                    
                                        _this.tabHeight = data.height
                                       
                                    }).exec();
									query.select('.news').boundingClientRect(data => {
										// .base 高度                                      
										if(result.screenHeight > data.height) {
											// _this.height = result.screenHeight - 160 + 'px'
											_this.height = result.screenHeight-_this.contentHead-_this.tabHeight-52 + 'px'
										} else {
											_this.height = data.height + 'px'
											
										}
									}).exec();
							    }
							});
						})
				    }
				})
			},
			
			// getheight
			// getHeight(val) {
				// this.height = val
				// const query = uni.createSelectorQuery().in(this);
				// query.select(val).boundingClientRect(data => {
				// 	this.height = data.height + 'px'
				// }).exec();
			// },
			
			toSearch() {
				otherAPI.nav('/pages/news/newsearch');
			},
			
            // tab栏切换
            onClickTab(index) {
				// this.lists = []
				// this.height = 0
				// 通过index索引值,进行切换, 切换会自动调起swiper的tabChange
				this.onTab = index;
				// 获取数据
				// this.getNews(this.category[index].category_id)
				// if(index == 0) {
				// 	this.getNews(this.category[index].category_id)
				// 	this.getHeight('.news')
				// } else if(index == 1) {
				// 	this.getHeight('.company')
				// } else {
				// 	this.getHeight('.base')
				// } 
            },
			tabChange(e){
				this.lists = []
				this.height = 0
				this.page = 1
				this.onTab = e.detail.current;
				this.getNews(this.category[e.detail.current].category_id, 1)
				
				// if(e.detail.current == 0) {
				// 	this.getNews(this.category[e.detail.current].category_id)
				// 	// this.getHeight('.news')
				// } else if(e.detail.current == 1) {
				// 	this.getNews(this.category[e.detail.current].category_id)
				// 	// this.getHeight('.company')
				// } else {
				// 	this.getNews(this.category[e.detail.current].category_id)
				// 	// this.getHeight('.base')
				// }
			},
			// 进入详情
			toDetail(type, id) {
				if(type == 10) {
					otherAPI.nav('contentDetail?article_id=' + id);
				}
				if(type == 20) {
					otherAPI.nav('videoDetail?article_id=' + id);
				}
			}
        },
        onReachBottom() {
			if (this.page == this.lastpage) {
			    otherAPI.toast('数据加载完毕', 'none', false, 1500);
			    return false;
			} else {
			    this.page++;
			    // this.getIncomeDetail(this.page);
				this.getNews(this.category[this.onTab].category_id, this.page)
			}
        },
        onPageScroll(e) {
            if (e.scrollTop > 70) {
                this.isTop = true
            } else {
                this.isTop = false
            }
        },
		
    }
</script>
<style lang="scss" scoped>
    page {
        background: #18191D;
        font-family: system-ui; // 统一字体，删除随意不影响
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

	.otherTitle {
	    position: absolute;
	    right: 0rpx;
	    font-size: 28rpx;
	}
	
	.tabSearch{
		width: 100%;
		height: 129.16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		box-sizing: border-box;
	}
	.search{
		position: relative;
		box-sizing: border-box;
		width: 690rpx;
		height: 70rpx;
		padding: 0 80rpx;
		margin: 0 auto;
		border-radius: 35rpx;
		background: #2D2E33;
		color: #979b9f;
		input{
			width: 100%;
			height: 70rpx;
		}
		.s_img{
			width: 29rpx;
			height: 30rpx;
			display: block;
			position: absolute;
			top: 20rpx;
			left: 30rpx;
		}
	}
	.uni-input-placeholder{
		font-size: 32rpx!important;
	}
	.box{
		width: 100%;
		z-index: 0;
		background: #18191D;
	}
    .tab {
        width: 100%;
		height: 70rpx;
		padding: 30rpx 0 20rpx;
		.tabscroll{
			width: 100%;
			height: 70rpx;
			white-space: nowrap;
			display: flex;
		}
		.restyle{
			display: inline-flex;
			justify-content: space-around;
		}
        .tab-item {
            font-size: 32rpx;
            color: #bcbcbd;
			height: 70rpx;
            transition: all .1s;
			margin: 0 20rpx;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
        }
		.tab_title{
			height: 44rpx;
		}
        .onTabItem {
            color: #fff;
        }
		.on{
			width: 80rpx;
			height: 6rpx;
			display: block;
			margin-top: 10rpx;
		}
    }

    .tabTop {
        position: fixed;
        top: 0;
        background-color: #18191D;
        z-index: 99;
		padding-top: 60rpx;
    }
	.swiper-box{
		background: #18191D;
	}
	.news, .company, .base{
		box-sizing: border-box;
		padding: 0 30rpx 30rpx;
		.news_item {
			width: 100%;
			background-color: #212429;
		}
		.article{
			display: flex;
			justify-content: space-between;
			margin:0 30rpx;
			border-bottom: 1px solid #292C30;
			padding: 24rpx 0;
		}
		.info{
			padding-right: 35rpx;
			width: 420rpx;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.title{
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
		.tag{
			color: #6b7177;
			font-size: 20rpx;
		}
		.tag text:last-child{
			margin-left: 20rpx;
		}
		.img{
			width: 210rpx;
			height: 150rpx;
			flex-shrink: 0;
			display: block;
			border-radius: 5rpx;
		}
		.normal{
			margin:0 30rpx;
			padding: 24rpx 0;
			border-bottom: 1px solid #292C30;
		}
		.n_title{
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
		
		.video{
			padding: 30rpx 0;
			background: #18191D;
			position: relative;
		}
		.v_img{
			width: 690rpx;
			height: 390rpx;
			display: block;
			flex-shrink: 0;
			border-radius: 6rpx;
		}
        .v_time{
            position: absolute;
            right: 25rpx; 
            bottom: 25rpx; 
            color: #e3e2e2; 
            padding: 10rpx 20rpx;
            background:rgba(0,0,0,0.2);
            border-radius: 50rpx;
            font-size: 24rpx;
        }
		.cover{
			width: 690rpx;
			height: 390rpx;
			border-radius: 6rpx;
			background: rgba(#000000,0.3);
			position: absolute;
			left: 0;
			top: 30rpx;
		}
		.cover_img{
			width: 90rpx;
			height: 90rpx;
			position: absolute;
			left: 300rpx;
			top: 165rpx;
		}
		.v_title{
			position: absolute;
			top: 30rpx;
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
			text-shadow: #000 1rpx 1rpx 5rpx;
		}
		.isread{
			color: #6b7177;
		}
	}

    // 无消息样式
    .null {
        width: 420rpx;
        height: 420rpx;
        margin: auto;
        display: block;
        margin-top: 150rpx;
    }
</style>
