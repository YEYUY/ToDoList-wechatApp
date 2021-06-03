const db = wx.cloud.database()
const _ = db.command
var users_id
var util = require('../../utils/util.js')
Page({

  data: {
    isShowPop: false,
    user: {}
  },

  onLoad: function (options) {
    users_id = wx.getStorageSync('users_id')
    var that = this
    if(options.user)
    {
      let user = JSON.parse(options.user)
      that.setData({
        user:user
      })
    }
  },

  async getUser()
  {
    var that = this
    wx.showNavigationBarLoading()
    let res = await util.cloud_get("users",users_id)
    that.setData({
      user:res.data
    })
    wx.hideNavigationBarLoading()
  },

  inputName(e) {
    console.log(e)
    let name = e.detail.value
    if (name != "") {
      db.collection("users").doc(users_id).update({
        data: {
          name: name
        },
        success(res) {
          console.log("users中name更新", res)
        },
        fail(err) {
          console.log(err)
        }
      })
    }

  },

  changeName() {
    this.setData({
      isShowPop: true
    })
  },

  changeAvatar() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '头像上传中',
        })
        const tempFilePaths = res.tempFilePaths[0]
        let random_data = Math.random()
        wx.cloud.uploadFile({
          cloudPath: that.data.user.name + "-" + random_data + ".png", //文件名称
          filePath: tempFilePaths, // 文件路径
          success: res => {
            db.collection("users").doc(users_id).update({
              data: {
                avatarUrl: res.fileID
              },
              success(res) {
                wx.hideLoading()
                console.log("users中avatarUrl更新", res)
                that.getUser()
              },
              fail(err) {
                wx.hideLoading()
                console.log(err)
              }
            })
          },
          fail: err => {
            console.log(err)
            wx.hideLoading()
          }
        })
      }
    })

  },
})