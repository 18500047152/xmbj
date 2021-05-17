
Page({
  data: {

    name:"小红",
    user:{
      name:"小明",
      age:41
    }
    
  },
  // navigator跳转事件
  Go1(){
    console.log("点击了")
    wx.switchTab({
      url: '../user/user',
    })

  },
  Go2(){
    console.log("点击了")
    wx.reLaunch({
      url: '../user/user',
    })
  },
 
  Go3(){
    console.log("点击了")
    wx.navigateTo({
      url: '../for/for',
    })
  },
 
  Go4(e){
    //console.log(e.currentTarget.dataset.index)
    const age=e.currentTarget.dataset.age;
    const name=e.currentTarget.dataset.name;
    console.log(age)
    console.log(name)
    //url: '../for/for?name=小明&age=19',这是传死数据

    wx.redirectTo({

      url: '../for/for?age='+age+'&name='+name,
    })
  }
 
 
  
})
