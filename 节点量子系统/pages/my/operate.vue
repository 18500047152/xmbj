<template>
    <view>
		<view class="newHead">
		    <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" :headPosition="headPosition" :headBackground='headBackground' />
		</view>
		<!-- tab -->
		<view class="box" :style="{marginTop: marginTop}">
			<view class="tab">
			    <view v-for='(item, index) in tabs' :key='index' class="tab-item" @click="onClickTab(index)" :class="{onTabItem : onTab == index}">
					{{item.title}}
					<image class="on" v-if="onTab == index" src="../../static/on.png"></image>
				</view>
			</view>
			
			<swiper class="swiper-box" :current="onTab" @change="tabChange" :style="{height: height} ">
				<swiper-item v-for='(tab, index) in tabs' :key='index'>
					<scroll-view scroll-y class="news" >
						<template v-if="lists.length > 0">
						    <view class="news_item" v-for="(item, index) in lists" :key="index">
								<template v-if='item.article.type == 10'>
									<template v-if='item.article.image'>
										<view class="article" @click="toDetail(item.article.type, item.article.article_id)">
											<view class="info">
												<view class="title">{{item.article.article_title}}</view>
												<view class="tag">
													<text>{{item.article.actual_views}}热度</text>
													<text>{{item.create_time}}</text>
												</view>
											</view>
											<image class="img" :src="item.article.image.file_path"></image>
										</view>
									</template>
									<template v-else>
										<view class="normal" @click="toDetail(item.article.type, item.article.article_id)">
											<view class="n_title">{{item.article.article_title}}</view>
											<view class="tag">
												<text>{{item.article.actual_views}}热度</text>
												<text>{{item.create_time}}</text>
											</view>
										</view>
									</template>
								</template>
						        <template v-else>
									<view class="video" @click="toDetail(item.article.type, item.article.article_id)">
										<image v-if='item.article.image' class="v_img" :src="item.article.image.file_path"></image>
										<image v-else class="v_img" :src="item.article.video.file_path  + '?vframe/png/offset/0%7CimageView2/1/w/690/h/390'"></image>
										<image class="cover_img" src="../../static/play.png"></image>
										<view class="cover">
											<view class="v_title">{{item.article.article_title}}</view>
										</view>
									</view>
								</template>
								<view class="operate">
									<view>
										<image class="bar_icon" src='../../static/share.png'></image>
										<text>分享</text>
									</view>
									<view>
										<image class="bar_icon" v-if='item.is_collect' @click="operate('collect', item.article_id)" src='../../static/collected.png'></image>
										<image class="bar_icon" v-else @click="operate('collect', item.article_id)" src='../../static/collect.png'></image>
										<text>{{item.article.collect_count}}</text>
									</view>
									<view>
										<image class="bar_icon" v-if='item.is_like' @click="operate('praise', item.article_id)" src='../../static/praised.png'></image>
										<image class="bar_icon" v-else @click="operate('praise', item.article_id)" src='../../static/praise.png'></image>
										<text>{{item.article.like_count_actual + item.article.like_count_virtual}}</text>
									</view>
								</view>
						    </view>
						</template>
						<template v-else>
                            <block v-if='onTab == 0'>
							<view :style="{height: newHeight}">
								<image @click="navClick"  class="nodata" src="../../static/nopraise.png"></image>		
                                </view>
                            </block>
                            <block v-if='onTab == 1'>
                            <view :style="{height: newHeight}">	
                            	<image @click="navClick"  class="nodata" src="../../static/nocollect2.png"></image>
                            </view>
                          </block>  
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
    import Head from '../common/head.vue'
    // 复制需要引入文件
    import uniCopy from '../common/code.js';
    export default {
        components: {
            Head
        },
        data() {
            return {
                //head
                headTitle: {
                    title: '我的赞',
                    color: '#FFF',
                    size: '36rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
				headPosition: 'fixed',
				headBackground: '#18191D',
				tabs: [
					{title: '点赞', index: 0},
					{title: '收藏', index: 1}
				],
                // tab初始化选中
                onTab: 0,
				
				height: '',
				
				// 数据
				lists: [],
				page: 1,
				lastpage: 1,
                marginTop:'',
            }
        },
        onLoad() {
			// 传递参数,第一个参数为tabs数组索引,第二个参数为页数,默认1
			this.onTab = 0
			this.getData(0, 1)
        },
        onShow() {
			
		},
		mounted() {
			// 获取默认数据高度
			
		},
        methods: {
			// 获取点赞数据
			getData(index, page) {
				let url = ''
				// 点赞数据
				if(index == 0) {
					url = `api/article/like_lists`
				}
				// 收藏数据
				if(index == 1) {
					url = `api/article/collect_lists`
				}
				let obj = {
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
				    }
					// 获取高度，确保数据渲染后获取正常高度，所以使用 this.$nextTick
					this.$nextTick(res=> {
						const query = uni.createSelectorQuery().in(this);
						let _this = this
						uni.getSystemInfo({
							success: function(result) {
								// 屏幕高度
                                //获取导航栏高度
                                query.select('.newHead').boundingClientRect(data => {
                                
                                    _this.newHead = data.height
                                   
                                }).exec();
                                //获取tab高度
                                query.select('.tab').boundingClientRect(data => {
                                
                                    _this.tabHeight = data.height
                                   
                                }).exec();
								query.select('.news').boundingClientRect(data => {
									// .base 高度
									// _this.height = data.height + 'px'
                                    //  console.log('有值吗?this.newHead ',_this.newHead )
                                    //  console.log('有值吗?this.tabHeight',_this.tabHeight)
                                    //  console.log('屏幕高度',result.screenHeight)
                                    // console.log("result.screenHeight",result.screenHeight+"news"+data.height)
                                    _this.marginTop=_this.newHead+_this.tabHeight-20+ 'rpx';
                                    // console.log('this.marginTop',_this.marginTop)
									if(result.screenHeight > data.height) {
										// _this.height = result.screenHeight + 'px'
                                        _this.height = result.screenHeight-_this.newHead-_this.tabHeight + 'px'									
									} else {
										_this.height = data.height + 'px'
									}
                                    if(this.lists.length==0){
                                         _this.newHeight = result.screenHeight-_this.newHead-_this.tabHeight + 'px'									
                                    }
								}).exec();
						    }
						});
					})
				})
			},
			
            // tab栏切换
            onClickTab(index) {
                // 通过index索引值,进行切换,swiper组件会触发tabChange方法
                this.onTab = index;
                // 获取数据
				// if(index == 0) {
				// 	this.getHeight('.news')
				// } else {
				// 	this.getHeight('.collects')
				// }
            },
			tabChange(e){
				this.lists = []
				this.page = 1
				this.onTab = e.detail.current
				this.getData(e.detail.current, 1)
			},
			// 取消点赞/收藏
			operate(type, id){
                console.log(type)
				let url = ''
				// 点赞
				if(type == 'praise') {
					url = `api/article/like`
				}
				// 收藏
				if(type == 'collect') {
					url = `api/article/collect`
				}
				
				let obj = {
					article_id: id,
				    token: uni.getStorageSync('data').token
				}
				httpRequest_.get(url, obj).then(res => {
				    if (res.code == 1) {
						otherAPI.toast(res.data.msg.msg, 'none', false, 1500);
                        if(type=='praise'){
                             this.getData(0, 1);
                        }else if(type=='collect'){
                            this.getData(1, 1);
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
			// 点赞进入列表
			navClick() {
             
                    uni.switchTab({
                    	url: '/pages/news/news'
                    })
               
				
			},
			
			// 进入详情
			toDetail(type, id) {
			    if (type == 10) {
					uni.navigateTo({
						url: '/pages/news/contentDetail?article_id=' + id
					})
			        // otherAPI.nav('/pages/news/contentDetail?article_id=' + id);
			    }
			    if (type == 20) {
					uni.navigateTo({
						url: '/pages/news/videoDetail?article_id=' + id
					})
			        // otherAPI.nav('/pages/news/videoDetail?article_id=' + id);
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
				this.getNews(this.onTab, this.page)
			}
        },
        
    }
</script>
<style lang="scss">
    page {
        background-color: #18191D;
        font-family: system-ui; // 统一字体，删除随意不影响
    }
	.newHead{
		height: 128rpx;
	}
	.box{
		margin-top: 128rpx;
		width: 100%;
		z-index: 0;
	}
    .tab {
        width: 100%;
        display: flex;
		padding: 30rpx 0 20rpx;
        justify-content: space-around;
		position: fixed;
		top: 128rpx;
		z-index: 99;
		background-color: #18191D;
		
        .tab-item {
			min-width: 80rpx;
			text-align: center;
            font-size: 32rpx;
            color: #bcbcbd;
            transition: all .1s;
			// display: inline-flex;
			// align-items: center;
        }

        .onTabItem {
            color: #fff;
            position: relative;
        }
		.on{
			width: 80rpx;
			height: 6rpx;
			display: block;
			margin: 16rpx auto 0;
		}
    }

	.news, .collects{
		box-sizing: border-box;
		padding: 10rpx 30rpx 30rpx;
		.news_item {
			background-color: #212429;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
		}
		.article{
			display: flex;
			justify-content: space-between;
			margin:0 30rpx;
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
			font-size: 30rpx;
			width: 100%;
			line-height: 36rpx;
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
		.img{
			width: 210rpx;
			height: 150rpx;
			flex-shrink: 0;
			border-radius: 5rpx;
		}
		.normal{
			margin:0 30rpx;
			padding: 24rpx 0;
		}
		.n_title{
			box-sizing: border-box;
			color: #ccd0d5;
			font-size: 30rpx;
			width: 100%;
			line-height: 36rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-bottom: 15rpx;
		}
		.video{
			background: #18191D;
			position: relative;
		}
		.v_title{
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
		.v_img{
			width: 690rpx;
			height: 390rpx;
			display: block;
			border-radius: 6rpx;
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
		.cover_img{
			width: 90rpx;
			height: 90rpx;
			position: absolute;
			left: 300rpx;
			top: 150rpx;
		}
		
	}
	.operate{
		width: 100%;
		height: 90rpx;
		align-items: center;
		display: inline-flex;
		justify-content: space-around;
		color: #c9ced4;
		view{
			display: inline-flex;
			height: 56rpx;
			align-items: center;
			font-size: 28rpx;
		}
		.bar_icon{
			width: 38rpx;
			height: 38rpx;
			margin-right: 10rpx;
		}
	}
	
    // 无消息样式
    .nodata {
        width: 420rpx;
        height: 420rpx;
        margin: auto;
        display: block;
        margin-top: 150rpx;
    }
	.uni-swiper-item{
		overflow: scroll!important;
	}
</style>
