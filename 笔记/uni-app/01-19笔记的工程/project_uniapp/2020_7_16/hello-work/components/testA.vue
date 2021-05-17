<template>
	<view >
		我是A组件，点击修改B组件的密码:<button @click="goTestB">修改密码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPassWord:772215
			};
		},
		methods:{
			goTestB(){
				uni.$emit("testA",this.newPassWord)
		}
		}
		
	}
</script>

<style>

</style>
