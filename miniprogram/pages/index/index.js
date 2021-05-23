//index.js
const app = getApp()

Page({
  data: {
    isShowPop:true,
    tasks:[
      {
        title:"电工作业",
        end_date:"5月30日",
        end_week:"周三",
        list:"学校作业"
      },
      {
        title:"微机报告",
        end_date:"5月22日",
        end_week:"周四",
        list:"学校作业"
      },
      {
        title:"物联网作业",
        end_date:"5月31日",
        end_week:"周二",
        list:"学校作业"
      },
    ]
  },

  tapAddTask()
  {
    this.setData({
      isShowPop:true
    })
  }

})
