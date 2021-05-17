// pages/Carmen/Carmen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpenCamera:true,
    isCamera:false,
    videoUrl:"",
    tital:"录制"
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
  bind_Cameta_tital(){
   //调用小程序接口的方法-->录制视频
    if(this.data.tital==="录制"){
      this.setData({
        tital:"停止"
      })
      //开始录制视频
      this.ctx.startRecord({
        success: (res) => {
          wx.showToast({
            title: '开始',
            icon: 'success',
            duration: 2000
          })
          


        },
      })

    }else{
      this.setData({
        tital:"录制"

      })
       //停止录制视频
       this.ctx.stopRecord({
        success: (res) => {
          wx.showToast({
            title: '结束',
            icon: 'success',
            duration: 2000
          }) 
          this.setData({
            videoUrl:res.tempVideoPath
    
          })
        },
        
       

      })
    }
  
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