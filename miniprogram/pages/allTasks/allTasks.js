const db = wx.cloud.database()
var util = require('../../utils/util.js')
const app = getApp()

var users_id


Page({


  data: {
    user:{},
  },


  onLoad: function (options) {
    users_id = wx.getStorageSync('users_id')
    this.getUsers()
  },

    //获取列表 -调用
    async getUsers() {
      wx.showNavigationBarLoading()
      var that = this
      let res = await util.cloud_get("users",users_id)
      that.setData({
        user:res.data
      })
      var tasks
      for(var i = 0; i<res.data.myCreatLists.length;i++)
      {

      }
      for(var i = 0; i<res.data.myJoinLists.length;i++)
      {

      }

      wx.hideNavigationBarLoading()
    },

})