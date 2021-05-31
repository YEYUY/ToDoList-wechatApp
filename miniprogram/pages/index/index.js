const db = wx.cloud.database()
var util = require('../../utils/util.js')
const app = getApp()

var users_id
var today_id

Page({
  data: {
    user: {},
    chosenList: [],
    now_date: "",
    momentIcon_show: "afternoon",
    isOverTime: false,
    isShowPop: false,
    isShowCalendar: false,
    isshowKeyboard: true,
    isCloseSlide: false,
    isHaveFinished: false,
    isTaskName: false,
    isShowToast: false,
    isShowListPop: false,
    isExpand_collapse: false, //折叠面板
    finishedAmount: "",
    unfinishedAmount: "",
    overTasksAmount: "",
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

  async onLoad() {
    var that = this
    that.updateTodayMoment()

    let res = await util.cloud_getList("users")
    if (res.data.length == 0) {
      console.log("users集合无")
      let data = {
        todayTasks: [],
        myCreatLists: [],
        myJoinLists: [],
        allTaskAmount: 0,
        avatarUrl:"",
        name:"昵称",
        finishedToday:0,
        totalFinishedAmount:0,
      }
      let res2 = await util.cloud_add("users", data)
      users_id = res2._id
      app.globalData.users_id = res2._id
    } else {
      users_id = res.data[0]._id
      app.globalData.users_id = users_id
    }
    console.log("users_id: ", users_id)
    wx.setStorage({
      data: users_id,
      key: 'users_id',
    })

    app.globalData.openid = wx.getStorage({
      key: 'openid',
    })
    console.log("openid ", app.globalData.openid)
  },

  onShow() {

    this.getList()
  },


  //点击清单
  async tapChooseList() {
    var that = this
    that.getUsers()
    this.setData({
      isShowListPop: true,
    })
  },

  //获取users
  async getUsers() {
    wx.showNavigationBarLoading()
    var that = this
    let res = await util.cloud_get("users", users_id)
    that.setData({
      user: res.data
    })
    wx.hideNavigationBarLoading()
  },

  tapListName(e) {
    console.log(e)
    var that = this
    let tap_id = e.currentTarget.id * 1
    let tap_list_id = that.data.user.myCreatLists[tap_id].list_id
    that.getListTasks(tap_list_id)
  },

  //获取清单详情
  async getListTasks(list_id) {
    wx.showNavigationBarLoading()
    var that = this
    try {
      let res = await util.cloud_get("lists", list_id)
      let now_date = util.changeDate(new Date())
      let isHaveFinished = false
      let finishedAmount = 0
      for (let i = 0; i < res.data.tasks.length; i++) {
        if (res.data.tasks[i].isFinished == 1) {
          isHaveFinished = true
          finishedAmount += 1
        }
        if (now_date.substr(0, 3) == res.data.tasks[i].end_date.substr(0, 3)) {
          res.data.tasks[i].end_date = res.data.tasks[i].end_date.substr(5)
        }
      }
      that.setData({
        chosenList: res.data,
        // isHaveFinished: isHaveFinished,
        finishedAmount: finishedAmount,
      })
      console.log("chosenList", that.data.chosenList)
    } catch (error) {
      console.log("fail", error)
    }
    wx.hideNavigationBarLoading()
  },

  //更新当前时间
  updateTodayMoment() {
    var that = this
    let weekArray = ['周日', "周一", "周二", "周三", "周四", "周五", "周六", ]
    let now_date = (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
    let now_week = new Date().getDay()
    now_date = now_date + " " + weekArray[now_week]
    that.setData({
      now_date: now_date
    })

    let now_hour = new Date().getHours()
    let momentIcon_show
    if (now_hour > 18 || now_hour < 6) {
      momentIcon_show = "evening"
    } else if (now_hour >= 6 && now_hour < 12) {
      momentIcon_show = "morning"
    } else {
      momentIcon_show = "afternoon"
    }
    if (momentIcon_show != that.data.momentIcon_show) {
      that.setData({
        momentIcon_show: momentIcon_show
      })
    }
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
      let isOverTime = false
      let finishedAmount = 0
      let unfinishedAmount = 0
      let overTasksAmount = 0
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].isFinished == 1) {
          isHaveFinished = true
          finishedAmount += 1
        } else {
          if (res.data[i].isOverTime == 1) {
            isOverTime = true
            overTasksAmount += 1
          }else
          {
            unfinishedAmount += 1
          }
        }
        if (now_date.substr(0, 3) == res.data[i].end_date.substr(0, 3)) {
          res.data[i].end_date = res.data[i].end_date.substr(5)
        }
      }
      that.setData({
        tasks_list: res.data,
        isHaveFinished: isHaveFinished,
        finishedAmount: finishedAmount,
        unfinishedAmount: unfinishedAmount,
        overTasksAmount: overTasksAmount,
        isOverTime: isOverTime,
      })
    } catch (error) {
      console.log("fail", error)
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

  },

  //点击日期
  tapChooseDate() {
    var that = this
    wx.hideKeyboard()

    that.setData({
      isShowCalendar: true,
      // isshowKeyboard: false
    })
  },

  //点击日历的确定
  confirm_calendar() {
    var that = this
    that.setData({
      'task.end_date': that.data.task.end_date,
      isShowCalendar: false,
      isshowKeyboard: true
    })
  },

  //点击日历的取消
  cancel_calendar() {
    this.setData({
      isShowCalendar: false,
      isshowKeyboard: true
    })
  },

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
      task: task,
      isTaskName: false,
    })
    wx.showTabBar()
  },


  //输入任务标题
  input_text(e) {
    var that = this
    that.data.task.title = e.detail.value
    if (that.data.task.title == "") {
      that.setData({
        isTaskName: false
      })
    } else if (that.data.isTaskName == false) {
      that.setData({
        isTaskName: true
      })
    }
  },

  //点击键盘的完成
  tapKeyboardConfirm(e) {
    var that = this
    if (that.data.task.title == "") {
      that.setData({
        isShowToast: true,
        isshowKeyboard: true,
      })
    } else {
      that.submit()
    }
  },


  //点击提交
  async submit() {
    var that = this
    if (that.data.task.title != "") {
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
    let weekArray = ['周日', "周一", "周二", "周三", "周四", "周五", "周六", ]
    that.data.task.end_date = e.detail.year + "年" + e.detail.month + "月" + e.detail.day + "日 " + weekArray[e.detail.week]
  },

  //点击圆标完成
  async tapFinish(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let tapTask = that.data.tasks_list[tap_id]
    let data
    let finished_time = util.changeDate(new Date())
    that.setData({
      isCloseSlide: true,
    })
    if (tapTask.isFinished == 0) {
      util.playAudio()
      data = {
        isFinished: 1,
        finished_time: finished_time
      }
    } else {
      data = {
        isFinished: 0,
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
  expand_collapse(e) {
    var that = this
    if (e.currentTarget.id == "0") {
      that.setData({
        isExpand_collapse0: true
      })
    } else {
      that.setData({
        isExpand_collapse: true
      })
    }

  },

  fold_collapse(e) {
    var that = this
    if (e.currentTarget.id == "0") {
      that.setData({
        isExpand_collapse0: false
      })
    } else {
      that.setData({
        isExpand_collapse: false
      })
    }
  },


  onShareAppMessage: function () {
    return {
      imageUrl: "../../resource/logo3.png"
    }
  }

})