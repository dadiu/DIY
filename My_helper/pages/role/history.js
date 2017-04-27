// pages/role/history.js
var app = getApp();
var roleInfo = wx.getStorageSync('role-list')[0];
var storageHistoryList = wx.getStorageSync('history-list');

Page({
  data:{
    roleInfo : {},
    historyList : [],
    isWait : false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getHistoryList();
    this.setData({
      roleInfo : roleInfo,
    })
  },

  /**
   * 历史列表
   */
  getHistoryList : function(){
    let myRoleList = this.isWaitFn();

    storageHistoryList.forEach(function(val){
      myRoleList.push({
        t : val.time + ' ' + val.week,
        l : val.level,
        p : app.priceChange(val.total),
        id : val.id
      })
    });

    
    this.setData({
      historyList : myRoleList
    })

  },

  /**
   * 进行中的道具环
   * @param
   */
  isWaitFn : function(){
    let arr = [];
    let waitList = wx.getStorageSync('pro-info');
    if(waitList){
      arr = [
        {
          t : waitList.time + ' ' + waitList.week,
          l : roleInfo.level,
          p : app.priceChange(waitList.total)
        }
      ]
    }

    return arr;
  },

  /**
   * 打开单道具详情页
   */
   openDetail : function(event){
     let idx = event.currentTarget.dataset.idx;
     let current = storageHistoryList[idx];

     wx.navigateTo({
       url: 'detail?id=' + current.id + '&level=' + current.level + '&time=' + current.time + current.week
      })
   },

   /**
    * 打开进行中道具页
    */
   openPro : function(){
     wx.navigateTo({
       url: 'create'
     })
   }
})