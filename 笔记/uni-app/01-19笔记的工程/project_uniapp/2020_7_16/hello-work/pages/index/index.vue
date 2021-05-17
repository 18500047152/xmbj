<template>
	<view class="content">
		<test :newTitle="title" @toIndex="toTest"></test>
		这是子组件传过来的用户：{{user}}
		<view class="">
			-----------------------------------------------------------------------------------
		</view>
		<testA></testA>
		<testB></testB>
			<view>
			    <uni-calendar 
			    :insert="true"
			    :lunar="true" 
			    :start-date="'2019-3-2'"
			    :end-date="'2019-5-20'"
			    @change="change"
			     />
			</view>
	</view>
</template>

<script>
	import test from '../../components/test.vue';
	import testA from '../../components/testA.vue';
	import testB from '../../components/testB.vue';
	//引入插件
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	
	export default {
		data() {
			return {
			title:"123456",
			user:''
			}
		},
		components:{
			test,
			testA,
			testB,
			// 定义插件
			uniCalendar
		
		},
		onLoad() {

		},
		methods: {
		toTest(e){
			console.log(e)
			this.user=e
		}
		}
	}
</script>

<style>
	
</style>
