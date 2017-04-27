// pages/role/create.js

var app = getApp();
var roleInfo = {};

// 默认道具表
var proInfo = require('../../data/prolist-data.js'); 
// 本地道具表
var storageProInfo = wx.getStorageSync('pro-info');
// 编辑中道具表
var currentProInfo = {};

Page({
  data:{
    roleInfo : {},
    proList : [],
    total : 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getProList();
  },

  /**
   * 获取道具环列表
   * 如果存在未完成，则替换
   * 如果已完成，则显示最新的
   */
  getProList : function(){

    // 存在未跑完的环
    if(storageProInfo){
      currentProInfo = storageProInfo;
    } 
    else {  // 不存在未跑完的环
      let nowTime = this.getTime();
      currentProInfo = proInfo;
      currentProInfo.time = nowTime.time;
      currentProInfo.week = nowTime.week;
    };

    roleInfo = wx.getStorageSync('role-list')[0];
    roleInfo.time = currentProInfo.time + ' ' + currentProInfo.week;

    this.setData({
      proList : currentProInfo.list,
      total : app.priceChange(currentProInfo.total,3),
      roleInfo : roleInfo
    });
    
  },

  /**
   * 获取当前时间
   */
  getTime : function(){
    let today = new Date();
    let weekdayArr = ['日', '一', '二', '三', '四', '五', '六'];
    let Year = today.getFullYear(),
        Month = today.getMonth()+1,
        day = today.getDate(),
        weekday = weekdayArr[today.getDay()];
    if(Month < 10){
      Month = '0' + Month;
    }
    if(day < 10){
      day = '0' + day;
    }

    return {
      time : Year + '-' + Month + '-' + day,
      week : '周' + weekday
    };
  },

  /**
   * 点击数量事件
   */
  countFn : function(event){
    //console.log(event);
    //console.log(number + ' / ' + index + ' / ' + boo);
    let that = this;
    let data = event.currentTarget.dataset;
    let info = data.info;
    let boo = parseInt(data.boo, 10);
    let index = parseInt(data.idx);
    
    if(boo === 1){        // add

      currentProInfo.list[index].n ++;

      this.setData({
        proList : currentProInfo.list
      });

      this.totalChange();
    }
    else if(boo === -1){    // sub

      if(currentProInfo.list[index].n !== 0){
        currentProInfo.list[index].n --;
        this.setData({
          proList : currentProInfo.list
        });

        this.totalChange();
      }

    }

  },

  /**
   * 改变总金额
   */
  totalChange : function(){
    let i = 0;
    let len = currentProInfo.list.length;
    let total = 0;
    let _t = this;

    for(; i < len; i++){
      total = total + currentProInfo.list[i].n*currentProInfo.list[i].p
    };

    // 改变页面总价
    this.setData({
      total : app.priceChange(total, 3)
    })
    // 储存总价
    currentProInfo.total = total;

  },

  /**
   * 休息会儿,临时储存
   */
  wait : function(){
    wx.setStorageSync('pro-info', currentProInfo);

    // 跳转去历史页面
    wx.redirectTo({
      url: 'history'
    })
  },

  /**
   * 跑完了
   * 等出了GM奖励再跳转去GM
   */
  end : function(){

    // 删除 pro-info
    wx.removeStorageSync('pro-info');

    // 储存 history-list
    let oldHistoryList = wx.getStorageSync('history-list') ? wx.getStorageSync('history-list') : [];
    let addList = {
        time : currentProInfo.time,
        week : currentProInfo.week,
        level : roleInfo.level,
        total : currentProInfo.total,
        id : 'D' + currentProInfo.time
      };

    oldHistoryList.unshift(addList);
    wx.setStorageSync('history-list', oldHistoryList);

    // 储存 histroy-info
    let oldHistoryInfo = wx.getStorageSync('history-info') ? wx.getStorageSync('history-info') : {};
    
    oldHistoryInfo[addList.id] = {
      time : currentProInfo.time,
      week : currentProInfo.week,
      total : currentProInfo.total,
      list : this.filterPro(currentProInfo.list)
    };
    wx.setStorageSync('history-info', oldHistoryInfo);

    // 跳转去历史页面
    wx.redirectTo({
      url: 'history'
    })

  },

  /**
   * 过滤道具列表，如存在个数0，则移除
   */
  filterPro : function(list){
    
    list.forEach(function(val,index){
      if(val.n === 0){
        list.splice(index,1);
      }
    });

    return list;
  }
})