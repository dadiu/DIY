// pages/role/detail.js
var app = getApp();
var roleInfo = wx.getStorageSync('role-info')[0];
var historyInfo = wx.getStorageSync('history-info');
var currentInfo = {}; 

Page({
  data:{
    roleInfo : {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);

    currentInfo = historyInfo[options.id];
    roleInfo.level = options.level;
    roleInfo.time = options.time;

    this.setData({
      roleInfo : roleInfo
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
  }
})