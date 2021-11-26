const date = new Date()
const years = []
const months = []
const days = []
var app = getApp()
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idkey:-1,
    scrollTop:0,
    content:"",
    mood:"",
    day:"",
    month:"",
    year:"",
  }, 

  onLoad: function (options) {
    var idkey=options.idkey;
    console.log(options.idkey);
    this.setData({
      idkey:idkey,
      mood:wx.getStorageSync("d_mood"),
      content:wx.getStorageSync("d_content"),
      day:wx.getStorageSync("d_day"),
      month:wx.getStorageSync("d_month"),
      year:wx.getStorageSync("d_year"),
    });
  },
  deleteDia:function(){
    var that=this;
    // wx.request({
    //   url: 'https://luckym.top/diary/deleteDiary/',
    //   method: 'post',
    //   header:{
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     diary_id:that.data.idkey,
    //   },
    //   success:function(res){
    //     // that.data.content=res.data.content;
    //     console.log(res.data)
    //   },
    //   fail:function(res){
    //     console.log("失败")
    //   }
    // })
    app.globalData.deleteDiary=true;
    wx.navigateBack({
      delta: 1,
    })
  },
})