// pages/category/index.js
import {Request} from "../../request/index";
//es7语法的async异步请求引入
import regeneratorRuntime from '../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //创建变量接受分类页面总数据
    cateList:[],
    //分类页面总数据-->左侧数据
    leftcateList:[],
    //分类页面总数据-->右侧数据
    rightcateList:[],
    //分类左侧点击初始化索引值
    leftIndex:0,
    //scroll右侧滚动条默认顶置索引
    gunDongTiao_index:0
  },
  //总数据变量定义在这里,页面刷新不会请求(不用这个,只是做左侧右侧数据的渲染)
  //cateList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //------------------------------------------------------------------用promise改进,调用外部分类
  /*
  1:在发送数据之前,先做判断,如果有旧的数据,并且没有过期,就不在请求了,
  {time:Date.now(),data:[]}
  2:获取本地数据
*/
//从本地取值,根据Key值取
const newCate=wx.getStorageSync("cates");

  //  console.log(newCate)
//if newCate本地数据没有,!newCate   就要从新发送请求
   if(!newCate){
     //导航数据的方法
      this. getCateList()
   }else{
     //if newCate本地数据 超过100秒钟   就要从新发送请求
     if(Date.now()-newCate.time>100000){
       this. getCateList()
     }else{ 
       //if newCate本地数据 有 也并没有超过100秒钟,  就用旧的数据,不用发送请求
       
        //原先的总数据=存储的总数据
        this.data.cateList=newCate.date;
         //遍历总数据,给左侧数据赋值
          let leftcateList=this.data.cateList.map(v=>v.cat_name);
          //遍历总数据,给右侧数据赋值
          let rightcateList=this.data.cateList[0].children;
          this.setData({        
            //左侧数据赋值
          leftcateList:leftcateList,
            //右侧数据赋值
          rightcateList:rightcateList
          })

        //  console.log("我没有刷新,我倒这步了")
     }
      
   }
  
  },

//在data同级位置定义scroll滚动条,左边的事件------------------------------------------------------
headleltemTao(e){
  //定义scroll滚动条,左边的事件传过来的索引值
  // console.log(e.currentTarget.dataset.index)
  const newIndex=e.currentTarget.dataset.index;
    //这是总数据
    //let newCateList=result.data.message;
     //遍历总数据,给右侧数据赋值
     //ps:知识点:this.data.cateList是给data里面的变量赋值
              //this.cateList是给data外面的变量赋值
     let rightcateList=this.data.cateList[newIndex].children;
    this.setData({
      //索引值赋值
      leftIndex:newIndex,
      //右侧数据赋值
     rightcateList:rightcateList,
     //右侧滚动条默认顶置索引赋值
     gunDongTiao_index:0
    })
},

 // 在data同级位置,定义获取楼层数据的方法
 async getCateList(){
  /*
  Request({url:'/categories'})
 .then(result=>{  
   //这是总数据
   let newCateList=result.data.message;
   //获取到了总数据,在本地进行存储key  value----------------------------------------------------
   wx.setStorageSync("cates",{time:Date.now(),date:newCateList})
   //遍历总数据,给左侧数据赋值
   let leftcateList=newCateList.map(v=>v.cat_name);
    //遍历总数据,给右侧数据赋值
    let rightcateList=newCateList[0].children;
   this.setData({
     //总数据赋值
    cateList:newCateList,
     //左侧数据赋值
    leftcateList:leftcateList,
     //右侧数据赋值
    rightcateList:rightcateList
   })
   }
 )
 */
//使用es7的async-->await发送数据,
 const result=await Request({url:'/categories'})
 //这是总数据
 let newCateList=result.data.message;
 //获取到了总数据,在本地进行存储key  value----------------------------------------------------
 wx.setStorageSync("cates",{time:Date.now(),date:newCateList})
 //遍历总数据,给左侧数据赋值
 let leftcateList=newCateList.map(v=>v.cat_name);
  //遍历总数据,给右侧数据赋值
  let rightcateList=newCateList[0].children;
 this.setData({
   //总数据赋值
  cateList:newCateList,
   //左侧数据赋值
  leftcateList:leftcateList,
   //右侧数据赋值
  rightcateList:rightcateList
 })
},

 

  
})