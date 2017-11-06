var app = getApp();

// pages/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTab: 1,
    error: '',
    tabData: [
      {
        id: 1,
        txt: '滨江-商住'
      },
      {
        id: 2,
        txt: '萧山（待定）'
      }
    ]

  },

  // 切换
  changeTabFn: function (e) {

    let showId = e.currentTarget.dataset.showid;

    this.setData({
      showTab: showId
    })
  },

  // 计算
  computationFn: function (e) {

    let valArr = e.detail.value;
    let checkForm = app.regFn(valArr);

    this.hideError();

    if (checkForm === undefined) {

      valArr = app.parseIntFormFn(valArr);

      // 中介折扣
      if (valArr.mySale > 100) {

        this.setData({
          isError: true,
          error: app.reg.mySale.err
        });

        return;
      };

      // 买入价与卖出价 
      if (valArr.myBuy > valArr.mySell) {
        this.isBuyDialog(valArr);

        return;
      }

      this.countFn(valArr);

      return;
    };

    // 错误
    this.setData({
      isError: true,
      error: checkForm
    })

  },

  // 买入价 > 卖出价 确认计算
  isBuyDialog: function (arr) {

    let _t = this;
    wx.showModal({
      title: '',
      content: '当前卖出价低于买入价，是否修改？',
      cancelText: '修改',
      confirmText: '不修改',
      success: function (res) {
        console.log(res);

        // 不修改
        if (res.confirm) {
          // 开始计算 进入结果页
          console.log('不修改');
          _t.countFn(arr);
          return;
        }

        // 修改
        if (res.cancel) {
          // 隐藏弹窗
          console.log('修改');
        }
      }
    })
  },


  // 隐藏提示
  hideError: function () {
    this.setData({
      isError: false,
      error: ''
    })
  },

  countFn: function (arr) {

    wx.navigateTo({
      url: '../house/result?buy=' + arr.myBuy + '&sell=' + arr.mySell + '&sale=' + arr.mySale
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '滨江区二手商住房税计算'
    }
  }
})