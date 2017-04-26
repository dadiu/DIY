// pages/role/history.js
var app = getApp();
var role = require('../../data/role-data.js');

Page({
  data:{
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let myRoleList = [];

    role.list.forEach(function(val){
      myRoleList.push({
        t : val.time,
        l : val.level,
        p : app.priceChange(val.price),
        id : val.id
      })
    });

    role.info.time = "";
    this.setData({
      roleInfo : role.info,
      roleList : myRoleList
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
   * 查看详情
   */
  openDetail: function(event){
    let data = event.currentTarget.dataset;
    console.log(data);
    wx.navigateTo({
      url: 'detail',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

  }
})