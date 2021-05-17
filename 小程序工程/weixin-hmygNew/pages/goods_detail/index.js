/**
 * 需求:
 * 1:给轮播图添加,点击事件,
 * 掉用小程序接口api previewImage
 * 
 * 2:加入购物车按钮
 * 1:先绑定事件
 * 2:获取缓存中购物车数据,[]格式
 * 3:先判断当前商品是否在购物车内
 * 4:如果在?数量+1;如果不在,加入   从新把购物车数组,添加到缓存内
 * 5:第一次肯定不存在购物车,点击之后,直接给购物车数组,添加一个新元素:带上购买数量属性 nums
 * 6:弹出提示
 * 
 * 需求:商品收藏
 *    1:页面onshow的时候,加载缓存中商品收藏数据,
 *    2:判断商品是不是被收藏?
 *          如果是改变图标颜色
 *          不是啥也不变
 *    3:点击商品收藏按钮
 *        判断该商品是否存在数组中,
 *        已经存在,点击删除,
 *        如果不存在,加入收藏数组,放入缓存中
 */
// pages/goods_list/index.js
import {Request} from "../../request/index";
//es7语法的async异步请求引入
import regeneratorRuntime from '../lib/runtime/runtime.js';
// pages/goos_detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //页面商品,返回的数据是对象,不是数组,注意
    goodsObj:{},
    collect:[],
    isCollect:false
  },
  //定义全局变量,存储全部商品数据,定义轮播图点击事件用
  allGoodsObj:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    //商品页面栈
    let pages =  getCurrentPages();
    const {goods_id}=pages[pages.length-1].options
    
  //商品是商品列表页,传过来的ID options.goods_id
  console.log(goods_id);
  //const goods_id=options.goods_id
  //调用根据ID获取商品加载完成的ajax()
  this.getGoodsDetail(goods_id);


  },

  //根据ID获取商品加载完成的ajax
  async getGoodsDetail(goods_id){
      //url: 'https://domainname/url?id='+ val
      const result=await Request({url:'/goods/detail',data:{goods_id}})
      
      console.log(result.data.message);
      //把请求数据,给轮播点击事件用到的全部数据,一份
      this.allGoodsObj=result.data.message;

          //收藏功能-->获取收藏数组 
      const collect=wx.getStorageSync("collect")||[];
      //判断当前商品是否被收藏
      let isCollect=collect.some(v=>v.goods_id===this.allGoodsObj.goods_id)

      this.setData({
        //这是全部赋值,下面是用到那个,赋值那个,进行优化
        //goodsObj:result.data.message,
        goodsObj:{
          pics:result.data.message.pics,
          pics_mid:result.data.message.pics_mid,
          goods_price:result.data.message.goods_price,
          goods_name:result.data.message.goods_name,
          // goods_introduce:result.data.message.goods_introduce
          //需求,苹果不支持webp格式图片,后台没时间修改,前端如何暂时修改呢?前提条件,接口内部,有一张.jpg图片[最好找后台] 
          //goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g,'.jpg')
          goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g,'.jpg')

        },
        isCollect
      })
      
    },
    //点击收藏的事件
handleisCollect(){
          let isCollect=false;
          //1:收藏功能-->获取收藏数组 
          const collect=wx.getStorageSync("collect")||[];
          //2:判断当前商品是否被收藏
          let index=collect.findIndex(v=>v.goods_id===this.allGoodsObj.goods_id)
          //3:index=-1是,是当前商品没有找到,没有收藏
          if(index!==-1){
            //这是是?找到了当前商品,点击取消收藏,从原数组中删掉-->index是找到当前商品,返回商品所在索引值
            collect.splice(index,1);
            isCollect=false;
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
            });
          }else{
            //到这一步?是没有收藏过
            collect.push(this.allGoodsObj);
            isCollect=true;
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
            });
          }
          //4:把数组存入到缓存中
          wx.setStorageSync("collect", collect);

          this.setData({
            isCollect,
          })

    },

//定义 点击轮播图事件
headPreviewImage(e){
  console.log("点击了");
  //接受传递过来的索引
  let newIndex=e.currentTarget.dataset.index;
  console.log(newIndex);
  /*
    1:先构造要预览的数组
    //把大图的链接,遍历到,存入urls中
  */
 const urls=this.allGoodsObj.pics.map(v=>v.pics_mid)
  wx.previewImage({
    //current预览谁?那就先预览第一张-->urls[0]是无论第几张图片,点击,都先预览第一张?如果,点击那个图片,就预览第几张?需要传递索引值
    current: urls[newIndex],
    //2:给urls赋值
    urls: urls,
  
 
  });
},
//点击加入购物车事件
  JiaRuGWC(){
   // console.log("加入购物车");
 /*   1:先绑定事件
 * 2:获取缓存中购物车数据,[]格式
 * 3:先判断当前商品是否在购物车内
 * 4:如果在?数量+1;如果不在,加入   从新把购物车数组,添加到缓存内
 * 5:第一次肯定不存在购物车,点击之后,直接给购物车数组,添加一个新元素:带上购买数量属性 nums
 * 6:弹出提示
 * */
//2:获取缓存中购物车数据,[]格式   第一次获取是空字符串不是数组,所以||[]
    let cartNum=wx.getStorageSync("cartNum")||[];
// 3:先判断当前商品是否在购物车内数组内
    let index=cartNum.findIndex(v=>v.goods_id==this.allGoodsObj.goods_id);
   // console.log(index);
    if(index===-1){
      // 3:表示不存在,就是第一次添加
      this.allGoodsObj.num=1;
      this.allGoodsObj.checked=true;
      cartNum.push(this.allGoodsObj)
    }else{
      // 4:存在数量+1; index//不是索引值,是个数组对象,遍历数组,如果当前元素不在当前对象内,返回值为-1
      cartNum[index].num++;
    }
    //5:购物车数据重新添加到缓存内
    wx.setStorageSync("cartNum", cartNum);
    //6:弹框提示
    wx.showToast({
      //弹窗内容
      title: '加入成功',
      icon: 'success',
      //事件
      duration: 1500,
      //true 防止用户手抖
      mask: true,
    
    });
},

//定义点击购买事件
goCart(){
  console.log("事件");
  // wx.reLaunch({
  //   url: '../cart/index',
  //   success: (result)=>{
      
  //     wx.setStorageSync("cartNum", cartNum);
  //   },
   
  // });
}

  

  
})