// pages/lists/lists.js
Page({

  data: {
    isExpand_collapse_1:true,
    isExpand_collapse_2:true,
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
  }
})