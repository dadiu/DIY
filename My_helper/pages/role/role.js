// pages/role/role.js
var roleList= [
  { t : "一笑倾城", p : "大大丢1号" },
  { t : "庄周梦蝶", p : "大大丢2号" }
]
var isRole = false;
var isError = false;
Page({
  data:{
    isRole : isRole,
    isError : isError
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      roleList : roleList
    })

    if(roleList.length === 0){
      this.setData({
        isRole : true
      })
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  /**
   * 创建角色
   */
  createRole : function(){
    this.setData({
      isRole : isRole
    })
  },

  /**
   * 检查创建角色的表单
   */

  /**
   * 增加角色
   */
  addRole : function(){
    this.setData({
      isRole : !isRole
    })
  },

  /**
   * 查看历史
   */
  checkHistory : function(){
    wx.navigateTo({
      url: 'history',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },

  /**
   * 新增道具链
   */
  addNew : function(){
    wx.navigateTo({
      url: 'create',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})