<template>
	<view class="content" :style="'background-color:'+ headBackground+';'+'height:'+headHeight+';'+'position:'+headPosition">
		<!-- 状态栏 -->
		<view class="status_bar"></view>
		<view class="head">
			<text class="title" :style="'color:'+ headTitle.color+';'+'font-size:'+headTitle.size">{{headTitle.title}}</text>
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
			}
		},
		methods: {
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
	/* #endif */
</style>
