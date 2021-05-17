<template>
	<view class="box">
		<goodsList :hotGoods="goodsList"  @goodsListId="goGoodsDetail"></goodsList>
		<view class="over" v-if="isTrue">
			-----我是有底线的-----
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue';
	export default {
		data() {
			return {
				goodsList:[],
				number:1,
				isTrue:false
			}
		},
		//子组件
		components:{
			goodsList
		},
		onLoad() {
			//获取推荐商品
			this.getGoodsList();
		},
		methods: {
			//获取商品列表的数据
			async getGoodsList(callback) {
				const res = await this.$myRuquest({
					url: '/api/getgoods?pageindex=' + this.number,
					// data:{
					// 	pageindex:this.number
					// }
				})
				//es6写法: this.goodsList = res.data.message;
				 this.goodsList = [...this.goodsList,...res.data.message]
				//console.log(res)
				callback && callback()
			//	console.log(this.goodsList)
			},	
			//点击下面的商品列表,跳转商品详情
			goGoodsDetail(e){
				//e是接收子元素传过来的ID
				console.log(e)
				const id=e
				uni.navigateTo({
					// 跳转到商品详情页,并吧id值传过去
					url:"../goodsDetail/goodsDetail?id="+id
				})
			}
		},
		//下拉触底事件
		onReachBottom(){
			console.log("触底了吗");
				 this.number++;
				 if(this.number>=3){
					 this.isTrue=true
					 return;
					 
				 }
				this.getGoodsList();		
		},
		//上拉刷新功能
			onPullDownRefresh: function() {
								//下拉刷新的时候请求一次数据
				      // console.log("上拉刷新功能");
							 this.number=1;
							 this.goodsList=[];
							 this.isTrue=false;
							 //为了防止,还在刷新还没有结束,就请求数据,我们可以把加载数据放入到定时器中
							 setTimeout(()=>{
									//注意this
										this.getGoodsList(()=>{
										uni.stopPullDownRefresh();
									});
										//为了防止,数据还没有请求完毕,就停止加载框,我们可以把他放入到回调中
									//uni.stopPullDownRefresh();
							 },1000)
							
							
				    },
	}
</script>

<style scoped>
	.box{
		background-color: #eee;
		 
	}
	.over{
		text-align: center;
		color: #666;
		padding: 20rpx 0;
	}

</style>
