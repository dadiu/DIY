// pages/role/create.js

var app = getApp();
var roleInfo = {};

// 默认道具表
var proInfo = require('../../data/prolist-data.js');
// 本地道具表
var storageProInfo = null;
// 编辑中道具表
var currentProInfo = {};

Page({
  data: {
    roleInfo: {},
    proList: [],
    total: 0,
    isError: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    storageProInfo = wx.getStorageSync('pro-info');
    // console.log(storageProInfo);
    this.getProList();
  },

  /**
   * 获取道具环列表
   * 如果存在未完成，则替换
   * 如果已完成，则显示最新的
   */
  getProList: function () {

    // 存在未跑完的环
    if (storageProInfo) {
      currentProInfo = storageProInfo;
    }
    else {  // 不存在未跑完的环
      let nowTime = app.getTime();
      currentProInfo = {
        time : nowTime.time,
        week : nowTime.week,
        total : 0,
        list : proInfo.list
      }
    };

    roleInfo = wx.getStorageSync('role-list')[0];
    roleInfo.time = currentProInfo.time + ' ' + currentProInfo.week;
    
    this.setData({
      proList: currentProInfo.list,
      total: app.priceChange(currentProInfo.total, 3),
      roleInfo: roleInfo
    });

  },


  /**
   * 点击数量事件
   */
  countFn: function (event) {
    //console.log(event);
    //console.log(number + ' / ' + index + ' / ' + boo);
    let that = this;
    let data = event.currentTarget.dataset;
    let info = data.info;
    let boo = parseInt(data.boo, 10);
    let index = parseInt(data.idx);

    if (boo === 1) {        // add

      currentProInfo.list[index].n++;

      this.setData({
        proList: currentProInfo.list
      });

      this.totalChange();
    }
    else if (boo === -1) {    // sub

      if (currentProInfo.list[index].n !== 0) {
        currentProInfo.list[index].n--;
        this.setData({
          proList: currentProInfo.list
        });

        this.totalChange();
      }

    }

  },

  /**
   * 改变总金额
   */
  totalChange: function () {
    let i = 0;
    let len = currentProInfo.list.length;
    let total = 0;
    let _t = this;

    for (; i < len; i++) {
      total = total + currentProInfo.list[i].n * currentProInfo.list[i].p
    };

    // 改变页面总价
    this.setData({
      total: app.priceChange(total, 3)
    })
    // 储存总价
    currentProInfo.total = total;

  },

  /**
   * 休息会儿,临时储存
   */
  wait: function () {
    wx.setStorageSync('pro-info', currentProInfo);

    this.openNext();
  },

  /**
   * 跑完了
   * 等出了GM奖励再跳转去GM
   */
  end: function () {

    // 创建新的表
    let addList = {
      time: currentProInfo.time,
      week: currentProInfo.week,
      level: roleInfo.level,
      total: currentProInfo.total,
      id: 'D' + currentProInfo.time
    };

    // 获取 history-list
    let oldHistoryList = wx.getStorageSync('history-list') ? wx.getStorageSync('history-list') : [];
    // 获取 histroy-info
    let oldHistoryInfo = wx.getStorageSync('history-info') ? wx.getStorageSync('history-info') : {};

    // 删除 pro-info
    wx.removeStorageSync('pro-info');

    if (oldHistoryInfo[addList.id]) {

      return;
    };

    // 储存 history-list
    oldHistoryList.unshift(addList);
    wx.setStorageSync('history-list', oldHistoryList);

    // 储存 histroy-info
    oldHistoryInfo[addList.id] = {
      time: currentProInfo.time,
      week: currentProInfo.week,
      total: currentProInfo.total,
      list: this.filterPro(currentProInfo.list)
    };

    wx.setStorageSync('history-info', oldHistoryInfo);

    this.openNext();

  },

  /**
   * 打开下一个页面前所需事件
   * @param proInfo
   */
  openNext : function(){

    wx.showToast({
      title: '储存成功',
      icon: 'success',
      duration: 2000
    })
    
    // 重置prolist参数
    proInfo.list.forEach(function(val,index){
      proInfo.list[index].n = 0;
    });

    // 关闭当前页 返回首页
    wx.reLaunch({
      url: '../welcome/welcome'
    })
  },

  /**
   * 过滤道具列表，如存在个数0，则移除
   */
  filterPro: function (list) {

    let newList = [];

    list.forEach(function (val) {
      if (val.n !== 0) {
        newList.push(val)
      }
    });
    // console.log(newList);
    return newList;
  }
})