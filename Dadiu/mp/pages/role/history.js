// pages/role/history.js
var app = getApp();
var roleInfo = null;
var storageHistoryList = null;
var waitList = null;

Page({
  data: {
    roleInfo: {},
    historyList: [],
    isWait: false,
    removeClassName: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    roleInfo = wx.getStorageSync('role-list')[0];
    storageHistoryList = wx.getStorageSync('history-list');

    this.getHistoryList();
    this.setData({
      roleInfo: roleInfo,
    })
  },

  /**
   * 历史列表
   */
  getHistoryList: function () {
    let myRoleList = this.isWaitFn();
    let key = null;
    let val = null;

    for (key in storageHistoryList) {
      val = storageHistoryList[key];

      myRoleList.push({
        t: val.time + ' ' + val.week,
        l: val.level,
        p: app.priceChange(val.total),
        id: val.id
      })
    }


    this.setData({
      historyList: myRoleList
    })

  },

  /**
   * 进行中的道具环
   * @param
   */
  isWaitFn: function () {
    let arr = [];
    waitList = wx.getStorageSync('pro-info');
    if (waitList) {
      arr = [
        {
          t: waitList.time + ' ' + waitList.week,
          l: roleInfo.level,
          p: app.priceChange(waitList.total)
        }
      ]
    }

    return arr;
  },

  /**
   * 打开单道具详情页
   */
  openNext: function (event) {
    let data = event.currentTarget.dataset;
    let id = data.id;

    // id不存在，为进行中的道具环
    if (id === undefined) {

      wx.navigateTo({
        url: 'create'
      })

    } else {

      let idx = waitList ? data.idx - 1 : data.idx;
      let current = storageHistoryList[idx];

      wx.navigateTo({
        url: 'detail?id=' + current.id + '&level=' + current.level
      })

    }
  },

  /**
   * 删除单条道具
   */
  removeItem: function (event) {

    let _t = this;
    let data = event.currentTarget.dataset;
    let id = data.id;
    let dataIdx = parseInt(data.idx, 10);

    let waitList = wx.getStorageSync('pro-info');

    // 移除这条数据
    function removeThis() {

      // id不存在，为进行中的道具环
      if (id === undefined) {
        // 删除缓存
        wx.removeStorageSync('pro-info');

      } else {

        let idx = waitList ? data.idx - 1 : data.idx;
        
        let storageHistoryInfo = wx.getStorageSync('history-info');
        delete storageHistoryInfo[storageHistoryList[idx]['id']]

        storageHistoryList.splice(idx, 1);
        
        // console.log('storageHistoryList');
        // console.log(storageHistoryList);
        // console.log('storageHistoryInfo');
        // console.log(storageHistoryInfo);
        // 重新储存数据
        wx.setStorageSync('history-list', storageHistoryList);
        wx.setStorageSync('history-info', storageHistoryInfo);
      }

    };

    // 重置数据链
    function resetThis(cb) {

      if (!wx.getStorageSync('pro-info') && storageHistoryList.length === 0){
        // 回首页
        wx.redirectTo({
          url: '../welcome/welcome'
        })

      } else {
        // 重置页面
        cb && cb();
      }

    }

    _t.setData({
      removeClassName : dataIdx
    })

    wx.showModal({
      title: '',
      content: '确定要删除这条信息？',
      success: function (res) {

        if (res.confirm) {

          console.log('确定删除')
          removeThis();
          _t.setData({
            removeClassName : null
          })
          resetThis(_t.getHistoryList);

        } else if (res.cancel) {
          console.log('取消删除')
          _t.setData({
            removeClassName : null
          })
        }
      }
    })

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