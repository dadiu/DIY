// pages/role/create.js
var app = getApp();
var proList = [
      { t : "魔决", n : 0, p : 6000 },
      { t : "彩果", n : 0, p : 8600 },
      { t : "玫瑰", n : 0, p : 5400 },
      { t : "金兰", n : 0, p : 5400 },
      { t : "精华", n : 0, p : 10000 },
      { t : "夜光", n : 0, p : 800 },
      { t : "避水", n : 0, p : 400 },
      { t : "龙鳞", n : 0, p : 600 },
      { t : "60环", n : 0, p : 1000 },
      { t : "50环", n : 0, p : 1000 }
    ];

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(app);

    this.setData({
      proList : proList,
      total : 0
    })
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

      proList[index].n ++;

      this.setData({
        proList : proList
      });

      this.totalChange();
    }
    else if(boo === -1){    // sub

      if(proList[index].n !== 0){
        proList[index].n --;
        this.setData({
          proList : proList
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
    let len = proList.length;
    let total = 0;
    let _t = this;

    for(; i < len; i++){
      total = total + proList[i].n*proList[i].p
    };

    this.setData({
      total : _t.priceChange(total, 3)
    })

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
      return num;
    }
    else {
      for(; i < len; i++){
        enterNum += num[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? "," : ""); ;
      }

      return enterNum.split("").reverse().join("");
    }
  }
})