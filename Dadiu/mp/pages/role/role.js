// pages/role/role.js
// var roleList= [
//   { t : "一笑倾城", p : "大大丢1号" },
//   { t : "庄周梦蝶", p : "大大丢2号" }
// ]
// var isRole = false;

var app = getApp();
var isError = false;
Page({
  data:{
    isError : isError
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },

  /**
   * 创建角色
   */
  createRole : function(e){

    let valArr = e.detail.value;
    let checkForm = app.regFn(valArr);

    if(checkForm === undefined){
      this.setData({
        error : null,
        isError : false
      })
      // 储存本地数据，跳转入编辑道具页

      let roleList = [
        {area : valArr.area, role : valArr.role, level: valArr.level}
      ];
      wx.setStorageSync('role-list', roleList);
      
      wx.reLaunch({
        url: 'create'
      })
    }
    else{

      this.setData({
        error : checkForm,
        isError : true
      })
    }
  },

  /**
   * input blur
   */
  hideError : function(){
    this.setData({
      isError : false
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