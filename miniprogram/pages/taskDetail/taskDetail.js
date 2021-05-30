const db = wx.cloud.database()
const _ = db.command
var util = require('../../utils/util.js')

var list_id
var arrayIndex

Page({

  data: {
    isShowPopup: false,
    remind: "提醒",
    picture: "添加图片",
    file: "添加文件",
    choose_end_date: "",
    show_time: "", //底下展示时间
    task: {
      title: "",
      content: "",
      end_date: ""
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

  onLoad: function (options) {
    var that = this
    //console.log("op", options)
    if (options.task) {
      list_id = options.list_id
      arrayIndex = options.arrayIndex
      var task = JSON.parse(options.task)
      that.setData({
        task: task
      })
      that.checkShow_time()
      console.log("接收任务", task)
    }
  },

  checkShow_time() {
    var that = this
    let task = that.data.task
    let now_date = util.changeDate(new Date())
    let show_time = task.creat_time.substr(0, 11)
    if (task.isFinished == 1) {
      show_time = task.finished_time.substr(0, 11)
    }
    if (now_date.substr(0, 3) == show_time.substr(0, 3)) {
      that.setData({
        show_time: show_time.substr(5)
      })
    }
  },

  //点击日期
  tapEnd_date() {
    var that = this
    that.setData({
      isShowPopup: true
    })
  },

  async update_task(task) {
    var that = this
    let data = {
      list_id: list_id,
      task: task
    }
    try {
      await util.cloud_function("taskUpdate", data)
      that.setData({
        task: task
      })
    } catch (error) {
      console.log(error)
    }
  },

  //修改任务标题
  input_title(e) {
    console.log(e)
    var that = this
    var task = that.data.task
    task.title = e.detail.value
    that.update_task(task)
  },

  //点击添加文件
  tapAddFile() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("文件 ", res)
        let tempFilePaths = res.tempFiles[0]
        //that.cloud_uploadFile(tempFilePaths.path, "file", tempFilePaths.name)

        util.show_loading("上传文件中")
        wx.showNavigationBarLoading()

        wx.cloud.uploadFile({
          cloudPath: that.data.task.title + "-" + tempFilePaths.name, //文件名称
          filePath: tempFilePaths.path, // 文件路径
          success: res => {
            console.log("上传返回", res)
            let file = {
              fileID: res.fileID,
              file_name: tempFilePaths.name
            }
            var task = that.data.task
            task.files.push(file)
            that.update_task(task)
            wx.hideNavigationBarLoading()
            wx.hideLoading()
          },
          fail: err => {
            console.log(err)
            wx.hideNavigationBarLoading()
            wx.hideLoading()
          }
        })
      }
    })
  },

  //添加图片
  tapPicture() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("图片 ", res)
        const tempFilePaths = res.tempFilePaths[0]
        let random_data = Math.random()
        wx.cloud.uploadFile({
          cloudPath: that.data.task.title + "-" + random_data + ".png", //文件名称
          filePath: tempFilePaths, // 文件路径
          success: res => {
            console.log("上传返回", res)
            // let data = res.fileID
            var task = that.data.task
            task.pictures.push(res.fileID)
            that.update_task(task)
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },

  //点击⚪完成
  tapFinish() {
    var that = this
    var task = that.data.task
    let finished_time = util.changeDate(new Date())
    if (task.isFinished == 0) {
      task.isFinished = 1,
        task.finished_time = finished_time
      util.playAudio()
    } else {
      task.isFinished = 0
    }
    wx.vibrateShort({
      type: "heavy"
    })
    that.update_task(task)
  },

  //点击文件
  tapFile(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let file_id = that.data.task.files[tap_id].fileID
    util.show_loading("打开文件中")
    wx.cloud.downloadFile({
      fileID: file_id, // 文件 ID
      success: function (res) {
        var filePath = res.tempFilePath; // 小程序中文件的临时文件
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: "加载成功",
              duration: 100
            })
          },
          fail: (res) => {
            wx.hideLoading()
            wx.showModal({
              title: "打开失败",
              content: res.errMsg,
              showCancel: false
            })
          }
        })
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: "打开失败",
          content: "打开失败",
          showCancel: false
        })
        console.log(res)
      }
    })

  },

  //输入内容
  input_content(e) {
    var that = this
    var task = that.data.task
    task.content = e.detail.value
    that.update_task(task)
  },

  //点击删除
  async tapDelete() {
    wx.showModal({
      content: "确定删除该任务吗?",
      async success(res) {
        if (res.confirm) {
          wx.showLoading()
          let res = await util.cloud_get("lists", list_id)
          let tasks = res.data.tasks
          console.log("删除前：", tasks)
          tasks.splice(arrayIndex, 1)
          console.log("删除后：", tasks)
          await util.cloud_listTasksUpadte("lists",list_id,tasks)
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })

  },

  //日历选择日期
  afterTapDay(e) {
    console.log('点击日期 ', e.detail)
    var that = this
    let weekArray = ['周日', "周一", "周二", "周三", "周四", "周五", "周六", ]
    that.data.choose_end_date = e.detail.year + "年" + e.detail.month + "月" + e.detail.day + "日 " + weekArray[e.detail.week]
  },

  //点击日历的确定
  confirmDate() {
    var that = this
    var task = that.data.task
    task.end_date = that.data.choose_end_date
    that.update_task(task)
    that.cancel()
  },

  //点击日历的取消
  cancel() {
    this.setData({
      isShowPopup: false
    })
  }

})