<!-- 转赠积分 -->
<template>
    <view>
        <!-- head头部开始 -->
        <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" />
        <!-- head头部结束 -->
        <!-- 输入框开始 -->
        <view class="BonusPoints">
            <!-- 背景图片 -->
            <image src="../../static/zhuanzengjifen.jpg" mode="widthFix"></image>
            <view class="loginBox">
                <view class="PhoneBox">
                    <!-- maxlength="11" 是input标签可输入的最大长度 -->
                    <text class="user" space="emsp">账 号</text><input class='phoneInput' type="number" maxlength="11" v-model="phoneNumber"
                        placeholder="请输入手机号" placeholder-class="phonePClass" />
                </view>
                <view class="passBox">
                    <view class="passBox_">
                        <text class="user">积分数</text><input class='passInput' type="number" v-model="jfNumber" placeholder="请输入积分数" placeholder-class="passPClass"  />
                    </view>
                </view>
            </view>
            <button :class="[{'actived-giveBtn':isActive},'giveBtn']" @click="giveBtn">转赠</button>
        </view>
    </view>
    <!-- 输入框结束 -->
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
                    title: '转赠积分',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                phoneNumber: '',
                jfNumber: '',

            }
        },
        onShow() {
            //token值
            const data = uni.getStorageSync('data').token
        },
        //账号输入后,转增按钮变白
        computed: {
            isActive() {
                if (this.phoneNumber.length > 0) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },          
            //点击转赠按钮
            giveBtn() {
                if (this.phoneNumber == '' || this.phoneNumber.length == 0) {
                    otherAPI.toast('请填写账号', 'none', false, 1500);
                    return false;
                }
                if (this.jfNumber == '' || this.jfNumber.length == 0) {
                    otherAPI.toast('请填写积分数', 'none', false, 1500);
                    return false;
                }
                //优化账号积分,因为目前来看,输入点的时候,也能输入            
                //手机号转换成数组
                const newPhoneNumber = this.phoneNumber.split('');
                //用findIndex遍历数组,如果没有点返回-1,如果有点返回对应索引值
                const phoneNumberIndex = newPhoneNumber.findIndex(v => v == '.')
                if (phoneNumberIndex !== -1) {
                    otherAPI.toast('账号填写错误', 'none', false, 1500);
                    return false;
                }
                //积分转换成数组
                const newjfNumber = this.jfNumber.split('');
                const jfNumberIndex = newjfNumber.findIndex(v => v == '.')
                if (jfNumberIndex !== -1) {
                    otherAPI.toast('积分填写错误', 'none', false, 1500);
                    return false;
                }
                //模态框提示登录成功
                uni.showModal({
                    confirmText:'转赠',
                    title: '温馨提示',
                    content: '确定给好友转赠吗?',
                    success: (res) => {
                        if (res.confirm) {
                            //发送赠送积分接口                      
                            this.getAddScore();
                        } else if (res.cancel) {
                        }
                    }
                });
            },
            //赠送积分接口
            getAddScore() {
                let url = `api/user.score_change/add_score`;
                let obj = {
                    mobile: this.phoneNumber,
                    score: this.jfNumber,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code != 1) {
                        // 这一步是没有找到用户'                                 
                        if(res.msg=='没有找到用户'){
                        //模态框提示登录成功
                        uni.showModal({
                            cancelText:'知道了',
                            confirmText:'邀请',
                            title: '温馨提示',
                            content: '该用户还没有开通节点，不可以转赠；您可以邀请TA开通节点呦。',
                            success: (res) => {
                                if (res.confirm) {
                                    // ('用户点击确定');
                                    //发送赠送积分接口                      
                                    uni.navigateTo({
                                        url:'../extension/index?param=node'
                                    })                                 
                                } else if (res.cancel) {
                                }
                            }
                        });
                      }else{
                          otherAPI.toast(res.msg, 'none', false, 1500);       
                      }  
                        
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                });
            }
        }
    }
</script>

<style>
    page {
        background: #000B1D;
    }

    .BonusPoints image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    /* 输入框 */
    .loginBox {
        position: absolute;
        top: 500rpx;
        left: 30rpx;
        width: 100%;
        width: 616rpx;
        height: 210rpx;
        background-color: #FFFFFF;
        border-radius: 30rpx;
        padding: 60rpx 37rpx;
    }

    .user {
        color: #333333;
        font-size: 30.55rpx;
        margin-right: 25rpx;
    }

    .passInput,
    .phoneInput {
        display: inline-block;
        width: 465rpx;
        height: 88rpx;
        border: 1rpx solid #dedee9;
        padding-left: 23rpx;
    }

    .PhoneBox,
    .passBox {
        display: flex;
        align-items: center;
        color: #4c5c85;
        font-size: 31.94rpx;
    }

    .passBox {
        justify-content: space-between;
        margin-top: 28rpx;
    }

    .passBox_ {
        display: flex;
        align-items: center;
    }

    .phonePClass,
    .passPClass {
        color: #999999;
        font-size: 30.55rpx;
    }

    .verifyText {
        color: #12254c;
    }

    .icon-shouji,
    .icon-mima {
        color: #081838;
        font-size: 38.19rpx;
    }

    .actived {
        color: #eaf1ff;
    }

    .icon-actived,
    .actived-verifyText {
        color: #227eea;
    }

    .giveBtn {
        position: absolute;
        top: 873rpx;
        left: 30rpx;
        width: 690rpx;
        height: 106rpx;
        line-height: 106rpx;
        color: #4c5c85;
        font-size: 34.83rpx;
        font-weight: bold;
        background-color: #081838;
    }

    .actived-giveBtn {
        color: #eaf1ff;
        /* background-color: #22376b; */
    }
</style>
