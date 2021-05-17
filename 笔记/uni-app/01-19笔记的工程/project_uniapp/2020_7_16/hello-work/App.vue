<script>
	export default {
		// 这是全局app的生命周期
		onLaunch: function() {
			console.log('app加载完毕---只触发一次--->app刷新会再次触发,App最小化,隐藏..等等,不会触发该函数')
		
		},
		onShow: function() {
			console.log('app显示---页面刷新,就会重新触发-->App最小化,打开..等等,会触发该函数');
		},
		onHide: function() {
			console.log('app-->最小化隐藏-->触发该函数')
		},
		onError(err) {
			console.log("应用报错,会触发该函数"+err)
		}
	}
</script>

<style>
	/* 引入全局 */
	@import url("/static/iconfont.css");
	/*每个页面公共css */
	body{
		/* background-color: #008000; */
	}
</style>
