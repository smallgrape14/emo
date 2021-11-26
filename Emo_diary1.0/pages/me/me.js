// pages/me/me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuitems: [
      { text: '点赞', url: '../my_dianzan/my_dianzan', tips: '/icon/wodedianzan.png' },
      { text: '评论', url: '../my_comment/my_comment',tips: '/icon/wodepinlun.png' },
      { text: '收藏', url: '../my_collect/my_collect', tips: '/icon/wodeshoucang.png' },
    ],
    bannerHeight: 0 ,  //banner高度
    scrollTop: 0, //滚动条高度
    pageNum:1,
    array:[],
    name:"匿名用户",
    setInter:""
  },
  onLoad: function () {
    //定时器用来请求日记数据
    this.startSetInter();
  },
  //启用定时器
  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        that.queryRemindCount()
      }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  queryRemindCount: function () {
    var that = this;
    if (app.globalData.userInfo!=null) {
      that.setUserInfo(app.globalData.userInfo);
      // return
    } 
    this.setData({
           bannerHeight: 204 ,
       })
       wx.request({
        url: 'https://luckym.top//treeHole/getMy',
        method: 'get',
        data: {
          page: 1,
          per_page:4,
          user_id:app.globalData.userID,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if(res.data.msg=="没有数据")
              {
                that.setData({
                array:[],
              })
              } else {
                that.setData({
                  array:res.data.all_tree_hole,
                  // name: (Math.random() * 100000 + 200000).toFixed(0),
                })        
          }
          clearInterval(that.data.setInter) // 关闭定时器
          console.log(res.data)
        },
        fail (){
          wx.showToast({
            title: '获取失败，请稍后重试',
            icon:'none',
            duration:2500,
          })
        }
      })
  },
  ishaveuserInfo:function(){
    if (app.globalData.userInfo==null) {
      wx.reLaunch({
        url: '../login1/login1',
        })
    } 
  },
  setUserInfo: function (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
  },
  /**
   * 监听滚动条
   */
  onPageScroll: function(e) {
    console.log('滚动条位置', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  onShow:function(){
    // if(app.globalData.deleteDiary){
      
    //   that.data.array.splice(this.data.idkey,1);
    //   that.setData({
    //     array:that.data.array,
    //   })
    // }
    var that=this;

    if( app.globalData.release){
      // app.globalData.release=false;
      this.setData({
        pageNum:1
      })
  wx.request({
    url: 'https://luckym.top/treeHole/getMy',
    method: 'get',
    data: {
      page: this.data.pageNum,
      per_page:4,
      user_id:app.globalData.userID,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      if(res.data.msg=="没有数据")
          {
            that.setData({
            array:[],
          })
          } else {
            that.setData({
              array:res.data.all_tree_hole,
              // name: (Math.random() * 100000 + 200000).toFixed(0),
            })        
      }
      console.log(res.data)
    },
    fail (){
      wx.showToast({
        title: '获取失败，请稍后重试',
        icon:'none',
        duration:2500,
      })
    }
  })
    }
   
  },
  
//触底响应函数，监听下拉加载----------------------------------->>>>>>>>>
onBottom(){
  (this.data.pageNum)++;
  this.getNoticeList();
},
//获取列表失败的回调函数
getNoticeList(){
  //请求
  var that=this
  wx.request({
    url: 'https://luckym.top//treeHole/getMy',
    method: 'get',
    data: {
      page: this.data.pageNum,
      per_page:4,
      user_id:app.globalData.userID,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res)
      if (that.data.pageNum == 1) {
        if(res.data.all_tree_hole!=undefined)
          {
            that.setData({
              array: res.data.all_tree_hole,
             })
          }
          else{
            that.setData({
              array: [],
             })
          }   
      } else {
        //获取原始列表
          let noticeList = that.data.array;
          //获取新列表
          let arr = res.data.all_tree_hole;
          //新列表数据与原列表数据合并
          let newArr = noticeList.concat(arr);
          console.log(arr)
          if(arr!=undefined)
          {
            that.setData({
                array: newArr,
            })
          }   
      }
    },
    fail (){
      wx.showToast({
        title: '获取失败，请稍后重试',
        icon:'none',
        duration:2500,
      })
    }
  })
},
//页面上拉触底事件的处理函数
onReachBottom: function () {
  this.onBottom();
},
//触底响应函数，监听下拉加载-----------------------------------^^^^^^^^^^>>>>>>>
  
  
  //点赞
  add_dianzan(e){
    var that=this
    var idkey=e.currentTarget.dataset.id;
    // console.log(e)
    idkey=idkey.substr(0,idkey.length-1)
    var addchange="array["+idkey+"].likes"
    // console.log(idkey)
    // console.log(this.data.array[idkey])
    // console.log("tree_hole_id： "+this.data.array[idkey].tree_hole_id)
    wx.request({
      url: 'https://luckym.top/treeHole/GiveALike/',
      method: 'post',
      data: {
        user_id: app.globalData.userID,
        tree_hole_id: this.data.array[idkey].tree_hole_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        var is_like=res.data.data.is_like
        console.log("is_like: "+is_like)
        if(is_like){
          that.setData({
            [addchange]:that.data.array[idkey].likes+1
          })
        }
        else{
          that.setData({
            [addchange]:that.data.array[idkey].likes-1
          })
        }
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      }
    })

  },


  //收藏
  add_collect(e){
    var that=this
    var idkey=e.currentTarget.dataset.id;
    // console.log(e)
    idkey=idkey.substr(0,idkey.length-1)
    var addchange="array["+idkey+"].collects"
    wx.request({
      url: 'https://luckym.top/treeHole/collect',
      method: 'post',
      data: {
        user_id: app.globalData.userID,
        tree_hole_id: this.data.array[idkey].tree_hole_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        var is_collect=res.data.data.is_collect
        console.log("is_collect: "+is_collect)
        if(is_collect){
          that.setData({
            [addchange]:that.data.array[idkey].collects+1
          })
        }
        else{
          that.setData({
            [addchange]:that.data.array[idkey].collects-1
          })
        }
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      }
    })

  },

  //评论
  add_comment(e){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },


  postContent:function(event){
    var idkey=event.currentTarget.dataset.id;
    this.setData({
      idkey:idkey
    })
    wx.setStorageSync('hole_id', this.data.array[idkey].tree_hole_id);
    wx.setStorageSync('u_id', this.data.array[idkey].user_id);
    wx.navigateTo({
      url: '../detail/detail?idkey='+idkey,
    })
  },
})