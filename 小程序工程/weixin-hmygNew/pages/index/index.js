// pages/goos_detail/index.js
//引入promis_index文件
import {Request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据默认变量
    swiperList:[],
    //轮播图下面的导航变量
    cateList:[],
    //楼层变量
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载,页面一加载触发的生命周期,可以获取接口请求
   */
  onLoad: function (options) {
    /*------------------------------------------------------------这么写有回调地狱问题
      wx.request({
        //url地址
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //发送数据
       // data: {},
        //请求头
        //header: {'content-type':'application/json'},
        //数据类型
        //method: 'GET',
        //返回的数据类型
       // dataType: 'json',
        //返回的数据类型
       // responseType: 'text',
       //成功的回调
        success: (result)=>{  
          let newSwiperList=result.data.message;
          //获取到数据,给sewiperList,进行赋值
          this.setData({
            swiperList:newSwiperList
          })
          //打印出来的
          //console.log(this.data.swiperList)
        },
        //失败的回调
        //fail: ()=>{},
        //成功失败都执行的回调
        //complete: ()=>{}
      });
 */
//------------------------------------------------------------------用promise改进,调用外部轮播图数据的方法
    this.getSwiperList();
//------------------------------------------------------------------用promise改进,调用外部分类导航数据的方法
    this.getCateList();
//------------------------------------------------------------------用promise改进,调用外部分类导航数据的方法
    this.getFloorList()
  },

// 在data同级位置,定义获取轮播图数据的方法
 getSwiperList(){
   Request({url:'/home/swiperdata'})
  .then(result=>{  
    let newSwiperList=result.data.message;
    //获取到数据,给sewiperList,进行赋值
    this.setData({
      swiperList:newSwiperList
    })
    }
  )
 },
 // 在data同级位置,定义获取分类导航数据的方法
 getCateList(){
  Request({url:'/home/catitems'})
 .then(result=>{  
   let newCateList=result.data.message;
   //获取到数据,给cateList,进行赋值
   this.setData({
    cateList:newCateList
   })
   }
 )
},
 // 在data同级位置,定义获取楼层数据的方法
getFloorList(){
  Request({url:'/home/floordata'})
 .then(result=>{  
   let newFloorList=result.data.message;
   //获取到数据,给FloorListt,进行赋值
   this.setData({
    floorList:newFloorList
   })
   }
 )
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})