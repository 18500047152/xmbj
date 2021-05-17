// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//获取用户登录信息事件
handleGetUserInfo(e){
  //获取用户信息
  //console.log(const userInfo=e.detail.userInfo);
  //            const {userInfo}=e.detail;
  const {userInfo}=e.detail;
 // console.log(userInfo);
  //把获取的信息,存入到缓存中
  wx.setStorageSync("userInfo", userInfo);
  wx.navigateBack({
    delta: 1
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})