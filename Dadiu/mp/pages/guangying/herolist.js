//index.js
//获取应用实例

var heroData = require('../../data/guangying/hero-list');

Page({
  data: {
  },
  
  onLoad: function (options) {

    this.setData({
      heroData: heroData
    })
  },

  opendetail : function(e){
    var unitId = e.currentTarget.dataset.unitid;
    wx.navigateTo({
      url: 'herodetail?unit_id=' + unitId
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    return {
      title: '光影对决英雄介绍'
    }
  }
})
