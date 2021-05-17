// pages/fenlei/fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

       //定义tab栏数据
       jiantou:"<",
       fontSize: 16,
       color: 'rgba(0, 0, 0, 1)',

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setNavSize();
    this.setStyle();

  },
      // 自定义导航栏事件-->通过获取系统信息计算导航栏高度 
      setNavSize: function () {
        var that = this
            , sysinfo = wx.getSystemInfoSync()
            , statusHeight = sysinfo.statusBarHeight
            , isiOS = sysinfo.system.indexOf('iOS') > -1
            , navHeight;
        if (!isiOS) {
            navHeight = 48;
        } else {
            navHeight = 44;
        }
        that.setData({
            status: statusHeight,
            navHeight: navHeight
        })
    },
    setStyle: function () {
        var that = this
            , containerStyle
            , textStyle
            , iconStyle;
        containerStyle = [
            'background:' + that.data.background
        ].join(';');
        textStyle = [
            'color:' + that.data.color,
            'font-size:' + that.data.fontSize + 'px'
        ].join(';');
        iconStyle = [
            'width: ' + that.data.iconWidth + 'px',
            'height: ' + that.data.iconHeight + 'px'
        ].join(';');
        that.setData({
            containerStyle: containerStyle,
            textStyle: textStyle,
            iconStyle: iconStyle
        })
    },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})