const date = new Date()
const years = []
const months = []
const days = []

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
  data: {
    flag1:true,
    years,
    year: date.getFullYear(),
    months,
    month: 11,
    days,
    day: 12,
    value: [date.getMonth(), date.getFullYear()],
    isDaytime: true,
    array:[{
      "CreateTime":"13",
      "CreateTime1":"11:24:19",
      "content":"你好呀哈哈哈哈哈哈哈",
  },{
    "CreateTime":"14",
    "CreateTime1":"13:24:19",
    "content":"哈哈我爱学习我爱学习好好学习天天向上好好学习天天向上你好呀哈哈",
},{
  "CreateTime":"15",
  "CreateTime1":"13:24:19",
  "content":"哈哈我爱学习我爱学习好好学习天天向上好好学习天天向上你好呀哈哈",
},{
  "CreateTime":"16",
  "CreateTime1":"13:24:19",
  "content":"哈哈我爱学习我爱学习好好学习天天向上好好学习天天向上你好呀哈哈",
},{
  "CreateTime":"17",
  "CreateTime1":"13:24:19",
  "content":"哈哈我爱学习我爱学习好好学习天天向上好好学习天天向上你好呀哈哈",
},{
  "CreateTime":"18",
  "CreateTime1":"13:24:19",
  "content":"哈哈我爱学习我爱学习好好学习天天向上好好学习天天向上就你好呀哈哈",
}]
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[1]],
      month: this.data.months[val[0]],
    })
  },
  diaryContent:function(event){
    wx.navigateTo({
      url: '../diaryCon/diarycon',
    })
  },

  //popup弹窗组件
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },
  // showPopup() {
  //   this.popup.showPopup();
    
  // },
  onShow:function(){
    this.eat = this.selectComponent("#eat"); //组件的id
    this.eat.showEat();
    setTimeout(function(){
      this.eat.hideEat();
    }.bind(this),3000)
    // setTimeout(function(){
    //   this.popup.showPopup();
      
    // }.bind(this),3000)
  },
  // //取消事件
  // _error() {
  //   this.popup.hidePopup();
  // },
  // //确认事件
  // _success() {
  //   this.popup.hidePopup();
  //   wx.navigateTo({
  //     url: '../morePush/morepush',
  //   })
  // }
})
