// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        neiRong:"体验问题",
        isTrue:true
      },
      {
        id:1,
        neiRong:"商品/商家投诉",
        isTrue:false
      }
    ],

  },
  //在data同级未定,定义子组件传过来的参数
  sonIndex(e){
    let newIndex=e.detail.newIndex;
    //获取原数组
    let tabs=this.data.tabs;
    //console.log(tabs);
    tabs.forEach((v,i)=>i===newIndex?v.isTrue=true:v.isTrue=false)
    this.setData({
      tabs
    })
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

  },

 
 
})