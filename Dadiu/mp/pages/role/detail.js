// pages/role/detail.js
var app = getApp();
var roleInfo = null;
var historyInfo = null;
var currentInfo = {}; 

Page({
  data:{
    roleInfo : {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options);

    roleInfo = wx.getStorageSync('role-list')[0];
    historyInfo = wx.getStorageSync('history-info');

    currentInfo = historyInfo[options.id];

    roleInfo.level = options.level;
    roleInfo.time = currentInfo.time + ' ' + currentInfo.week;
    
    this.setData({
      roleInfo : roleInfo,
      proList : currentInfo.list,
      total : app.priceChange(currentInfo.total)
    })

  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    return {
      title: '梦幻西游手游道具环统计'
    }
  }
})