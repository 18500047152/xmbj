// pages/auth/index.js
// 发送ajax的封装
import {Request} from "../../request/index";
//es7语法的async异步请求引入
import regeneratorRuntime from '../lib/runtime/runtime.js';
//引入promise 代码的封装函数
import {openlogin } from "../../utils/asyncWx";
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
//获取用户信息按钮,点击-->获取用户信息 encryptedData,rawData,iv,signature 这四个信息,是通过授权事件获取
//code值是小程序登录成功后获得
async handleGetUserInfo(e){

try {
  //第一步获取encryptedData,rawData,iv,signature  console.log(e);
const {encryptedData,rawData,iv,signature} = e.detail;
//第二步:获取小程序登录成功后的code值
// wx.login({
//   timeout:10000,
//   success: (result)=>{
//    // console.log(result);
//    //获取code值
//    // console.log(result.code);
//     //接收 code值
//     const { code } = result;
//     console.log(code);
//   },
// });
//第二步:async语法的改进获取code值
const { code }=await openlogin();
console.log(code);
//第三步:传递多个参数,可以把参数封装到对象内,传递
const loginParams={encryptedData,rawData,iv,signature,code}
//第三步,发送ajax  获取token-->没有企业appID获取的token值为null
  const {token}=await Request({url:"/users/wxlogin",data:loginParams,method:"POST"});
  //const {token}=await Request({url:"/users/wxlogin",data:loginParams,method:"POST"});
  //const {token}="token";
  console.log(token)
//第四步,把token值存入wx-setStorageSync('token',token)
 wx.setStorageSync("token", token);
 console.log("授权成功");
 //获取完毕,返回上一层
wx.navigateBack({
  delta: 1
}); 
} catch (error) {
  console.log(error);
}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})