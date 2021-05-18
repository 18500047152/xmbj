<script>
	import {
		httpRequest_,
		otherAPI
	} from 'pages/common/API.js';
	export default {
		globalData: {
			navStatus: false
		},
		onLaunch: function() {
			 // uni.setStorageSync("region", region);
			// #ifdef APP-PLUS
			// 获取版本信息
			// plus.runtime.version
			
			// 接口获取版本信息，对比，如果不是最新，则下载
			let url = `/api/user/get_app_url`;
			let obj = {}
			httpRequest_.get(url, obj).then(res => {
                // console.log('版本更新了吗???',res)
				if (res.code == 1) {
					if(plus.runtime.version != res.data.data.app_ver) {
						uni.showModal({
							title: '版本更新' + res.data.data.app_ver,
							content: '',
							confirmText: "更新",
							showCancel: !res.forceUpdate,
							success: function(e) {
								if (e.confirm) {
									if (plus.os.name.toLowerCase() == 'ios') {
										// 跳转到下载页面
										plus.runtime.openURL(res.data.data.app_url)
									} else {
										var dtask = plus.downloader.createDownload(
											res.data.data.app_url, {},
											function(d, status) {
												uni.showToast({
													title: '下载完成',
													mask: false,
													duration: 1000
												});
												// 下载完成
												if (status == 200) {
													plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, e => e, function(error) {
														uni.showToast({
															title: '安装失败-01',
															mask: false,
															duration: 1500
														});
													})
												} else {
													uni.showToast({
														title: '更新失败-02',
														mask: false,
														duration: 1500
													});
												}
											});
										try {
											dtask.start(); // 开启下载的任务
											var prg = 0;
											var showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象 
											dtask.addEventListener('statechanged', function(
												task,
												status
											) {
												// 给下载任务设置一个监听 并根据状态  做操作
												switch (task.state) {
													case 1:
														showLoading.setTitle("正在下载");
														break;
													case 2:
														showLoading.setTitle("已连接到服务器");
														break;
													case 3:
														prg = parseInt(
															(parseFloat(task.downloadedSize) /
																parseFloat(task.totalSize)) *
															100
														);
														showLoading.setTitle("  正在下载" + prg + "%  ");
														break;
													case 4:
														plus.nativeUI.closeWaiting();
														//下载完成
														break;
												}
											});
										} catch (err) {
											plus.nativeUI.closeWaiting();
											uni.showToast({
												title: '更新失败-03',
												mask: false,
												duration: 1500
											});
										}
									}
								} else {
									//取消
								}
							}
						});
					}
				} else {
					otherAPI.toast(res.msg, 'none', false, 1500);
				}
			})
			
			// uni.request({
			// 	url: "http://2132", //请求更新地址
			// 	data: '',
			// 	success(res) {
			// 		if (!!res.data) {
			// 			uni.showModal({
			// 				title: '版本更新' + res.data.versionCode,
			// 				content: res.data.description,
			// 				confirmText: "更新",
			// 				showCancel: !res.forceUpdate,
			// 				success: function(e) {
			// 					if (e.confirm) {
			// 						if (plus.os.name.toLowerCase() == 'ios') {
			// 							// 跳转到下载页面
			// 							plus.runtime.openURL(res.data.upgradeUrl)
			// 						} else {
			// 							var dtask = plus.downloader.createDownload(
			// 								res.data.upgradeUrl, {},
			// 								function(d, status) {
			// 									uni.showToast({
			// 										title: '下载完成',
			// 										mask: false,
			// 										duration: 1000
			// 									});
			// 									// 下载完成
			// 									if (status == 200) {
			// 										plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, e => e, function(error) {
			// 											uni.showToast({
			// 												title: '安装失败-01',
			// 												mask: false,
			// 												duration: 1500
			// 											});
			// 										})
			// 									} else {
			// 										uni.showToast({
			// 											title: '更新失败-02',
			// 											mask: false,
			// 											duration: 1500
			// 										});
			// 									}
			// 								});
			// 							try {
			// 								dtask.start(); // 开启下载的任务
			// 								var prg = 0;
			// 								var showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象 
			// 								dtask.addEventListener('statechanged', function(
			// 									task,
			// 									status
			// 								) {
			// 									// 给下载任务设置一个监听 并根据状态  做操作
			// 									switch (task.state) {
			// 										case 1:
			// 											showLoading.setTitle("正在下载");
			// 											break;
			// 										case 2:
			// 											showLoading.setTitle("已连接到服务器");
			// 											break;
			// 										case 3:
			// 											prg = parseInt(
			// 												(parseFloat(task.downloadedSize) /
			// 													parseFloat(task.totalSize)) *
			// 												100
			// 											);
			// 											showLoading.setTitle("  正在下载" + prg + "%  ");
			// 											break;
			// 										case 4:
			// 											plus.nativeUI.closeWaiting();
			// 											//下载完成
			// 											break;
			// 									}
			// 								});
			// 							} catch (err) {
			// 								plus.nativeUI.closeWaiting();
			// 								uni.showToast({
			// 									title: '更新失败-03',
			// 									mask: false,
			// 									duration: 1500
			// 								});
			// 							}
			// 						}
			// 					} else {
			// 						//取消
			// 					}
			// 				}
			// 			});
			// 		} else {
			// 			uni.showModal({
			// 				title: '提示',
			// 				content: '已是最新版本',
			// 				showCancel: false
			// 			});
			// 		}
			// 	},
			// })
			// #endif
			const data = uni.getStorageSync('data').token
			if (!data) {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("pages/common/iconfont.css");
    
	.detail-content img{
    	width: 100%;
    	margin: 32rpx 0;
    }
	.uni-tabbar{
	    height: 104rpx;
	   
	}
	.uni-tabbar-border{
	    background-color: rgba(0, 0, 0, 0) !important;
	}
	.uni-tabbar__icon{
	    width: 46rpx !important;
	    height: 44rpx !important;
	    }
	.uni-tabbar__label{
	  font-size: 22.45rpx !important;
	}
	uni-rich-text img{
		width: 100%;
	}
    
    page{
		background: #18191D;
	}
</style>
