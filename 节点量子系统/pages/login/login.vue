<template>
	<view>
		<view class="status_bar"></view>
		<Head :headTitle="headTitle" />
        <view class="remind">
            <text>手机号登录</text>
            <text>手机号登录更方便</text>
        </view>
		<view class="loginBox">
			<view class="PhoneBox">

				<input :class="[{'actived':phoneStatus},'phoneInput']" type="number" v-model="phoneNumber" maxlength="11"
				 placeholder="请输入手机号" placeholder-class="phonePClass" />
			</view>
			<view class="passBox">
				<view class="passBox_">
					
					<input :class="[{'actived':phoneStatus},'passInput']" type="number" v-model="verifyNumber" maxlength="6"
					 placeholder="请输入收到的短信验证码" placeholder-class="passPClass" />
				</view>
				<text @click="verifyBtn" :class="[{'actived-verifyText':phoneStatus},'verifyText']">{{verifyText}}</text>
			</view>
		</view>
		<!-- <button :class="[{'actived-loginBtn':phoneStatus},'loginBtn']" @click="loginBtn">登录</button> -->
		<button class="loginBtn" @click="loginBtn">登录</button>
        <view class="tishi">
			<view class='info'>
				<text>登录即代表您同意憨猴OS</text>
				<text @click="navClick('/pages/my/content?type=20')">《用户协议》</text>
				<text @click="navClick('/pages/my/content?type=10')">《隐私政策》</text>
			</view>
        </view>
	</view>
</template>

<script>
	import {
		httpRequest_,
		otherAPI
	} from 'pages/common/API.js';
	import Head from '../common/head.vue'
	export default {
		components: {
			Head
		},
		data() {
			return {
				// head
				headTitle: {
					title: '登录',
					color: '#FFF',
					size: '35.93rpx'
				},
				phoneNumber: '',
				verifyNumber: '',
				verifyText: '获取验证码',
				verifyDisabled:false
			}
		},
		onReady() {
			this.phoneNumber = uni.getStorageSync('phone') ? uni.getStorageSync('phone') : ''
		},
		computed: {
			phoneStatus() {
				if (this.phoneNumber.length > 0) {
					return true
				} else {
					return false
				}
			},
			verifyStatus() {
				if (this.verifyNumber.length > 0) {
					return true
				} else {
					return false
				}
			}
		},
		methods:{
			navClick(url) {
			    otherAPI.nav(url);
			},
			// 发送验证码
			verifyBtn() {
  
				if(!otherAPI.verifyPhone(this.phoneNumber)) {
					otherAPI.toast('手机号格式不正确', 'none', false, 1500);
					return false;
				}
				if (this.verifyDisabled) {
					return false;
				}
				let timer = ''
				let count = 60;
				let url = `/api/user/sendCode`;
				let obj = {
					mobile: this.phoneNumber
				}
				httpRequest_.post(url, obj).then(res => {
					if (res.code != 1) {
						otherAPI.toast(res.msg, 'none', false, 1500);
					} else {
						otherAPI.toast(res.msg, 'none', false, 1500);
						timer = setInterval(() => {
							this.verifyDisabled = true;
							this.verifyText = count + "秒";
							count--;
							if (count < 0) {
								this.verifyText = "重新发送"
								clearInterval(timer);
								this.verifyDisabled = false;
							}
						}, 1000);
					}
				});
			},
			// 登录
			loginBtn() {
				uni.navigateTo({
					url: '/pages/news/news'
				});
				if(!otherAPI.verifyPhone(this.phoneNumber)) {
					otherAPI.toast('手机号格式不正确', 'none', false, 1500);
					return false;
				}
				if(this.verifyNumber.length < 6) {
					otherAPI.toast('请输入正确验证码', 'none', false, 1500);
					return false;
				}
                //优化验证码[手机号有正则,不用优化],因为目前来看,输入点的时候,也能输入            
                //验证码转换成数组
                const newVerifyNumber=this.verifyNumber.split('');               
                const verifyNumberIndex=newVerifyNumber.findIndex(v=>v=='.')
                if(verifyNumberIndex!==-1){
                    otherAPI.toast('请输入正确验证码', 'none', false, 1500);
                    return false;
                }             
               //到这,优化验证码结束 
                                          
				let url = `/api/user/login`;
				let obj = {
					mobile: this.phoneNumber,
					code:this.verifyNumber
				}
				httpRequest_.post(url, obj).then(res => {
					if (res.code != 1) {
						otherAPI.toast(res.msg, 'none', false, 1500);
					} else {                
						uni.setStorageSync('data', res.data)  
						// uni.redirectTo({
						// 	url: '/pages/index/index'
						// });
                        
                        uni.switchTab({
                        	url: '/pages/index/index'
                        });
					}
				});
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: #18191d;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
    .remind{
        width: 624rpx;
        height: 245rpx;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .remind text:nth-child(1){
        font-size: 47.21rpx;
        color: #fff;
        margin-bottom: 20rpx;
    }
    .remind text:nth-child(2){
        font-size: 26rpx;
        color: #49494b;
       
    }


	.loginBox {
		width: 625rpx;
		height: 250rpx;
		margin:0  auto ;
	}

	.passInput,
	.phoneInput {
		display: inline-block;
		width: 350rpx;
		height: 89.44rpx;
		/* margin-left: 34.72rpx; */
	}

	.PhoneBox,
	.passBox {
		height: 125rpx;
		display: flex;
		align-items: center;
		border-bottom: 0.69rpx solid #292c30;
		color: #49494b;
		font-size: 34rpx;
	}

	.passBox {
		justify-content: space-between;
	}

	.passBox_ {
		display: flex;
		align-items: center;
	}

	.phonePClass,
	.passPClass {
		color: #49494b;
		font-size: 31.94rpx;
	}

	.verifyText {
		color: #15ecff;
	}

	.icon-shouji,
	.icon-mima {
		color: #081838;
		font-size: 38.19rpx;
	}

	.actived {
		color: #d3d4d9;
	}

	.icon-actived,.actived-verifyText {
		color: #15ecff;
	}

	.loginBtn {
		width: 625rpx;
		line-height: 100rpx;
		color: #18191d;
		font-size: 38rpx;
		background-color: #18191d;
        border-radius: 100rpx;
        background: linear-gradient(to right, #15ecff, #46c0ff);
        margin-top: 55rpx;
	}	
	/* .actived-loginBtn {
		color: #eaf1ff;
		background-color: #22376b;
	} */
    .tishi{
        width: 100%;
		position: fixed;
		bottom: 100rpx;
		text-align: center;
    }
	.info{
		width: 750rpx;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
	}
    .info text:nth-child(1){
        vertical-align: -2rpx;
    }
   
    .info text:nth-child(2),.info text:nth-child(3){
        color: #15ecff;

    }
</style>
