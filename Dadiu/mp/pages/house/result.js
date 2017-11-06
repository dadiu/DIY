// pages/house/result.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sell : 0,
    total : 0,
    buyList : [], // 买方
    sellList : [] // 卖方
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    console.log(options);

    // options = { buy: "747558", sell: "1080000", sale: "80" };
    options = app.parseIntFormFn(options);

    this.setData({
      sell: app.priceChange(options.sell)
    });

    this.countFn(options);

  },

  countFn: function (options){

    const
      // 印花税
      stamp = options.sell * 0.05 / 100,
      // 契税
      deed = options.sell * 3 / 100,
      // 中介代理费
      agent = (1000000 * 1.5 / 100 + (options.sell > 1000000 ? (options.sell - 1000000) * 1 / 100 : 0)) * options.sale / 100,
      // 增值税（综合税）
      consolidated = Math.round(((options.sell - options.buy)) * 5.6 / 100),
      // 个人所得税
      personalIncome = options.sell * 1 / 100,
      // 土地增值税
      land = options.sell * 0.5 / 100;

    const buyList = [
      {
        name: "契税（商用3%）",
        price: deed
      },
      {
        name : "印花税（0.05%）",
        price: stamp
      },
      {
        name : "产权登记费（固定）",
        price : 550
      },
      {
        name: "抵押登记（固定）",
        price: 550
      },
      {
        name : "抵押评估（固定）",
        price : 800
      },
      {
        name : "中介代理费",
        price : agent
      }
    ];

    const sellList = [
      {
        name : "个人所得税（1%）",
        price : personalIncome
      },
      {
        name : "增值税（差额*5.6%）",
        price : consolidated
      },
      {
        name : "印花税（0.05%）",
        price : stamp
      },
      {
        name : "土地增值税（0.5%）",
        price: land
      },
      {
        name: "中介代理费",
        price : agent
      }
    ]

    let total = this.countTotalFn(buyList) + this.countTotalFn(sellList);

    this.setData({
      buyList: buyList,
      sellList: sellList,
      total: app.priceChange(total)
    })
  },

  // 总金额
  countTotalFn: function (list){
    let i = 0;
    let len = list.length;
    let total = 0;

    for (; i < len; i++) {
      total += list[i].price;
    }

    return total;
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