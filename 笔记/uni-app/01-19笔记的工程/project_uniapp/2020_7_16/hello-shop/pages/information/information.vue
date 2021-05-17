<template>
	<view>
		<newsList :newsList="newsList" @goNewsDetail='goNewsDetail' ></newsList>
	</view>
</template>
<script>
	import newsList from '../../components/newsList/newsList.vue'
	export default {
		data() {
			return {
				newsList:[]
			}
		},
		onLoad() {
			this.getInformation();
		},
		//子组件
		components:{
			newsList
		},
		methods: {
		async	getInformation(){
				const res=await this.$myRuquest({
					url:'/api/getnewslist'
				})
				this.newsList=res.data.message;
				console.log(this.newsList)
			},
			//点击咨询列表页,实现页面跳转,跳转-->新闻详情,并传参
			goNewsDetail(id){
				console.log("触发了吗"+id)
				uni.navigateTo({
					url:"../newsDetail/newsDetail?id="+id
				})
			}
			
			
			
		}
	}
</script>

<style scoped>
	.information{
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 2rpx solid #B50E03;
	}
	.left {
		flex: 1;
	}
	.left image{
		width: 200rpx;
		height: 150rpx;
	}
	.right{
		flex: 3;
		padding: 0 10rpx 10rpx;
		display: flex;
		/* 让2个div,Y抽排布 */
		flex-direction: column;
		/* 让两个div,两端对齐 */
		justify-content: space-between;
	}
	.title{
		font-size: 30rpx;
	}
	.time{
		font-size: 24rpx;
		overflow: hidden;
	
	}
	.time-left{
		float: left;
	}
	.time-right{
		float: right;
	}

</style>
