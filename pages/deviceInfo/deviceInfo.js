// pages/deviceInfo/deviceInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    scannId:'',
    pageData:[],
    deviceId:'',
    totalNum:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.token = wx.getStorageSync("token");
    this.data.scannId = wx.getStorageSync("scannId");
    if(!this.data.scannId){
        wx.showModal({
          title: '请先扫码',
          content: '请先扫码',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                url: '/pages/hall/hall',
              })
            }
          }
        })
    }

    console.log(this.data.token);

    if (!this.data.token){
          wx.request({
            url: app.globalData.url + "scanned",
            data:{
              id: that.data.scannId,
              page: '1',
              limit: '9999'
            },success:function(res){
              console.log(res.data);

              var pageData = [];
              var deviceId = res.data.data[0].deviceId;
              var totalNum = 0;

              for(var i = 0 ; i < res.data.data.length ; i++){
                pageData = pageData.concat({ "batch": res.data.data[i].batch, "longitude": res.data.data[i].longitude, "latitude": res.data.data[i].latitude, "num": res.data.data[i].num, "jobContent": res.data.data[i].workingContent, "reagentType": res.data.data[i].drug,"myDate":res.data.data[i].date});
                totalNum += res.data.data[i].num; 
              

              }
              that.setData({
                pageData:pageData,
                deviceId:deviceId,
                totalNum:totalNum
              })
              console.log(pageData);

              console.log(res.data.data[0].id);
            }
          })
      }else{
      wx.request({
        url: app.globalData.url + "scanned",
        header: {
          token: this.data.token,
        },
        data: {
          id: that.data.scannId,
          page: '1',
          limit: '9999'
        }, success: function (res) {
          var pageData = [];
          var deviceId = res.data.data[0].deviceId;
          var totalNum = 0;

          for (var i = 0; i < res.data.data.length; i++) {
            pageData = pageData.concat({ "batch": res.data.data[i].batch, "longitude": res.data.data[i].longitude, "latitude": res.data.data[i].latitude, "num": res.data.data[i].num, "jobContent": res.data.data[i].workingContent, "reagentType": res.data.data[i].drug, "myDate": res.data.data[i].date });
            totalNum += res.data.data[i].num;


          }
          that.setData({
            pageData: pageData,
            deviceId: deviceId,
            totalNum: totalNum
          })
          console.log(pageData);

          console.log(res.data.data[0].id);
        }
      })
      
      }

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