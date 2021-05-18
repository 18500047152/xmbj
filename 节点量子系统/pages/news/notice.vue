<template>
	<view>
		<Head :headTitle="headTitle" :headPosition="headPosition" :headBackground="headBackground" :headReturn="headReturn" @returnClick="returnClick" />
		<!-- 公告通知 -->
		<view class='boxshow'>
			<block v-if='list.length > 0'>
				<view class="item" v-for="(i, index) in list" :key='index'>
					<view class="time">
						<view class='timebg'>
							<image v-if='index == 0' src='../../static/rbg.png'></image>
							<image v-else-if='index == list.length - 1' src='../../static/lbg.png'></image>
							<image v-else src='../../static/nbg.png'></image>
						</view>
						<view class='timeshow'>{{i.create_time}}</view>
					</view>
					<view class="info">
						<view class="infobg">
							<!-- <image v-if='index < list.length - 1' src='../../static/border.png'></image> -->
						</view>
						<view class="des" @click="toGGContent(i.operation_id)">
							<view class="title">{{i.operation_title}}</view>
							<view class="showinfo">{{i.operation_introduction}}</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 无公告 -->
			<view class="nullMsg" v-else>
				<image class="ggmsgnot" src="../../static/notice.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Head from '../common/head.vue'
	import {
		httpRequest_,
		otherAPI
	} from 'pages/common/API.js';
	export default {
		components: {
			Head
		},
		data() {
			
			return {
				// head
				headTitle: {
				    title: '公告通知',
				    color: '#fff',
				    size: '35.93rpx'
				},
				headReturn: {
				    status: 'isShow',
				    color: 'white'
				},
				headPosition: 'fixed',
				headBackground: '#18191d',
				list: [],
				// 8-11 *gjq
				page: 1,
				last_page: 1
				
			}
		},
		onShow() {
			this.getPageData()
		},
		onReachBottom() {
			// 翻页
			if(this.page >= this.last_page) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none'
				})
			} else {
				this.page ++
				this.getPageData()
			}
		},
		methods: {
			// API METHODS 08-11 *gjq
			getPageData() {
				let url = `/api/operation.notice/lists`;
				let obj = {
					token: uni.getStorageSync('data').token,
					page: this.page,
				}
				httpRequest_.get(url, obj).then(res => {
					if(res.code == 1) {
						this.last_page = res.data.lists.last_page
						if (this.page == 1){
							this.list = res.data.lists.data	
						} else {
							this.list.push(...res.data.lists.data)
						}
					}
				})
			},
			//^  API METHODS 08-11 *gjq			
			//  交互 METHODS 08-11 *gjq 
			toGGContent(id){ // 前往详情 id
                 uni.navigateTo({
                     url:'detail?id='+id
                 })
			},
			//^  交互 METHODS 08-11 *gjq
			
			// 返回上一页
			returnClick() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style>
	page{
		background: #18191d;
	}
.boxshow{
	padding: 130rpx 0 30rpx;
}
.item{
	box-sizing: border-box;
	width: 690rpx;
	margin: 0rpx auto;
	border-radius: 4rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.time{width:690rpx; height: 70rpx; line-height: 70rpx; color: #6B7177; display: inline-flex;}
	.timebg{width:40rpx;}
		.timebg image{width: 40rpx; height: 70rpx;}
	.timeshow{width: 650rpx; font-size: 26rpx;}
	
.info{width: 690rpx; display: inline-flex;}
/* .infobg{width:40rpx; height: 1rpx;} */
.infobg{width: 2rpx; background: #25304D; margin: 0 19rpx;}
.item:last-child .infobg{background: none;}
.des{
	box-sizing: border-box;
	width: 650rpx;
	padding: 40rpx;
	background: #212428;
}
.title{
	color: #C9CED4;
	font-weight: bold;
	font-size: 34rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
}
.showinfo{
	color: #6B7177;
	font-size: 26rpx;
	margin-top: 20rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
}
/* 08-11  */
.nullMsg{
	font-size: 26rpx;
	text-align: center;
}
.ggmsgnot{
	width: 416.66rpx;
	height: 416.66rpx;
	margin: auto;
	display: block;
    margin-top: 208rpx;
}
</style>
