
Component({
  properties: {
    url: {
      type: String,
      value: "http://m.qpic.cn/psc?/V513EChq0TBwUB2Wzg9r2UtSsk4U2iiH/45NBuzDIW489QBoVep5mcfYjlZUFOrRbEIuOYoOt6so8HKrwHQ5eX9stIeg53fBDIqktOSXuyr*.XL*9SLg*03iM4XPFKaHDH4.9SIFsncY!/b&bo=Dg1VAQAAAAADN0U!&rf=viewer_4",
    },
    count: {
      type: String,
      value: 6,  //图片数量
    },
    width: {
      type: String,
      value: 397,
    },
    height: {
      type: String,
      value: 270,
    },
    duration: {  //播放一次时间
      type: String,
      value: 2.5,
    },
    playNumber: {   //播放次数
      type: String,
      value: 2,
    },
    left: {
      type: String,
      value: 0,
    },
    top: {
      type: String,
      value: 0,
    }
  },
  data: {
  },
  attached() {
    if (this.data.playNumber > 0) {
      setTimeout(() => {
        this.triggerEvent("end");
      }, this.data.playNumber * this.data.duration * 1000);
    }
  },
  methods: {}
  
});
