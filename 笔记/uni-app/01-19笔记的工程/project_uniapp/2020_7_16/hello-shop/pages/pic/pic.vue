<template>
	<view class="pic">
		<scroll-view class="left" scroll-y>
			<view :class="active===index?'active':''" 
			v-for="(item,index) in cates "
			:key="index"
			@click="newActive(index,item.id)"
			
			>
				{{item.title}}
			</view>
			
		</scroll-view>
		<scroll-view class="right" scroll-y>
					<block
					v-for="(item,index) in rightCates "
					:key="index"
					>	
					<image :src="item.img_url" mode="widthFix"
					@click="preveImage(item.img_url)"
					>
					</image>
					<text>{{item.title}}</text>
					</block>
					<!-- 判断一下,没有数据,给它来个提示信息 -->
					<view class="over" v-if="rightCates.length>0?false:true">
						---暂无数据,关注后续更新---
					</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates:[],
				active:0,
				rightCates:[],	
			}
		},
		onLoad() {
			this.getPicCate()
		},
		methods: {
			//左侧数据
			async	getPicCate(){
				const res = await this.$myRuquest({
					url: '/api/getimgcategory'
				})
		//		console.log(res)
				this.cates=res.data.message;
				//这个是第一次默认加载,左侧第一个,显示右侧第一个数据
				this.newActive(0,this.cates[0].id)
			},
			
		async newActive(index,id){
			//点击左侧scroll-view,点中那个,那个栏选择
			this.active=index;
	//		console.log(id)
			//点击那个栏,然后获取那个栏对应右侧的数据
			const res = await this.$myRuquest({
				url: '/api/getimages/'+id
			})
			this.rightCates=res.data.message;
				console.log(this.rightCates)
		},
		//点击右侧图片,进行轮播图
		//preveImage点击某个图片,进行预览
					preveImage(itemUrl){
						//遍历右侧数组,把里面的url地址,取出来,放入一个数组内	
						 const urls=this.rightCates.map((item)=>{return item.img_url})
							console.log(urls)
						const newitemUrl=itemUrl
							uni.previewImage({
								current:newitemUrl,
								urls:urls,
								indicator:"number",
								loop:true							
							})
					}
		}
	}
</script>

<style scoped>
	page{
		height: 100%;
	}
	.pic{
	height: 100%;
	display: flex;
	}
.left{
		flex: 1;
		height: 100%;
		border-right:2rpx solid #eee;
		text-align: center;
		color: #333;
}
.left view{
	height: 120rpx;
	line-height: 120rpx;
	border-top:2rpx solid #eee;
}
.right{
		flex: 2;
		height: 100%;
		padding: 10rpx;
}
.right image{
	width: 460rpx;
	height: 460rpx;
	border-radius:40rpx;
	display: block;
	margin: 0 auto;
}
.right text{
	display: inline-block;
	margin: 20rpx 0;
}
/* 左侧scrll栏,第一个上边框 */
.number-one{
	border-top: 2px solid #EEEEEE;
}
.active{
	background-color: #B50E03;
	color: #FFFFFF;
}
.over{
	color: #333;
	}
</style>
