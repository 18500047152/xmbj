<template>
	<view>
		<view class="newHead">
            <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" :headPosition="headPosition" :headBackground='headBackground' />
        </view>
		<web-view class="newText" :src="url"></web-view>   
	</view>
</template>

<script>
	import {
		api, apijl
	} from 'pages/common/http.js'
	import Head from '../common/head.vue'
	export default {
        components: {
            Head
        },
		data() {
			return {
                //head
                headTitle: {
                    title: '我的赞',
                    color: '#FFF',
                    size: '36rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#18191D',
				url: '',
                screenheight:'',
                newHeadHeight:'',
                picheight:''
			}
		},
		onLoad(options) {   
			let _this = this
			_this.getDetail(options.type)            
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
			getDetail(type) {
				if(type == 10) {
					this.url = api + '/home/index/index'
                    this.headTitle.title='憨猴OS隐私政策'
				} else {
					this.url = api + '/home/index/privacy'
                    this.headTitle.title='憨猴OS用户协议'
				}
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
    .newText{
     margin-top: 128rpx;  
    }
    
 /* .newIframe{
     position: absolute; 
     display: block; 
     border: 0px; 
     top: 128rpx; 
     bottom: 1462rpx; 
     width: 100%;
      height:1334rpx;    
    } */
   

</style>
