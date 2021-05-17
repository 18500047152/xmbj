//用promise技术封装wx请求数据
//需求,index页,轮播图导航栏楼层栏,是三个ajax,就相当于关闭了,三个请求,万一第二个还没有回来,就不能关闭,弹窗请求
/*默认请求次数为0次
let ajaxTime=0;
请求一次+1;
ajaxTime++;
请求成功-1
ajaxTime--;
当为0时,没有请求了,在关闭
*/
if(ajaxTime===0){
  //成功失败都会执行的函数,关闭图标
wx.hideLoading()
}
//默认次数是0次,
let ajaxTime=0;
export const Request=(params)=>{
  //优化接口路径 https://api-hmugo-web.itheima.net/api/public/v1/categories
  //添加数据发送前,数据发送完毕的图片提示
  /*
  wx.showLoading({
  title: '加载中',
})

setTimeout(function () {
  wx.hideLoading()
}, 2000)
   */
  //每调用一次,次数+1
  ajaxTime++;
  wx.showLoading({
    title: '加载中',
  })
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"

    return new Promise((resolve, reject) => {
      wx.request({
        ...params,
        //公共区域的接口跟你调用接口传过来的接口路径,进行拼接
        url:baseUrl+params.url,
        //成功的回调
        success: (result)=>{
          resolve(result)
                  
        },
        //失败的回调
        fail: (err)=>{
          reject(err)
        },
        //成功失败都执行的回调
        complete: ()=>{
          ajaxTime--;
          if(ajaxTime===0){
            //成功失败都会执行的函数,关闭图标
          wx.hideLoading()
          }
          
        }
      });

    })
}
