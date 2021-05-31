const db = wx.cloud.database()
const _ = db.command
var users_id = wx.getStorageSync('users_id')
var util = require('../../utils/util.js')

Page({

  data: {
    default_avatarUrl:"../../resource/avatar.jpg",
    user:{}
  },

  onLoad: function (options) {

  },

  onShow: async function () {
    var that = this
    wx.showNavigationBarLoading()
    let res = await util.cloud_get("users",users_id)
    that.setData({
      user:res.data
    })
    wx.hideNavigationBarLoading()
  },

  tapFeedback()
  {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },

  tapInformation()
  {
    var that = this
    wx.navigateTo({
      url: '../information/information?user='+JSON.stringify(that.data.user),
    })
  },

  tapAbout()
  {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  tapSet()
  {
    wx.navigateTo({
      url: '../set/set',
    })
  },

  onShareAppMessage: function () {

  }
})