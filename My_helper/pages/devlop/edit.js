// pages/devlop/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FIRSTNUM : 3,
    UNIT : 1000,
    endNum :0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  hideError : function(){

  },

  computation: function (e){

    let val = e.detail.value;
    console.log(val);

    let myNum = parseInt(val.myNum, 10);
    let wantNum = parseInt(val.wantNum, 10);

    let endNum = (myNum + 3 + wantNum + 2) * (wantNum - myNum) / 2;

    this.setData({
      endNum: endNum*1000
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