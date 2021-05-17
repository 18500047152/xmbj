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
    //新建获取订单变量
    order:[],

    //定义要给子组件传的数据
    tabs:[
      {
        id:0,
        neiRong:"全部订单",
        isTrue:true
      },
      {
        id:1,
        neiRong:"代付款",
        isTrue:false
      },
      {
        id:2,
        neiRong:"代发货",
        isTrue:false
      },
      {
        id:3,
        neiRong:"退款/退货",
        isTrue:false
      }
    ],
    jiaOrder:[
      {
        id:0,
        dingdan_bianhao:"订单编号",
        bianhao:"123456789",
        dingdan_price:"订单价格",
        price:"¥6666",
        dingdan_data:"订单日期",
        data:"2020-5-15"
      },
      {
        id:1,
        dingdan_bianhao:"订单编号",
        bianhao:"987654321",
        dingdan_price:"订单价格",
        price:"¥7777",
        dingdan_data:"订单日期",
        data:"2020-5-18"
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
    //0:先从缓存中获取token,如果没有,就行授权
    const token = wx.getStorageSync("token");
    
    if(token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    console.log("有token");
    //到这就是有token
    //1：获取页面传过来的参数--》页面中navUrl=Type传过来的值1/2/3
    let pages =  getCurrentPages();
    //获取传过来的值-->利用解构赋值
    let {type}=pages[pages.length-1].options;
    //console.log(type);
    //1:根据type值,显示那个标题-->type/与index的关系是-1的
    this.getOrder_index(type-1)
    //2:根据navUrl=Type传过来的值发送ajax
    this.getOrder(type);
   //   4:渲染页面
    //发送ajax请求
  },
  //发送ajax获取数据的方法-->参数，这个参数式点击订单时，带过来的
 async getOrder(type){
      const res=await Request({url:"/my/orders/all",data:{type}})
      console.log(res);//打印结果null/因为没有token值
      //有token值时,打印也是null,那是因为缓存中token,被清除了,需要判断一下?如果没有token值,就进行授权,获取token,有token值了,这样才能打印出订单
      this.setData({
        order:res.orders

      })
  },

  //做-->从全部订单跳过了,就显示全部订单内容,从代付款跳过了,就显示待付款内容
     getOrder_index(index){
        //获取原数组
        let tabs=this.data.tabs;
        //console.log(tabs);
       tabs.forEach((v,i)=>i===index?v.isTrue=true:v.isTrue=false)
      this.setData({
        tabs
      })
    },
     sonIndex(e){
       console.log(e);
      let index =e.detail.newIndex;

      this.getOrder_index(index);
      //切换标题是,需要重新发送ajax请求,type=1映射关系index=0
      this.getOrder(index+1)
    }

  
})