// pages/setClipboardData/setClipboardData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    fz:"我是要被复制的内容?点击复制复制了吗??"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("1")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("2")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    console.log("3");

    

  },
//复制功能封装
  copyCode () {
    let _this = this
    wx.setClipboardData({
      data: _this.data.fz,
      success(res) {
        wx.setStorageSync('clip', {
          search_val: _this.data.fz,
          used: true
        })
      }
    })
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