// pages/globalData/globalData.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"小红"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //1获取当前页面的名字
      console.log(this.data.name)
      //2获取全局globalData的名字
      console.log(app.globalData.newName)
      //3:拿到全局变量,给当前页面的名字赋值
      if(app.globalData.newName.length>0) {
        this.setData({
          name:app.globalData.newName
        })
      }
      //4:修改全局的globalData的值
      app.globalData.newName="小刚"
      this.setData({
        name:app.globalData.newName
      })
      console.log("现在全局名字为"+app.globalData.newName)

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