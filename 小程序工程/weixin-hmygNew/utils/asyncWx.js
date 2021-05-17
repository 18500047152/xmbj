//优化cart.js地址栏代码
//第一个是获取用户权限的代码封装
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result); 
            },
            fail: (err)=>{
                reject(err);
            },
          
        });
    })

}
//第二个是打开用户地址的代码封装
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result); 
            },
            fail: (err)=>{
                reject(err);
            },
          
        });
    })

}
//第三个是打开用户通讯录权限的代码封装
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result); 
            },
            fail: (err)=>{
                reject(err);
            },
          
        });
    })

}

//第五个是商品结算按钮的功能代码封装
export const openShowToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result)=>{
            resolve(result)
            },
            fail: (err)=>{
                reject(err);
            }
          });
       
    })
}
//第六个是授权页面的按钮的功能代码封装
export const openlogin=()=>{
    return new Promise((resolve,reject)=>{
  //获取小程序登录成功后的code值
    wx.login({
    timeout:10000,
    success: (result)=>{
        resolve(result)
    },
    fail: (err)=>{
        reject(err);
    }
  
  });
       
})
}

//第七个调用微信支付功能
export const openRequestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
  //获取小程序登录成功后的code值
  wx.requestPayment({
    ...pay,
    success: (result)=>{
      resolve(result)
    },
    fail: (err)=>{
        reject(err)
    },
    
  });
       
})
}
