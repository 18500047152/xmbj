/*需求
      1:页面加载时,从缓存中获取购物商品的数据,渲染到页面上(前提条件是,check状态为true的)

      2:微信支付:权限
      那些账户可以进行微信支付?
      1:企业账号
      2:企业账号后台,必须给开发者账号添加白名单
        一个企业账号appID可以绑定多个开发者
      3:点击按钮的时候,获取taken值,如果缓存有从缓存拿,如果缓存没有,去授权获取

  需求:微信支付成功,购物车页面删除被选中的商品(清空缓存)
        删除后的购物车数据,在填充到缓存内.
        再跳转页面

*/
// pages/cart/index.js
//引入promise 代码的封装函数
import { getSetting, chooseAddress, openSetting,openShowToast,openRequestPayment } from "../../utils/asyncWx";
//引入防止async报错包,路径
import regeneratorRuntime from '../lib/runtime/runtime.js';
import {Request} from '../../request/index.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address_list: {},
    //获取缓存中商品数量
    cartNum: [],
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
    // 对购物车商品信息进行过滤-->filter返回值是?数组中有checked的数组
    let checkedCartNum=cartNum.filter(v=>v.checked)
    this.setData({
      address_list
    })
    this.setCart(checkedCartNum)
  }, 
  //封装购物车 cartNum,设置购物车状态,重新计算价格
  setCart(cartNum) {
    let allTotalPrice = 0;
    let allNum = 0;
    cartNum.forEach(v => {
      
        allTotalPrice += v.num * v.goods_price;
        allNum += v.num;
     
    })
    //把购物车数据,重新设置给data中/缓存中
    this.setData({
      cartNum,
      //这是总价格
      allTotalPrice,
      //这是总数量
      allNum
     
    })
  },
  //支付功能事件 handleOrderPay
  async handleOrderPay(){
    try {
      console.log("你好");
    //判断缓存中有没有token功能
    const token=wx.getStorageSync("token");
    if(token==="undefined"){
      //如果没有token值,跳转授权页面,获取token
      //1:跳转到授权页面auth
      wx.navigateTo({
        url: '../auth/index',

      });
      return;
    }
  
      console.log("以及存在token值了");
      //我的token是个假值"""
      //假设它有token值,创建订单
      //创建订单,需要的参数服务器给的:请求头Authorization-->订单总价格order_price-->收货地址:consignee_addr-->订单数组goods-->goods字段说明
                                                    // 参数名	必选	类型	说明
                                                    // goods_id	是	number	商品id
                                                    // goods_number	是	number	购买的数量
                                                    // goods_price	是	number	单价
    //创建订单请求头
      const header={Authorization:token};
    //准备请求体参数-->订单总价格
     const order_price=this.data.allTotalPrice;
    //准备请求体参数-->地址
    const consignee_addr=this.data.address_list.all;
    //因为goods是数组,所以要遍历原来的数组,进行取值,放进去 this.data.cartNum
    let cartNum=this.data.cartNum;
    let goods=[];
    //遍历原来的数组,放入goods中
    cartNum.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    //三个data参数,进行封装
    const orderParams={order_price,consignee_addr,goods}
    //准备发送ajax,创建订单,获取编号-->url地址;method请求方式,data:参数;header请求头header:header-->简写header
    const {order_number}=await Request({url:"/my/orders/create",method:"POST",data:orderParams,header});
    //因为tokle值无效,所以订单编号打印不出来-->res.order_number
    //console.log(res);
    //需求:有了订单编号,发起支付请求-->后台给的支付接口
    //发起支付功能
    const {pay}=await Request({url:"/my/orders/req_unifiedorder",method:"POST",header,data:{order_number}})
    //通过支付功能发起,console.log(res);
    //const res=await openRequestPayment(pay);
    console.log("支付成功-->跳转到订单面");
    //支付成功,需要手动清除缓存数据
    let newCartNum=wx.getStorageSync("cartNum",cartNum);
    //过滤未被选中的放入到数组内
        newCartNum=newCartNum.filter(v=>!v.checked);
     //在填充到缓存中
     wx.setStorageSync("cartNum",newCartNum)
    //因为pay属性为空,所以以为代码报错,为了模拟,现在这步?就是订单支付成功;跳转支付页面-->120行下面的代码是真的,但是token没有,只能假的跳转了
    wx.navigateTo({
      url: '../order/index',
    });

    // await openRequestPayment(pay);
    // //需求:付款成功-->根据查询url-->查询订单状态
    // const res=await Request({url:"/my/orders/chkOrder",method:"POST",data:{order_number},header})
    // console.log(res);//支付完成以后,后台服务器返回支付成功-->为了安全起见,放入到try_catch中
    //   await openShowToast({title:"支付成功"})
    //   wx.navigateTo({
    //     url: '../order/index',
    //   });
  

    } catch (error) {
      // await openShowToast({title:"支付失败"})
      // console.log(errot);
      
    }
    


  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})