const db = wx.cloud.database()
const _ = db.command
var util = require('../../utils/util.js')

var list_id

Page({

  data: {
    isShowPopup: false,
    remind: "提醒",
    picture: "添加图片",
    file: "添加文件",
    choose_end_date: "",
    show_time: "", //底下展示时间
    task: {
      title: "小测试",
      content: "none",
      end_date: "5-25 星期四"
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
    // console.log("op",options)
    list_id = options.list_id
    if (options.task) {
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

  // getTask() {
  //   var that = this
  //   wx.showNavigationBarLoading()
  //   wx.hideNavigationBarLoading()
  //   db.collection('test_list').doc(that.data.task._id).get({
  //     success: function (res) {
  //       that.setData({
  //         task: res.data
  //       })
  //       wx.hideNavigationBarLoading()
  //       that.checkShow_time()
  //       console.log(res.data)
  //     },
  //     fail(res) {
  //       console.log("fail", res)
  //       wx.hideNavigationBarLoading()
  //     }
  //   })
  // },

  //点击日期

  tapEnd_date() {
    var that = this
    that.setData({
      isShowPopup: true
    })
  },

  async update_task(task)
  {
    var that = this
    let data = {
      list_id: list_id,
      task: task
    }
    try {
      await util.cloud_function("taskUpdate", data)
      that.setData({
        task:task
      })
    } catch (error) {
      console.log(error)
    }
  },

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
            // db.collection("test_list").doc(task_id).update({
            //   data: {
            //     file: _.push(data)
            //   },
            //   success(res) {
            //     wx.hideNavigationBarLoading()
            //     wx.hideLoading()
            //     that.getTask()
            //     console.log("文件添加成功")
            //     // let file = that.data.task.file
            //     // file.push(data)
            //     // that.setData({
            //     //   'task.file':file
            //     // })
            //   },
            //   fail(err) {
            //     console.log(err)
            //     wx.hideNavigationBarLoading()
            //     wx.hideLoading()
            //   }
            // })
          },
          fail: err => {
            console.log(err)
            wx.hideNavigationBarLoading()
            wx.hideLoading()
            // handle error
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
        // that.cloud_uploadFile(tempFilePaths, "picture", "png")
        let random_data = Math.random()
        wx.cloud.uploadFile({
          cloudPath: that.data.task.title + "-" + random_data + ".png", //文件名称
          filePath: tempFilePaths, // 文件路径
          success: res => {
            console.log("上传返回", res)
           // let data = res.fileID
            var task = that.data.task
            task.pictures.push(res.fileID)
            // db.collection("test_list").doc(task_id).update({
            //   data: {
            //     picture: _.push(data)
            //   },
            //   success(res) {
            //     console.log("图片添加成功")
            //     that.getTask()
            //     //   let picture = that.data.task.picture
            //     //   picture.push(data)
            //     //   console.log(picture)
            //     //   that.setData({
            //     //     'task.picture':picture
            //     //   })
            //   },
            //   fail(err) {
            //     console.log(err)
            //   }
            // })
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
        task.isFinished= 1,
        task.finished_time= finished_time
      util.playAudio()
    } else {
      task.isFinished= 0
    }
    wx.vibrateShort({
      type: "heavy"
    }) //手机振动15ms
    that.update_task(task)
  },

  // //上传文件
  // cloud_uploadFile(tempFilePaths, type, file_type) {
  //   var that = this
  //   wx.cloud.uploadFile({
  //     cloudPath: that.data.task.title + "." + file_type, //文件名称
  //     filePath: tempFilePaths, // 文件路径
  //     success: res => {
  //       console.log("上传返回", res)
  //       let data
  //       if (type == "picture") {
  //         data = res.fileID
  //         db.collection("test_list").doc(task_id).update({
  //           data: {
  //             picture: _.push(data)
  //           },
  //           success(res) {
  //             console.log("图片添加成功")
  //           },
  //           fail(err) {
  //             console.log(err)
  //           }
  //         })
  //       } else {
  //         data = {
  //           fileID: res.fileID,
  //           files_name: file_type
  //         }
  //         db.collection("test_list").doc(task_id).update({
  //           data: {
  //             file: _.push(data)
  //           },
  //           success(res) {
  //             console.log("文件添加成功")
  //           },
  //           fail(err) {
  //             console.log(err)
  //           }
  //         })
  //       }
  //     },
  //     fail: err => {
  //       console.log(err)
  //       // handle error
  //     }
  //   })
  // },


  //点击文件
  tapFile(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let file_id = that.data.task.file[tap_id].fileID
    util.show_loading("打开文件中")
    wx.cloud.downloadFile({
      fileID: file_id, // 文件 ID
      success: function (res) {
        //console.log("请求文件返回 ", res)
        var filePath = res.tempFilePath; // 小程序中文件的临时文件
        wx.openDocument({
          filePath: filePath,
          // 文档打开格式记得写上，否则可能不能打开文档。 文档类型只能是一个
          // 若是想打开多种类型的文档，可以解析文档地址中的文档格式，动态复制到fileTpye参数
          // fileType: 'docx', 
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
    db.collection("test_list").doc(task_id).update({
      data: {
        content: e.detail.value
      },
      success(res) {
        console.log("内容已修改成功：", e.detail.value)
      }
    })
  },

  //点击删除
  async tapDelete() {
    wx.showModal({
      content: "确定删除该任务吗?",
      async success(res) {
        if (res.confirm) {
          wx.showLoading()
          try {
            await util.cloud_remove("test_list", task_id, getApp().globalData.openid)
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


  //日历选择日期
  afterTapDay(e) {
    console.log('点击日期 ', e.detail)
    var that = this
    let weekArray = ['周日', "周一", "周二", "周三", "周四", "周五", "周六", ]
    that.data.choose_end_date = e.detail.month + "-" + e.detail.day + " " + weekArray[e.detail.week]
  },


  //点击日历的确定
  confirmDate() {
    var that = this

    db.collection("test_list").doc(task_id).update({
      data: {
        end_date: that.data.choose_end_date
      },
      success(res) {
        console.log("日期已修改成功：", that.data.choose_end_date)
        that.setData({
          'task.end_date': that.data.choose_end_date,
          isShowPopup: false,
        })
      }
    })
  },

  //点击日历的取消
  cancel() {
    this.setData({
      isShowPopup: false
    })
  }

})