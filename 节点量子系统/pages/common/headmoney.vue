<template>
	<view class="content" :style="'background-color:'+ headBackground+';'+'height:'+headHeight+';'+'position:'+headPosition">
		<!-- 状态栏 -->
		<view class="status_bar"></view>
		<view class="head">
			<view class="returnImg" @click="returnClick">
				<image class="returnImg_" :src="headReturn.color == 'white' ? '/static/fanhui1.png' : '/static/fanhui.png'" mode=""
				 :class="[{isShow:headReturn.status!='isShow'}]"></image>
			</view>
			<text class="title" :style="'color:'+ headTitle.color+';'+'font-size:'+headTitle.size">{{headTitle.title}}</text>
			<text class="otherTitle" :style="'color:'+ headOtherText.color+';'+'font-size:'+ headOtherText.size" @click="otherClick(headOtherText.url)">{{headOtherText.text}}</text>			
            <view class="news" >
            	<image class="newsImg" src="/static/Tixian/icon.png" mode=""></image>          
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
    .newBj{
        background-image: url(../../static/Tixian/icon.png);
    }
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

	.returnImg {
		position: absolute;
		left: 0;
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
	}

	.returnImg_ {
		width: 22.91rpx;
		height: 41.66rpx;
	}

	.otherTitle,.otherIcon {
		position: absolute;
		right: 0rpx;
		font-size: 31.94rpx;
	}
   .news{
   	position: absolute;
   	right: 0;
   	width: 34rpx;
   	height: 34rpx;
   	display: flex;
   	align-items: center;
   }
   
   .newsImg {
   	position: absolute;
   	right: 0;
   	width: 34rpx;
   	height: 34rpx;
   	display: flex;
   	align-items: center;
   }

	/* #endif */
</style>
