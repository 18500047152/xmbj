<template>
    <view>
        <!-- head头部开始 -->
        <block>
            <view class="newHead" @touchstart="touchstart">
                <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" :headPosition="headPosition"
                    :headBackground="headBackground" />
            </view>
        </block>
        <block v-if="isTop">
            <view class="contentHead" :style="'background-color:'+ headBackground+';'+'height:'+headHeight+';'+'position:'+headPosition" @touchstart="touchstart">
                <!-- 状态栏 -->
                <view class="status_bar"></view>
                <view class="head">
                    <view class="returnImg" @click="returnClick">
                        <image class="returnImg_" src="/static/fanhui1.png" mode=""></image>
                    </view>
                    <!-- <input v-model="searchContent" class="searchInput" type="text" placeholder="请输入关键字" placeholder-class="placeSearchInput" /> -->
                    <image class="headImage" style="width: 65rpx; height: 65rpx;" src="../../static/logoNew2.png" mode=""></image>
                    <text class="headText">憨猴OS</text>
                </view>
            </view>
        </block>

        <!-- head头部结束 -->
        <view class="total" @touchstart="touchstart" >
            <!-- 文章 -->
            <view class="article">
                <!-- 标题 -->
                <view class="article-title">
                    {{detail.detail.article_title}}
                </view>
                <view class="time">
                    <image src="../../static/logoNew2.png" mode=""></image>
                    <text>憨猴OS</text>
                    <text> {{detail.detail.view_time}}</text>
                </view>
                <view class="article-two-title">
                    <text> {{detail.detail.article_subtitle}}</text>
                    <image src="../../static/wenzhanghengxian.png" mode=""></image>
                </view>
                <view class="contents">
                    <rich-text :nodes='detail.detail.article_content'></rich-text>
                </view>
            </view>
            <view class="cheight"></view>
            <!-- 评论 -->
            <view class="comment">
                <view class="comment-title">
                    评论区
                </view>
                <view class="noList" v-if="commentList.length == 0">
                    <image class="noListImg" src="../../static/noPingLun.png" mode=""></image>
                </view>
                <view v-else class="comment-content" v-for="(item,index) in commentList" :key="index">
                    <view class="touXiang">
                        <image src="../../static/userlogo.png"></image>
                    </view>
                    <view class="neiRong">
                        <text>{{item.user ? item.user.nickName : ''}}</text>
                        <text>{{item.content}}</text>
                        <text>{{item.create_time}}</text>
                    </view>
                </view>
            </view>

        </view>
        <!-- 底部tab栏 -->
        <view class="tabBar">
            <!-- 文本输入框开始 -->
           <textarea v-if="isTextareaContent" @click="goInput"   placeholder-class="InformationClass" placeholder="友善是交流的起点" cursor-spacing=100>
            </textarea>
            <textarea v-if="!isTextareaContent"  class="phoneInput" :class="{newInputClass:isNewInputClass,newLine:isLine}" rows="1" maxlength=140
                ref="address" cursor-spacing=100 word-break:break-all @focus='yesFocus' @blur='noFocus' @linechange='goline' v-model="textareaContent" placeholder-class="InformationClass" placeholder="友善是交流的起点" @input='yesInput'  >
			</textarea>
             <!-- 文本输入框结束 -->
            <block v-if="!isNewInputClass">
                <image src="../../static/xiaoxi2New.png" @click="goPingLun"></image>
                <!-- 收藏开始 -->
                <!-- 0是无收藏,1是收藏 -->
                <image v-if="detail.is_collect == 0" src="../../static/collect.png" @click="goOperate('collect',detail.detail.article_id,detail.is_collect)"></image>
                <image v-if="detail.is_collect == 1" src="../../static/collected.png" @click="goOperate('collect',detail.detail.article_id,detail.is_collect)"></image>
                <image v-if="isCollect" src="../../static/newcollect.gif"></image>
                <!-- 收藏结束 -->
                <!-- 点赞开始 -->
                <image v-if="detail.is_like == 0" src="../../static/praise.png" @click="goOperate('praise',detail.detail.article_id)"></image>
                <image v-if="detail.is_like == 1" src="../../static/praised.png" @click="goOperate('praise',detail.detail.article_id)"></image>
                <image v-if="isPraise" src="../../static/newpraise.gif"></image>
                <!-- 点赞结束 -->
                <image src="../../static/share.png" @click="goShare"></image>
            </block>
            <block>
                
                <text style=" display: inline-block;width: 15%;text-align: center; font-size: 30rpx; color: #666b71;padding: 15rpx; 30rpx;" :class="{newCol:textareaContent.length>=1}" v-if="isNewInputClass" @click="goFaBu(textareaContent)">发布</text>
            </block>
        </view>
        <!-- 定位评论人数 -->
        <view class="numNew" v-if="!isNewInputClass">
            <text>{{detail.detail.comment_count}}</text>
        </view>
        <!-- 转发弹框 -->
        <view class="shareMark" v-if="isMark">
            <view class="shareContent">
                <view class="allShare">
                    <view @click="formSubmit('weixinhaoyou')">
                        <image src="../../static/weixinhaoyou.png" mode=""></image>
                        <text>微信好友</text>
                    </view>
                    <view @click="formSubmit('pengyouquan')">
                        <image src="../../static/pengyouquan.png" mode=""></image>
                        <text>朋友圈</text>
                    </view>
                    <view @click="copy">
                        <image src="../../static/fuzhilianjie.png" mode=""></image>
                        <text>复制链接</text>
                    </view>
                </view>
                <view class="shareQuXiao">
                    <view class="quxiao" @click="close">
                        取消
                    </view>
                </view>

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
    // 引入文件
    import uniCopy from '../common/code.js';
    //引入h5文章视频路径
    import {
    	BaseUrl
    } from 'pages/common/http.js'
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '',
                    color: '#fff',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                // head           
                headBackground: '#18191d',
                headHeight: '129.16rpx',
                // headPosition: 'fixed',

                headPosition: 'fixed',
                headBackground: '#18191d',

                detail: {
                    detail: {
                        comment_count: 0
                    }
                },
                //文章数据
                articleList: {},
                //评论数据
                commentList: [],
                isTop: false,
                //tab栏文本输入
                textareaContent: "",
                //input框的false/true
                isNewInputClass: false,
                //控制input框行数的
                isLine: false,
                //转发遮罩
                isMark: false,
                //tab输入框防抖
                timeId: -1,
                page: 1,
                lastpage: 1,
                //收藏/点赞/文本新增属性
                isCollect: false,              
                isPraise: false,
                isTextareaContent:true,
                isFocus:false,
               

            }
        },
        onLoad(options) {
            this.article_id = options.article_id
            // 详情
            this.getDetail(options.article_id)
            // 评论列表
            this.getComment(1, options.article_id)
        },
        onShow() {
            // 获取详情数据
               
        },
        methods: {          
            // 详情
            getDetail(id) {
                let url = `api/article/detail`;
                let obj = {
                    article_id: id,
                    token: uni.getStorageSync('data').token
                }

                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        this.detail = res.data
                    }
                })
            },
            // 评论列表
            getComment(page, id) {
                let url = `api/article/comment_lists`;
                let obj = {
                    article_id: id,
                    page: page,
                    token: uni.getStorageSync('data').token
                }

                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        if (page == 1) {
                            //获取数据
                            this.commentList = res.data.lists.data
                        } else {
                            this.commentList = this.commentList.concat(res.data.lists.data)
                        }
                        this.lastpage = res.data.lists.last_page
                    }
                })
            },
            //↓ 下面全是tab---------------------------------------------------------------------
            //复制链家  
            copy() {
                 this.isMark = false;
                // http://192.168.1.10:8081/node/pages/detail/contentDetail
                //"http://devjd.yunduoke.cn/node/pages/detail/contentDetail?article_id=" + this.detail.detail.article_id
                uniCopy({
                    content: BaseUrl+"node/pages/detail/contentDetail?article_id=" + this.detail.detail.article_id,
                    success: (res) => {
                        uni.showToast({
                            title: "复制成功",
                            icon: 'none',

                        })
                    },
                    error: (e) => {
                        uni.showToast({
                            title: e,
                            icon: 'none',
                        })
                    },
                })

            },
            //分享好友/朋友圈
            formSubmit(text) {
                 this.isMark = false;
                 let newImgurl='';
                 if(this.detail.detail.image==null ){
                     newImgurl='../../static/sharelogo.jpg'
                 }else{
                     newImgurl=this.detail.detail.image.file_path
                 }
                let newUrl = BaseUrl+"node/pages/detail/contentDetail?article_id=" + this.detail.detail.article_id;
                // tite是文本主标题
                let title = this.detail.detail.article_title;
                let miaoshu = this.detail.detail.article_subtitle;
                //imgurl如果当前文章有图片,imgurl就是当前图片,如果当前文章没有图片,显示默认图片
                let imgurl = newImgurl;
                let url = newUrl;
                if (text == 'weixinhaoyou') {
                    // 分享好友
                    uni.share({
                        provider: "weixin",
                        scene: "WXSceneSession",
                        // scene: "WXSenceTimeline",
                        type: 0,
                        href: url,
                        title: title,
                        summary: miaoshu,
                        imageUrl: imgurl,
                        success: function(res) {
                            uni.showToast({
                                title: '已分享',
                                duration: 2000
                            });
                        },
                        fail: function(err) {}
                    });
                } else if (text == 'pengyouquan') {
                    // 分享朋友圈
                    uni.share({
                        provider: "weixin",
                        scene: "WXSenceTimeline",
                        type: 0,
                        href: url,
                        title: title,
                        summary: miaoshu,
                        imageUrl: imgurl,
                        success: function(res) {
                            uni.showToast({
                                title: '已分享',
                                duration: 2000
                            });
                        },
                        fail: function(err) {},
                    });

                }

            },
            //点击评论图片,自动下滑位置
            goPingLun(e) {
                uni.createSelectorQuery().select('.comment').boundingClientRect(data => { //目标位置节点 类或者 id 
                    uni.createSelectorQuery().select(".total").boundingClientRect((res) => { //最外层盒子节点类或者 id
                        uni.pageScrollTo({
                            duration: 250, //过渡时间
                            scrollTop: data.top - res.top, //到达距离顶部的top值
                        })
                    }).exec()
                }).exec();
            },
            //我是假的
            goInput(){
              this.isTextareaContent=false;
               this.isNewInputClass = true;
            },
            //输入框输入
            yesInput(event) {
                //输入框防抖
                clearTimeout(this.timeId)
                this.timeId = setTimeout(() => {
                    uni.setStorageSync('inputContent', event.detail.value)
                }, 1000)
            },
            ///控制行高的样式会变
            goline(event) {
                // event.detail = {height: 0, heightRpx: 0, lineCount: 0}
                if (event.detail.lineCount == 1) {
                    this.isLine = false;
                } else {
                    this.isLine = true;
                }
            },
            //输入框有焦点
            yesFocus(event) {
                 // otherAPI.toast('触发有简单事件了吗?', 'none', false, 1500);
                this.isNewInputClass = true;
                if (uni.getStorageSync('inputContent')) {
                    this.textareaContent = uni.getStorageSync('inputContent')
                } else {
                    this.textareaContent = '';
                }

            },
            touchstart(){
                this.isNewInputClass = false;
                this.isTextareaContent=true;
            },
            //输入框失去焦点
            noFocus() {
                if(this.isFocus){
                this.isNewInputClass = false;
                this.isTextareaContent=true;
                }else{
                    return false;
                }
                
              
            },          
            //点击发布
            goFaBu(textareaContent) {
             
                if (!textareaContent) {
                    otherAPI.toast('评论不能为空', 'none', false, 1500);
                    return
                }
                let _this = this
                let url = `api/article/add_comment`;
                let obj = {
                    wxapp_id: 10001,
                    article_id: _this.article_id,
                    content: textareaContent,
                    token: uni.getStorageSync('data').token
                }

                httpRequest_.post(url, obj).then(res => {
                    if (res.code == 1) {
                      
                        _this.getComment(1, _this.article_id)
                        _this.detail.detail.comment_count++

                        _this.textareaContent = '';
                        uni.removeStorage({
                            key: 'inputContent'
                        });
                        
                        otherAPI.toast(res.msg, 'none', false, 1500)
                        _this.goPingLun();
                        _this.isFocus=true;
                        _this.noFocus();
                        
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            //收藏
            goOperate(type, id, collectId) {
                let url = ''
                // 点赞
                if (type == 'praise') {
                    url = `api/article/like`
                }
                // 收藏
                if (type == 'collect') {
                    url = `api/article/collect`
                }
                let obj = {
                    article_id: id,
                    token: uni.getStorageSync('data').token
                }
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {
                        if (type == 'praise') {
                            if (this.detail.is_like == 1) {
                               
                                    this.detail.is_like = 0
                               

                            } else {

                                this.detail.is_like = 2
                                this.isPraise = true;
                                setTimeout((res) => {
                                    this.isPraise = false;
                                    this.detail.is_like = 1
                                }, 1000)
                            }
                        }
                        if (type == 'collect') {
                            if (this.detail.is_collect == 1) {                              
                                this.detail.is_collect = 0
                            } else {
                                 
                                this.detail.is_collect = 2
                                this.isCollect = true;
                                setTimeout((res) => {
                                    this.isCollect = false;
                                    this.detail.is_collect = 1
                                }, 1000)
                            }
                        }
                        otherAPI.toast(res.data.msg.msg, 'none', false, 1500);
                    }
                })
            },
            //点赞
            goPraise(id) {
                if (this.articleList.praise == 0) {
                    this.articleList.praise = 1
                } else if (this.articleList.praise == 1) {
                    this.articleList.praise = 0
                }
            },
            //转发
            goShare() {
                this.isMark = true;
                // otherAPI.toast('程序猿小哥正在努力搬砖中，敬请期待', 'none', false, 1500);
            },
            //转发弹框,取消按钮
            close() {
                this.isMark = false;
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
        },
        onPageScroll(res) {
            if (res.scrollTop > 128) {
                this.isTop = true
            } else {
                this.isTop = false
            }
        },
        onReachBottom() {
            if (this.page == this.lastpage) {
                otherAPI.toast('数据加载完毕', 'none', false, 1500);
                return false;
            } else {
                this.page++;
                // this.getIncomeDetail(this.page);
                this.getComment(this.page, this.article_id)
            }
        },
    }
</script>

<style>
    .contentHead {
        position: fixed;
        top: 0;
        z-index: 6666666 !important;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 998;
        background-color: #18191d !important;
    }

    .head {
        width: 694.44rpx;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }

    .returnImg {
        position: absolute;
        left: 0;
        width: 40rpx;
        height: 40rpx;
        display: flex;
        align-items: center;
    }

    .returnImg_ {
        width: 22.91rpx;
        height: 41.66rpx;
    }

    .otherTitle,
    .otherIcon {
        position: absolute;
        right: 0rpx;
        font-size: 28rpx;
    }

    .hanhou {
        position: fixed;
        top: 0;
        z-index: 111111;
        width: 100%;
        height: 128rpx;
        /* height:var(--status-bar-height); */
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding-top: 52rpx; */
        /* box-sizing: border-box; */
    }

    .headImage {
        /* display: block; */
        width: 64rpx;
        height: 64rpx;
    }

    .headText {
        font-size: 36.11rpx;
        color: #fdffff;
        margin-left: 30rpx;
    }

    page {
        width: 100%;
        height: 100%;
        /* background: #0d0e12; */
        background: #18191d;
    }

    .newHead {
        /* 解决边框塌陷 */
        /* border-top: 0.1rpx solid #18191d; */
        height: 128rpx;
    }

    /* 文章 */
    .article,
    .comment {
        background-color: #18191d;
        padding: 0 30rpx;
        box-sizing: border-box;
    }

    .cheight {
        width: 100%;
        height: 20rpx;
        background: #0D0E12;
    }

    /* 文章的主标题 */
    .article-title {
        width: 100%;
        /* height: 180rpx; */
        padding: 30rpx 0;
        box-sizing: border-box;
        font-size: 38rpx;
        color: #ccd0d5;
        line-height: 56rpx;
        font-weight: bold;
    }

    .time {
        display: flex;
        align-items: center;
    }

    .time image {
        width: 65rpx;
        height: 65rpx;
        margin: 0 30rpx 0 3rpx;
    }

    .time text {
        font-size: 26rpx;
        color: #ccd0d5;
    }

    .time text:nth-child(3) {
        color: #606267;
        margin-left: 25rpx;
    }

    /* 副标题 */
    .article-two-title {
        font-size: 30rpx;
        /* height: 290rpx; */
        color: #7e858c;
        text-align: center;
        line-height: 55rpx;
        padding: 55rpx 0;
        box-sizing: border-box;

    }

    .article-two-title text {
        display: inline-block;
        margin-bottom: 30rpx;
    }

    .article-two-title image {
        width: 688rpx;
        height: 4rpx;

    }

    .contents {
        font-size: 30rpx;
        color: #c2c7cc;
        line-height: 55rpx;
        padding-bottom: 50rpx;
    }

    .contents img {
        width: 100%;
    }

    .comment {
        margin-top: 20rpx;
        padding: 30rpx;
        box-sizing: border-box;
        padding-bottom: 112rpx;
    }

    /* 评论区 */
    .comment-title {
        font-size: 34rpx;
        color: #c1c6ca;
        font-weight: bold;
    }

    /* 评论区的样式 */
    .comment-content {
        padding-top: 50rpx;
        display: flex;
        justify-content: space-between;
        border-bottom: 1rpx solid #212428;
    }

    .comment-content:last-child {
        border-bottom: none
    }

    .touXiang {
        width: 70rpx;
        height: 70rpx;
        margin-right: 30rpx;
    }

    .touXiang image {
        width: 100%;
        height: 100%;
    }

    .neiRong {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .neiRong text:nth-child(1) {
        font-size: 28rpx;
        color: #94a7af;
    }

    .neiRong text:nth-child(2) {
        font-size: 30rpx;
        color: #c2c7cc;
        margin: 22rpx 0;
    }

    .neiRong text:nth-child(3) {
        font-size: 22rpx;
        color: #606267;
        margin-bottom: 30rpx;
    }

    /* 没有评论图片 */
    .noList {
        width: 420rpx;
        margin: auto;
    }

    .noListImg {
        width: 420rpx;
        height: 420rpx;
    }

    /* 底部tab栏 */
    .tabBar {
        width: 100%;
        height: 112rpx;
        background-color: #282d33;
        position: fixed;
        bottom: 0;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }

    .tabBar input {
        width: 300rpx;
        height: 80rpx;
        border-radius: 34.72rpx;
        padding-left: 25rpx;
        box-sizing: border-box;
        background-color: #212428;
        font-size: 28rpx;
        color: #fff;
        margin-right: 35rpx;
    }

    .tabBar textarea {
        width: 300rpx;
        height: 80rpx;
        /* line-height: 80rpx; */
        padding-top: 20rpx;
        border-radius: 80rpx;
        padding-left: 25rpx;
        box-sizing: border-box;
        background-color: #212428;
        font-size: 28rpx;
        color: #fff;
        margin-right: 35rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tabBar image {
        width: 56rpx;
        height: 56rpx;
        margin-right: 40rpx;
    }

    .tabBar image:last-child {
        margin-right: 0;
    }

    .InformationClass {
        font-size: 28rpx;
        color: #666b71;
    }

    .numNew {
        position: fixed;
        bottom: 65rpx;
        left: 390rpx;
        font-size: 18rpx;
        color: #fff;
        background-color: #ffa11a;
        padding: 2rpx 15rpx;
        border-radius: 50rpx;
    }

    /* input */
    .newInputClass {
        width: 85% !important;
        border-radius: 10rpx !important;
        margin-right: 20rpx !important;
    }

    .newLine {
        padding-top: 10rpx !important;
    }

    .newCol {
        color: #ced1d8 !important;
    }

    /* tab栏的转发 */
    .shareMark {
        width: 100%;
        height: 100%;
        /* position: fixed;
        top: 0;
        width: 100%;
        height: 100vh; */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 999999777;
        background-color: rgba(0, 0, 0, .3);
        /* background-color: rgba(255,255,0,1);      */
    }

    .shareContent {
        background-color: #f3efee;
        position: fixed;
        width: 100%;
        height: 370rpx;
        bottom: 0;
        border-top-left-radius: 50rpx;
        border-top-right-radius: 50rpx;
    }

    .allShare {
        height: 255rpx;
        border-top-left-radius: 50rpx;
        border-top-right-radius: 50rpx;
        /* background-color: red; */
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .allShare view {
        display: flex;
        flex-direction: column;
    }

    .allShare view image {
        width: 100rpx;
        height: 100rpx;
    }

    .allShare view text {
        font-size: 25rpx;
        color: #666;
        margin-top: 20rpx;
        text-align: center;
    }

    .shareQuXiao {
        height: 115rpx;
    }

    .quxiao {
        width: 670rpx;
        height: 85rpx;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 50rpx;
        text-align: center;
        line-height: 85rpx;
        font-size: 27.78rpx;
        color: #222;
    }
</style>
