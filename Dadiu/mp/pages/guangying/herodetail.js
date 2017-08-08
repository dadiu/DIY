// pages/guangying/herodetail.js
// var heroData = require('../../data/guangying/U005');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected : 0,
    heroData : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var unit_id = options.unit_id;
    this.getData(unit_id);
  },

  /**
   * 请求数据
   */
  getData: function (unit_id) {
    // console.log(unit_id);
    let data = require('../../data/guangying/' + unit_id)
    this.setData({
      heroData: data
    })
  },

  /**
   * 切换数据
   */
  changeCurrent : function(e){

    var idx = e.currentTarget.dataset.idx;
    // console.log(idx);
    this.setData({
      selected : idx
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    let heroName = this.data.heroData.honor_china + ' . ' + this.data.heroData.name_china;
    console.log(heroName);
    return {
      title: heroName + ' - 光影对决英雄介绍'
    }
  }
})