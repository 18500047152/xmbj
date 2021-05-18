<template>
	<view class="content" :style="'background-color:'+ headBackground+';'+'height:'+headHeight+';'+'position:'+headPosition">
		<!-- 状态栏 -->
		<view class="status_bar"></view>
		<view class="head">
			<text class="home" :style="'color:'+ headOtherText.color+';'+'font-size:'+ headOtherText.size" @click="otherClick(headOtherText.url)">{{headOtherText.text}}</text>
			<text :class="['homeIcon iconfont',headOtherIcon.icon]" :style="'color:'+ headOtherIcon.color+';'+'font-size:'+headOtherIcon.size" @click="otherClick(headOtherIcon.url)"></text>
			<text class="title" :style="'color:'+ headTitle.color+';'+'font-size:'+headTitle.size">{{headTitle.title}}</text>
			<view class="news" @click="otherClick(newsIcon.url)">
				<image class="newsImg" src="/static/news.png" mode=""></image>
				<view class="have" v-if='have'></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			headTitle: {
				type: Object,
				default: {
					title: '',
					color: '',
					size: '30rpx'
				}
			},
			headReturn: {
				type: Object,
				default: () => {
					return {};
				}
			},
			headOtherText: {
				type: Object,
				default: () => {
					return {};
				}
			},
			headOtherIcon:{
				type: Object,
				default: () => {
					return {};
				}
			},
			newsIcon:{
				type: Object,
				default: () => {
					return {};
				}
			},
			headBackground: {
				type: String,
				default: ''
			},
			headHeight: {
				type: String,
				default: '129.16rpx'
			},
			headPosition:{
				type: String,
				default: 'relative'
			},
			have: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			otherClick(url) {
				this.$emit('otherClick', url);
			},
			returnClick() {
				this.$emit('returnClick', "returnClick");
			}
		}
	}
</script>

<style>
	/* #ifdef APP-VUE || H5 */
	
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 99998;
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

	.isShow {
		display: none;
	}
	.have{
		width: 14rpx;
		height: 14rpx;
		border-radius: 30rpx;
		background: #FFD200;
		position: absolute;
		border: 6rpx solid #000;
		top: -10rpx;
		right: -10rpx;
	}
	.news{
		position: absolute;
		right: 0;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
	}
	
	.newsImg {
		position: absolute;
		right: 0;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
	}

	.home,.homeIcon {
		position: absolute;
		left: 0rpx;
		font-size: 31.94rpx;
	}

	/* #endif */
</style>
