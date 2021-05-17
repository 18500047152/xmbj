<template>
	<view>
			<button  @click="upImage">上传图片</button>
			<image v-for="(item,index) in newImage" :src="item" @click="preveImage(item)" ></image>
			<view>以下内容为跨端演示</view>
			<!--  #ifdef  H5 -->
			<view>我只在H5端显示</view>
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
				<view>我只在微信小程序端显示</view>
			<!--  #endif -->
		
	</view>	
</template>
<script>
	export default {
		data() {
			return {
					newImage:[]
			}
		},
		methods: {
			//点击按钮,上传图片功能
			upImage(){
				console.log("触发了");
				uni.chooseImage({
					count:9,
					success: (res) => {
						console.log(res.tempFilePaths)
						this.newImage=res.tempFilePaths;
					}
				})
			},
		//preveImage点击某个图片,进行预览
			preveImage(item){
				//index是newImage数组循环传过来的索引值	
				const newitem=item
				console.log(newitem)
					uni.previewImage({
						current:newitem,
						urls:this.newImage,
						indicator:"number",
						loop:true
						
					})
			}
		}
	}
</script>

<style scoped>
	.message-text{
		background-color: #007AFF;
	}
	.box{
		font-size: 30rpx;
		width: 300rpx;
		height: 1000rpx;
		background-color: #e4293c;
	}
	.newBox{
		background-color: green;
	}
	.hotPink{
		width: 200rpx;
		height: 200rpx;
		background-color: hotPink;
	}
	.newHotPink{
		background-color: white;
		}
	image{
		width: 100%;
	}
	.image-2{
		margin-top: -10rpx;
	}
	.newView{
		width: 100rpx;
		height: 100rpx;
		background-color: #E4293C;
	}
</style>
