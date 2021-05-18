<template>
    <view>
        <view class="newHead">
            <Head :headTitle="headTitle" :headReturn="headReturn" @returnClick="returnClick" />
        </view>
        <view class="cumulativeTotal">
            <text class="text">累计收入(元)</text>
            <text class="count">{{info.total_money ? info.total_money : 0 | numFilter}}</text>
        </view>
        <view class="selectClass">
            <text :class="[{actived:active == 1},'same_text']" @click="activeClick(1)">昨天</text>
            <text :class="[{actived:active == 2},'same_text']" @click="activeClick(2)">上周</text>
            <text :class="[{actived:active == 3},'same_text']" @click="activeClick(3)">上个月</text>
        </view>
        <view class="frame">
            <view class="orderIncome">
                <text>订单交易收入</text>           
                <text class="estimate">预计佣金 <text class="money">￥{{info.order ? info.order.money: 0 | numFilter}}</text></text>
            </view>
            <text class="extensionNode">推广收入</text>
            <view class="extensionDetail">
                <view class="extensionDetail_">
                    <text class="text">直推节点</text>
                    <text class="paymentText">{{info.jd ? info.jd.count_10 : 0 | numFilter }}人付款</text>
                    <text class="incomeText">收入 <text class="money">￥{{info.jd ? info.jd.money_10 : 0 | numFilter}}</text></text>
                </view>
                <!-- 新增间接节点 只有大节点有这个数据 -->
                <view class="extensionDetail_" v-if="levelIdentity==20">
                    <text class="text">间接节点</text>
                    <text class="paymentText">{{info.jd? info.jd.count_20 : 0 | numFilter }}人付款</text>
                    <text class="incomeText">收入 <text class="money">￥{{info.jd ? info.jd.money_20 : 0 | numFilter}}</text></text>
                </view>
                <view class="extensionDetail_">
                    <text class="text">直属商家</text>
                    <text class="paymentText">{{info.zsj ? info.zsj.count : 0 | numFilter }}人付款</text>
                    <text class="incomeText">收入 <text class="money">￥{{info.zsj ? info.zsj.money : 0 | numFilter}}</text></text>
                </view>
                <view class="extensionDetail_">
                    <text class="text">间接商家</text>
                    <text class="paymentText">{{info.jsj ? info.jsj.count : 0 | numFilter}}人付款</text>
                    <text class="incomeText">收入 <text class="money">￥{{info.jsj ? info.jsj.money : 0 | numFilter}}</text></text>
                </view>
                <view class="extensionDetail_">
                    <text class="text">直属合伙人</text>
                    <text class="paymentText">{{info.zjj ? info.zjj.count : 0 | numFilter}}人付款</text>
                    <text class="incomeText">收入 <text class="money">￥{{info.zjj ? info.zjj.money : 0 | numFilter}}</text></text>
                </view>
                <view class="extensionDetail_">
                    <text class="text">间接合伙人</text>
                    <text class="paymentText">{{info.jjj?info.jjj.count : 0 | numFilter}}人付款</text>
                    <text class="incomeText">收入 <text class="money">￥{{info.jjj?info.jjj.money:0 | numFilter}}</text></text>
                </view>
            </view>
        </view>
        <!-- 饼图 314/268-->
        <view class="bing">
            <view class="title">
                <view class="bing-title">
                    收入走势曲线图
                </view>
            </view>
            <view class="qiun-charts">
                <canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
                    :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie"></canvas>
            </view>
            <view class="bing-content">
                <view class="dingdan">
                    <text></text>订单佣金
                </view>
                <view class="dingdan">
                    <text style="background-color: #a05cf3;"></text>直属商家
                </view>
                <view class="dingdan">
                    <text style="background-color: #7da3e0;"></text>直属合伙人
                </view>
                <view class="dingdan">
                    <text style="background-color: #6bedfb;"></text>直推节点
                </view>
                <view class="dingdan">
                    <text style="background-color: #e4992d;"></text>间接商家
                </view>
                <view class="dingdan">
                    <text style="background-color: #ffd111;"></text>间接合伙人
                </view>
                <!-- 新增间接节点 只有大节点有这个数据 -->
                <view class="dingdan" v-if="levelIdentity==20">
                    <text style="background-color: #fe5512;"></text>间接节点
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    // 引入饼图文件开始
    import uCharts from '@/components/u-charts/u-charts.js';
    import {
        isJSON
    } from '@/common/checker.js';
    // 引入饼图文件结束
    import {
        httpRequest_,
        otherAPI
    } from '../common/API.js';
    import Head from '../common/head.vue'
    //饼图数据开始
    var _self;
    var canvaPie = null;
    //饼图数据结束
    export default {
        components: {
            Head
        },
        data() {
            return {
                // head
                headTitle: {
                    title: '我的收入',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                active: 1,
                info: [],
                //饼图数据
                cWidth: '',
                cHeight: '',
                pixelRatio: 1,
                textarea: '',
                //小节点               
                pie: {
                    "series": [{
                            "name": "订单佣金",
                            "data": 18
                        }, {
                            "name": "直属商家",
                            "data": 21
                        }, {
                            "name": "直属合伙人",
                            "data": 32.1
                        }, {
                            "name": "直推节点",
                            "data": 44
                        }, {
                            "name": "间接商家",
                            "data": 15
                        },
                        {
                            "name": "间接合伙人",
                            "data": 17
                        }
                    ]
                },
                //节点等级/20为大节点,10为小节点
                levelIdentity: '',
                timeId:-1
            }
        },     
        onReady() {
            this.getinfo()
            
        },
        onShow() {
            //饼图js
            _self = this;
            this.cWidth = uni.upx2px(628);
            this.cHeight = uni.upx2px(400);     
        },

        methods: {
            getinfo(){
                //获取用户ID拿到身份
                let url = `/api/user/get_user_id`;
                let obj = {
                	token: uni.getStorageSync('data').token,
                    user_id:uni.getStorageSync('data').user_id.user_id
                }
                httpRequest_.get(url, obj).then(res => {                  
                     this.levelIdentity = res.data.userInfo.level  
                     
                    //推广收入的数据
                    this.getcashlog();  
                    //饼图饼图数据
                    this.getServerData();    
                })             
            },
            getcashlog() {
                let url = `/api/user_relation/finance`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    time: this.active
                }           
                httpRequest_.get(url, obj).then(res => {
                    if (res.code == 1) {    
                        
                        this.info = res.data
                    } else {
                        otherAPI.toast(res.msg, 'none', false, 1500);
                    }
                })
            },
            activeClick(index) {
                this.active = index;
                otherAPI.loading('加载中', true)
                clearTimeout(this.timeId)                            
                this.timeId=setTimeout(()=>{                     
                     this.getcashlog();
                     //重新加载饼图
                     this.getServerData();                     
                },2000)   
                    
                     
                
               
            },
            // 返回上一页
            returnClick() {
                uni.navigateBack({
                    delta: 1
                });
            },
            //饼图所有事件js
            getServerData() {
                let url = `/api/user_relation/finance`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    time: this.active
                }             
                httpRequest_.get(url, obj).then(res => {
                    //  订单佣金        
                    // this.pie.series[0].data = 10                 
                    this.pie.series[0].data = this.numMoney(res.data.order.money)
                    this.pie.series[0].color = '#227eea'
                    // 直属商家
                    // this.pie.series[1].data = 200
                    this.pie.series[1].data = this.numMoney(res.data.zsj.money)
                    this.pie.series[1].color = '#a05cf3'
                    // 直属合伙人                    
                    // this.pie.series[2].data = 300
                    this.pie.series[2].data = this.numMoney(res.data.zjj.money)
                    this.pie.series[2].color = '#7da3e0'
                    // 直推节点                  
                    // this.pie.series[3].data = 0
                    this.pie.series[3].data = this.numMoney(res.data.jd.money_10)
                    this.pie.series[3].color = '#6bedfb'
                    // 间接商家
                    // this.pie.series[4].data = 500
                    this.pie.series[4].data = this.numMoney(res.data.jsj.money)
                    this.pie.series[4].color = '#e4992d'
                    // 间接合伙人
                    // this.pie.series[5].data = 600
                    this.pie.series[5].data = this.numMoney(res.data.jjj.money)
                    this.pie.series[5].color = '#ffd111'
                    //如果是大节点，在添加一个对象元素，一共7个【饼图数组以前是6个】
                    if (this.levelIdentity == 20) {
                        if (this.pie.series.length <7) {
                            let obj = {};                       
                            this.pie.series.push(obj);                      
                        }
                        this.pie.series[6].name = '间接节点';
                        this.pie.series[6].data = this.numMoney(res.data.jd.money_20);                                       this.pie.series[6].color = '#fe5512'
                    }        
                    _self.textarea = JSON.stringify(this.pie);
                    _self.showPie("canvasPie", this.pie);
                })
            },
            //处理接口返回金额封装
            numMoney(money) {
                return parseFloat(parseFloat(money).toFixed(2))
            },
            showPie(canvasId, chartData) {
                canvaPie = new uCharts({
                    $this: _self,
                    canvasId: canvasId,
                    //类型 饼状图
                    type: 'pie',
                    fontSize: 11,
                    padding: [15, 15, 15, 15],
                    //legend是一班二班三班四班的样式-----------
                    legend: {
                        // position: 'top', //位置在顶部,position: 'right',位置在右侧,默认底部
                        // float: 'center', //位置居中		
                        show: false,
                        padding: 5,
                        lineHeight: 30,
                        margin: 0,
                    },
                    // background: '#FFFFFF',
                    pixelRatio: _self.pixelRatio,
                    series: chartData.series,
                    animation: true,
                    width: _self.cWidth * _self.pixelRatio,
                    height: _self.cHeight * _self.pixelRatio,
                    dataLabel: true,
                    extra: {
                        //这个属性是控制圆饼中间的空心
                        pie: {
                            labelWidth: 15,
                            //border: false,代表饼图各个 图案没有空心
                            border: true,
                            //borderColor: '#e4293c代表着饼图空心颜色为红色',
                            borderColor: '#FFFFFF',
                            //饼图空白区图的大小							
                            borderWidth: 3,
                        },
                    },
                });
            },
            touchPie(e) {
                //鼠标点打饼状图颜色区域,提示的内容:如一班50
                canvaPie.showToolTip(e, {
                    format: function(item) {
                        return item.name + ':' + item.data
                        // return item.data
                    }
                });
                canvaPie.touchLegend(e, {
                    animation: true
                });
            },
        }
    }
</script>

<style>
    page {
        width: 100%;
        height: 100%;
        background-image: url(../../static/myIncome.png);
        /* background-size: 100% 100%;*/
        background-size: 750rpx 1900rpx;
        background-repeat: no-repeat;
    }

    /* newHead固定 */
    .newHead {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 128rpx;
        background-color: #000b1b;
        z-index: 10000;
    }

    .cumulativeTotal {
        width: 625rpx;
        margin: 34.72rpx auto 0;
        color: #dee1ef;
        font-size: 27.77rpx;
        display: flex;
        flex-direction: column;
        margin-top: 128rpx;
    }

    .cumulativeTotal .count {
        font-size: 104.16rpx;
        color: #e4992d;
        margin-top: 35rpx;
        text-align: left;
    }

    .selectClass {
        width: 625rpx;
        margin: 50rpx auto 0;
    }

    .selectClass .same_text {
        color: #5c8bd5;
        font-size: 27.77rpx;
        margin-right: 59.02rpx;
    }

    .selectClass .actived {
        color: #ffffff;
        padding: 10.41rpx 20.83rpx;
        background-color: #4f7ec9;
        border-radius: 27.77rpx;
    }

    .frame {
        margin: 41.66rpx auto 0;
        width: 628rpx;
        /* height: 537rpx; */
        background-image: url(../../static/frame.png);
        background-size: 100% 100%;
        padding-bottom: 46rpx;
    }

    .extensionNode {
        width: 540rpx;
        margin: 25rpx auto;
        display: block;
        color: #DEE1EF;
        font-size: 27.77rpx;
    }

    .extensionDetail {
        width: 541.66rpx;
        /* height: 220rpx; */
        margin: auto;
    }

    .extensionDetail_ {
        display: flex;
        justify-content: space-between;
        color: #5c8bd5;
        font-size: 27.77rpx;
        line-height: 44rpx;
    }

    .extensionDetail_ .money {
        color: #27b8c5;
    }

    .extensionDetail_ .text {
        width: 150rpx;
    }

    .orderIncome {
        width: 540rpx;
        height: 155rpx;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #dee1ef;
        font-size: 27.77rpx;
        border-bottom: 1rpx solid #13234c;
    }

    .orderIncome text {
        padding: 13.88rpx 0;
    }

    .estimate {
        color: #5c8bd5;

    }

    .estimate .money {
        color: #27b8c5;
        margin-left: 20rpx;
    }

    .paymentText,
    .incomeText {
        display: inline-block;
        width: 173.61rpx;
    }

    .paymentText {
        text-align: center;

    }

    .incomeText {
        text-align: left;
        margin-left: 40rpx;
    }

    /*饼图的样式的width和height一定要与定义的cWidth和cHeight相对应*/
    .bing {
        box-sizing: border-box;
        padding-bottom: 40rpx;
        margin: 25rpx auto 106rpx;
        /* 628*537 790 */
        width: 628rpx;
        /* height: 725rpx; */
        background-image: url(../../static/frame.png);
        background-repeat: no-repeat;
        /* background-size: 628rpx 725rpx; */
        background-size: 628rpx 100%;
    }

    /* 饼图标题 */
    .title {
        padding: 40rpx 40rpx 0;

    }

    .bing-title {
        font-size: 27.79rpx;
        color: #dee1ef;
    }

    /* 饼图内容 */
    .bing-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        margin-top: 10rpx;
        padding: 0 50rpx;
        margin-bottom: 40rpx;
    }

    .dingdan {
        width: 33%;
        color: #5c8bd5;
        font-size: 22rpx;
        text-align: center;
        margin-bottom: 20rpx;

    }

    .dingdan text {
        display: inline-block;
        width: 20rpx;
        height: 20rpx;
        background-color: #227eea;
        vertical-align: -1rpx;
        margin-right: 10rpx;
    }

    .qiun-charts {
        width: 628upx;
        height: 400rpx;
        margin-top: -10rpx;
    }

    .charts {
        width: 628upx;
        height: 400rpx;
    }
</style>
