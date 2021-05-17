// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
// type是接收值得类型,,数组就是Array
//value是默认值'',
tabs:{
      type:Array,
      value:[]
    },
  




  },

  /**
   * 组件的初始数据
   */
  data: {



    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    headerTap(e){
      //获取tab栏点击当前的索引值
      const newIndex=e.currentTarget.dataset.index;
     //   console.log(newIndex)
      //获取当前tab栏原数组
      const tabs=this.data.tabs;
      //添加新功能,在事件中,利用this.triggerEvent("父组件自定义事件名","要传过去的值{newIndex:newIndex}")
      
      this.triggerEvent("sonMsg",{index:newIndex})

      tabs.forEach((item,index,arr) =>index===newIndex?item.isTrue=true:item.isTrue=false);
      console.log(tabs)
      this.setData({
        tabs
      })
       
    }

  }
})
