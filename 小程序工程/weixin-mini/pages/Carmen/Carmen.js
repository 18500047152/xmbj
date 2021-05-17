// pages/Carmen/Carmen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpenCamera:true,
    isCamera:false,
    imageUrl:"../../images/default-avatar.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //3:绘制画布,作为相片的存放容器
     this.ctx=wx.createCameraContext()

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
//1:打开相机事件
  bindCamera(){  
    this.setData({
        isOpenCamera:false,

        isCamera:true
    })
    console.log(this.data.isOpenCamera)
   
  },
  //2:拍照事件
  bind_Cameta_pz(){
   //调用小程序接口的方法-->quality拍照质量
   this.ctx.takePhoto({
    quality:"high",
    success:(res)=>{
      console.log(res.tempImagePath)
      this.setData({
        imageUrl:res.tempImagePath
      })
    }
   })
  },
  //4:close关闭按钮事件
  close(){
    console.log("你出发了 吗")
    this.setData({
      isCamera:false,
      isOpenCamera:true
    })
  }
  

})