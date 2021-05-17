// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.request({
      //url地址
      url: 'https://111.231.242.24:3000/test_titel',
     
     //成功的回调
      success: (result)=>{  
       
      
        console.log("你好"+result)
      },
    
    });
  },


})