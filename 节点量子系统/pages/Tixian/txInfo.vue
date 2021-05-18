<template>
	<view>
		<Head :headTitle="headTitle" :headReturn="headReturn" :headPosition="headPosition"
		 :headBackground='headBackground' @returnClick="returnClick" @otherClick="otherClick">
		 </Head>
		 
		 <view style="position: absolute;margin-top: 160rpx;width: 100%;">
			 <view class="box">
				 <!-- 第一行 -->
				 <view class="box-1">
					 <view class="box-1-row">提现方式：支付宝</view>
					 <view class="box-1-row">公司名称：某某有限公司</view>
					 <view class="box-1-row">支付宝：SMI******</view>
					 <view class="box-1-row">金额：3760元</view>				 </view>
				 
				 <!-- 第二行 -->
				 <view class="box-2">
					 <view class="box-2-row">发票代码：1245453</view>
					 <view class="box-2-row">发票号：4878454</view>
					 <view class="box-2-row">快递名称：圆通快递</view>
					 <view class="box-2-row">快递单号：376087656543</view>
					 <!-- 图 -->
					 <view class="box-2-row">
						 <view class="images" @click="toImgArr()"></view>
						 <view class="images"></view>
					 </view>
				 </view>
				 
				 <!-- 右上角状态 -->
				<image class="statusImg" src="/static/Tixian/tx1.png" mode=""></image>
				<image class="statusImg" src="/static/Tixian/tx2.png" mode=""></image>
				<image class="statusImg" src="/static/Tixian/tx3.png" mode=""></image>
				<image class="statusImg" src="/static/Tixian/tx4.png" mode=""></image>
			
			 </view>
			 
			 <!-- 提现失败原因：后台返回的内容展示 -->
			 <view class="errMsg">
				<view>
					提现失败原因：<text style="color: #5c8bd5;">后台返回的内容展示后台返回的内容展示后台返回的内容展示后台返回的内容展示后台返回的内容展示</text>
				</view>
			 </view>
			 
		 </view>
	</view>
</template>

<script>
	import Head from '../common/head.vue'
	export default {
		components: {
			Head
		},
		data() {
			return {
				// head
				headTitle: {
					title: '提现详情',
					color: '#FFF',
					size: '35.93rpx'
				},
				headReturn: {
					status: 'isShow',
					color: 'white'
				},
				headPosition: 'fixed',
				headBackground: '#000b1b',
			}
		},
		onLoad() {
			
		},
		methods: {
			toImgArr(){
                
				uni.navigateTo({
					url: "images"
				})
			}
		},
		
	}
</script>

<style lang="scss">
	page{
		background-color: #000B1B;
		font-family: system-ui; // 统一字体，删除随意不影响
	}
	.box{
		width: 690rpx;
		min-height: 464rpx;
		background-color: rgba(79,126,201, 0.2);
		border-radius: 6rpx;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		flex-flow: column;
		padding: 20rpx 40rpx;
		position: relative;
		.box-1{
			padding: 20rpx 0;
			border-bottom: solid 1px #13234c;
			display: flex;
			flex-flow: column;
			.box-1-row{
				color: #586a95;
				font-size: 28rpx;
				margin: 4rpx 0;
			}
		}
		.box-2{
			padding: 20rpx 0;
			display: flex;
			flex-flow: column;
			padding-top: 20rpx;
			.box-2-row{
				display: flex;
				flex-flow: row;
				align-items: center;
				color: #586a95;
				font-size: 28rpx;
				margin: 4rpx 0;
			}
			.images{
				width: 151rpx;
				height: 151rpx;
				background-color: #142947;
				border-radius: 4rpx;
				margin: 0rpx 4rpx;
				margin-top: 10rpx;
			}
		}
		.statusImg{
			position: absolute;
			top: 0;
			right: 40rpx;
			width: 172rpx;
			height: 132rpx;
		}
	}
	.errMsg{
		margin: 20rpx auto;
		width: 690rpx;
		min-height: 100rpx;
		background-color: rgba(79,126,201, .2);
		border-radius: 6rpx;
		font-size: 28rpx;
		display: flex;
		flex-flow: row;
		padding: 20rpx;
		padding-left: 30rpx;
		align-items: center;
		box-sizing: border-box;
		color: #586a95;
	}
</style>
