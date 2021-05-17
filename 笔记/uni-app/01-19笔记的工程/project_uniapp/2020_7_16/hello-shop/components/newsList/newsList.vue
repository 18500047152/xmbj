<template>
	<view>
		<view class="information" v-for="(item,index) in newsList" :key="index"
		@click="goNewsDetail(item.id)"
		>
			<view class="left">
				<image :src='item.img_url'></image>
			</view>
			<view class="right">
				<view class="title">
					{{item.title}}
				</view>
				<view class="time">
					<text class="time-left">
						<!--.slice(0,10) 
						获取到的时间格式: 2015-04-16T03:50:28.000Z  
						之前用的是字符串截取,不太好,这会用过滤器
						-->
						发表时间：{{item.add_time | newTime}}
					</text>
					<text class="time-right">
						浏览:{{item.click}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		//接收父组件传过来的数据
		props: ["newsList"],
		// 过滤器
		filters: {
			newTime(data) {
				// 2015-04-16T03:50:28.000Z
				//第一步,时间转换,获取当前时间--->Thu Apr 16 2015 11:50:28 GMT+0800
				const newData=new Date(data);
				//第二步:提取到需要的年月日
				const year=newData.getFullYear();
				//第三步:处理10月份以下的月份,前面+0;-->下面是三目表达式写法
				//const month=newData.getMonth()+1<10?'0'+(newData.getMonth()+1):newData.getMonth()+1;
				//-->可以用es6写法.toStrong[转换成字符串].padStart('小于几位[2就是小于2位]',0小于2位加0)
				//const month=(newData.getMonth()+1).toString().padStart(2,0);代码少了
				const month=(newData.getMonth()+1).toString().padStart(2,0);
				const date=newData.getDate();
				
				return year+"-"+month+"-"+date
			}
		},
		methods:{
			//子对父传参
			goNewsDetail(id){
				this.$emit("goNewsDetail",id)
			}
		}
	}
</script>

<style scoped>
	.information {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 2rpx solid #B50E03;
	}

	.left {
		flex: 1;
	}

	.left image {
		width: 200rpx;
		height: 150rpx;
	}

	.right {
		flex: 3;
		padding: 0 10rpx 10rpx;
		display: flex;
		/* 让2个div,Y抽排布 */
		flex-direction: column;
		/* 让两个div,两端对齐 */
		justify-content: space-between;
	}

	.title {
		font-size: 30rpx;
	}

	.time {
		font-size: 24rpx;
		overflow: hidden;

	}

	.time-left {
		float: left;
	}

	.time-right {
		float: right;
	}
</style>
