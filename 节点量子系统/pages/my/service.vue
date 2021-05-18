<template>
	<view>
		<view class="newHead" style="height: 128rpx;">
			<Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" :headPosition="headPosition" :headBackground='headBackground' />
		</view>
		<web-view  class="newIframe"  :src="url"></web-view>
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
                //head
                headTitle: {
                    title: '我的客服',
                    color: '#FFF',
                    size: '36rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#18191D',
                url:'',
                screenheight:'',
                newHeadHeight:'',
				picheight:''
			}
		},
        onLoad() {
			let _this = this
			_this.getService()  
			_this.$nextTick(res=> {
				const query = uni.createSelectorQuery().in(_this);                
				uni.getSystemInfo({
					success: function(res) {
						// 屏幕高度
						_this.screenheight = res.screenHeight
						query.select('.newHead').boundingClientRect(data => {        			
							_this.newHeadHeight = data.height
							_this.picheight = (_this.screenheight -_this.newHeadHeight) + 'px'
							// #ifdef APP-PLUS
							let height=0;//定义动态的高度变量，如高度为定值，可以直接写
							uni.getSystemInfo({
								//成功获取的回调函数，返回值为系统信息
								success: (sysinfo) => {
									height = sysinfo.windowHeight-_this.newHeadHeight;//自行修改，自己需要的高度
								},
								complete: () => {
								}
							});
							let currentWebview = _this.$scope.$getAppWebview();//获取当前web-view
							setTimeout(function() {
								let wv = currentWebview.children()[0];               
								wv.setStyle({//设置web-view距离顶部的距离以及自己的高度，单位为px
									top:_this.newHeadHeight,
									height:height
								})
							}, 1000);//如页面初始化调用需要写延迟
							// #endif
						}).exec();
					}
				});
			});
        },
		methods: {
            // 获取url
            getService() {
            	let url = `/api/base/service`;
            	let obj = {   		
            		token: uni.getStorageSync('data').token
            	}
            	
            	httpRequest_.get(url, obj).then(res => {
                    // console.log(res)
            		if (res.code == 1) {
                        this.url=res.data.data.url;
            		}
            	})
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
		}
	}
</script>

<style>
	.newHead{
		height: 128rpx; 
	}
    .newIframe{
     /*  position: absolute; 
       display: block; 
       border: 0px; 
       top: 128rpx; 
       bottom: 1462rpx; 
       width: 100%;
        height:1334rpx;
        z-index: -1 !important; */
	}

</style>
