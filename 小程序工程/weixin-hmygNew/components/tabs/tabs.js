// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fu_tabs:{
      type:Array,
      value:[]
    }
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
    fu_index(e){
      const newIndex=e.currentTarget.dataset.index;
      this.triggerEvent("sonIndex",{newIndex})
     
    }
  }
})
