<template>
	<view>
		<!-- <image src="../../static/newHome.png" mode="scaleToFill"></image> -->
        <view class="qd1">
            <image src="../../static/qd1.png" mode=""></image>
        </view>
        <view class="qd2">
            <image src="../../static/qd2.png" mode=""></image>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
        onShow() {
           setTimeout(() => {
               console.log('执行了吗')
               // return false;
              uni.redirectTo({     
                  url:"/pages/login/login"
              })
           }, 3000)
        },
		methods: {
			
		}
	}
</script>

<style>
    page {
       width: 100%;
        height: 100%;
       /* background-color: #090f2c; */
       background-color: #090f2c;
      /* background-image: url(../../static/newHome.png);
       background-size: 100% 100%;
       background-repeat: no-repeat; */
        
    }
    .qd1 image{
        width: 750rpx;
        height: 760rpx;
        margin: 0 auto;
    }
    .qd2 image{
        width: 750rpx;
        height: 123rpx;
        margin: 200rpx auto 0;
    }
  
</style>
