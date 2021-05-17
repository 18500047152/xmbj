<template>
	<view>
		<!-- 轮播图开始-->
		<swiper class="swiper" :autoplay="true" :circular="true" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="(item,index) in swipers">
				<image class="swiper-item-image" :src="item.src"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图结束-->
		<!-- 价格与商品名称开始 -->
	<block
	v-for="item in info"
	>
		<view class="price-name">
			<view class="price">
				<text class="xianJia">¥:{{item.sell_price}}</text>
				<text class="yuanJia">¥:{{item.market_price}}</text>
			</view>
			<view class="name">
				{{item.title}}
			</view>
		</view>
		<!-- 价格与商品名称结束 -->
		<!-- 货号跟库存开始 -->
		<view class="articleNumberAndStock">
			<view class="articleNumber">货号:{{item.goods_no}}</view>
			<view class="stock">库存:{{item.stock_quantity}}</view>
		</view>	
	</block>
		<!-- 货号跟库存结束 -->
		<!-- 详情介绍开始 -->
		<view class="detail">
			<view class="title">
				详细介绍
			</view>
			<view class="content">
				<rich-text :nodes="desc.content"></rich-text>
				<!-- {{desc.content}} -->
			</view>
		</view>
		<!-- 详情介绍结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				info:[],
				desc:{}
			}
		},
		onLoad(options) {
		//	console.log(options.id);
			const newId = options.id
			if (newId == undefined) {
				const newId = 87;
				//轮播图
				this.getGoodsDetail(newId)
				//价格跟name
				this.getInfo(newId)
				//商品详情
				this.getdesc(newId)
			} else {
				//轮播图
				this.getGoodsDetail(newId)
				//价格跟name
				this.getInfo(newId)
				//商品详情
				this.getdesc(newId)			
			}

		},
		methods: {
			//定义获取轮播图方法
			async getGoodsDetail(id) {
				const res = await this.$myRuquest({
					url: "/api/getthumimages/" + id
				})
				this.swipers = res.data.message
				//console.log(this.swipers)
			},
			//获取价格跟name的方法
			async getInfo(id){
				const res=await this.$myRuquest({
					url:"/api/goods/getinfo/"+id
				})
			//	console.log(res)
				this.info = res.data.message
			//	console.log(this.info)
			},
			//获取详细介绍
			 async getdesc(id){
			 	const res=await this.$myRuquest({
			 		url:"/api/goods/getdesc/"+id
			 	})
			 	this.desc = res.data.message[0]
			 	console.log(this.desc)
			 }
		}
	}
</script>

<style scoped>
	page{
		background-color: #eee;
	}
	.swiper {
		height: 700rpx;
	}
	.swiper-item-image {
		width: 100%;
		height: 100%;
	}
	.price-name,.articleNumberAndStock{
		background-color: #FFFFFF;
		margin: 10rpx 0;
		padding: 10rpx 20rpx;
		line-height: 70rpx;
	}
	 .xianJia{
		font-size: 40rpx;
		color: #B50E03;
	}
	.yuanJia{
		font-size: 30rpx;
		color: #999;
		text-decoration:line-through;
		margin-left: 20rpx;
	}
	.detail{
		background-color: #fff;
		padding: 10rpx 20rpx;
		line-height: 70rpx;
	}
	.title{
		border-bottom: 2rpx solid #eee;
	}
	/* 富文本内的图片,宽高比不对,找到富文本图片内的类名,把这个类名,放到全局App.vue中就ok 
	 .gomeImgLoad{
		width: 100%;
	}
	 */
</style>
