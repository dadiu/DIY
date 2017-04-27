// pages/welcome/welcome.js
// 获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    isHistory : false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this

    // 测试 清除缓存数据
    // wx.clearStorageSync();

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    that.isRoleFn();
  },

  /**
   * 判断时候已有历史记录
   */
  isHistoryFn : function(){

    if(wx.getStorageSync('history-list') || wx.getStorageSync('pro-info')){
      this.setData({
        isHistory : true
      })
    }  
  },

  /**
   * 判断是否已有角色
   */
  isRoleFn : function(){
    if(wx.getStorageSync('role-list')){
      this.setData({
        isRole : false
      })
    } else {
      this.setData({
        isRole : true
      })
    }
  },

  /**
   * creatRole
   * 创建角色
   */
  creatRole : function(){
    wx.redirectTo({
      url: '../role/role'
    })
  },

  /**
   * creatPro
   * 创建新道具环
   */
  creatPro : function(){
    wx.navigateTo({
      url: '../role/create'
    })
  },

  /**
   * checkHistory
   * 查看历史记录
   */
  checkHistory : function(){
    wx.navigateTo({
      url: '../role/history'
    })
  }


})
