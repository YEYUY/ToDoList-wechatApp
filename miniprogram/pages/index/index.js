var util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    isShowPop: false,
    isShowCalendar: false,
    isshowKeyboard: false,
    isCloseSlide: false,
    chooseDate: "今天",
    title: "",
    tasks: [{
        title: "电工作业",
        end_date: "5月30日",
        end_week: "周三",
        list: "学校作业"
      },
      {
        title: "微机报告",
        end_date: "5月22日",
        end_week: "周四",
        list: "学校作业"
      },
      {
        title: "物联网作业",
        end_date: "5月31日",
        end_week: "周二",
        list: "学校作业"
      },
    ]
  },

  tapTask() {
    var that = this
    that.setData({
      isCloseSlide: true
    })
  },

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

  tapDelete() {
    var that = this
  },

  tapChooseDate() {
    wx.hideKeyboard()
    this.setData({
      isShowCalendar: true,
    })
  },

  chooseDate(e) {
    var that = this
    var date = util.getDate(new Date(e.detail))
    that.setData({
      chooseDate: date
    })
  },

  tapBackground() {
    wx.hideKeyboard({
      success: (res) => {
        var that = this
        that.setData({
          isShowPop: false,
          isshowKeyboard: false,
        })
      },
    })
    wx.showTabBar()
  },

  input_text(e) {
    var that = this
    that.data.title = e.detail.value
  },

  submit() {
    var that = this
    if (that.data.title != "") {
      wx.hideKeyboard()
      that.setData({
        isShowPop: false,
        isshowKeyboard: false,
      })
      wx.showTabBar()
    }

  }

})