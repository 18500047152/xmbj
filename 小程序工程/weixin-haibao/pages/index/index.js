//index.js
//获取应用实例
const app = getApp()

Page({
 data:{
    //接收图片路径的变量
    canvas_Url:""
 },
 onLoad(){
   let that=this;
   console.log("我是数据");
  /*
  1:加载时,获取两张图片,一张是带二维码的小程序图片,一张是大图;外网路径
      2: wx.getImageInfo()下载图片-->一次只能下载一张
          使小程序外网图片,变成小程序内部图片,
          因为小程序canvas不支持外网图标绘制
      3:获取到图片,用convas画图-->把图片画到画布上
          3_1:获取画布对象 let cvsCtx = wx.createCanvasContext("ctx");
          3_2:cvsCtx.cvsCtx.drawImage()把它放到画布上
          //第一个参数为图片路径,原图x,原图y,原图宽,原图高,画布x,画布y,画布宽,画布图高
            cvsCtx.cvsCtx.drawImage(result2.path, 0, 0, result2.width, result2.height,0,0,300,150);
          3_3:让照片,在画布显示 cvsCtx.draw()
      4:因为图片与手机存在高分图/二倍图的关系[会让图片失真,变模糊]解决方法
          解决方法:4_1
                  把canvas画大一点,在通过缩放,让图片缩小,那么图片就不会模糊了
                  设置 <canvas class="cas" canvas-id="ctx"></canvas>样式,
                  宽高大一点
                  .cas{
                      width: 1200px;
                      height: 1000px;
                      transform: scale(0.5);
                      }
                 cvsCtx.drawImage(result2.path, 0, 0, result2.width, result2.height,0,0,1200,1000);
      5:生成一个图片
  */ 
 //1:
 let small="https://ae01.alicdn.com/kf/H7b998ba7a10647a7b1a3ec3ceb4fb76bx.jpg";
 let big="https://ae01.alicdn.com/kf/Hfcbc88e5d2404978b5113a710ac46e12I.jpg";
 //2:
 wx.getImageInfo({
  src: small,
   success: (resSmall)=>{
    wx.getImageInfo({
      src: big,
      success: (resBig)=>{
       // console.log(resSmall.path);
       // console.log(resBig.path);
  //3
  let cvsCtx = wx.createCanvasContext("ctx");
  //第一个参数为图片路径,原图x,原图y,原图宽,原图高,画布x,画布y,画布宽,画布图高
  //第一个大图背景图画好了
  //画带二个小图
  cvsCtx.drawImage(resBig.path, 0, 0, resBig.width, resBig.height,0,0,1200,1000);
  //3_3:让照片,在画布显示 cvsCtx.draw()
  cvsCtx.drawImage(resSmall.path, 0, 0, resSmall.width,resSmall.height,0,0,250,280);
  //先设置文字大小cvsCtx.cvsCtx.setFontSize(80);
  cvsCtx.cvsCtx.setFontSize(80);
  //画文字cvsCtx.fillText('内容', x, y);
  cvsCtx.fillText('空白邀请你...', 30, 850);
   //5:在cvsCtx.draw()方法中,加入参数,生成一个二维吗图片
            //false是从0开始画,第二个参数是回调,是成功画完,做的事
            cvsCtx.draw(false,()=>{
              wx.canvasToTempFilePath({
                // x: 0,
                // y: 0,
                // width: ,
                // height: ,
                destWidth: 1200,    //canvas宽,
                destHeight: 1000,   //canvas高,
                canvasId:"ctx",       //canvasId是canvas标签的id      
                success: (resUrl)=>{
                  //回调函数,是图片的路径,放到wxml刚开始创建的image中
                //  console.log(resUrl);
                  that.setData({
                      canvas_Url:resUrl.tempFilePath
                  })
                },          
          })
            })

     
   // 这是第二个     
      }

  // 这是第二个   
    })
   },
   
 });

//这个是onshow

}
 //这个是Page
})
