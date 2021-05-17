<template>
		<view class="hot-goods-content">
			<view class="hot-goods-content-item" v-for="(item,index) in hotGoods" :key="index"
			@click="goGoodsDetail(item.id)"
			>
				<image :src="item.img_url=='http://demo.dtcms.net/upload/201504/20/thumb_201504200242250674.jpg'?'http://demo.dtcms.net/upload/201504/20/thumb_201504200154277661.jpg':item.img_url"
				 mode=""></image>
				<text class="price">¥{{item.market_price}}</text>
				<text class="delete">¥{{item.sell_price}}</text>
				<text class="name">{{item.title}}</text>
			</view>
		</view>
</template>

<script>
	import { $myRuquest } from '../../utils/api.js'
	export default {
		props:["hotGoods"],
		methods:{
			goGoodsDetail(id){
				this.$emit('goodsListId',id)
			}
		}
	
	}
</script>
<style scoped>
.hot-goods-content {
		display: flex;
		padding: 0 10rpx;
		flex-wrap: wrap;
	}

	.hot-goods-content-item {
		width: 49.3%;
		background-color: white;
		box-sizing: border-box;
		padding: 10rpx;
		margin-bottom: 10rpx;
	}

	.hot-goods-content-item:nth-child(odd) {
		margin-right: 10rpx;
	}

	.hot-goods-content-item image {
		width: 260rpx;
		height: 300rpx;
		display: block;
		margin: 10rpx auto;

	}

	.price {
		color: #B50E03;
		font-size: 36rpx;
		margin-right: 20rpx;
	}

	.delete {
		color: #ccc;
		font-size: 28rpx;
		text-decoration: line-through;
	}

	.name {
		font-size: 28rpx;
		line-height: 40rpx;
		padding-bottom: 10rpx 0;
		display: block;
		margin-top: 10rpx;
	}
</style>
