<template>
	<view class="box">
		<view class="title">
			<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		</view>
		<view class="Telephone">
			<text space="emsp" @click="dianHua">联系电话: {{phone}} (点击拨打)</text>
			<view>校区地址：浙江省杭州市下沙经济开发区4号大街187号盛泰时代山</view>
		</view>
		<view class="mapAddress">
			<!-- , -->
			<map class="mapAddress-map" :longitude="longitude" :latitude="latitude" :scale="scale" :markers="markers"></map>
		<view class="iconfont icon-dingwei1"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 120.356415,
				latitude: 30.305870,
				scale: 18,
				phone:18500047152,
				markers: [{
					latitude: 30.30587,
					longitude: 120.356415,
					iconPath: '../../static/dingwei.png',
					width:50,
					height:50,
				}
				// , {
				// 	latitude: 39.90,
				// 	longitude: 116.39,
				// 	iconPath: '../../../static/location.png'
				// },
				]

			}
		},
		methods: {
			//拨打电话
			dianHua(){
			//	console.log("确定拨打电话?")
				uni.makePhoneCall({
				    phoneNumber:'18500047152' //仅为示例
				});
			}

		}
	}
</script>

<style scoped>
	.title image {
		width: 100%;
		height: 320rpx;
	}

	.Telephone {
		font-size: 30rpx;
		padding: 0 20rpx;
	}

	.Telephone text,
	.Telephone view {
		display: block;
		line-height: 80rpx;
		border-bottom: 2px solid #eee;
	}

	.mapAddress-map {
		width: 100%;
		height: 750rpx;
		margin-top: 20rpx;
	}
</style>
