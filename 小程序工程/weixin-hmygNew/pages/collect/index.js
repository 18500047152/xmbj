/**
   * 需求1：
   *      1：订单页面是频繁被打开的，所有JS定义在onShow生命周期函数--监听页面显示
   *           1_0：onShow不同于onload（options）,无法在形参中接收navUrl传过来的参数的
   *                解决办法：获取当前小程序页面栈--》是一个数组，长度为10，10个页面
   *                        let Pages =  getCurrentPages();
   *                 打开了两个页面的话，pages就是2个页面数组信息,数组最大的索引，就是当前页面,参数在options属性中
                                       onShow: function () {
                                                let pages =  getCurrentPages();
                                                let currentPage=pages[pages.length-1].options
                                                console.log(currentPage);
                                              },

   * 
   *                  
   *      2:获取页面中navUrl=Type传过来的值1/2/3
   *      3:根据navUrl=Type传过来的值发送ajax
   *      4:渲染页面
   *  需求2：点击不同的订单/代付款/不同的标题这也是重新发送ajax的
   */
// pages/order/index.js
import {Request} from "../../request/index";
//es7语法的async异步请求引入
import regeneratorRuntime from '../lib/runtime/runtime.js';
Page({

  data: {
    //收藏的数组变量
    collect:[],

    //定义要给子组件传的数据
    tabs:[
      {
        id:0,
        neiRong:"商品收藏",
        isTrue:true
      },
      {
        id:1,
        neiRong:"品牌收藏",
        isTrue:false
      },
      {
        id:2,
        neiRong:"店铺收藏",
        isTrue:false
      },
      {
        id:3,
        neiRong:"浏览足迹",
        isTrue:false
      }
    ]
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
    //页面加载时,从缓存中拿存储数据
      const collect=wx.getStorageSync("collect")||[];
      this.setData({
        collect
      })

  },

     sonIndex(e){
      // console.log(e);
      let index =e.detail.newIndex;

       //获取原数组
       let tabs=this.data.tabs;
       //console.log(tabs);
      tabs.forEach((v,i)=>i===index?v.isTrue=true:v.isTrue=false)
     this.setData({
       tabs
     })
    }

  
})