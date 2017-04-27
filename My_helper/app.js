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
   * 正则
   */
  reg : {
    'area' : {"reg": /^[\u4E00-\u9FA5\uF900-\uFA2D]{1,4}$/,"err":"大区名为1~4位中文，不支持特殊字符"},
    'role' : {"reg": /^[\w-~!@#$%^&*()\\,.\/\?\{\}\[\]\u4E00-\u9FA5\uF900-\uFA2D]{1,6}$/,"err":"角色名为1~6位中文，不支持特殊字符"},
    'level' : {"reg": /^[0-9]{2,3}$/,"err":"等级为2-3位纯数字"}
  },
  
  /**
   * 正则遍历方法
   * @param 
   */
  regFn : function(ob){
    console.log(ob)
    let key = null;
    let _t = this;

    if(ob.level){
      ob.level = parseInt(ob.level,10);
    };

    for(key in ob){
      if(!_t.reg[key].reg.test(ob[key])){
        return _t.reg[key].err
      }
    }
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