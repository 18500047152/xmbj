/*需求
一:点击收货地址按钮流程
  1:给按钮添加点击事件
  2:微信小程序内置api
    wx.chooseAddress({
      success: (result)=>{
        console.log(result);
      },
     
    });
    这个方法有bug,如果第一次用户点了取消,就再也打不开通讯地址了
  正确的2:
    先获取用户权限scope
    1:假设用户第一次权限点击确认scope
       wx.getSetting({
            success: (result)=>{
     console.log(result.authSetting.scope.address);
     //输出为true
     },
     2:假设用户第一次权限点击取消scope
       wx.getSetting({
            success: (result)=>{
     console.log(result.authSetting.scope.address);
     //输出为false
     },
     3:假设用户从来没有调用获取地址权限
       wx.getSetting({
            success: (result)=>{
     console.log(result.authSetting.scope.address);
     //输出为undefined
     },
  当用户点击确认true或者没有调用获取地址权限undenfind,都能获取收货地址
  如果用户点了取消,只能wx.openSetting()方法诱导用户,打开用户权限
            },
二:点击按钮获取收货地址,
   如果有,从缓存拿地址,赋值给data里的一个变量
   购物车是一个频繁打开的页面,代码可以放入onshow生命周期内,页面发生变化,触发
 需求:二:把缓存中购物车的数据,添加到页面上
    1:回到最初的购物车页面中,第一次绑定了个购买数量属性,
    再添加一个是否选中属性 checked
    2:从缓存中获取数据
    3:在data中定义一个变量,进行渲染
需求:点击底部全选按钮,商品全选,
    在data 中,定义全选变量,默认值flase
    1:onshow中获取缓存中,商品数组
    2:商品中所有的值为true,全选的check="true"
需求:总价格/总数量
    1:都需要商品被选中
    2:获取购物车数组,进行遍历
    3:判断商品是否被选中
    4:选中?总价格=单价*数量
        总数量=allnum+=数量
    5:从新设置data即可
需求:勾选购物车商品页面的,选中按钮,取消后,改变data变量的值,以及缓存中的值
    1:绑定change
    2:获取到被修改的商品对象
    3:商品对象的选中状态,取反
    4:重新填充到data中以及缓存中
    5:重新计算总价格,总数量
需求:全选/反选功能
    1:给单选/全选框绑定事件
    2:获取全选data变量allChecked
    3:直接取反allChecked=!allChecked;
    4:遍历购物车check状态,让他随着allChecked改变而改变
    5:把购物车数组跟allChecked状态,重新赋值
需求:点击-+按钮实现商品数量的++--,修改的事data:cartNum[],数组的num属性
    1:给+-按钮,绑定同一个点击事件,通过data-参数={{+/-}}区分(我想的是,绑定+-,两个事件)
    2:传递被点击的商品ID goods_id
    3:获取data中的购物车数组,获取被修改的对象
    4:修改num属性
          增加需求:当商品数量=1,用户还点击-号,
          给个提示,wx.showModel()方面
          确定,删除商品,取消,啥也不做
    5:把cartNum[],重新赋值回去
需求:点击结算按钮,实现的功能
    1:判断有没有收货地址
    2:判断有没有商品信息
    3:如果都有,跳转支付页面
*/
// pages/cart/index.js
//引入promise 代码的封装函数
import { getSetting, chooseAddress, openSetting,openShowToast } from "../../utils/asyncWx";
//引入防止async报错包,路径
import regeneratorRuntime from '../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address_list: {},
    //获取缓存中商品数量
    cartNum: [],
    //全选变量
    allChecked: false,
    //总价格变量
    allTotalPrice: 0,
    //总数量变量
    allNum: 0
  },

  onShow: function () {

    //获取本地存储数据,给address_list{}赋值
    const address_list = wx.getStorageSync('CartAddress')

    //从本地缓存中,获取加入购物车商品信息
    const cartNum = wx.getStorageSync("cartNum") || [];
    //全选,功能,遍历cartNum 商品数组
    //every遍历数组,如果元素值都为true,返回true,如果有一个是false,返回false
    //cartNum.every(v=>v.isTrue);
    //ps:当空数组用every遍历时,默认值为true?为了解决这个bug-->可以这么做
    //cartNum.length>0?cartNum.every(v=>v.isTrue):false;
    //const allChecked=cartNum.length?cartNum.every(v=>v.checked):false;
    this.setData({
      address_list
    })
    this.setCart(cartNum)
  },
  // 点击收货地址按钮触发的事件
  async goAddress() {
    /*  //1:获取权限状态
     wx.getSetting({
       success: (result)=>{
   //const scopeAddress=result.authSetting.scope.address; 这么写报错
   //正确写法:result.authSetting["scope.address"];
         const scopeAddress=result.authSetting["scope.address"];
         console.log(scopeAddress)
         if(scopeAddress===true||scopeAddress===undefined){
           wx.chooseAddress({     
             success: (res1) => {
               console.log(res1)
             },
           })
         }else{
           //到这,就是用户点击了取消,没有获取通讯录权限,wx.openSetting()方法诱导用户打开用户权限
           wx.openSetting({
             success: (res2) => {
                  wx.chooseAddress({     
                    success: (res3) => {
                      console.log(res3)
                    },
                  })
             },
           })
  
         }
       },
      
     });
     */
    try {
      //1:获取权限
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];

      //3:到这,就是用户点击了取消,没有获取通讯录权限,wx.openSetting()方法诱导用户打开用户权限获取地址
      if (scopeAddress === false) {
        //  wx.openSetting()方法诱导用户打开用户权限
        await openSetting();
      }
      //2:如果权限为true或者undefined就打开通讯录地址
      //获取地址
      let CartAddress = await chooseAddress();
      // console.log(CartAddress);
      CartAddress.all = CartAddress.provinceName + CartAddress.cityName + CartAddress.countyName + CartAddress.detailInfo;
      wx.setStorageSync("CartAddress", CartAddress);
    } catch (error) {
      console.log(error);
    }
  },
  //商品的选中/不选中事件
  header_Item(e) {

    //获取选中商品的ID
    let goods_id = e.currentTarget.dataset.goods_id;
    console.log(goods_id);
    //获取购物车数组
    const { cartNum } = this.data;
    //找到被修改的商品对象
    let index = cartNum.findIndex(v => v.goods_id === goods_id);
    //选中状态取反
    cartNum[index].checked = !cartNum[index].checked;

    //把数据重新放到缓存中
    //wx.setStorageSync("cartNum",cartNum);
    //重新计数总价格/总数量
    this.setCart(cartNum)
  },
  //全选事件
  header_Item_quanxuan() {
    console.log("你好");
    //获取data中的数据
    //const allChecked=this.data.allChecked;这个方法只能取一个值
    //这个方法,可以取多个 const {cartNum,allChecked}=this.data;
    //我的垃圾逻辑
    /*
    if(allChecked===false){
      cartNum.forEach(v=>v.checked=false)
     }else{
      cartNum.forEach(v=>v.checked=true)
     }
     //老师的
     cartNum.forEach(v=>v.checked=allChecked);
    */
    let { cartNum, allChecked } = this.data;
    allChecked = !allChecked;
    cartNum.forEach(v => v.checked = allChecked);
    //把设置好的值,填充回原data
    this.setData({
      allChecked,
      cartNum
    })
  },
  //商品-1+1按钮,事件
  num_jianJia(e) {
    //获取传过来的属性
    //let id=e.currentTarget.dataset.id;
    //let fuhao=e.currentTarget.dataset.fuhao;
    //简写
    let { id, operation } = e.currentTarget.dataset;
    // console.log(e);
    // console.log(id);
    // console.log(operation);
    //获取购物车数组
    let { cartNum } = this.data;
    //遍历购物车数组,通过ID,获取索引值
    const index = cartNum.findIndex(v => v.goods_id == id);
    //新增功能,判断是否移除商品[当商品数量为1是,且还点击了-,弹窗提示]
    if (cartNum[index].num <=1 && operation===-1) {
        console.log("最少购买一个");       
        wx.showModal({
          title: '温馨提示:',
          content: '亲:商品数量为0时,将会移除商品哦~',
          success:(res)=>{
            if (res.confirm) {
              cartNum.splice(index,1);
              this.setCart(cartNum);
            } 
          }
        })
    }else{
       //进行商品数量的修改
    cartNum[index].num += operation;
    this.setCart(cartNum);
    }
   
  },
  //封装购物车 cartNum,设置购物车状态,重新计算价格
  setCart(cartNum) {
    let allChecked = true;

    let allTotalPrice = 0;
    let allNum = 0;
    cartNum.forEach(v => {
      if (v.checked) {
        allTotalPrice += v.num * v.goods_price;
        allNum += v.num;
      } else {
        //let allChecked = false; 这是声明变量 allChecked = false;给变量赋值
        allChecked = false;
      }
    })

    //判断数组是否为空
    allChecked = cartNum.length != 0 ? allChecked : false;
    //allChecked =cartNum.length != 0 ? allChecked : false;
    //把购物车数据,重新设置给data中/缓存中
    this.setData({
      cartNum,
      //这是总价格
      allTotalPrice,
      //这是总数量
      allNum,
      //全选,按钮选中状态
      allChecked
    })
    wx.setStorageSync("cartNum", cartNum);
  },
  //在原始的点击结算按钮效果-->有点low
  // handlePay(){
  //   //获取当前地址数组
  //   const {address_list,allNum}=this.data;
  //   if(!address_list.userName){
  //     wx.showToast({
  //       title: '亲:您还没有添加地址哦~',
  //       icon: 'none',
  //       image: '',
  //       duration: 1500,
  //       mask: false,
  //       success: (result)=>{
          
  //       },
  //     });
  //     return;

  //   }else{
  //     if(allNum==0){
  //       wx.showToast({
  //         title: '亲:您还没有添加商品哦哦~',
  //         icon: 'none',
  //         image: '',
  //         duration: 1500,
  //         mask: false,
  //         success: (result)=>{
            
  //         },
  //       });
  //       return;
  //     }else{
  //       console.log("可以去结算了");
  //     }
  //   }
  // },
   async handlePay(){
  const {address_list,allNum}=this.data;
  if(!address_list.userName){
    
    await openShowToast({title:"亲:您还没有添加地址哦~"})
    return;
  }
  if(allNum==0){
    await openShowToast({title:"亲:您还没有添加商品哦~"})
    return;
  }
  //到这一步说明?地址/商品数量都通过了,跳转的支付页面,在html中,可以用navigator标签跳转,在
  //js中可以用wx.navigateTo({url:地址})
 wx.navigateTo({
   url:"../pay/index"
 }) 
},

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})