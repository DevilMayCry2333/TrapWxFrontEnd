// pages/totalDeviceInfo/totalDeviceInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    provice: [],
    city: [],
    distinct: [],
    curProvice:{},
    curCity:{},
    curDistinct:{},
    pageData:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  provinceChange:function(e){
    var that = this;
    console.log(e);
    var curProvice = this.data.provice[e.detail.value];
    this.setData({
      curProvice:curProvice
    })
    var curCode = this.data.provice[e.detail.value].code;
    wx.request({
      url: app.globalData.url + "auth_api/dist/cities",
      header:{
        token:this.data.token
      },
      data:{
        id: curCode
      },
      success:function(res){
        console.log(res.data);
        var city = [];
        for (var i = 0; i < res.data.length; i++) {
          city = city.concat(res.data[i]);
        }
        that.setData({
          city:city
        })
        console.log(city);
      }
    })

  },
  cityChange:function(e){
    var that = this;
    console.log(e);
    var curCity = this.data.city[e.detail.value];
    this.setData({
      curCity: curCity
    })
    var curCode = this.data.city[e.detail.value].code;
    console.log(curCode);

    wx.request({
      url: app.globalData.url + "auth_api/dist/areas",
      header:{
        token:that.data.token
      },
      data:{
        id:curCode
      },success:function(res){
        console.log(res.data);
        var distinct = [];
        for (var i = 0; i < res.data.length; i++) {
          distinct = distinct.concat(res.data[i]);
        }
        that.setData({
          distinct: distinct
        })

      }
    })
  },
  distinctChange:function(e){
    var that = this;
    console.log(e);
    var curDistinct = this.data.distinct[e.detail.value];
    this.setData({
      curDistinct: curDistinct
    })

    console.log(that.data.curDistinct);
    console.log(that.data.curCity);
    console.log(that.data.curProvice);
  },
  myQuery:function(){
    var that = this;
    if (!this.data.curProvice.name){
      wx.showModal({
        title: '请选择省',
        content: '请选择省',
        showCancel:false
      })
    } else if (!this.data.curCity.name){
      wx.showModal({
        title: '请选择市',
        content: '请选择市',
        showCancel: false
      })
    } else if (!this.data.curDistinct.name){
      wx.showModal({
        title: '请选择区',
        content: '请选择区',
        showCancel: false
      })
    }else{
      wx.request({
        url: app.globalData.url + "auth_api/device_summary/detail",
        header:{
          token:this.data.token
        },
        data:{
          adcode: that.data.curDistinct.code
        },
        success:function(res){
          console.log(res.data);
          var pageData = [];
          pageData = pageData.concat(res.data.data);
          that.setData({
            pageData:pageData
          })

        }
      })
    }
    
  },
  onLoad: function (options) {
    this.data.token = wx.getStorageSync("token");
    var that = this;
    wx.request({
      url: app.globalData.url + "auth_api/dist/provinces",
      header:{
        token: this.data.token
      },
      success:function(res){
        console.log(res.data);
        var provice = [];
        for(var i = 0 ; i < res.data.length ; i++){
          provice = provice.concat(res.data[i]);
        }
        that.setData({
          provice:provice
        });

        console.log(provice);
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