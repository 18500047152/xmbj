/*
一:需求,用户下拉滑动商品,滚动条触底了,就加载下一页商品
//1:找到滚动条触底事件
//2:判断:如果有下一页数据,就弹个提示框,没有下一页数据
      //获取总页数  总条数:total: 57445 
      //总页数=Math.ceil(向上取证)(总条数total: 57445 /页面条数 pagesize:20)
      //获取当前页数pagenum:1,
      //总页数-当前页数>1 就说明有
//3:下一页,在点击下一页...
    //1:当前页码++
    //2:从新发送ajax
    //3:把新数据拼接旧数据  [不是替换]
//页面触底事件onReachBottom
二:下拉刷新需求
 1:触发下拉刷新事件
    需要在json中添加配置项
 2:清空数组
 3:重置页码为1
*/
// pages/goods_list/index.js
import {Request} from "../../request/index";
//es7语法的async异步请求引入
import regeneratorRuntime from '../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
//定义要给子组件传的数据
    tabs:[
      {
        id:0,
        neiRong:"综合",
        isTrue:true
      },
      {
        id:1,
        neiRong:"销量",
        isTrue:false
      },
      {
        id:2,
        neiRong:"价格",
        isTrue:false
      }
    ],
    // 接受商品详情的数据
    goodList:[]
  },
 //接受接口返回的数据
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:20

  },
  //总条数变量
  totalPageSize:1,
  //发送ajax异步请求->用async的方式,要把async以及promise封装引入进来
  //const result=await Request({url:'/goods/search',data:this.QueryParams})请求带有数据的
  async getGoodsList(){
    //url: 'https://domainname/url?id='+ val
    const result=await Request({url:'/goods/search?pagenum'+this.QueryParams.pagenum})
    //console.log(result.data.message);
    //获取总条数
    const total=result.data.message.total;
    //计算总页数(页面数据量太大多/300)
    this.totalPageSize=Math.ceil(total/this.QueryParams.pagesize/900);
  //  console.log(this.totalPageSize);
    this.setData({
      //goodList:result.data.message.goods,
      //获得页面数据,进行拼接 把新数据拼接旧数据  [不是替换]
      goodList:[...this.data.goodList,...result.data.message.goods],
      totalPageSize:this.totalPageSize
    })
    //关闭下拉刷新等待的效果 wx-stop这么输入才有提示
    //wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   * options对象,是接收,组件传过来的参数
   */
  onLoad: function (options) {
    console.log(options.cat_id)
   // console.log(options)
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
//onReachBottom下拉触底的回调函数
onReachBottom(){
  // 在这里写,滚动条到底的逻辑
  if(this.totalPageSize-this.QueryParams.pagenum<1){
   // console.log("88"+this.QueryParams.pagenum);
   //数据加载完毕,来的提示框
   wx.showToast({
    title: '数据加载完毕',
    icon: 'none',
    duration: 2000//持续的时间
  })
  }else{
    console.log("有数据了");
    
    this.QueryParams.pagenum++;
   // console.log("93"+this.QueryParams.pagenum);
    this.getGoodsList();
  }
},
//onReachBottom页面下拉刷新的回调函数
onPullDownRefresh(){
    console.log("页面下拉刷新了");
    //清空数组
    this.setData({
      goodList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    setTimeout(()=>{
    //重新发送ajax
      this.getGoodsList();
       //关闭下拉刷新等待的效果 wx-stop这么输入才有提示
      wx.stopPullDownRefresh();
    },1000)
  
},
 //在data同级未定,定义子组件传过来的参数
  sonIndex(e){
    let newIndex=e.detail.newIndex;
    //获取原数组
    let tabs=this.data.tabs;
    //console.log(tabs);
    tabs.forEach((v,i)=>i===newIndex?v.isTrue=true:v.isTrue=false)
    this.setData({
      tabs
    })
  },
  
})