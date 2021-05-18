<template>
    <view>
        <!-- head头部开始 -->
        <Head :headTitle="headTitle" :headReturn="headReturn" :headPosition="headPosition" :headBackground='headBackground'
            @returnClick="returnClick" @otherClick="otherClick">
        </Head>
        <!-- 右上角icon -->
        <view @click="isRiLi?isDate = true:isDate = false" style=" width: 40rpx;height: 128rpx; position: fixed;z-index: 9999999;top: 0rpx;right: 28rpx;color: #FFFFFF;">
        </view>
        <!-- ps:特别注意↑上面的view给日历图片添加了一个点击事件的遮罩层 -->
        <!-- head头部结束 -->
        <!-- 固定顶部 选项-->
        <!-- <view style="position: fixed; width: 100%;background-color: #000b1b;z-index: 11;">  -->
        <!-- 顶部背景 -->
        <view class="top-bg">
            <image class="bg" src="/static/Tixian/top.png" mode=""></image>
            <view class="top-content">
                <view class="content-row" style="flex: 1;">
                    <text class="font-msg">可提现</text>
                    <text style="font-size: 56rpx;color: #ffffff;font-weight: bold;">
                        {{userkeTiXian.keTiXian | numFilter}}
                    </text>
                    <view class="content-fp" @click="goFaPiao">发票信息</view>
                </view>
                <view class="content-row" style="flex-flow: row;">
                    <view class="content-row" style="flex: 1;">
                        <text class="font-msg">累计提现</text>
                        <text style="font-size: 32rpx;font-weight: bold;color: #b3bfe6;">
                            {{userkeTiXian.leJiTiXian | numFilter}}
                        </text>
                    </view>
                    <view class="content-row" style="flex: 1;">
                        <text class="font-msg">已提现</text>
                        <text style="font-size: 32rpx;font-weight: bold;color: #b3bfe6;">
                            {{userkeTiXian.yiTiXian | numFilter}}
                        </text>
                    </view>
                </view>
            </view>
            <!-- 提现步骤 ①勾选佣金 ②填写账号 ③寄发票   -->
            <view class="top-bz" :style="topMsg ? '' : 'bottom: -4rpx;padding-bottom: 0rpx;' ">
                <view class="bz-content" v-if="topMsg">
                    <image src="/static/Tixian/war.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
                    <view style="margin-left: 20rpx;flex: 1;">提现步骤 ①勾选佣金 ②填写账号 ③寄发票</view>
                    <image @click="topMsg = false" src="/static/Tixian/close.png" style="width: 23rpx;height: 21rpx;"
                        mode=""></image>
                </view>
            </view>
        </view>

        <!-- tab -->
        <view class="tab" :class="{tabTop : isTop}">
            <view class="tab-item" @click="onClickTab('0','10')" :class="{ onTabItem : onTab == 0 }">
                收益明细
            </view>
            <view class="tab-item" @click="onClickTab('1','20')" :class="{ onTabItem : onTab == 1 }">
                提现明细
            </view>
        </view>
        <view class="tab" v-if="isTop">

        </view>
        <!-- 固定顶部 选项-->
        <!-- </view> -->
        <!-- list1 -->
        <view class="list1" v-if="onTab == 0">
            <block v-if="contentList.length>0">
                <view class="list-item" @click="choose(index)" v-for="(item, index) in contentList" :key="index">
                    <view class="icon-x">
                        <view v-if="item.is_cash != 0 && item.is_cash != 7" style="width: 33rpx;height: 33rpx;"></view>
                        <block v-else>
                            <image v-if="item.is_cash==7" src="/static/Tixian/x1.png" style="width: 33rpx;height: 33rpx;"
                                mode=""></image>

                            <image v-else src="/static/Tixian/x.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
                        </block>

                        <!-- <image v-else src="/static/Tixian/x.png" style="width: 33rpx;height: 33rpx;" mode=""></image> -->

                    </view>
                    <view class="content" :class="{contentIson : item.is_cash==0 || item.is_cash==7}">
                        <view style="font-size: 32rpx;">
                            <!-- 2020年09月订单佣金 -->
                            {{item.year}}年{{item.month}}月{{item.type_text}}
                        </view>
                        <view class="content-time">
                            <!-- 预计2020-10-25到账 -->
                            {{item.create_time}}到账
                        </view>
                    </view>
                    <view class="price" :class="{contentIson : item.is_cash==0||item.is_cash==7}">
                        {{item.money | numFilter}}
                    </view>
                </view>
            </block>
            <block v-else>
                <view class="nullMsg">
                    <image class="ggmsgnot" src="../../static/Tixian/jifen.png" mode=""></image>
                </view>
            </block>

        </view>

        <!-- list2 -->
        <view class="list2" v-if="onTab == 1">
            <!-- item -->
            <block v-if="tiXianMingXi.length>0">
                <view class="list-item" @click="toWithrawDetaile(index)" v-for="(item,index) in tiXianMingXi" :key='index'>
                    <view>
                        <view class="flexRow">
                            <view class="flexRow-c1">
                                佣金提现
                            </view>
                            <!-- 状态 -->
                            <view class="tx-status0" v-if="item.is_cash==0">提现中</view>
                            <view class="tx-status1" v-if="item.is_cash==1">已打款</view>
                            <view class="tx-status2" v-if="item.is_cash==2">已到账</view>
                            <view class="tx-status3" v-if="item.is_cash==3">提现失败</view>
                            <!-- 状态 -->
                        </view>
                        <view class="date">
                            {{item.create_time}}
                        </view>
                    </view>
                    <view>{{item.money | numFilter}}</view>
                </view>
            </block>
            <block v-else>
                <view class="nullMsg">
                    <image class="ggmsgnot" src="../../static/Tixian/jifen.png" mode=""></image>
                </view>
            </block>
            <!-- item -->
        </view>
        <!-- 底部固定 -->
        <view class="di" v-if="onTab == 0">
            <view class="price">
                <text style="font-size: 22rpx;">￥</text>{{allMoney}}
            </view>
            <view class="btn" :class="{newbtns : allMoney == 0}" @click="goAccount">
                提现
            </view>        
        </view>

        <!-- pop -->
        <view class="fp-pop" v-if="fpPOP">
            <view class="box">
                <view class="title">发票信息</view>
                <text class="iconfont icon-guanbi1" @click="closeFp"></text>
                <!-- <view class="close" @click="fpPOP = false">X</view> -->
                <view class="cantent">
                    <view class="content-top">
                        <view class="content-top-title">
                            请按照以下格式开发票：
                        </view>
                        <view>抬头类型：<text class="content-top-c">{{faPiaoInvoice.type}}</text></view>
                        <view>抬头：<text class="content-top-c">{{faPiaoInvoice.header}}</text></view>
                        <view>税号：<text class="content-top-c">{{faPiaoInvoice.duty_num}}</text></view>
                        <view>单位地址：<text class="content-top-c">{{faPiaoInvoice.address}}</text></view>
                        <view>电话号码：<text class="content-top-c">{{faPiaoInvoice.phone}}</text></view>
                        <view>开户银行：<text class="content-top-c">{{faPiaoInvoice.bank_name}}</text></view>
                        <view>银行账号：<text class="content-top-c">{{faPiaoInvoice.bank_account}}</text></view>
                    </view>
                    <view class="content-bottom" @click="copyFaPiao">
                        一键复制
                    </view>
                </view>
            </view>
        </view>
        <!-- 日期选择 -->
        <view v-if="isDate" style="position: fixed;top: 0;width: 100vw;height: 100vh;background-color: rgba(0,0,0,.3);z-index: 999;"></view>
        <view class="date-box" v-if="isDate">
            <view class="date-title">
                <view style="color: #999999;" @click="isDate = false">取消</view>
                <view style="color: #333333;">选择月份</view>
                <view style="color: #2c85f4;" @click="DateOK">确定</view>
            </view>
            <view class="date-content">
                <picker-view class="date-picker" :value="value" @change="changeDate">
                    <picker-view-column>
                        <view class="date-item" v-for="(item,index) in years" :key="index">{{item}}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="date-item" v-for="(item,index) in months" :key="index">{{item}}月</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </view>
</template>
<script>
    import {
        httpRequest_,
        otherAPI
    } from 'pages/common/API.js';
    import Head from '../common/headmoney.vue'
    // 复制需要引入文件
    import uniCopy from '../common/code.js';
    export default {
        components: {
            Head
        },
        data() {
            return {
                // 日期选择
                isDate: false, // 显示
                years: ["2020", "2021"], // 年Array
                months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], // 月Array
                value: [0, 0], // 年月Array的index[value,0,0,是代表默认时间2020,01, 0,0是上面year/mouths的数组的索引]
                chooseDate: "", // 点击确定后的日期
                //head
                headTitle: {
                    title: '佣金提现',
                    color: '#FFF',
                    size: '35.93rpx'
                },
                headReturn: {
                    status: 'isShow',
                    color: 'white'
                },
                headPosition: 'fixed',
                headBackground: '#000b1b',
                // 固定tab
                isTop: false,
                // 是否显示msg
                topMsg: true,
                // 当前选择tab(0代表收益明细/1代码提现明细)
                onTab: 0,
                // pop显示
                fpPOP: false,
                //点亮
                isLiang: false,
                //isLoding
                isLoding: true,
                //可提现
                userkeTiXian: {
                    keTiXian: 0,
                    leJiTiXian: 0,
                    yiTiXian: 0,
                },
                //左下角的总额
                allMoney: 0,
                ///发票信息
                faPiaoInvoice: [],
                //收益明细身份
                type: 10,
                ///收益明细页数
                IncomeDetailPage: 1,
                ///收益明细总页数
                IncomeDetailLastPage: 0,
                //收益明细数据
                contentList: [],
                //提现明细数据
                tiXianMingXi: [],
                //提现明细总页数
                tiXianMingXiLastPage: 0,
                //提现明细页数
                tiXianMingXiPage: 1,
                ///给后端传的收益明细订单id
                ids: [],
                //控制日历的
                isRiLi: true
            }
        },
        onLoad() {
            //顶部可提现框的数据
            this.getUserInfo();
            // this.getCurrentDate();方法是打开日历,默认定位当前日期
            this.getCurrentDate();
            //收益明细
            if (this.type == 10) {
                this.getIncomeDetail(1, this.getTime());
            } else {
                this.getTiXianDetail(1, this.getTime())
            }
        },
        onShow() {},
        methods: {
            //可提现
            getUserInfo() {
                let url = `api/company_cash/user_info`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    time: this.getTime()
                }
                httpRequest_.get(url, obj).then(res => {
                    this.userkeTiXian.keTiXian = res.data.data.total_money
                    this.userkeTiXian.leJiTiXian = res.data.data.money
                    this.userkeTiXian.yiTiXian = res.data.data.cash_money
                })
            },
            ///发票信息
            goFaPiao() {
                this.isRiLi = false;
                this.fpPOP = true;
                let url = `api/company_cash/invoice`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                }
                httpRequest_.get(url, obj).then(res => {
                    this.faPiaoInvoice = res.data.invoice;
                })
            },
            //一件复制 发票信息
            copyFaPiao() {
                uniCopy({
                    content: '抬头类型：' + this.faPiaoInvoice.type + '\n' + '抬头：' + this.faPiaoInvoice.header +
                        '\n' + '税号：' + this.faPiaoInvoice.duty_num + '\n' + '单位地址：' + this.faPiaoInvoice.address +
                        '\n' + '电话号码：' + this.faPiaoInvoice.phone + '\n' + '开户银行：' + this.faPiaoInvoice.bank_name +
                        '\n' + '银行账号：' + this.faPiaoInvoice.bank_account,
                    success: (res) => {
                        otherAPI.toast('复制完成', 'none', false, 1500);
                    },
                    error: (e) => {
                        uni.showToast({
                            title: e,
                            icon: 'none',
                        })
                    },
                })
            },
            //发票信息上面的x
            closeFp() {
                this.fpPOP = false;
                this.isRiLi = true;
            },

            //收益明细/提现明细tab栏切换
            onClickTab(index, type) {
                this.allMoney = 0;
                //通过index索引值,进行切换  
                this.onTab = index;
                //身份        
                this.type = type;
                //获取页数
                if (this.type == 10) {
                    this.getIncomeDetail(1, this.getTime())
                } else {
                    this.getTiXianDetailLists(1, this.getTime())
                }
            },
            //获取当前时间封装
            getTime() {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month
                }
                let Time = year + '-' + month
                return Time
            },
            //收益明细
            getIncomeDetail(page, time) {
                this.IncomeDetailPage = page;
                let url = `api/company_cash/lists`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    page: page,
                    time: time
                }
                httpRequest_.get(url, obj).then(res => {
                    if (page == 1) {
                        //获取收益明细数据
                        this.contentList = res.data.lists.data;
                        //获取收益明细总页数
                        this.IncomeDetailLastPage = res.data.lists.last_page;

                    } else {
                        this.contentList = this.contentList.concat(res.data.lists.data)
                        this.IncomeDetailLastPage = res.data.lists.last_page;
                    }
                    //重点:过滤每次加载完的收益明细总数据,只要是订单价格为0,就把它改成已提现状态,
                    for (let i in this.contentList) {
                        if (this.contentList[i].money == 0) {
                            this.contentList[i].is_cash = 6;
                        }
                    }
                })
            },
            //提现明细
            getTiXianDetailLists(page, time) {
                this.tiXianMingXiPage = page;
                let url = `api/company_cash/cash_list`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    page: page,
                    time: time
                }
                httpRequest_.get(url, obj).then(res => {
                    if (page == 1) {
                        //获取提现明细数据
                        this.tiXianMingXi = res.data.lists.data
                        //获取提现明细总页数
                        this.tiXianMingXiLastPage = res.data.lists.last_page;
                    } else {
                        this.tiXianMingXi = this.tiXianMingXi.concat(res.data.lists.data)
                        this.tiXianMingXiLastPage = res.data.lists.last_page;
                    }
                })
            },
            ///处理后台返回金额的封装
            numMoney(money) {
                return parseFloat(parseFloat(money).toFixed(2))
            },
            getCurrentDate() {
                //页面加载获取当前日期
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                //给日历赋值 this.value[0,0]第一个是年的索引, 第二个元素是月的索引   
                // 给年的索引赋值             
                this.value[0] = year - 2020;
                // 给月的索引赋值
                this.value[1] = month - 1;
            },
            //  选择
            choose(index) {
                if (this.contentList[index].is_cash == 0) {
                    this.contentList[index].is_cash = 7;
                } else if (this.contentList[index].is_cash == 7) {
                    this.contentList[index].is_cash = 0
                } else {
                    otherAPI.toast('只能勾选没有提现的订单', 'none', false, 1500);
                    return false
                }
                this.ids = [];
                this.allMoney = 0;
                for (let i in this.contentList) {
                    if (this.contentList[i].is_cash === 7) {
                        this.ids.push(this.contentList[i].id)
                        this.allMoney = this.numMoney(this.allMoney + parseFloat(this.contentList[i].money))
                    }
                }
            },
            // 日期更改(滑动触发)
            changeDate(e) {
                //获取当前日期
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let v = e.detail.value
                this.value = v // 于确定使用
            },
            // 选择日期ok
            DateOK() {
                let y = this.years[this.value[0]]
                let m = this.months[this.value[1]]
                this.chooseDate = y + "-" + m // yyyy-m              
                //点击日历,选择确定日期的,请求收益明细的数据
                if (this.type == 10) {
                    this.getIncomeDetail(1, this.chooseDate)
                } else {
                    this.getTiXianDetailLists(1, this.chooseDate)
                }
                // 关闭显示
                this.isDate = false
            },
            //点击提现明细跳转到提现详情
            toWithrawDetaile(index) {
                //传给提现详情的id              
                const id = this.tiXianMingXi[index].company_cash_id;
                uni.navigateTo({
                    url: "withdrawDetaile?id=" + id
                })
            },
            //提现按钮
            goAccount() {
                if (this.allMoney == 0) {
                    otherAPI.toast('提现金额必须大于0元', 'none', false, 1500);
                    return false;
                }
                //选择订单的金额与后台返回的金额进行校验
                let url = `api/company_cash/cash_money`;
                let obj = {
                    token: uni.getStorageSync('data').token,
                    ids: this.ids,
                    money: this.allMoney
                }
                httpRequest_.get(url, obj).then(res => {
                    if (Number(res.data.money) !== this.allMoney) {
                        otherAPI.toast('金额异常', 'none', false, 1500);
                        return false
                    } else {
                        uni.navigateTo({
                            url: "withdrawAccount?money=" + this.allMoney + "&ids=" + this.ids
                        })
                    }
                })
            },
            // 返回上一页
            returnClick() {
                if (this.isRiLi) {
                    uni.navigateBack({
                        delta: 1
                    })
                } else {
                    return false;
                }
            },
            otherClick(url) {
                uni.navigateTo({
                    url: url
                });
            },
        },
        onReachBottom() {
            if (this.type == 10) {
                if (this.IncomeDetailLastPage == this.IncomeDetailPage) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {

                    this.IncomeDetailPage++;
                    this.getIncomeDetail(this.IncomeDetailPage, this.getTime());
                }
            } else if (this.type == 20) {
                if (this.tiXianMingXiLastPage == this.tiXianMingXiPage) {
                    otherAPI.toast('数据加载完毕', 'none', false, 1500);
                    return false;
                } else {
                    this.tiXianMingXiPage++;
                    this.getTiXianDetailLists(this.tiXianMingXiPage, this.getTime());
                }
            }
        },
        onPageScroll(e) {
            if (e.scrollTop > 170) {
                this.isTop = true
            } else {
                this.isTop = false
            }
        },
    }
</script>
<style lang="scss">
    .icon-guanbi1 {
        font-size: 35rpx;
        color: #9fb1f4;
        position: absolute;
        top: 20rpx;
        right: 20rpx;
    }

    page {
        background-color: #000b1b;
        font-family: system-ui; // 统一字体，删除随意不影响
    }

    .contentIson {
        color: #ebeced;
    }

    .top-bg {
        width: 90%;
        height: 260rpx;
        padding-top: 140rpx;
        margin: 0 auto;
        position: relative;
        z-index: 0;

        .bg {
            position: absolute;
            padding-top: 140rpx;
            z-index: -1;
            top: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        .top-content {
            z-index: 2;
            color: #FFFFFF;
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column;
            padding: 30rpx;
            box-sizing: border-box;

            .content-row {
                display: flex;
                flex-flow: column;
                position: relative;

                .font-msg {
                    font-size: 28rpx;
                    color: #5d73c0;
                }

                .content-fp {
                    position: absolute;
                    right: 0rpx;
                    top: 20rpx;
                    padding: 4rpx 20rpx;
                    font-size: 28rpx;
                    background-color: #0c1938;
                    border-radius: 25rpx;
                    border: solid 2rpx #394a82;
                    color: #b3bfe6;
                }
            }

        }

        .top-bz {
            z-index: -2;
            width: 100%;
            box-sizing: border-box;
            padding-top: 266rpx;
            border-radius: 20rpx;
            background-color: #07132b;
            position: absolute;
            bottom: -50rpx;
            font-size: 24rpx;
            color: #29c0cd;
            padding-bottom: 10rpx;

            .bz-content {
                display: flex;
                flex-flow: row;
                align-items: center;
                box-sizing: border-box;
                padding: 0 20rpx;
            }
        }
    }

    .tab {
        width: 100%;
        margin-top: 70rpx;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        padding-bottom: 20rpx;
        padding-top: 10rpx;

        .tab-item {
            font-size: 32rpx;
            color: #46567d;
            transition: all .1s;
        }

        .onTabItem {
            color: #FFFFFF;
            position: relative;

            &:after {
                position: absolute;
                bottom: -20rpx;
                left: 0;
                width: 100%;
                content: "";
                height: 4rpx;
                border-radius: 4rpx;
                background-color: #e3992c;
            }
        }
    }

    .tabTop {
        position: fixed;
        top: 50rpx;
        background-color: #000b1b;
        z-index: 99;
    }

    .list1 {
        //-----------------------------------------------------------------------
        // position: absolute;
        position: relative;
        // margin-top: 560rpx;
        box-sizing: border-box;
        color: #8691be;
        width: 100%;
        padding: 10rpx 30rpx;
        z-index: 2;
        padding-bottom: 200rpx;
        transition: all .1s;

        .list-item {
            width: 100%;
            display: flex;
            flex-flow: row;
            align-items: center;
            min-height: 120rpx;
            border-bottom: solid 1rpx #13234c;

            .icon-x {
                margin-right: 30rpx;
                margin-top: 6rpx;
            }

            .content {
                flex: 1;
                display: flex;
                flex-flow: column;
            }

            .price {
                font-size: 37rpx;
                font-weight: bold;
            }
        }
    }

    .list2 {
        position: absolute;
        // margin-top: 560rpx;
        box-sizing: border-box;
        color: #8691be;
        width: 100%;
        padding: 10rpx 30rpx;
        z-index: 2;
        padding-bottom: 200rpx;
        transition: all .1s;

        .list-item {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: center;
            color: #ebeced;
            min-height: 120rpx;
            border-bottom: solid 1rpx #13234c;


            .flexRow {
                display: flex;
                flex-flow: row;
                align-items: center;
                margin-bottom: 10rpx;

                .flexRow-c1 {
                    font-size: 32rpx;
                }

                .tx-status0 {
                    border: solid 1rpx #80561a;
                    border-radius: 6rpx;
                    color: #80571a;
                    font-size: 22rpx;
                    letter-spacing: 1rpx;
                    padding: 0rpx 10rpx;
                    margin-left: 10rpx;
                }

                .tx-status1 {
                    border: solid 1rpx #6f75d5;
                    border-radius: 6rpx;
                    color: #6f75d5;
                    font-size: 22rpx;
                    letter-spacing: 1rpx;
                    padding: 0rpx 10rpx;
                    margin-left: 10rpx;
                }

                .tx-status2 {
                    border: solid 1rpx #4badb5;
                    border-radius: 6rpx;
                    color: #4badb5;
                    font-size: 22rpx;
                    letter-spacing: 1rpx;
                    padding: 0rpx 10rpx;
                    margin-left: 10rpx;
                }

                .tx-status3 {
                    border: solid 1rpx #6d7d95;
                    border-radius: 6rpx;
                    color: #6d7d95;
                    font-size: 22rpx;
                    letter-spacing: 1rpx;
                    padding: 0rpx 10rpx;
                    margin-left: 10rpx;
                }
            }

            .date {
                font-size: 28rpx;
                letter-spacing: 1rpx;
                color: #46567d;
            }
        }
    }

    .fp-pop {
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .3);
        // background-color: rgba(100, 200, 0, 1.3);
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        .box {
            width: 554rpx;
            // height: 812rpx;
            background-color: rgba(43, 62, 131, .71);
            border-radius: 6px;
            border: solid 4rpx rgba(119, 180, 250, 0.61);
            display: flex;
            flex-flow: column;
            align-items: center;
            position: relative;
            padding-bottom: 30rpx;

            .close {
                font-size: 30rpx;
                transform: scale(1.8, 1.4);
                font-weight: 300;
                position: absolute;
                right: 30rpx;
                top: 20rpx;
                color: #9fb1f4;
            }

            .title {
                font-size: 40rpx;
                color: #e4e8f7;
                font-weight: bold;
                margin: 40rpx 0;
            }

            .cantent {
                width: 500rpx;
                // height: 655rpx;
                background-color: rgba(57, 75, 143, 1);
                border-radius: 6rpx;
                display: flex;
                flex-flow: column;
                padding: 10rpx 50rpx;
                box-sizing: border-box;

                .content-top {
                    flex: 1;
                    font-size: 26rpx;
                    color: #9fb1f4;
                    display: flex;
                    flex-flow: column;

                    .content-top-title {
                        font-size: 26rpx;
                        color: #ffffff;
                        margin: 20rpx 0;
                    }

                    .content-top-c {
                        color: #778ee0;
                        line-height: 2em;
                    }
                }

                .content-bottom {
                    border-top: solid 1px rgba(16, 30, 53, .2);
                    box-sizing: border-box;
                    text-align: center;
                    padding: 20rpx;
                    width: 100%;
                    font-size: 30rpx;
                    color: #68fffe;
                }
            }
        }
    }

    .di {
        position: fixed;
        bottom: 0;
        width: 750rpx;
        height: 107rpx;
        background-color: #031124;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 50rpx;
        z-index: 10;
        transition: all .1s;

        .price {
            color: #ff9c0d;
            font-size: 40rpx;
        }

        .btn {
            width: 229rpx;
            height: 80rpx;
            background-color: #29498b;
            border-radius: 10rpx;
            font-size: 32rpx;
            letter-spacing: 1rpx;
            color: #ffffff;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            font-weight: 900;
        }

        // 提现按钮置灰
        .newbtns {
            color: #4c5c85;
            background-color: #0a1a3c;
        }
    }

    .date-box {
        width: 750rpx;
        height: 490rpx;
        background-color: #ffffff;
        // border-radius: 30rpx 30rpx 0rpx 0rpx;
        position: fixed;
        bottom: 0;
        z-index: 9999;

        .date-title {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            font-size: 31rpx;
            box-sizing: border-box;
            padding: 20rpx 60rpx;
            border-bottom: solid 1px #ededed;
        }

        // 日期选择样式
        .date-content {
            .date-picker {
                height: 420rpx;
            }

            .date-item {
                // 选项样式
                color: #000000;
                font-size: 39rpx;
                line-height: 1.8em;
                text-align: center;
            }
        }
    }

    // 无消息样式
    /* 08-11  */
    .nullMsg {
        font-size: 26rpx;
        text-align: center;
    }

    .ggmsgnot {
        width: 416.66rpx;
        height: 416.66rpx;
        margin: auto;
        display: block;
        margin-top: 150rpx;
    }

    .content-time {
        font-size: 28rpx;
        color: #46567d;
    }

    .list-item:last-child {
        border-bottom: none !important;
    }
</style>
