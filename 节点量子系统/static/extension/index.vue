<template>
	<view class="contentBox" :style="[{height:otherParams.height,'background-image':otherParams.backgroundImage}]">
		<Head :headTitle="headTitle" :headPosition="headPosition" :headBackground="headBackground" :headReturn="headReturn"
		 @returnClick="returnClick" />
		<!-- 从节点跳过来的样式 -->
		<view class="jieDian-url" v-if="param == 'node'">
			<text @click="copyUrl" v-if="param != 'node'" class="jiedian-copy">复制链接</text>
			<text @click="copyCode" v-if="param == 'node'" class="jiedian-copy">复制邀请码</text>
		</view>
		<!-- 从商家跳过来的样式 -->
		<view class="urlBox" v-if="param == 'shop'">
			<view class="url" v-if="business_count > 0">
				<view style="position: relative;" @click="goGive('shop')">
					<text class="surplus">剩余{{business_count}}个免费名额</text>
					<text class="give">赠送商家名额</text>
				</view>
				<text class="copy" @click="tuiGuang('shop')">推广商家</text>
			</view>
			<view class="url" v-else>
				<text class="copy_alone" @click="tuiGuang('shop')">推广商家</text>
			</view>
		</view>
		<!-- 从合伙人家跳过来的样式 -->
		<view class="urlBox" v-if="param == 'agent'">
			<view class="url" v-if="partner_count > 0">
				<view style="position: relative;" @click="goGive('agent')">
					<text class="surplus">剩余{{partner_count}}个免费名额</text>
					<text class="give">赠送合伙人名额</text>
				</view>
				<text class="copy" @click="tuiGuang('agent')">推广合伙人</text>
			</view>
			<view class="url" v-else>
				<text class="copy_alone" @click="tuiGuang('agent')">推广合伙人</text>
			</view>
		</view>
		<view class="popup" v-if="popupStatus">
			<text>{{popupText}}</text>
		</view>

		<!-- 消息弹框 -->
		<view class="sharepop" v-if="shareshow">
			<image class="popimg" src="../../static/copy.png" mode=""></image>
			<view class="close" @click="close()"></view>
			<view class="tclose" @click="close()"></view>
		</view>
		<!-- 海报消息弹框 -->
		<view class="sharepop" v-if="shareHBshow" style="z-index: 9;">
			<image class="popimg" src="../../static/haibaoOK.png" mode=""></image>
			<view class="close" @click="shareHBshow = false"></view>
			<view class="tclose" @click="shareHBshow = false"></view>
		</view>
		<!-- <view @click="startCanvas()" style="position: fixed;bottom: 0;color: #FFFFFF;z-index: 99999;">
			test
		</view> -->
		<!-- canvas -->
		<view v-if="shareCanvasShow" style="position: fixed;left: 0;top: 0;background-color: rgba(0,0,0,.2);height: 100vh;width: 100vw;display: flex;flex-flow: column;align-items: center;justify-content: center;">
			<canvas style="position: fixed;left: 300vw;" :style="{width: phoneW + 'px', height: phoneH +'px'}" canvas-id="shareCanvas"></canvas>
			<!-- <image :src="shareCanvasImg" style="width: 750rpx;height: 1300rpx;"></image> -->
			<!-- <view style="color: #FFFFFF;position: absolute;bottom: 0;" @click="saveCanvasImg()">
				保存分享
			</view> -->
		</view>
		<!-- canvas -->
	</view>
</template>
<script>
	import {
		httpRequest_,
		otherAPI
	} from 'pages/common/API.js';
	import Head from '../common/head.vue';
	// 引入文件
	import uniCopy from '../common/code.js';
	export default {
		components: {
			Head
		},
		data() {
			return {
				// head
				headTitle: {
					title: '推广节点',
					color: '#fff',
					size: '35.93rpx'
				},
				headReturn: {
					status: 'isShow',
					color: 'white'
				},
				headPosition: 'fixed',
				headBackground: '#000',
				info: {},
				param: '',
				hrefUrl: '123',
				otherParams: {},
				popupStatus: false,
				popupText: '邀请码复制成功',
				//赠送商家数量
				business_count: 0,
				//赠送合伙人数量
				partner_count: 0,
				//邀请码
				code: "",
				tui_money: '',
				shareshow: false,
				// canvas
				shareCanvasShow: false, // 生成中显示
				canvasCtx: '', // canvas对象
				phoneH: '', // 高度
				phoneW: '', // 宽度
				shareCanvasImg:"",
				shareHBshow:false, // 海报保存OK显示
			}
		},
		onLoad(option) {
			this.param = option.param;
			switch (option.param) {
				case 'node':
					this.headTitle.title = "节点推广";
					this.otherParams = {
						backgroundImage: 'url(../../static/extension/node.jpg)',
						height: '2102rpx'
					}
					break;
				case 'shop':
					this.headTitle.title = "商家推广";
					this.otherParams = {
						backgroundImage: 'url(../../static/extension/shop.jpg)',
						height: '1905rpx'
					}
					break;
				default:
					this.headTitle.title = "合伙人推广";
					this.otherParams = {
						backgroundImage: 'url(../../static/extension/agent.jpg)',
						height: '1773rpx'
					}
					break;
			}
			//页面刷新时候,进行请求
			this.getData();
		},
		computed: {
			shopUrl() {
				if (this.info.content) {
					return this.info.content.level2_url + '?code=' + this.info.code + '&type=10'
				}
			},
			agentUrl() {
				if (this.info.content) {
					return this.info.content.level3_url + '?code=' + this.info.code + '&type=20'
				}
			}
		},
		methods: {
			getData() {
				let url = '/api/user/generalize';
				let obj = {
					token: uni.getStorageSync('data').token
				}
				httpRequest_.post(url, obj).then(res => {
					this.info = res.data.data

					//复制页面一份
					this.code = res.data.data.code;
					const code = res.data.data.code;
					//通过code值,来获取获取商家赠送免费名额
					this.getUserInfo(code)
					this.getCommission(code)
				});
			},
			//封装推广赚X元,差优化
			getCommission(code) {
				//通过code值,获取推广赚X元 :api/point.index/getCommission
				// let url = 'http://devapi.yunduoke.cn/index.php?s=/api/point.index/getCommission';
				if (this.param == 'shop') {

					let url = `/api/point.index/getCommission`;
					let obj = {
						point_invite_code: code,
						type: 10,
					}
					httpRequest_.getjl(url, obj).then(res => {
						this.tui_money = res.data.share
					})
				} else {
					let url = `/api/point.index/getCommission`;
					let obj = {
						point_invite_code: code,
						type: 20,
					}
					httpRequest_.getjl(url, obj).then(res => {
						this.tui_money = res.data.share
					})
				}
			},
			getUserInfo(code) {
				// let url = `api/user/get_user_info`;
				// let obj = {
				//     point_invite_code: code
				// }
				// httpRequest_.get(url, obj).then(res => {
				//     if (this.param == 'shop') {
				//         //赠送商家数量
				//         this.business_count = res.data.user.business_count
				//     } else {
				//         //赠送合伙人数量
				//         this.partner_count = res.data.user.partner_count
				//     }
				// })

				let url = `api/user/get_share_code`;
				let obj = {
					point_invite_code: code,
					param: this.param
				}
				httpRequest_.get(url, obj).then(res => {
					if (res.code == 1) {
						this.share_code = res.data.data.share_code
						this.business_count = res.data.data.user.business_count
						this.partner_count = res.data.data.user.partner_count
					}
				})
			},
			returnClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			//点击复制邀请码
			copyCode() {
				if (!this.popupStatus) {
					setTimeout(() => {
						this.popupStatus = false;
					}, 2000)
				}
				uni.hideToast();
				if (this.popupStatus) {
					return false;
				}
				uni.hideToast();
				uniCopy({
					content: this.code,
					success: (res) => {
						uni.showToast({
							title: "邀请码复制成功",
							icon: 'none',
							success: () => {
								// setTimeout(() => {
								//     uni.redirectTo({
								//         url: '/pages/index/index'
								//     });
								// }, 2000)
							}
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
						})
					},
				})
			},
			//赠送商家名额
			goGive(param) {
				if (param == 'shop') {
					//如果赠送商家名额0,停止
					if (this.business_count == 0) {
						uni.showToast({
							title: '您没有赠送的名额',
							icon: 'none',
						});
						return
					}
					uniCopy({
						// content: this.info.content.level2_url + '?code=' + this.info.code + '&type=10' + '&isfree=1' + '&share_code=' + this.share_code,
						content: this.info.content.level2_url + '?code=' + this.info.code + '&type=10' + '&share_code=' + this.share_code,
						success: (res) => {
							this.shareshow = true
							// uni.showToast({
							// 	title: "复制成功，快去分享推广",
							// 	icon: 'none',
							// 	success: ()=> {
							// 		this.getUserInfo(this.code)
							// 	}
							// })
						},
						error: (e) => {
							uni.showToast({
								title: e,
								icon: 'none',
							})
						},
					})
				} else {
					//如果赠送合伙人名额0,停止
					if (this.partner_count == 0) {
						uni.showToast({
							title: '您没有赠送的名额',
							icon: 'none',
						});
						return
					}
					uniCopy({
						// content: this.info.content.level3_url + '?code=' + this.info.code + '&type=20' + '&isfree=1' + '&share_code=' + this.share_code,
						content: this.info.content.level3_url + '?code=' + this.info.code + '&type=20' + '&share_code=' + this.share_code,
						success: (res) => {
							this.shareshow = true
							// uni.showToast({
							// 	title: "复制成功，快去分享推广",
							// 	icon: 'none',
							// 	success: ()=> {
							// 		this.getUserInfo(this.code)
							// 	}
							// })
						},
						error: (e) => {
							uni.showToast({
								title: e,
								icon: 'none',
							})
						},
					})
				}
			},
			// 分享海报按钮
			tuiGuang(param) {
                this.reqCanvasQR()
			},
			copyUrl() {
				// #ifdef APP-PLUS
				let url = this.param == 'shop' ? this.shopUrl : this.agentUrl;
				if (!this.popupStatus) {
					setTimeout(() => {
						this.popupStatus = false;
					}, 2000)
				}
				uni.hideToast();
				if (this.popupStatus) {
					return false;
				}
				uni.setClipboardData({
					data: url,
					success: () => {
						uni.hideToast();
						this.popupStatus = true;
						if (this.param == 'shop') {
							this.popupText = '链接复制成功，赶紧去分享推广吧';
						} else {
							this.popupText = '保存成功，赶紧去分享推广吧';
						}
					},
					complete: () => {
						uni.hideToast();
					}
				});
				// #endif
			},
			// 关闭弹窗
			close() {
				this.shareshow = false
			},
			/* canvas */
			reqCanvasQR(){ // 点击生成
				this.shareCanvasShow = true // 显示遮罩
				let obj
				if(this.param == "shop"){
					//商家
					obj = {
						url: this.info.content.level2_url,
						point_invite_code: this.code,
					}
				}else if(this.param == "agent"){
					//合伙人
					obj = {
						url: this.info.content.level3_url,
						point_invite_code: this.code,
					}
				}
				let url = `api/sharing.index/qrcodes`;
				let QRpath 	// 需要缓存的图片
				httpRequest_.post(url, obj).then(res => {
					this.getImageInfo(res.data).then(res => {
						// 缓存文件路径
						QRpath = res.path
						// 缓存完毕 开始绘画
						this.startCanvas(QRpath)
					}).catch(err => console.log(err))
				})
				
				
			},
			getImageInfo(imgSrc){ // 获取网络图
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			},
			startCanvas(QRpath) { // 绘制
				// 先执行上方，将图片存到临时本地
				let _self = this // 避免使用uni封装方法导致this错误
				// 屏幕尺寸信息
				let phoneData = uni.getSystemInfoSync();
				// _self.phoneH = phoneData.windowHeight / 1.2;
				// _self.phoneW = phoneData.windowWidth - 20;
				_self.phoneH = 640;
				_self.phoneW = 360;
				uni.showLoading({
					title: '生成中...',
					mask: true,
					icon: "none"
				})
				let canvas = ()=>{
					// 画布s
					_self.canvasCtx = uni.createCanvasContext('shareCanvas');
					// 本地图片路径
					let imgPath = "/static/shareapp.jpg"
					let qrpath = QRpath
					let starpath = imgPath
					// 清空
					_self.canvasCtx.draw() //清空原来的画图内容
					// 保存
					_self.canvasCtx.save();
					//绘制背景图
					_self.canvasCtx.drawImage(starpath, 10, 10, (_self.phoneW - 20), (_self.phoneH -20))
					_self.canvasCtx.restore();
					// QR图
					_self.canvasCtx.drawImage(qrpath, (_self.phoneW - 94), (_self.phoneH -107), 60, 60)
					_self.canvasCtx.restore();
					// 绘画
					_self.canvasCtx.draw()
					// 生成成功 关闭加载
					uni.hideLoading()
				}
				// 延时调用，避免生成不全的问题
				setTimeout(()=>{
					canvas()
					setTimeout(()=>{ // 延时保存
						this.saveCanvasImg()
					},100)
				},100)
				
			},
			saveCanvasImg() { // 保存canvas
			let _self = this
				uni.showLoading({
					title: '保存中',
					mask: true,
					icon: "none"
				})
				// 画布 base64图片
				uni.canvasToTempFilePath({ // https://uniapp.dcloud.io/api/canvas/canvasToTempFilePath
					canvasId: 'shareCanvas',
					success(res) {
						uni.saveImageToPhotosAlbum({ // https://uniapp.dcloud.io/api/media/image?id=saveimagetophotosalbum
							filePath: res.tempFilePath,
							success: function() {
								// uni.showToast({
								// 	title: '图片保存成功～',
								// 	mask: true,
								// 	icon: "none"
								// });
								
								uni.hideLoading()
								// 关闭生成中遮罩
								_self.shareCanvasShow = false
								// 显示保存成功
								_self.shareHBshow = true
							},
							fail: function(err) {
								uni.showToast({
									title: '图片保存失败～',
									mask: true,
									icon: "none"
								});
								setTimeout(() => {
									uni.hideLoading()
								}, 1000)
							}
						});
						// _self.shareCanvasImg = res.tempFilePath
					},
					fail(err) {
						uni.showToast({
							title: '图片保存失败！',
							mask: true,
							icon: "none"
						});
						setTimeout(() => {
							uni.hideLoading()
						}, 1000)
					}
				})
			},
		}
	}
</script>

<style>
	.contentBox {
		position: relative;
		width: 100%;
		/* height: 2036rpx;
		background-image: url(../../static/agent.jpg); */
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/*  
	.contentBox {
		width: 541.66rpx;
		margin: 20rpx auto 0;
		color: #5c8bd5;
		font-size: 27.77rpx;
		border: 1.38rpx solid #4f7ec9;
		border-radius: 10rpx;
		background-color: #08172d;
		padding: 41.66rpx;
	}
*/
	.jieDian-url {
		width: 100%;
		padding-bottom: 18rpx;
		background-color: #000;
		position: fixed;
		bottom: 0;
		color: #5febeb;
		display: flex;
		justify-content: center;
	}

	.jiedian-copy {
		display: block;
		width: 706rpx;
		line-height: 94rpx;
		text-align: center;
		font-size: 30.55rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		background-color: #e4bc81;
	}

	.popup {
		opacity: 0;
		padding: 0 28rpx;
		height: 80rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(255, 255, 255, .3);
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: popup 2s ease;
		border-radius: 10rpx;
	}

	/* 赠送商家名额样式 */
	.urlBox {
		width: 100%;
		padding-bottom: 18rpx;
		background-color: #000;
		position: fixed;
		bottom: 0;
		color: #5febeb;
	}

	.url {
		width: 690rpx;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* give */
	.give {
		display: block;
		width: 330rpx;
		line-height: 94rpx;
		text-align: center;
		font-size: 30.55rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		border: 1rpx solid #e4bc81;
	}

	.surplus {
		padding: 5rpx 20rpx;
		position: absolute;
		top: -20rpx;
		right: -20rpx;
		font-size: 22rpx;
		color: #ffffff;
		background-color: #f83a16;
		border: 1rpx solid #ff907b;
		border-radius: 20rpx;
	}

	.surplus::after {
		display: block;
		content: '';
		border-width: 6px 6px 6px 6px;
		border-style: solid;
		border-color: #ff4d4d transparent transparent transparent;
		position: absolute;
		left: 20%;
		top: 100%;
	}

	.copy {
		display: block;
		width: 330rpx;
		line-height: 94rpx;
		text-align: center;
		font-size: 30.55rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		background-color: #e4bc81;
	}

	.copy_alone {
		display: block;
		width: 100%;
		line-height: 94rpx;
		text-align: center;
		font-size: 30.55rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		background-color: #e4bc81;
	}



	.popup text {
		color: #FFFFFF;
	}

	@keyframes popup {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.cs {
		position: fixed;
		bottom: 200rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #E29B1F;

	}

	.sharepop {
		width: 631rpx;
		height: 383rpx;
		margin: 0 auto;
		position: fixed;
		left: 60rpx;
		top: 35%;
	}

	.popimg {
		width: 631rpx;
		height: 383rpx;
	}

	.tclose {
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		top: 0;
		right: 68rpx;
	}

	.close {
		width: 250rpx;
		height: 80rpx;
		position: absolute;
		top: 238rpx;
		left: 180rpx;
	}
</style>
