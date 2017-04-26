//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },

  

  /**
   * 金额格式化
   */
  priceChange : function(total, max){
    console.log(total);
    let num = total.toString().split("").reverse();
    let len = num.length;
    let i = 0;
    let enterNum = '';

    if(len <= 3){
      return total;
    }
    else {
      for(; i < len; i++){
        enterNum += num[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? "," : ""); ;
      }

      return enterNum.split("").reverse().join("");
    }
  }
})