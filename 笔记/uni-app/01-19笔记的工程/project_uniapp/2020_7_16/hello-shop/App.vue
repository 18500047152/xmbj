<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>

	/*每个页面公共css */
	@import url("utils/iconfont");
	@import url("utils/new_iconfont");
	body{
	/* background-color:#EEEEEE; */
	}
	/* 富文本内的图片,宽高比不对,找到富文本图片内的类名,把这个类名,放到全局App.vue中就ok	
	.gomeImgLoad{
		width: 100% !important;
		height: auto;
	}
	 */
	.gomeImgLoad{
		width: 100%;
		height: auto;
	}
</style>
