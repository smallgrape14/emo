// pages/write/write.js
var util = require('../../utils/util.js');
let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDate()
let hour = date.getHours()
let minute = date.getMinutes()
let second = date.getSeconds()
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:0,
      yanse_column: 0,
    year_month: '',
    dayShow: false,
    _year: year,
    _month: month,
    day: date.getDate(),
    neirong:"",
    specific_t:'',
    mood:'悲伤',
    objectArray: [
      {
        id: 0,
        name: '悲伤',
      },
      {
        id: 1,
        name: '生气'
      },
      {
        id: 2,
        name: '焦虑'
      },
      {
        id: 3,
        name: '无语'
      }
    ],
    objectIndex: 0,
  },
  textinput:function(e){
    var content = e.detail.value;
    var cnt = parseInt(content.length);
    this.setData({
      neirong:content,
      info:cnt
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      objectIndex: e.detail.value,
      
    })
    this.mood=this.data.objectArray[this.objectIndex].name;
  },
  UpdateDate(){
    this.setData({
      // _year: year,
      // _month: month,
      year: year,
      month: month,
      day: day,
      year_month: year + '年' + (month + 1) + '月'

    })
    this.monthDaysUpdate(year, month)
    this.dayShow () 
  },
  todayDate () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
 
    day = day < 10 ? '0' + day : day
 
    this.monthDaysUpdate(year, month)
 
    this.setData({
      _year: year,
      _month: month,
      year: year,
      month: month,
      day: day,
      year_month: year + '年' + (month + 1) + '月'
    })
  },
 
  /**
   * 年、月切换
   */
  yearMonthUpdate (flag) {
    let year = this.data.year
    let month = this.data.month
    let date = new Date(year, month + flag)
    
    year = date.getFullYear()
    month = date.getMonth()
 
    this.monthDaysUpdate(year, month)
 
    this.setData({
      year: year,
      month: month,
      year_month: year + '年' + (month + 1) + '月'
    })
  },
 
  /**
   * 月份天数
   * new Date： 把月份设置成下一个月，日期设置成 0，getDate()就获取这个月份的天数
   */
  monthDaysUpdate (year, month) {
    // 月份总天数
    let days = new Date(year, month + 1, 0).getDate()
    // 今天的日期
    let currYear = new Date().getFullYear()
    let currMonth = new Date().getMonth()
    let today = new Date().getDate()
    // 月份第一天是星期几
    let whichDay = new Date(year, month, 1).getDay()
    // 存放日期数组
    let dayList = []
    
    // 补空
    for (let j = 0; j < whichDay; j++) {
      let obj = { 'day': '' };
      dayList.push(obj)
    }
 
    for (let i = 1; i <= days; i++) {
      let obj = {
        'day': i,
      };
 
      if ((i < today && month <= currMonth && year <= currYear) || (month < currMonth && year <= currYear) || (year < currYear)) {
        obj['class'] = 'dl-active'  // 过去的天数
      }
      else if (i === today && month === currMonth && year === currYear) {
        obj['class'] = 'dl-today'
        obj['day'] = '今天'
      }
      else if (i > today && month >= currMonth && year >= currYear) {
        obj['class'] = 'dl-disable' // 未来的天数
      }
      else {
        obj['class'] = 'dl-disable' // 未来的天数
      }
 
      dayList.push(obj)
    }
 
    this.setData({
      dayList: dayList
    })
  },
 
  /**
   * 月份切换
   * index: -1 (前一个月) 1 (后一个月))
   */
  switchMonth (event) {
    let index = event.currentTarget.dataset.index
 
    if (parseInt(index) === -1) {
      this.yearMonthUpdate(-1)
    }
    else if (parseInt(index) === 1) {
      this.yearMonthUpdate(1)
    }
  },
 
  /**
   * 选择日期
   */
  selectDay (event) {
    let day = event.currentTarget.dataset.day
    let clazz = event.currentTarget.dataset.clazz
    let year = this.data.year
    let month = this.data.month
 
    if (clazz.indexOf('dl-disable') === -1) {
      if (day === '今天') {
        day = new Date().getDate()
      }
 
      day = day < 10 ? '0' + day : day
 
      this.setData({
        _year: year,
        _month: month,
        day: day,
        dayShow: false
      })
    }
 
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
 
  /**
   * 日期面板展开
   */
  dayShow () {
    let dayShow = this.data.dayShow
    dayShow = dayShow ? false : true
    this.setData({
      dayShow: dayShow
    })
  },
 
  /**
   * 日期面板关闭
   */
  close_dayShow () {
    this.setData({
      dayShow: false
    })
  },

  editsuccess:function()
  {
    hour = date.getHours()
    minute = date.getMinutes()
    second = date.getSeconds()
    let that = this;
     let currentTime = util.formatTime(new Date());
     that.setData({
      specific_t: currentTime,
      mood:this.data.objectArray[this.data.objectIndex].name,
     })
    // this.setData({
    //   specific_t: hour + ':' + minute + ':' + second,
    // })   
    wx.setStorageSync('w_day', this.data.day);
    wx.setStorageSync('w_year', this.data._year);
    wx.setStorageSync('w_month', this.data._month+1);
    wx.setStorageSync('w_content', this.data.neirong);
    wx.setStorageSync('w_time', this.data.specific_t);
    wx.setStorageSync('w_mood', this.data.mood);
    app.globalData.diasucc=true;
    wx.navigateBack({
      delta: 1,
    })
  }
})
