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
    list: [],
    choose_end_date: "",
    task: {
      title: "",
      end_date: "今天",
      isFinished: 0,
      creat_time: "",
      creat_timeStampKey: "",
      files: [],
      pictures: [],
      content: "",
      isOverTime: 0,
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
      //console.log("users集合无")
      let data1 = {
        name: "我的一天",
        unfinishedTaskAmount: 0,
        isMyToday: 1,
        tasks: [],
      }
      let res1 = await util.cloud_add("lists", data1)
      today_id = res1._id
      //console.log("写入我的一天id", today_id)
      let data = {
        name: "昵称",
        avatarUrl: "",
        today_id: today_id,
        myCreatLists: [],
        myJoinLists: [],
        allTaskAmount: 0,
        finishedToday: 0,
        totalFinishedAmount: 0,
        switch: {
          audio: true,
          touch: true,
        }
      }
      let res2 = await util.cloud_add("users", data)
      users_id = res2._id
      app.globalData.users_id = res2._id
      app.globalData.today_id = today_id
    } else {
      users_id = res.data[0]._id
      app.globalData.users_id = users_id
      today_id = res.data[0].today_id
    }
    console.log("users_id: ", users_id)
    console.log("today_id", today_id)
    wx.setStorage({
      data: users_id,
      key: 'users_id',
    })
    wx.setStorage({
      data: today_id,
      key: 'today_id',
    })
    app.globalData.openid = wx.getStorage({
      key: 'openid',
    })
    //console.log("openid ", app.globalData.openid)
  },

  onShow() {
    var that = this
    that.getList()
  },

  //点击清单导入添加icon
  tapChooseList() {
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

  //点击清单标题
  tapListName(e) {
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
      //let isHaveFinished = false
      //let finishedAmount = 0
      for (let i = 0; i < res.data.tasks.length; i++) {
        if (res.data.tasks[i].isFinished == 1) {
          isHaveFinished = true
          //finishedAmount += 1
        }
        if (now_date.substr(0, 3) == res.data.tasks[i].end_date.substr(0, 3)) {
          res.data.tasks[i].end_date = res.data.tasks[i].end_date.substr(5)
        }
      }
      that.setData({
        chosenList: res.data,
        // isHaveFinished: isHaveFinished,
        //finishedAmount: finishedAmount,
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

  //获取我的一天列表
  async getList() {
    wx.showNavigationBarLoading()
    var that = this
    try {
      let res = await util.cloud_get("lists", today_id)
      let now_date = util.changeDate(new Date())
      let isHaveFinished = false
      let isOverTime = false
      let finishedAmount = 0
      let unfinishedAmount = 0
      let overTasksAmount = 0
      for (let i = 0; i < res.data.tasks.length; i++) {

        if (res.data.tasks[i].isFinished == 1) {
          isHaveFinished = true
          finishedAmount += 1
        } else {
          if (res.data.tasks[i].isOverTime == 1) {
            isOverTime = true
            overTasksAmount += 1
          } else {
            unfinishedAmount += 1
          }
        }
        if (now_date.substr(0, 3) == res.data.tasks[i].end_date.substr(0, 3)) {
          res.data.tasks[i].end_date = res.data.tasks[i].end_date.substr(5)
        }
      }
      that.setData({
        list: res.data,
        isHaveFinished: isHaveFinished,
        finishedAmount: finishedAmount,
        unfinishedAmount: unfinishedAmount,
        overTasksAmount: overTasksAmount,
        isOverTime: isOverTime,
      })
      console.log("todaylist:", that.data.list)
    } catch (error) {
      console.log("TodayList fail", error)
    }
    wx.hideNavigationBarLoading()
  },


  //获取列表 -调用
  // async getList() {
  //   wx.showNavigationBarLoading()
  //   var that = this
  //   try {
  //     let res = await util.cloud_getList("test_list")
  //     let now_date = util.changeDate(new Date())
  //     let isHaveFinished = false
  //     let isOverTime = false
  //     let finishedAmount = 0
  //     let unfinishedAmount = 0
  //     let overTasksAmount = 0
  //     for (let i = 0; i < res.data.length; i++) {
  //       if (res.data[i].isFinished == 1) {
  //         isHaveFinished = true
  //         finishedAmount += 1
  //       } else {
  //         if (res.data[i].isOverTime == 1) {
  //           isOverTime = true
  //           overTasksAmount += 1
  //         }else
  //         {
  //           unfinishedAmount += 1
  //         }
  //       }
  //       if (now_date.substr(0, 3) == res.data[i].end_date.substr(0, 3)) {
  //         res.data[i].end_date = res.data[i].end_date.substr(5)
  //       }
  //     }
  //     that.setData({
  //       tasks_list: res.data,
  //       isHaveFinished: isHaveFinished,
  //       finishedAmount: finishedAmount,
  //       unfinishedAmount: unfinishedAmount,
  //       overTasksAmount: overTasksAmount,
  //       isOverTime: isOverTime,
  //     })
  //   } catch (error) {
  //     console.log("fail", error)
  //   }
  //   wx.hideNavigationBarLoading()
  // },

  //点击详情跳转
  toTaskDetail(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let taskDetail = that.data.list.tasks[tap_id]
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
    wx.showModal({
      content: "确定删除该任务吗?",
      async success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: "删除中"
          })
          try {
            let tasks = that.data.list.tasks
            console.log("删除前：", tasks)
            tasks.splice(tap_id, 1)
            console.log("删除后：", tasks)
            await util.cloud_listTasksUpadte("lists", today_id, tasks)
            let unfinishedTaskAmount = that.data.list.unfinishedTaskAmount - 1
            await util.cloud_taskAmountUpadte("lists", today_id, unfinishedTaskAmount)

            that.tapBackground()
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

  //点击删除
  // tapDelete(e) {
  //   var that = this
  //   let tap_id = e.currentTarget.id * 1
  //   let delete_task_id = that.data.tasks_list[tap_id]._id

  //   wx.showModal({
  //     content: "确定删除该任务吗?",
  //     async success(res) {
  //       if (res.confirm) {
  //         wx.showLoading({
  //           title: "删除中"
  //         })
  //         try {
  //           await util.cloud_remove("test_list", delete_task_id, getApp().globalData.openid)
  //           wx.hideLoading()
  //           that.getList()
  //         } catch (error) {
  //           wx.hideLoading()
  //           wx.showModal({
  //             showCancel: false,
  //             content: "删除失败",
  //             title: "错误",
  //           })
  //           console.log(error)
  //         }
  //       }
  //     }
  //   })
  // },

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
      creat_timeStampKey: "",
      files: [],
      pictures: [],
      content: "",
      isOverTime: 0,
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
      data.creat_timeStampKey = new Date().getTime()
      console.log("提交任务 ", data)
      try {
        let tasks = that.data.list.tasks
        tasks.push(data)
        await util.cloud_listTasksUpadte("lists", today_id, tasks)
        let unfinishedTaskAmount = that.data.list.unfinishedTaskAmount + 1
        await util.cloud_taskAmountUpadte("lists", today_id, unfinishedTaskAmount)
        that.tapBackground()
        wx.hideLoading()
        that.getList()
      } catch (error) {
        console.log(error)
      }
    }
  },


  //点击提交
  // async submit() {
  //   var that = this
  //   if (that.data.task.title != "") {
  //     let data = that.data.task
  //     let creat_time = util.changeDate(new Date())
  //     data.creat_time = creat_time
  //     console.log("提交任务 ", data)
  //     try {
  //       await util.cloud_add("test_list", data)
  //       that.getList()
  //       that.tapBackground()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // },

  //日历选择日期
  afterTapDay(e) {
    console.log('点击日期 ', e.detail)
    var that = this
    let weekArray = ['周日', "周一", "周二", "周三", "周四", "周五", "周六", ]
    that.data.task.end_date = e.detail.year + "年" + e.detail.month + "月" + e.detail.day + "日 " + weekArray[e.detail.week]
  },


  //点击圆标
  async tapFinish(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let task = that.data.list.tasks[tap_id]
    let finished_time = util.changeDate(new Date())
    let unfinishedTaskAmount = that.data.list.unfinishedTaskAmount
    that.setData({
      isCloseSlide: true,
    })
    if (task.isFinished == 0) {
      util.playAudio()
      task.finished_time = finished_time
      task.isFinished = 1
      unfinishedTaskAmount -= 1
    } else {
      task.isFinished = 0
      unfinishedTaskAmount += 1
    }
    wx.vibrateShort({
      type: "heavy"
    }) //手机振动15ms
    task.list_id = today_id
    let data = {
      list_id: today_id,
      task: task
    }
    await util.cloud_function("taskUpdate", data)
    await util.cloud_taskAmountUpadte("lists", today_id, unfinishedTaskAmount)
    that.getList()
  },

  //点击圆标完成
  // async tapFinish(e) {
  //   var that = this
  //   let tap_id = e.currentTarget.id * 1
  //   let tapTask = that.data.list.tasks[tap_id]
  //   let data
  //   let finished_time = util.changeDate(new Date())
  //   that.setData({
  //     isCloseSlide: true,
  //   })
  //   if (tapTask.isFinished == 0) {
  //     util.playAudio()
  //     data = {
  //       isFinished: 1,
  //       finished_time: finished_time
  //     }
  //   } else {
  //     data = {
  //       isFinished: 0,
  //     }
  //   }
  //   wx.vibrateShort({
  //     type: "heavy"
  //   }) //手机振动15ms
  //   db.collection("test_list").doc(tapTask._id).update({
  //     data: data,
  //     success(res) {
  //       that.getList()
  //       //console.log("已完成", that.data.tasks_list[tap_id].title)
  //     }
  //   })
  // },


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