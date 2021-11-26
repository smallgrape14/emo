// pages/writes/writes.js
let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDate()
Page({
  data: {
    info:0,
    _year: year,
    _month: month,
    day: day, 
    neirong:"",
  },

  textinput:function(e){
    var content = e.detail.value;
    var cnt = parseInt(content.length);
    this.setData({
      neirong:content,
      info:cnt
    })
  },
  editsuccess:function()
  {
    let that = this;
     let currentTime = util.formatTime(new Date());
     that.setData({
      specific_t: currentTime,
     })
    wx.setStorageSync('s_day', this.data.day);
    wx.setStorageSync('s_year', this.data._year);
    wx.setStorageSync('s_month', this.data._month+1);
    wx.setStorageSync('s_content', this.data.neirong);
    wx.setStorageSync('w_time', this.data.specific_t);
  }
})