// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginImg: app.globalData.imgurl + "/timg.jpeg"
  },

  unloginScanCode:function(e){
    wx.scanCode({
      success(res) {
        wx.setStorage({
          key: 'scannId',
          data: res.result,
        })
        wx.navigateTo({
          url: '/pages/deviceInfo/deviceInfo',
        })
      }
    })
  },

  loginVerify:function(e){
    console.log(e);

    wx.request({
      url: app.globalData.url + "login",
      data:{
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      method:'POST',
      success:function(res){
        console.log(res.data);
        if(res.statusCode==200){
          wx.setStorage({
            key: 'token',
            data: res.data.token,
          })
          wx.redirectTo({
            url: '/pages/hall/hall'
          })
        }else{
          wx.showModal({
            title: 'ERROR!',
            content: '用户名或密码错误!',
            showCancel:false
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(Math.PI);
    
    wx.getStorage({
      key: 'token',
      success(res) {
        wx.redirectTo({
          url: '/pages/hall/hall',
        })
        console.log(res.data)
      }
    })

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