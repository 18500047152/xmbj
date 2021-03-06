// pages/search/index.js
/*
  需求:输入框搜索内容,获取商品信息
      1:获取输入框输入内容
      2:合法性判断
      3:检测通过,把值传送给后台
      4:返回数据
  需求2:防抖功能
        [搜索框输入的时候,每传入一个字符,都会发送一次ajax,这个效果很不好]-->关键技术是定时器setTimeout(一秒后执行一次,,,不是每秒钟执行一次[setTimeval])
        1:定义全局的变量 TimeID
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
    //接收商品搜索数组
    Qsearch:[],
    //取消按钮是否显示
    isFocus:true,
    valInput:""

  },
  TimeID:-1,
//输入框输入执行的事件
 handleInput(e){
 // 1:接收input框输入的值
  const {value}=e.detail;
  //2:判断这个值的合法性是否为空[去掉首尾空格]value.trim()
  if(!value.trim()){
    console.log("输入的值不合法");
   this.setData({
    Qsearch:[],
    isFocus:true
   })
    return;
  }
  //3:到这一步,就是值合法 
  //4:增加防抖功能
    clearTimeout(this.TimeID);
  this.TimeID=setTimeout(() => {
    this.Qsearch(value);
    this.setData({
      isFocus:false 
  })
  }, 1000);
    
},
headleQuXiao() { 
  this.setData({
    valInput:"",
    Qsearch:[],
    isFocus:true
   })
 }, 
//封装搜索的方法-->发送ajax
    async Qsearch(query){
            const result=await Request({url:'/goods/qsearch',data:{query}})
            //result 是接收接口返回的总数据
             this.setData({
               //result.data.message 是接收接口返回的总数据中的,商品数据,赋值给变量中
              Qsearch:result.data.message
            })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})