// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //个人信息
    userinfo:{},
    //收藏商品数量-->这个变量,是触发微信缓存中,取得商品数量-->在onShow回调中写
    collectNums:0
  },
onShow(){
  //页面显示时,从缓存中拿取个人信息
  const userinfo=wx.getStorageSync("userInfo");
  

 const newcollect=wx.getStorageSync("collect")||[];
this.setData({
    userinfo,
    collectNums:newcollect.length
  })


//console.log(userinfo);
}

})