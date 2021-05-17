// pages/demo5/demo5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShareAppMessage(res){
    if(res.from === 'button'){
        // 
    }
    return{
      title:"时青云",
      path:'/pages/demo5/demo5',
      // imageUrl: "/static/img/share.png",
      imageUrl:"../../images/v001.jpg",
      success:(res) =>{
      console.log("转发成功")
      },
      fail:(res) =>{
       console.log("转发失败")
      }
    }
  }

 
})