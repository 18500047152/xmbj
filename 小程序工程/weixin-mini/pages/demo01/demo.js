// pages/demo01/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //这里的数据,传给子组件
      tabs:[
          {
            id:0,
            neirong:"首页",
            isTrue:true
          },
          {
            id:1,
            neirong:"原创",
            isTrue:false
          },
          {
            id:2,
            neirong:"分类",
            isTrue:false
          },
          {
            id:3,
            neirong:"关于",
            isTrue:false
          }
        ]
  },
  // 子组件对父组件传参,让AppDate里面的数据,进行实时刷新
  zinewIndex(e){
    console.log(e.detail.newIndex)
    let newIndex=e.detail.newIndex;
    //获取原数组
    let tabs=this.data.tabs;
    tabs.forEach((item,index)=>index===newIndex?item.isTrue=true:item.isTrue=false)

    this.setData({
      tabs
    })

  }

  
})