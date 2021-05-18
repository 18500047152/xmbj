<template>
    <view>
        <Head :headTitle="headTitle" :headPosition="headPosition" :headBackground="headBackground" :headReturn="headReturn"
            @returnClick="returnClick" />
        <!-- 佣金通知 -->
        <view class='boxshow'>
            <!-- <view class="item" v-for="(i, index) in data" :key='index'>
				<view class="info">{{i.title}}</view>
				<view class="show">推广类型：<text>{{i.type}}</text></view>
				<view class='show'>推广金额：<text>￥{{i.money}}</text></view>
				<view class='show'>获得返利：<text>￥{{i.return}}</text></view>
			</view> -->
            <view class="item" v-if='list.length > 0' v-for="(i, index) in list" :key='index'>
                <view class="time">
                    <view class='timebg'>
                        <image v-if='index == 0' src='../../static/rbg.png'></image>
                        <image v-else-if='index == list.length - 1' src='../../static/lbg.png'></image>
                        <image v-else src='../../static/nbg.png'></image>
                    </view>
                    <view class='timeshow'>{{i.create_time}}</view>
                </view>
                <view class="info">
                    <view class="infobg">
                        <!-- <image v-if='index < list.length - 1' src='../../static/border.png'></image> -->
                    </view>
                    <view class="des">
                        <view class="title" v-if="(current_page == last_page) && index == list.length - 1">欢迎注册</view>
                        <view class="title" v-else>邀请成功</view>
                        <view class="showinfo">{{i.msg_content}}</view>
                    </view>
                </view>
            </view>

            <!-- 无通知 -->
            <view class="nullMsg" v-if="list.length == 0">
                还没有任何消息~
            </view>
            <!-- <view class="item">
				<view class="time">
					<view class='timebg'>
						<image src='timegb'></image>
					</view>
					<view class='timeshow'>2020-08-05 13:00</view>
				</view>
				<view class="info">
					<view class="infobg"></view>
					<view class="des">
						<view class="title">邀请成功</view>
						<view class="showinfo">恭喜您成功邀请【13315441666】节点加入到憨猴OS大家庭，快带小伙伴开启赚钱之旅吧~</view>
					</view>
				</view>
			</view> -->

        </view>

    </view>
</template>

<script>
    import Head from '../common/head.vue'
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    export default {
        components: {
            Head
        },
        data() {

            return {
                // head
                headTitle: {
                    title: '邀请通知',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#18191D',
                list: [],
                current_page: 1,
                last_page: 1,
                //节点等级/20为大节点,10为小节点
                levelIdentity: '',
            }
        },
        onShow() {
            // this.getinfo();
            this.getPageData()
        },
        methods: {
            //获取当前用户等级//节点等级/20为大节点,10为小节点
            // getinfo(){
            //     //获取用户ID拿到身份
            //     let url = `/api/user/get_user_id`;
            //     let obj = {
            //     	token: uni.getStorageSync('data').token,
            //         user_id:uni.getStorageSync('data').user_id.user_id
            //     }
            //     httpRequest_.get(url, obj).then(res => {                  
            //          this.levelIdentity = res.data.userInfo.level  
            //          this.getPageData()

            //     })             
            // },


            // API METHODS 08-11 *gjq
            getPageData() {
                // let url = `/api/operation.message/get_message`;
                let url = `/api/operation.message/get_message`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    msg_type: 2,
                    page: this.current_page
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        let newArr = res.data.lists.data
                        if (this.current_page == 1) {
                            this.list = res.data.lists.data
                            this.current_page = res.data.lists.current_page
                            this.last_page = res.data.lists.last_page
                        } else {
                            this.list = this.list.concat(newArr)
                            this.last_page = res.data.lists.last_page
                        }
                    }
                    if (res.data.lists.data.length > 0) {
                        // 发送已读
                        this.readMsg()
                    }
                })

                // httpRequest_.get(url, obj).then(res => {
                // 	if(res.code == 1) {
                // 		this.list = res.data.lists.data
                // 		for (let value of res.data.lists.data) {
                // 			value.title = "邀请成功"
                // 			// let a = value.msg_content.split("！")
                // 		}
                // 		// let first = {create_time: '2020-08-05 10:11', title: '欢迎注册', msg_content: '欢迎注册【憨猴OS】在这里您也可邀请更多小伙伴一起来参与赚钱之旅，赶快去邀请吧~'}
                // 		// this.list.push(first)
                // 		if(res.data.lists.data.length > 1){
                // 			// 发送已读
                // 			// this.readMsg()
                // 		}
                // 	}
                // })
            },
            readMsg() {
                let url = `/api/operation.message/type_reade`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    msg_type: 2 // 2 邀请通知
                }
                httpRequest_.get(url, obj).then(res => {
                })
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
        },
        // 到底触发
        onReachBottom: function() {
            if (this.current_page >= this.last_page) {
                uni.showToast({
                    title: "没有更多数据了",
                    icon: 'none',
                })
            } else {
                this.current_page++
                this.getPageData()
            }
        },
    }
</script>

<style>
    page {
        background-color: #18191d;
    }

    .boxshow {
        padding: 130rpx 0 30rpx;
    }

    .item {
        box-sizing: border-box;
        width: 690rpx;
        margin: 0rpx auto;
        border-radius: 4rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .time {
        width: 690rpx;
        height: 70rpx;
        line-height: 70rpx;
        color: #46567d;
        display: inline-flex;
    }

    .timebg {
        width: 40rpx;
    }

    .timebg image {
        width: 40rpx;
        height: 70rpx;
    }

    .timeshow {
        width: 650rpx;
        font-size: 26rpx;
		color: #6b7177;
    }

    .info {
        width: 690rpx;
        display: inline-flex;
    }

    /* .infobg{width:40rpx; height: 1rpx;} */
    .infobg {
        width: 2rpx;
        background: #25304D;
        margin: 0 19rpx;
    }

    .item:last-child .infobg {
        background: none;
    }

    /* .infobg image{width: 40rpx;} */
    .des {
        box-sizing: border-box;
        width: 650rpx;
        padding: 40rpx;
        background: #212428;
    }

    .title {
        color: #C9CED4;
        font-weight: bold;
        font-size: 34rpx;
    }

    .showinfo {
        color: #6B7177;
        font-size: 26rpx;
        margin-top: 20rpx;
    }

    /* 08-11  */
    .nullMsg {
        font-size: 26rpx;
        text-align: center;
    }
</style>
