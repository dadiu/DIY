// pages/devlop/edit.js

var app = getApp();
var DATA = require('../../data/devlop-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTab : 1,
    tabData : [
      {
        id : 1,
        txt: "潜能果计算"
      },
      {
        id : 2,
        txt: "潜能果组合"
      }
    ],
    FIRSTNUM : 3,
    UNIT : 0.1,   // 亿
    endNum :0,
    isError: false,
    error : '',
    seasonData : DATA.season,
    skyData: DATA.sky
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(DATA);
  },

  changeTabFn : function(e){
    let showid = e.currentTarget.dataset.showid;

    this.setData({
      showTab: showid
    })
  },

  hideError : function(){
    this.setData({
      isError: false
      })
  },

  computation: function (e){

    let valArr = e.detail.value;
    var checkForm = app.regFn(valArr);
    

    if (checkForm === undefined){

      let myNum = parseInt(valArr.myNum, 10);
      let wantNum = parseInt(valArr.wantNum, 10);

      let endNum = ((this.data.FIRSTNUM + myNum) + (wantNum + this.data.FIRSTNUM - 1)) * (wantNum - myNum) / 2;

      this.setData({
        isError: false,
        error: '',
        endNum: (endNum * this.data.UNIT).toFixed(2)
      })

    } else {

      this.setData({
        isError : true,
        error : checkForm,
        endNum : 0
      })
    }
    
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