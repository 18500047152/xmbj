<template>
	<view>
			我是B组件，我的密码为：{{password}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:123456
			};
		},
		created() {
			uni.$on('testA',res=>{
				console.log(res)
				this.password=res
			})
		},
		methods:{
			
		}
	}
</script>

<style>

</style>
