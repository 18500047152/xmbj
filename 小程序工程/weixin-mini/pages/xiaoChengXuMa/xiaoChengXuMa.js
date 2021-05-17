// pages/xiaoChengXuMa/xiaoChengXuMa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: "首页",
        isTrue: true
      },
      {
        id: 1,
        name: "原创",
        isTrue: false
      }
      ,
      {
        id: 2,
        name: "分类",
        isTrue: false
      }
      ,
      {
        id: 3,
        name: "关于",
        isTrue: false
      }
    ],
    

  },
  // 子组件传过来的数据,父组件自定义事件,进行接收
  headerSonMsg(e){
    console.log(e)
   // console.log(e.detail.index)
    //接收子组件传过来的索引值
    const newIndex=e.detail.index;
    //获取当前tab栏原数组
    const tabs=this.data.tabs;
    //在重新遍历
    tabs.forEach((item,index,arr) =>index===newIndex?item.isTrue=true:item.isTrue=false);
    //把数组进行赋值-->这时更改子组件,父组件的tabs数据也进行了刷新更改
    this.setData({
      tabs
    })

  }



})