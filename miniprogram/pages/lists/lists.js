const util = require("../../utils/util")

// pages/lists/lists.js
Page({

  data: {
    isExpand_collapse_1:true,
    isExpand_collapse_2:true,
    isShowCreatPop:true,
    iShowKeyboard:false,
    isListName:false,
    listName:"",
    totalTasks_amount:10,
    todayTasks_amount:4,
    myLists_amount:3,
    self_lists:[
      {
        name:"物联网导论",
        amount:6
      },
      {
        name:"企业项目",
        amount:4
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 折叠展开
  expand_collapse(e)
  {
    var that = this
    if(e.currentTarget.id=="1")
    {
      that.setData({
        isExpand_collapse_1:true
      })
    }else if(e.currentTarget.id=="2")
    {
      that.setData({
        isExpand_collapse_2:true
      })
    }
    
  },
 //折叠面板折叠
  fold_collapse(e)
  {
    var that = this
    if(e.currentTarget.id=="1")
    {
      that.setData({
        isExpand_collapse_1:false
      })
    }else if(e.currentTarget.id=="2")
    {
      that.setData({
        isExpand_collapse_2:false
      })
    }
  },

  //点击全部事项
  tapAllTasks()
  {
    wx.switchTab({
      url:'../index/index',
    })
  },

  //点击我的一天
  tapMyToday()
  {
    wx.switchTab({
      url:'../index/index',
    })
  },

  //点击创建清单
  tapCreatList()
  {
    var that = this
    // wx.navigateTo({
    //   url: '../myListDetail/myListDetail',
    // })
    wx.hideTabBar()
    that.setData({
      isShowCreatPop:true,
      iShowKeyboard: true
    })
  },

  //点击加入清单
  tapJoinList()
  {

  },

  //点击我的清单中某一项
  tapMyLists(e)
  {
    console.log(e)
    var that = this
    let tap_id = e.currentTarget.id*1
  },

  //点击加入的清单中某一项
  tapMyJoinLists(e)
  {
    console.log(e)
    var that = this
    let tap_id = e.currentTarget.id*1
  },

  //点击弹出窗的取消
  pop_cancel()
  {
    var that = this
    wx.showTabBar()
    that.setData({
      isShowCreatPop:false,
      iShowKeyboard:false
    })
  },

  //输入清单名称
  input_listName(e)
  {
    console.log(e)
    var that = this
    let listName = e.detail.value
    that.data.listName=listName
    if(listName=="")
    {
      that.setData({
        isListName:false
      })
    }else if(that.data.isListName==false)
    {
      that.setData({
        isListName:true
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
  async pop_confirm()
  {
    var that = this
    let isListName = that.data.isListName
    if(isListName)
    {
      let data = {
        name:that.data.listName
      }
      try {
        let res = await util.cloud_add("lists",data)
        wx.navigateTo({
          url: '../myListDetail/myListDetail?_id='+res._id,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }


})