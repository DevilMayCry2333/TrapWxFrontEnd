// pages/hall/hall.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    username:'',
    name:'',
    area:'',
    myType:'',
    switchKey:0,
  },

  logout:function(e){
    wx.clearStorage();
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  hallScanCode: function (e) {
    var that = this;
    wx.scanCode({
      success(res) {
        console.log(res.result);

        wx.setStorage({
          key: 'scannId',
          data: res.result,
        })
        
        wx.navigateTo({
          url: '/pages/deviceInfo/deviceInfo',
        })

        // if(that.data.switchKey == 0){
     
        // } 
        // else if (that.data.switchKey == 1){
        //   wx.navigateTo({
        //     url: '/pages/totalDeviceInfo/totalDeviceInfo',
        //   })
        // }

      }
    })
  },
  
  viewRecord:function(){
    if (this.data.switchKey == 0){
      wx.navigateTo({
        url: '/pages/deviceInfo/deviceInfo',
      })
    } else if (this.data.switchKey == 1){
      wx.navigateTo({
        url: '/pages/totalDeviceInfo/totalDeviceInfo',
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.token = wx.getStorageSync("token");

    wx.request({
      url: app.globalData.url + "auth_api/user",
      header:{
        token: this.data.token
      },
      success:function(res){
        console.log(res.data);
        var username = res.data.username;
        var name = res.data.name;
        var area = res.data.province + res.data.city + res.data.area ;
        var myType = '';
        
        if(res.data.role==0){
          myType = "超级管理员";
          that.data.switchKey = 0;
        }
        else if(res.data.role==1){
          myType = "省级用户";
          that.data.switchKey = 1;
        }
        else if(res.data.role==2){
          myType = "市级用户";
          that.data.switchKey = 1;
        }
        else if(res.data.role==3){
          myType = "县级用户";
          that.data.switchKey = 1;
        }
        else if(res.data.role==4){
          myType = "管理员";
          that.data.switchKey = 0;
        }
        else if(res.data.role==5){
          myType = "工人";
          that.data.switchKey = 0;
        }
        // var myType = res.data.role;
        that.setData({
          username:username,
          name:name,
          area:area,
          myType:myType
        })
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