<template>
	<view class="content">
		<!-- 轮播图开始-->
		<swiper class="swiper" :autoplay="true" :circular="true" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="(item,index) in swipers">
				<image class="swiper-item-image" :src="item.img=='http://www.itcast.cn/subject/webzly/images/1.2.jpg'?'http://m.itheima.com/images/slidead/mobile/20191213180241750x410.jpg':item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图结束-->
		<!-- 导航栏开始-->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in nav" @click="goTiao(item.url)">
				<image :src="item.newSrc"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 导航栏结束-->
		<!-- 测试图标 -->
		<!-- <text :class="[{'icon-actived':verifyStatus},'iconfont icon-mima']"></text> -->
		<!-- 推荐商品栏开始 -->
		<view class="hot-goods">
			<view class="hot-goods-title">
				推荐商品
			</view>
			<!-- 商品列表[子组件] -->
			<goodsList :hotGoods="hotGoods" @goodsListId="goGoodsDetail"></goodsList>

		</view>
		<!-- 推荐商品栏结束 -->
	</view>
</template>

<script>
	import {
		httpRequest_,
		otherAPI
	} from '../../utils/newAPI.js';
	//引入推荐商品的子组件
	import goodsList from '../../components/goodsList/goodsList.vue';
	export default {
		data() {
			return {
				swipers: [],
				hotGoods: [],
				nav: [{
						url: "../goodsList/goodsList",
						newSrc: "../../static/chaoshi.png",
						name: "黑马超市"

					},
					{
						url: "../contact/contact",
						newSrc: "../../static/lianxiwomen.png",
						name: "联系我们"

					},
					{
						url: "../pic/pic",
						newSrc: "../../static/shequ.png",
						name: "社区图片"

					},
					{
						url: "../video/video",
						newSrc: "../../static/shipin.png",
						name: "学习视频"

					}
				],
				
			
			}
		},
		//推荐商品组件
		components: {
			goodsList
		},
		onLoad() {
			//获取轮播图
			this.getLunBoTu();
			//this.getSwiper()
			//获取推荐商品
			this.getHotGoods();
		},
		methods: {
			//获取轮播图数据
			async getLunBoTu() {
				let that = this;
				//------------------------------------------------------------------------源生的请求			
				// uni.request({
				// 	url: "http://localhost:8082/api/getlunbo",
				// 	success: (res) => {
				// 		//提示框
				// 		uni.showToast({
				// 			title: "接口获取成功",
				// 			success() {			
				// 				that.swipers = res.data.message;
				// 			}
				// 			//提示框的结尾符
				// 		})
				// 		//	success: (res) => {
				// 	},
				// 	//uni.request({
				// })	
				//------------------------------------------------------------------------教学老师的请求					
				const res = await this.$myRuquest({
					url: '/api/getlunbo'
				})
				this.swipers = res.data.message
				//getLunBoTu() {
			},
			////------------------------------------------------------------------------这个是公司的封装
			// getSwiper(){
			// 	let url = `/api/getlunbo`;
			// 	let obj= ''
			// 	httpRequest_.get(url, obj).then(res => {
			// 			console.log(res)
			// 		this.swipers = res.message
			// 	})			
			// }
			//获取推荐商品数据
			async getHotGoods() {
				const res = await this.$myRuquest({
					url: '/api/getgoods?pageindex=1' 
					// data:{
					// 	pageindex:this.number
					// }
				})
				this.hotGoods = res.data.message
				//console.log(this.hotGoods)
			},

			//导航栏跳转事件
			goTiao(e) {
				console.log(e)
				uni.navigateTo({
					url: e
				})
			},
			
//点击下面的商品列表,跳转商品详情
goGoodsDetail(e){
	//e是接收子元素传过来的ID
	console.log(e)
	const id=e
	uni.navigateTo({
		// 跳转到商品详情页,并吧id值传过去
		url:"../goodsDetail/goodsDetail?id="+id
	})
}
			//methods结束符
		},
	}
</script>

<style>
	.content{
		background-color: #EEEEEE;
	}
	.swiper {
		height: 380rpx;
	}

	.swiper-item-image {
		width: 100%;
		height: 100%;
	}

	.nav {
		height: 210rpx;
		display: flex;
	}

	.nav-item {
		flex: 1;
		text-align: center;
		/* display: flex; */
		font-size: 30rpx;
		background-color: white;
	}

	.nav-item image {
		width: 120rpx;
		height: 120rpx;
		display: block;
		margin: 15rpx auto;

	}

	.icon-shouji,
	.icon-mima {
		width: 100rpx;
		height: 100rpx;
		color: #081838;
		font-size: 38.19rpx;
	}

	.hot-goods-title {
		height: 100rpx;
		line-height: 100rpx;
		color: #b50e03;
		text-align: center;
		letter-spacing: 40rpx;
		background: #fff;
		margin: 10rpx 0;
	}
</style>
