<template>
	<view>
		<view class="box" @click="toIndex">
			我是首页index页面的组件-->这是父组件传过来的密码:{{newTitle}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'张三'
			};
			
		},
		// props:[
		// 	"newTitle"
		// ],
		props:{
			"newTitle":String
		},
		methods:{
			toIndex(){
				console.log("打印成功");
				this.$emit("toIndex",this.user)
			}
		}
		
	}
</script>

<style>
.box{
	background-color: #6cd3ff;
}
</style>
