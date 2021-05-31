const util = require("../../utils/util")
const db = wx.cloud.database()
const _ = db.command
var users_id = wx.getStorageSync('users_id')

Page({

  data: {
    isExpand_collapse_1: true,
    isExpand_collapse_2: true,
    isShowCreatPop: false,
    isShowJoinPop:false,
    isListName: false,
    listName: "",
    user:{},
    allTaskAmount:0,
  },

  onLoad: function (options) {

  },

  onShow()
  {
    this.tapBackground()
    this.getUsers()
  },

  onPullDownRefresh()
  {
    this.onShow()
    wx.stopPullDownRefresh()
  },

  //获取列表 -调用
  async getUsers() {
    wx.showNavigationBarLoading()
    var that = this
    let res = await util.cloud_get("users",users_id)
    that.setData({
      user:res.data
    })
    let allTaskAmount = 0
    for(var i = 0; i<res.data.myCreatLists.length;i++)
    {
      allTaskAmount+=res.data.myCreatLists[i].unfinishedTaskAmount
    }
    for(var i = 0; i<res.data.myJoinLists.length;i++)
    {
      allTaskAmount+=res.data.myJoinLists[i].unfinishedTaskAmount
    }
    that.setData({
      allTaskAmount:allTaskAmount
    })

    db.collection("users").doc(users_id).update({
      data: {
        allTaskAmount: allTaskAmount
      },
      success(res) {
        console.log("users中allTaskAmount更新", res)
      },
      fail(err) {
       console.log(err)
      }
    })

    wx.hideNavigationBarLoading()
  },

  // 折叠展开
  expand_collapse(e) {
    var that = this
    if (e.currentTarget.id == "1") {
      that.setData({
        isExpand_collapse_1: true
      })
    } else if (e.currentTarget.id == "2") {
      that.setData({
        isExpand_collapse_2: true
      })
    }

  },
  //折叠面板折叠
  fold_collapse(e) {
    var that = this
    if (e.currentTarget.id == "1") {
      that.setData({
        isExpand_collapse_1: false
      })
    } else if (e.currentTarget.id == "2") {
      that.setData({
        isExpand_collapse_2: false
      })
    }
  },

  //点击全部事项
  tapAllTasks() {
    wx.navigateTo({
      url: '../allTasks/allTasks',
    })
  },

  //点击我的一天
  tapMyToday() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  //点击创建清单
  tapCreatList() {
    var that = this
    wx.hideTabBar()
    that.setData({
      isShowCreatPop: true,
    })
  },

  //点击加入清单
  tapJoinList() {
    this.setData({
      isShowJoinPop:true
    })
  },

  //点击我的清单中某一项
  tapMyLists(e) {
    var that = this
    let tap_id = e.currentTarget.id * 1
    let tap_task = that.data.user.myCreatLists[tap_id]
    wx.navigateTo({
      url: '../myListDetail/myListDetail?list_id='+tap_task.list_id,
    })
  },

  //点击加入的清单中某一项
  tapMyJoinLists(e) {
    console.log(e)
    var that = this
    let tap_id = e.currentTarget.id * 1
  },

  //点击弹出窗的取消
  pop_cancel() {
    var that = this
    wx.showTabBar()
    that.setData({
      isShowCreatPop: false,
    })
  },

  //输入清单名称
  input_listName(e) {
    var that = this
    let listName = e.detail.value
    that.data.listName = listName
    if (listName == "") {
      that.setData({
        isListName: false
      })
    } else if (that.data.isListName == false) {
      that.setData({
        isListName: true
      })
    }
  },

  //点击背景
  tapBackground() {
    var that = this
    wx.hideKeyboard()
    that.setData({
      isShowCreatPop: false,
    })
    wx.showTabBar()
  },

  //点击确定
  async pop_confirm() {
    var that = this
    let isListName = that.data.isListName
    if (isListName) {
      let data = {
        name: that.data.listName,
        unfinishedTaskAmount:0,
        tasks: [],
      }
      try {
        let res = await util.cloud_add("lists", data)
        let data2 = {
          list_name: that.data.listName,
          list_id: res._id,
          creat_timeStampKey:new Date().getTime(),
          unfinishedTaskAmount:0,
        }
        that.cloud_pushMyCreatList(data2)
        wx.navigateTo({
          url: '../myListDetail/myListDetail?list_id=' + res._id,
        })
      } catch (error) {
        console.log(error)
      }
    }
  },

  //创建清单的user集合增加
  cloud_pushMyCreatList(data) {
    users_id = wx.getStorageSync('users_id')
    // console.log("user_id", users_id)
    // console.log("添加users清单", data)
    db.collection("users").doc(users_id).update({
      data: {
        myCreatLists: _.push(data)
      },
      success(res) {
        wx.hideLoading()
        console.log("users清单添加成功")
      },
      fail(err) {
        console.log(err)
        wx.hideLoading()
      }
    })
  }



})