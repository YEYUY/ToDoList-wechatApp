const db = wx.cloud.database()
const _ = db.command
var users_id
var util = require('../../utils/util.js')

Page({

  data: {
    user: {
      switch: {
        audio: true,
        touch: true,
      }
    }
  },

  onShow: async function () {
    var that = this
    users_id = wx.getStorageSync('users_id')
    wx.showNavigationBarLoading()
    let res = await util.cloud_get("users", users_id)
    that.setData({
      user: res.data
    })
    wx.hideNavigationBarLoading()
  },

  onChange(e) {
    console.log(e)
    var that = this
    var switch_ = that.data.user.switch
    if (e.currentTarget.id == "audio") {
      switch_.audio = !switch_.audio
    } else {
      switch_.touch = !switch_.touch
    }
    that.setData({
      'user.switch': switch_
    })
    db.collection("users").doc(users_id).update({
      data: {
        switch: switch_
      },
      success(res) {
        console.log("users中switch更新", res)
      },
      fail(err) {
        console.log(err)
      }
    })
  }

})