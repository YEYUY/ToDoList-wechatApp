const db = wx.cloud.database()
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    now_date:"",
    isShowPop: false,
    isShowCalendar: false,
    isshowKeyboard: true,
    isCloseSlide: false,
    isHaveFinished:false,
    isExpand_collapse:false,//折叠面板
    finishedAmount:"",
    tasks_list: [],
    choose_end_date: "",
    task: {
      title: "",
      end_date: "今天",
      isFinished: 0,
      creat_time: "",
    },
    calendarConfig: {
      theme: 'elegant',
      inverse: true, // 单选模式下是否支持取消选中,
      showLunar: true,
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      disableMode: { // 禁用某一天之前/之后的所有日期
        type: 'before', // [‘before’, 'after']
      },
    }
  },

  onLoad() {
    var that = this
    
    let weekArray = ['', "周一", "周二", "周三", "周四", "周五", "周六", '周日']
    let now_date = (new Date().getMonth()+1)+"月"+new Date().getDate()+"日"
    let now_week = new Date().getDay()
    now_date = now_date+" "+weekArray[now_week]
    that.setData({
      now_date:now_date
    })
    console.log(now_date)
    app.globalData.openid = wx.getStorage({
      key: 'openid',
    })
    console.log("openid ",app.globalData.openid)
  },

  onShow() {
    var that = this
    that.getList()
  },

  onPullDownRefresh() {
    var that = this
    that.getList()
    wx.stopPullDownRefresh()
  },

  //获取列表 -调用
  async getList() {
    wx.showNavigationBarLoading()
    var that = this
    try {
      let res = await util.cloud_getList("test_list")
      let now_date = util.changeDate(new Date())
      let isHaveFinished = false
      let finishedAmount = 0
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].isFinished==1)
        {
          isHaveFinished=true
          finishedAmount+=1
        }
        if (now_date.substr(0, 3) == res.data[i].end_date.substr(0, 3)) {
          res.data[i].end_date = res.data[i].end_date.substr(5)
        }
      }
      that.setData({
        tasks_list: res.data,
        isHaveFinished:isHaveFinished,
        finishedAmount:finishedAmount,
      })
    } catch (error) {
      console.log("fail",error)
    }
    wx.hideNavigationBarLoading()
  },


  //点击详情跳转
  toTaskDetail(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let taskDetail = that.data.tasks_list[tap_id]
    wx.navigateTo({
      url: "../taskDetail/taskDetail?task=" + JSON.stringify(taskDetail),
    })
    that.setData({
      isCloseSlide: true
    })
  },

  //点击删除
  tapDelete(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let delete_task_id = that.data.tasks_list[tap_id]._id

    wx.showModal({
      content: "确定删除该任务吗?",
      async success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: "删除中"
          })
          try {
            await util.cloud_remove("test_list", delete_task_id, getApp().globalData.openid)
            wx.hideLoading()
            that.getList()
          } catch (error) {
            wx.hideLoading()
            wx.showModal({
              showCancel: false,
              content: "删除失败",
              title: "错误",
            })
            console.log(error)
          }
        }
      }
    })
  },

  //点击添加任务
  tapAddTask() {
    var that = this
    wx.hideTabBar()
    that.setData({
      isShowPop: true,
    })
    that.setData({
      iShowKeyboard: true
    })
  }, 

  //点击日期
  tapChooseDate() {
    var that = this
    wx.hideKeyboard()

    that.setData({
      isShowCalendar: true,
      iShowKeyboard: false
    })
  },

  //点击日历的确定
  confirm_calendar() {
    var that = this
    that.setData({
      'task.end_date': that.data.task.end_date,
      isShowCalendar: false,
      iShowKeyboard: true
    })
  },

  //点击日历的取消
  cancel_calendar() {
    this.setData({
      isShowCalendar: false,
      iShowKeyboard: true
    })
  },

  // //选择日期后确定
  // chooseDate(e) {
  //   var that = this
  //   var date = util.getDate(new Date(e.detail))
  //   that.setData({
  //     'task.end_date': date
  //   })
  // },

  //点击背景层
  tapBackground() {
    var that = this
    wx.hideKeyboard()
    let task = {
      title: "",
      end_date: "今天",
      isFinished: 0,
      creat_time: "",
    }
    that.setData({
      isShowPop: false,
      isshowKeyboard: false,
      task: task,
    })
    wx.showTabBar()
  },


  //输入任务标题
  input_text(e) {
    var that = this
    that.data.task.title = e.detail.value
  },


  //点击提交
  async submit() {
    var that = this
    if (that.data.title != "") {
      let data = that.data.task
      let creat_time = util.changeDate(new Date())
      data.creat_time = creat_time
      console.log("提交任务 ", data)
      try {
        await util.cloud_add("test_list", data)
        that.getList()
        that.tapBackground()
      } catch (error) {
        console.log(error)
      }
    }
  },


  //日历选择日期
  afterTapDay(e) {
    console.log('点击日期 ', e.detail)
    var that = this
    let weekArray = ['', "周一", "周二", "周三", "周四", "周五", "周六", '周日']
    that.data.task.end_date = e.detail.year + "-" + e.detail.month + "-" + e.detail.day + " " + weekArray[e.detail.week]
  },

  //点击圆标完成
  async tapFinish(e) {
    var that = this
    that.setData({
      isCloseSlide:true
    })
    let tap_id = e.currentTarget.id * 1
    let tapTask = that.data.tasks_list[tap_id]
    let data
    let finished_time = util.changeDate(new Date())
    if(tapTask.isFinished==0)
    {
      data={
        isFinished:1,
        finished_time:finished_time
      }
      util.playAudio()
    }else
    {
      data={
        isFinished:0,
      }
    }
    wx.vibrateShort({
      type: "heavy"
    }) //手机振动15ms
    db.collection("test_list").doc(tapTask._id).update({
      data: data,
      success(res) {
        that.getList()
        //console.log("已完成", that.data.tasks_list[tap_id].title)
      }
    })
  },


  // 折叠展开
  expand_collapse()
  {
    var that = this
    that.setData({
      isExpand_collapse:true
    })
  },

  fold_collapse()
  {
    var that = this
    that.setData({
      isExpand_collapse:false
    })
  }

})