<template>
	<view>
		<view class="goodsDetail" v-for="(item,index) in goodsDetail">
			<view class="title">
				{{item.title}}
			</view>
			<view class="time">
				<text>发表时间:{{item.add_time | newTime}}</text>
				<text>浏览:{{item.click}}</text>
			</view>
			<view class="content">
				<!-- 带有标签的内容,直接{{item.content}}取值,会把标签页打印到页面上,可以用富文本标签,rich-text处理 -->
				<!-- 	{{item.content}}-->
				<rich-text :nodes="item.content"></rich-text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsDetail: []
			}
		},
		filters: {
			newTime(data) {
				// 2015-04-16T03:50:28.000Z
				//第一步,时间转换,获取当前时间--->Thu Apr 16 2015 11:50:28 GMT+0800
				const newData = new Date(data);
				//第二步:提取到需要的年月日
				const year = newData.getFullYear();
				//第三步:处理10月份以下的月份,前面+0;-->下面是三目表达式写法
				//const month=newData.getMonth()+1<10?'0'+(newData.getMonth()+1):newData.getMonth()+1;
				//-->可以用es6写法.toStrong[转换成字符串].padStart('小于几位[2就是小于2位]',0小于2位加0)
				//const month=(newData.getMonth()+1).toString().padStart(2,0);代码少了
				const month = (newData.getMonth() + 1).toString().padStart(2, 0);
				const date = newData.getDate();

				return year + "-" + month + "-" + date

			}
		},
		onLoad(options) {
			console.log(options.id)
			//接收资讯列表传过来的id值
			if (options.id == undefined) {
				const newId = 13;
				this.getGoodsDetail(newId)
			} else {
				const newId = options.id;
				this.getGoodsDetail(newId)
			}

		},
		methods: {
			async getGoodsDetail(id) {
				//	console.log(newId)
				const res = await this.$myRuquest({
					url: '/api/getnew/' + id
				})
				this.goodsDetail = res.data.message
				console.log(this.goodsDetail)
			}

		}
	}
</script>

<style scoped>
	page {
		padding: 0 20rpx;
	}

	.box {
		background-color: #007AFF;
		color: #fff;
		margin: 10rpx 0;
	}

	.title {
		text-align: center;
	}

	.title,
	.time {
		font-size: 30rpx;
	}

	.time {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
	}
</style>
