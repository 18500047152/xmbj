<template>
    <view>
        <Head :headTitle="headTitle" :headReturn="headReturn" :headPosition="headPosition" :headBackground='headBackground'
            @returnClick="returnClick">
        </Head>

        <view class="box">
            <view class="msg">
                {{current}} / {{imgarr.length}}
            </view>
            <swiper class="swiper" duration="500" @change="changeIMG" :current='newCurrent'>
                <swiper-item v-for="(item, index) in imgarr" :key="index">
                    <view class="swiper-item">
                        <image :src="item" mode=""></image>
                    </view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    import Head from '../common/head.vue'
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '查看大图',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000000',
                imgarr: [
                    "https://ncdn.camarts.cn/1739332d.jpg",
                    "https://ncdn.camarts.cn/1739332d.jpg",
                    "https://ncdn.camarts.cn/1739332d.jpg",
                ],
                current: 1,
                newCurrent: 3,
            }
        },
        onLoad(options) {
            this.imgarr = options.newArr.split(",")
            this.newCurrent = Number(options.index);
            this.current = Number(options.index) + 1;
            // https://uniapp.dcloud.io/api/media/image?id=unipreviewimageobject
            //  uni.previewImage({
            // 	urls: this.imgarr,
            // 	longPressActions: {
            // 		itemList: ['发送给朋友', '保存图片', '收藏'],
            // 		success: function(data) {
            // 		},
            // 		fail: function(err) {
            // 		}
            // 	}
            // });
        },
        methods: {
            changeIMG(e) {
                this.current = e.detail.current + 1
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                })
            },
        },

    }
</script>

<style lang="scss">
    page {
        background-color: #000000;
        font-family: system-ui; // 统一字体，删除随意不影响
    }

    .msg {
        position: fixed;
        top: 150rpx;
        text-align: center;
        color: #FFFFFF;
    }

    .box {
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
    }

    .swiper {
        width: 100vw;
        height: 100vh;

        .swiper-item {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;

            image {
                width: 750rpx;
                height: 545rpx;
            }
        }
    }
</style>
