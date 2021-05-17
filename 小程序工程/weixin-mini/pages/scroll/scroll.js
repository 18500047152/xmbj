Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0 
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

 
  },
  //监听屏幕滚动 判断上下滚动  
  onPageScroll: function (ev) {
    console.log(ev)
    var _this = this;
    //当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值   
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动   
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
        console.log('向下滚动');   
       } else {
        console.log('向上滚动');  
        }  
      //给scrollTop重新赋值    
      setTimeout(function () {
        _this.setData({
          scrollTop: ev.scrollTop
        })
      }, 0)
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
    console.log("是屏幕的高度吗?"+wx.getSystemInfoSync().windowHeight);
      let query = wx.createSelectorQuery();
        query.select('.demo1').boundingClientRect(rect=>{
          let clientHeight = rect.height;
          let clientWidth = rect.width;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio;
          console.log(height);
        }).exec();

        let queryPage = wx.createSelectorQuery();
        queryPage.select('.demo2').boundingClientRect(rect=>{
          let clientHeight = rect.height;
          let clientWidth = rect.width;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio;
          console.log("page"+height);
        }).exec();
 
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