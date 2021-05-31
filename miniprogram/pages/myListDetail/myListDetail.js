const util = require("../../utils/util")
const db = wx.cloud.database()
const _ = db.command
var list_id
var users_id

Page({

  data: {
    list: {},
    now_date: "",
    isShowPop: false,
    isShowCalendar: false,
    isshowKeyboard: true,
    isCloseSlide: false,
    isShowToast:false,
    isHaveFinished: false,
    isShowInvitePop:false,
    isTaskName:false,
    isExpand_collapse: false, //折叠面板
    finishedAmount: "",
    tasks_list: [],
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

  onLoad: async function (options) {
    var that = this
    if (options.list_id) {
      console.log("接收task_id：", options.list_id)
      list_id = options.list_id
      users_id = wx.getStorageSync('users_id')
    } else {
      console.log("没有接收id")
    }
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
        list: res.data,
        isHaveFinished: isHaveFinished,
        finishedAmount: finishedAmount,
      })
      // wx.setNavigationBarTitle({
      //   title: res.data.name,
      // })
    } catch (error) {
      console.log("fail", error)
    }
    wx.hideNavigationBarLoading()
  },

  //修改清单名称
  input_listName(e) {
    var that = this
    let list_name = e.detail.value
    db.collection("lists").doc(list_id).update({
      data: {
        name: list_name
      },
      success(res) {
        
        db.collection('users').where({
          '_id':users_id ,
          'myCreatLists.list_id': list_id,
        }).update({
          data: {
            'myCreatLists.$.list_name': list_name,
          },
        })
        console.log("标题更新成功", list_name)
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  //点击邀请
  tapInvite()
  {
    this.setData({
      isShowInvitePop:true,
    })
  },

  //删除清单
  tapDeleteList()
  {
    var that = this
    wx.showModal({
      content: "确定删除该清单吗?",
      async success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: "删除中"
          })
          try {

            await util.cloud_remove("lists",list_id,getApp().globalData.openid)
            let res = await util.cloud_get("users",users_id)
            let myCreatLists = res.data.myCreatLists
            let i
            for(i=0;i<myCreatLists.length;i++)
            {
              if(list_id ==myCreatLists[i].list_id)
              break
            }
            myCreatLists.splice(i, 1)
            await util.cloud_usersCtUpadte("users", users_id, myCreatLists)
            wx.hideLoading()
            wx.navigateBack({
              delta: 1,
            })

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

  //点击详情跳转
  toTaskDetail(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let taskDetail = that.data.list.tasks[tap_id]
    wx.navigateTo({
      url: "../taskDetail/taskDetail?list_id=" + list_id + "&&task=" + JSON.stringify(taskDetail) + "&&arrayIndex=" + tap_id,
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
            await util.cloud_listTasksUpadte("lists", list_id, tasks)
            let unfinishedTaskAmount = that.data.list.unfinishedTaskAmount - 1
            await util.cloud_taskAmountUpadte("lists", list_id, unfinishedTaskAmount)

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
    })
  },

  //日历选择日期
  afterTapDay(e) {
    //console.log('点击日期 ', e.detail)
    var that = this
    let weekArray = ['周日', "周一", "周二", "周三", "周四", "周五", "周六", ]
    that.data.task.end_date = e.detail.year + "年" + e.detail.month + "月" + e.detail.day + "日 " + weekArray[e.detail.week]
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
    }
    that.setData({
      isShowPop: false,
      task: task,
      isTaskName:false,
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
   tapKeyboardConfirm()
   {
     var that = this
     if (that.data.task.title == "") {
       that.setData({
         isShowToast:true,
         isshowKeyboard:true,
       })
     }else
     {
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
        await util.cloud_listTasksUpadte("lists", list_id, tasks)
        let unfinishedTaskAmount = that.data.list.unfinishedTaskAmount + 1
        await util.cloud_taskAmountUpadte("lists", list_id, unfinishedTaskAmount)
        that.tapBackground()
        wx.hideLoading()
        that.getList()
      } catch (error) {
        console.log(error)
      }
    }
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
    task.list_id = list_id
    let data = {
      list_id: list_id,
      task: task
    }
    await util.cloud_function("taskUpdate", data)
    await util.cloud_taskAmountUpadte("lists", list_id, unfinishedTaskAmount)
    that.getList()
  },

  // 折叠展开
  expand_collapse() {
    var that = this
    that.setData({
      isExpand_collapse: true
    })
  },

  fold_collapse() {
    var that = this
    that.setData({
      isExpand_collapse: false
    })
  },

})