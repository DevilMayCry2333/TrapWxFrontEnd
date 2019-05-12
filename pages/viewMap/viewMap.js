// pages/viewMap/viewMap.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    scannId:'',
    token:'',
    mapData:[],
    pi:3.1415926535897932384626,
    ee:0.00669342162296594323,
    a:6378245.0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('myMap');
    

    this.data.scannId = wx.getStorageSync("scannId");
    this.data.token = wx.getStorageSync("token");
    var that = this;
    wx.request({
        url: app.globalData.url + "auth_api/device_list",
        header:{
          token:this.data.token,
        },
        data: {
          page: '1',
          limit: '2000'
        },
        success: function (res) {
         
          var mapData = [];
          console.log(res.data);
          for(var i = 0 ; i < res.data.data.length; i++){
            if(res.data.data[i].latitude && res.data.data[i].longitude){
              console.log("iii", res.data.data[i].latitude);
               var gcjmapData = that.wgs84togcj02(res.data.data[i].longitude, res.data.data[i].latitude);
               console.log("=转换后==");

              console.log(gcjmapData[0]);
              console.log(gcjmapData[1]);

              mapData = mapData.concat({ "latitude": String(gcjmapData[1]), "longitude": String(gcjmapData[0]), "iconPath": "/pages/static/map.jpeg", "width": "25","height":"25"});
            }

          }

          console.log("地图");

          console.log(mapData);

         
          that.mapCtx.moveToLocation();
          that.setData({
            mapData:mapData
          })

          
          // const latitude = res.data.data[0].latitude
          // const longitude = res.data.data[0].longitude

          // wx.openLocation({
          //   latitude,
          //   longitude,
          //   scale: 18
          // })



          
          console.log(res.data);
        }
      })

  },

  wgs84togcj02:function(lng, lat) {
    if (this.out_of_china(lng, lat)) {
      return [lng, lat]
    }
    else {
      var dlat = this.transformlat(lng - 105.0, lat - 35.0);
      var dlng = this.transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * this.data.pi;
      var magic = Math.sin(radlat);
      magic = 1 - this.data.ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / ((this.data.a * (1 - this.data.ee)) / (magic * sqrtmagic) * this.data.pi);
      dlng = (dlng * 180.0) / (this.data.a / sqrtmagic * Math.cos(radlat) * this.data.pi);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [mglng, mglat]
    }
  },

  transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * this.data.pi) + 20.0 * Math.sin(2.0 * lng * this.data.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * this.data.pi) + 40.0 * Math.sin(lat / 3.0 * this.data.pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * this.data.pi) + 320 * Math.sin(lat * this.data.pi / 30.0)) * 2.0 / 3.0;
    return ret
  },

  transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * this.data.pi) + 20.0 * Math.sin(2.0 * lng * this.data.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * this.data.pi) + 40.0 * Math.sin(lng / 3.0 * this.data.pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * this.data.pi) + 300.0 * Math.sin(lng / 30.0 * this.data.pi)) * 2.0 / 3.0;
    return ret
  },

  out_of_china(lng, lat) {
    return(lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) ||         false);
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