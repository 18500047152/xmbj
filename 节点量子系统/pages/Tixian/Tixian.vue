<template>
	<view>
		<Head :headTitle="headTitle" :headReturn="headReturn" :headPosition="headPosition"
		 :headBackground='headBackground' @returnClick="returnClick" @otherClick="otherClick">
		 </Head>
		 <!-- 右上角icon -->
		 <view style="position: fixed;z-index: 9999999;top: 50rpx;right: 50rpx;color: #FFFFFF;">
				 <image @click="isDate = true" style="height: 35rpx;width: 35rpx;" src="/static/Tixian/icon.png" mode=""></image>
		 </view>
		 
		<!-- 固定顶部 选项-->
		<!-- <view style="position: fixed; width: 100%;background-color: #000b1b;z-index: 11;">  -->
		
		<!-- 顶部背景 -->
		<view class="top-bg">
			<image class="bg" src="/static/Tixian/top.png" mode=""></image>
			<view class="top-content">
				<view class="content-row" style="flex: 1;">
					<text class="font-msg">可提现</text>
					<text style="font-size: 56rpx;color: #ffffff;font-weight: bold;">
						4564.26
					</text>
					<view class="content-fp" @click="fpPOP=true">发票信息</view>
				</view>
				<view class="content-row" style="flex-flow: row;">
					<view class="content-row" style="flex: 1;">
						<text class="font-msg">累计提现</text>
						<text style="font-size: 32rpx;font-weight: bold;color: #b3bfe6;">
							3687
						</text>
					</view>
					<view class="content-row" style="flex: 1;">
						<text class="font-msg">已提现</text>
						<text style="font-size: 32rpx;font-weight: bold;color: #b3bfe6;">
							4564.26
						</text>
					</view>
				</view>
			</view>
			<!-- 提现步骤 ①勾选佣金 ②填写账号 ③寄发票   -->
			<view class="top-bz" :style="topMsg ? '' : 'bottom: -4rpx;padding-bottom: 0rpx;' ">
				<view class="bz-content" v-if="topMsg" >
					<image src="/static/Tixian/war.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
					<view style="margin-left: 20rpx;flex: 1;">提现步骤 ①勾选佣金 ②填写账号 ③寄发票</view>
					<image @click="topMsg = false" src="/static/Tixian/close.png" style="width: 23rpx;height: 21rpx;" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- tab -->
		<view class="tab" :class="{tabTop : isTop}">
			<view class="tab-item" @click="onTab = 0" :class="{ onTabItem : onTab == 0 }">
				收益明细
			</view>
			<view class="tab-item" @click="onTab = 1" :class="{ onTabItem : onTab == 1 }">
				提现明细
			</view>
		</view>
		<view class="tab" v-if="isTop">
			
		</view>
		
		 <!-- 固定顶部 选项-->
		<!-- </view> -->
		
		<!-- list1 -->
		<view class="list1" v-if="onTab == 0">
			<view class="list-item" @click="choose(index)" v-for="(item, index) in contentList" :key="index">
				<view class="icon-x" >
					<image v-if="item.ison == true" src="/static/Tixian/x1.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
					<image v-else src="/static/Tixian/x.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
				</view>
				<view class="content" :class="{contentIson : item.ison == true}">
					<view style="font-size: 32rpx;">
						2020年09月订单佣金
					</view>
					<view style="font-size: 28rpx;color: #46567d;">
						预计2020-10-25到账
					</view>
				</view>
				<view class="price" :class="{contentIson : item.ison == true}">
					{{item.price}}
				</view>
			</view>
		</view>
		
		<!-- list2 -->
		<view class="list2" v-if="onTab == 1" >
			<!-- item -->
			<view class="list-item" @click="toTXMX()">
				<view>
					<view class="flexRow">
						<view class="flexRow-c1">
							佣金提现
						</view>
						<!-- 状态 -->
						<view class="tx-status0" >提现中</view>
						<view class="tx-status1" >已打款</view>
						<view class="tx-status2" >已到账</view>
						<view class="tx-status3" >提现失败</view>
						<!-- 状态 -->
					</view>
					<view class="date">
						2020-10-25 12:23:22
					</view>
				</view>
				<view>500</view>
			</view>
			<!-- item -->
			
		</view>


		<!-- 底部固定 -->
		<view class="di" v-if="onTab == 0">
			<view class="price">
				<text style="font-size: 22rpx;">￥</text>3760
			</view>
			<view class="btn">
				提现
			</view>
		</view>
		
		<!-- pop -->
		<view class="fp-pop" v-if="fpPOP">
			<view class="box">
				<view class="title">发票信息</view>
				<view class="close" @click="fpPOP = false">X</view>
				<view class="cantent">
					<view class="content-top">
						<view class="content-top-title">
							请按照以下格式开发票：
						</view>
						<view>抬头类型：<text class="content-top-c">单位</text></view>
						<view>抬头：<text class="content-top-c">憨猴(北京)科技有限公司</text></view>
						<view>税号：<text class="content-top-c">91110105MA01C0900H</text></view>
						<view>单位地址：<text class="content-top-c">北京市朝阳区工人体育场南路7号院6栋楼二层202-203室</text></view>
						<view>电话号码：<text class="content-top-c">13373241451</text></view>
						<view>开户银行：<text class="content-top-c">招商银行有限公司北京宣武门支行</text></view>
						<view>银行账号：<text class="content-top-c">110933514310903</text></view>
					</view>
					<view class="content-bottom">
						一键复制
					</view>
				</view>
			</view>
		</view>
		<!-- 日期选择 -->
		<view v-if="isDate" style="position: fixed;top: 0;width: 100vw;height: 100vh;background-color: rgba(0,0,0,.3);z-index: 999;"></view>
		<view class="date-box" v-if="isDate">
			<view class="date-title">
				<view style="color: #999999;" @click="isDate = false">取消</view>
				<view style="color: #333333;">选择月份</view>
				<view style="color: #2c85f4;" @click="DateOK">确定</view>
			</view>
			<view class="date-content">
				<picker-view class="date-picker" :value="value" @change="changeDate" >
					<picker-view-column>
						<view class="date-item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="date-item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
				</picker-view>
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
				// 日期选择
				isDate:false, 		// 显示
				years:["2020","2021"], 	// 年Array
				months:["01","02"], 		// 月Array
				value: [0,0], 		// 年月Array的index
				chooseDate: "", 	// 点击确定后的日期
				// head
				headTitle: {
					title: '佣金提现',
					color: '#FFF',
					size: '35.93rpx'
				},
				headReturn: {
					status: 'isShow',
					color: 'white'
				},
				headPosition: 'fixed',
				headBackground: '#000b1b',
				// 固定tab
				isTop:false,
				// 是否显示msg
				topMsg:true,
				// 当前选择tab
				onTab: 0,
				contentList:[],
				// pop显示
				fpPOP:false
			}
		},
		onLoad() {
			this.contentList = [
				{price:"99",ison:false},
				{price:"99.99",ison:false},
				{price:"999.99",ison:false},
				{price:"9999.99",ison:false},
				{price:"99",ison:false},
				{price:"99.99",ison:false},
				{price:"999.99",ison:false},
				{price:"9999.99",ison:false},
				{price:"99",ison:false},
				{price:"99.99",ison:false},
				{price:"999.99",ison:false},
				{price:"9999.99",ison:false},			
			]
           
		},
		methods: {
			//  选择
			choose(index){
				if (this.contentList[index].ison){
					this.contentList[index].ison = false
				}else{
					this.contentList[index].ison = true
				}
			},
			// 日期更改(滑动触发)
			changeDate(e){
				let v = e.detail.value
				this.value = v	// 于确定使用
			},
			// 选择日期ok
			DateOK(){
				let y = this.years[this.value[0]]
				let m = this.months[this.value[1]]
				this.chooseDate = y + "-" + m // yyyy-m
				// 关闭显示
				this.isDate = false
			},
			toTXMX(){
				uni.navigateTo({
					url: "txInfo"
				})
			},
			// 返回上一页
			returnClick() {
				uni.navigateBack({
					delta: 1
				})
			},
			otherClick(url) {
				uni.navigateTo({
					url: url
				});
			},
		},
		onReachBottom() {
		},
		onPageScroll(e) {
			if (e.scrollTop > 170){
				this.isTop = true
			}else{
				this.isTop = false
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #000b1b;
		font-family: system-ui; // 统一字体，删除随意不影响
	}
	.contentIson{
		color: #ebeced;
	}

	.top-bg {
		width: 90%;
		height: 260rpx;
		padding-top: 140rpx;
		margin: 0 auto;
		position: relative;
		z-index: 0;

		.bg {
			position: absolute;
			padding-top: 140rpx;
			z-index: -1;
			top: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
		}

		.top-content {
			z-index: 2;
			color: #FFFFFF;
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: column;
			padding: 30rpx;
			box-sizing: border-box;
			.content-row{
				display: flex;
				flex-flow: column;
				position: relative;
				.font-msg {
					font-size: 28rpx;
					color: #5d73c0;
				}
				.content-fp{
					position: absolute;
					right: 0rpx;
					top: 20rpx;
					padding: 4rpx 20rpx;
					font-size: 28rpx;
					background-color: #0c1938;
					border-radius: 25rpx;
					border: solid 2rpx #394a82;
					color: #b3bfe6;
				}
			}
			
		}
		.top-bz{
			z-index: -2;
			width: 100%;
			box-sizing: border-box;
			padding-top: 266rpx;
			border-radius: 20rpx;
			background-color: #07132b;
			position: absolute;
			bottom: -50rpx;
			font-size: 24rpx;
			color: #29c0cd;
			padding-bottom: 10rpx;
			.bz-content{
				display: flex;flex-flow: row;align-items: center;
				box-sizing: border-box;
				padding: 0 20rpx;
				// letter-spacing: 0.1em;
			}
		}
	}

	.tab{
		width: 100%;
		margin-top: 70rpx;
		display: flex;
		flex-flow: row;
		justify-content: space-around;
		padding-bottom: 20rpx;
		padding-top: 10rpx;
		.tab-item{
			font-size: 32rpx;
			color: #46567d;
			transition: all .1s; 
		}
		.onTabItem{
			color: #FFFFFF;
			position: relative;
			&:after{
				position: absolute;
				bottom: -20rpx;
				left: 0;
				width: 100%;
				content: "";
				height: 4rpx;
				border-radius: 4rpx;
				background-color: #e4992d;
			}
		}
	}
	.tabTop{
		position: fixed;
		top: 50rpx;
		background-color: #000b1b;
		z-index: 99;
	}
	
	.list1{
		position: absolute;
		// margin-top: 560rpx;
		box-sizing: border-box;
		color: #8691be;
		width: 100%;
		padding: 10rpx 30rpx;
		z-index: 2;
		padding-bottom: 200rpx;
		transition: all .1s;
		.list-item{
			width: 100%;
			display: flex;
			flex-flow: row;
			align-items: center;
			min-height: 120rpx;
			border-bottom: solid 1rpx #13234c;
			.icon-x{
				margin-right: 30rpx;
			}
			.content{
				flex: 1;
				display: flex;
				flex-flow: column;
			}
			.price{
				font-size: 37rpx;
				font-weight: bold;
			}
		}
	}
	
	.list2{
		position: absolute;
		// margin-top: 560rpx;
		box-sizing: border-box;
		color: #8691be;
		width: 100%;
		padding: 10rpx 30rpx;
		z-index: 2;
		padding-bottom: 200rpx;
		transition: all .1s;
		.list-item{
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			color: #ebeced;
			min-height: 120rpx;
			border-bottom: solid 1rpx #13234c;
			.flexRow{
				display: flex;flex-flow: row;
				align-items: center;
				margin-bottom: 10rpx;
				.flexRow-c1{
					font-size: 32rpx;
				}
				.tx-status0{
					border: solid 1rpx #80561a;
					border-radius: 6rpx;
					color: #80571a;
					font-size: 22rpx;
					letter-spacing: 1rpx;
					padding: 0rpx 10rpx;
					margin-left: 10rpx;
				}
				.tx-status1{
					border: solid 1rpx #6f75d5;
					border-radius: 6rpx;
					color: #6f75d5;
					font-size: 22rpx;
					letter-spacing: 1rpx;
					padding: 0rpx 10rpx;
					margin-left: 10rpx;
				}
				.tx-status2{
					border: solid 1rpx #4badb5;
					border-radius: 6rpx;
					color: #4badb5;
					font-size: 22rpx;
					letter-spacing: 1rpx;
					padding: 0rpx 10rpx;
					margin-left: 10rpx;
				}
				.tx-status3{
					border: solid 1rpx #6d7d95;
					border-radius: 6rpx;
					color: #6d7d95;
					font-size: 22rpx;
					letter-spacing: 1rpx;
					padding: 0rpx 10rpx;
					margin-left: 10rpx;
				}
			}
			.date{
				font-size: 28rpx;
				letter-spacing: 1rpx;
				color: #46567d;
			}
		}
	}
	
	.fp-pop{
		position: fixed;
		z-index: 99999999;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,.3);
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		.box{
			width: 554rpx;
			height: 812rpx;
			background-color: rgba(43,62,131, .71);
			border-radius: 6px;
			border: solid 4rpx rgba(119, 180, 250, 0.61);
			display: flex;
			flex-flow: column;
			align-items: center;
			position: relative;
			.close{
				font-size: 30rpx;
				transform: scale(1.4,1.2);
				font-weight: 300;
				position: absolute;
				right: 30rpx;
				top: 20rpx;
				color: #9fb1f4;
			}
			.title{
				font-size: 40rpx;
				color: #e4e8f7;
				font-weight: bold;
				margin: 40rpx 0;
			}
			.cantent{
				width: 500rpx;
				height: 655rpx;
				background-color: rgba(57,75,143, 1);
				border-radius: 6rpx;
				display: flex;
				flex-flow: column;
				padding: 10rpx 50rpx;
				box-sizing: border-box;
				.content-top{
					flex: 1;
					font-size: 26rpx;
					color: #9fb1f4;
					display: flex;
					flex-flow: column;
					.content-top-title{
						font-size: 26rpx;
						color: #ffffff;
						margin: 20rpx 0;
					}
					.content-top-c{
						color: #778ee0;
						line-height: 2em;
					}
				}
				.content-bottom{
					border-top: solid 1px rgba(16,30,53, .2);
					box-sizing: border-box;
					text-align: center;
					padding: 20rpx;
					width: 100%;
					font-size: 30rpx;
					color: #68fffe;
				}
			}
		}
	}

	.di {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 107rpx;
		background-color: #031124;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 50rpx;
		z-index: 10;
		transition: all .1s; 
		.price{
			color: #ff9c0d;
			font-size: 40rpx;
		}
		.btn{
			width: 229rpx;
			height: 80rpx;
			background-color: #29498b;
			border-radius: 10rpx;
			font-size: 32rpx;
			letter-spacing: 1rpx;
			color: #ffffff;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			font-weight: 900;
		}
	}
	.date-box{
		width: 750rpx;
		height: 490rpx;
		background-color: #ffffff;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: fixed;
		bottom: 0;
		z-index: 9999;
		.date-title{
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			font-size: 31rpx;
			box-sizing: border-box;
			padding: 20rpx 60rpx;
			border-bottom: solid 1px #ededed;
		}
		// 日期选择样式
		.date-content{
			.date-picker{
				height: 420rpx;
			}
			.date-item{
				// 选项样式
				color: #000000;
				font-size: 39rpx;
				line-height: 1.8em;
				text-align: center;
			}
		}
	}
</style>
