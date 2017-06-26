// pages/welcome/welcome.js
// 获取应用实例
var app = getApp();
var historyList = null;
var historyInfo = null;

Page({
  data: {
    userInfo: {},
    isHistory: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    // 测试 清除缓存数据
    // wx.clearStorageSync();
    
    let _t = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      _t.setData({
        userInfo: userInfo
      })
    })
  },
  onShow : function(){

    historyList = wx.getStorageSync('history-list');
    historyInfo = wx.getStorageSync('history-info');

    this.isRoleFn();
    this.isHistoryFn();
  },

  /**
   * 判断时候已有历史记录
   */
  isHistoryFn: function () {

    if ((historyList && historyList.length > 0) || wx.getStorageSync('pro-info')) {
      this.setData({
        isHistory: true
      })
    }
  },

  /**
   * 判断是否已有角色
   */
  isRoleFn: function () {
    if (wx.getStorageSync('role-list')) {
      this.setData({
        isRole: false
      })
    } else {
      this.setData({
        isRole: true
      })
    }
  },

  /**
   * creatRole
   * 创建角色
   */
  creatRole: function () {

    wx.navigateTo({
      url: '../role/role'
    })
  },

  /**
   * creatPro
   * 创建新道具环
   */
  creatPro: function () {

    let id = 'D' + app.getTime().time;
    // console.log(id);
    // console.log(historyInfo[id]);
    if (historyInfo[id] !== undefined) {
      wx.showModal({
        title: '',
        content: '今天已跑完，详情在“历史记录”查看',
        confirmColor: '#7e57c2',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 去历史记录页
            wx.navigateTo({
              url: '../role/history'
            })

          } else if (res.cancel) {

            // console.log('用户点击取消')
            // 关闭弹窗
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '../role/create'
      })
    }
  },

  /**
   * checkHistory
   * 查看历史记录
   */
  checkHistory: function () {
    wx.navigateTo({
      url: '../role/history'
    })
  },

  /**
   * 清除记录
   */
  clearAll: function(){
    let _t = this;
    wx.showModal({
      title: '',
      content: '确定后所有历史记录都会消失，慎点0.0',
      success: function (res) {

        if (res.confirm) {
          
          console.log('确定删除');
          wx.clearStorageSync();
          
          // 关闭当前页 返回首页
          wx.reLaunch({
            url: '../welcome/welcome'
          })

        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })
  },

  /**
   * 
   */
  showChangeBtns : function(){
    
  }

})
