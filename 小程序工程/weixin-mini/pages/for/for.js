// pages/for/for.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:1,
        name:"小明"
      },
      {
        id:2,
        name:"小刚"
      },
      {
        id:3,
        name:"小红"
      }
    ],
    isTrue:false,
    col:"newColor"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)

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
  goClick(e){
    console.log('我点击了',e.currentTarget.dataset.index)
    this.setData({
      isTrue:true
    })
  }


  
 
})