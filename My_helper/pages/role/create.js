// pages/role/create.js
Page({
  data:{
    proList : [
      {
        t : "魔决",
        n : 0,
        p : 6000
      },{
        t : "彩果",
        n : 0,
        p : 8600
      },{
        t : "玫瑰",
        n : 0,
        p : 5400
      },{
        t : "金兰",
        n : 0,
        p : 5400
      },{
        t : "精华",
        n : 0,
        p : 10000
      },{
        t : "夜光",
        n : 0,
        p : 800
      },{
        t : "避水",
        n : 0,
        p : 400
      },{
        t : "龙鳞",
        n : 0,
        p : 600
      },{
        t : "60环",
        n : 0,
        p : 1000
      },{
        t : "50环",
        n : 0,
        p : 1000
      }
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  countFn : function(event){
    //console.log(event);
    //console.log(number + ' / ' + index + ' / ' + boo);
    let data = event.currentTarget.dataset;
    let info = data.info;
    let boo = parseInt(data.boo, 10);
    let index = parseInt(data.idx);
    
    if(boo === 1){        // add
      console.log(this.proList);
    }
    else if(boo === -1){    // sub

    }

  }
})