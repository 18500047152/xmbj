// pages/img/img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newSrc:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //点击图片事件
  upImage(){
    let that=this;
      wx.chooseImage({
        count: 9,
        sizeType: ['original','compressed'],
        sourceType: ['album','camera'],
        success: (res)=>{
           
          console.log("图片上传本地成功");
          // tempFilePath的值是个路径-->可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths

          console.log(tempFilePaths[0]);
          //上传云存储
          // 文件命名随机数开始--------------------------------------------
          function num(s) {
            return s < 10 ? '0' + s: s;
        }      
        let newData=new Date();
        //当前日期-->格式20200629172033
        let nian=newData.getFullYear();
        let yue=(newData.getMonth()+1);
        let ri=newData.getDate();
        let shi=newData.getHours();
        let fen=newData.getMinutes();
        let miao=newData.getSeconds();   
        //当前时间 
        const shiJian=""+nian+num(yue)+num(ri)+num(shi)+num(fen)+num(miao);
        //console.log(shiJian)
        //四位数的随机数
        let Randon=parseInt((Math.random() * (9999 - 1000 + 1)) + 1000);
  
        let newName=shiJian+Randon+".jpg";
       
       // console.log(newName);
  // 文件命名随机数结束--------------------------------------------
            wx.cloud.uploadFile({
              //cloudPath图片命名//固定命名cloudPath:"v001.jpg",  
              cloudPath:newName,
              //图片路径,之前显示的是数组tempFilePaths,所以上传失败,路径是这样的http://tmp/wx3c62092784b4c7e4.o6zAJs9FUOcCer6FgMrwcdMPQeOE.zFdJc7C3RvFlf25a79a41a1e40e352c0077ddeb30984.jpg
              filePath:tempFilePaths[0],
              success: (result)=>{
                console.log(result);
                that.setData({
                   newSrc:result.fileID
                })
              },
              fail: (err)=>{
                console.log(err);
              },          
            });  
        },  
      });    
  },
  getFileName(){
    function num(s) {
        return s < 10 ? '0' + s: s;
    }      
    let newData=new Date();
    //当前日期-->格式20200629172033
    let nian=newData.getFullYear();
    let yue=(newData.getMonth()+1);
    let ri=newData.getDate();
    let shi=newData.getHours();
    let fen=newData.getMinutes();
    let miao=newData.getSeconds();   
    //当前时间 
    const shiJian=""+nian+num(yue)+num(ri)+num(shi)+num(fen)+num(miao);
    //console.log(shiJian)
    //四位数的随机数
    let Randon=parseInt((Math.random() * (9999 - 1000 + 1)) + 1000);
//     console.log(Randon)
  //  return shiJian+Randon+".jpg";
    let newName=shiJian+Randon+".jpg";
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

 
})