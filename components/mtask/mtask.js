// components/mtask/mtask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "task":{
      "type":Object,
      "value":{
        content: "",
        type: 0,
        isDone: false,
        isToday: true,
        scheduledTime: null,
        visibility: 1,
      }
    },
    "text":{
      "type":String,
      "value":""
    },
    "finished":{
      "type":Boolean,
      "value":true
    },
    "hasdate":{
      "type":Boolean,
      "value":false
    },
    "isadd":{
      "type":Boolean,
      "value":true
    },
    "type":{
      "type":Number,
      "value":0
    },
    "groupid":{
      "type":Number,
      "value":0
    }
  },
  attached: function () {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.setData({
      date: `${year}-${month}-${day}`,
      mindate: `${year}-${month}-${day}`,
      text:this.data.task.content,
      finished:this.data.task.isDone,
      hasdate:this.data.task.scheduledTime!==null,
    });
    if(this.data.hasdate===true)
      {
        this.setData({
          date:this.data.task.scheduledTime.slice(0,10)
        })
      }
    if(this.data.type==1)
    {
      this.setData({
        'task.type':1
      })
    }
    else if(this.data.task.type==1)
    {
      this.setData({
        'task.type':1
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    date:'',
    mindate:'',
    EditorContext:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changehasdate(e){
      this.setData({
        hasdate:!this.data.hasdate
      })
      if(this.data.hasdate==true&this.data.task.scheduledTime==null)
        {this.setData({
          'task.scheduledTime':this.data.date+" 23:59:59"
        })}
      if(this.data.hasdate==false)
        {
          this.setData({
            'task.scheduledTime':null
          })
        }
      if(this.data.isadd==false)
      {
        this.triggerEvent('change',{task:this.data.task})
      }
    },
    delete(){
      let that=this
      wx.showModal({
        title: '删除',
        content: '您确定要删除此事项吗？',
        success: function(res) {
          if (res.confirm) {
            that.triggerEvent('delete',{task:that.data.task})
            // 在这里执行确认操作
          } else if (res.cancel) {
            console.log('用户点击取消');
            // 在这里执行取消操作
          }
        }
      });
    }
    ,
    changevisi(){
      this.setData({
        'task.visibility':this.data.task.visibility==0?1:0
      })
      if(this.data.isadd==false)
      {
        this.triggerEvent('change',{task:this.data.task})
      }
    },
    changetoday(){
      this.setData({
        'task.isToday':this.data.task.isToday==true?false:true
      })
      if(this.data.isadd==false)
      {
        this.triggerEvent('change',{task:this.data.task})
      }
    },
    tapFinish(){
             this.setData({
              finished:true,
              'task.isDone':true
            })
            if(this.data.isadd==false)
            {
                let that=this
                wx.getStorage({
                  key:'token',
                  success(res){
                    const token=res.data
                    wx.request({
                     url: getApp().globalData.apiUrl+'/today/blog',
                     method:"GET",
                     header: {
                       'Accept': '*/*',
                       'Content-Type': 'application/x-www-form-urlencoded',
                       'token':res.data
                     },
                     data:{
                     },
                     success(res){
                       if(res.data.success==false)
                       {
                        wx.request({
                          url: getApp().globalData.apiUrl+'/today/blog',
                          method:"POST",
                          header: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'token':token
                          },
                          data:{
                          },
                          success(res){
                            wx.request({
                              url: getApp().globalData.apiUrl+'/today/blog',
                              method:"GET",
                              header: {
                                'Accept': '*/*',
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'token':token
                              },
                              data:{
                              },
                              success(res){
                                wx.request({
                                  url: getApp().globalData.apiUrl+'/item/personal/blog',
                                  method:"POST",
                                  header: {
                                    'Accept': '*/*',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'token':token
                                  },
                                  data:{
                                    blogId:res.data.data.blog_today.id,
                                    itemId:that.task.data.id
                                  },
                                  success(res){
                                    
                                  }})
                              }})
                          }})
                       }
                       else{
                        wx.request({
                          url: getApp().globalData.apiUrl+'/today/blog',
                          method:"GET",
                          header: {
                            'Accept': '*/*',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token':token
                          },
                          data:{
                          },
                          success(res){
                            wx.request({
                              url: getApp().globalData.apiUrl+'/item/personal/blog',
                              method:"POST",
                              header: {
                                'Accept': '*/*',
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'token':token
                              },
                              data:{
                                blogId:res.data.data.blog_today.id,
                                itemId:that.data.task.id
                              },
                              success(res){
                                
                              }})
                          }})
                       }
                     }})
                  }})
              this.getTabBar().setData({
                showtab:true
              })
              this.triggerEvent('change',{task:this.data.task})
            }

    },
    tapCancel(){
      this.setData({
        finished:false,
        'task.isDone':false
      })
      if(this.data.isadd==false)
      {
        let that=this
              wx.getStorage({
                key:'token',
                success(res){
                   wx.request({
                    url: getApp().globalData.apiUrl+'/item/personal/blog',
                    method:"POST",
                    header: {
                      'Accept': '*/*',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'token':res.data
                    },
                    data:{
                      blogId:-1,
                      itemId:that.data.task.id
                    },
                    success(res){
                      console.log(res)
                    }})
                }})
        this.getTabBar().setData({
          showtab:true
        })
        this.triggerEvent('change',{task:this.data.task})
      }
    },
    input_name(e){
             this.setData({
              text:e.detail.value,
              'task.content':e.detail.value,
            })
            if(this.data.isadd==false)
      {
        this.triggerEvent('change',{task:this.data.task})
      }
    },
    onDateChange(e){ 
             this.setData({
              "date":e.detail.value,
              'task.scheduledTime':e.detail.value+" 23:59:59"
            })
            if(this.data.isadd==false)
      {
        this.triggerEvent('change',{task:this.data.task})
      }
    },
    insertimg(){
      let that =this
            wx.chooseMedia({
              count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
              const imagePath = res.tempFiles[0].tempFilePath;
              wx.getStorage({
                key:'token',
                success(res){
                  wx.uploadFile({
                    filePath: imagePath,
                    url: getApp().globalData.apiUrl+'/note/file/'+that.data.task.itemNote.id,
                    name:'files',
                    method:'POST',
                    header: {
                      'Accept': '*/*',
                      'Content-Type':'application/x-www-form-urlencoded',
                      'token':res.data
                    },
                    success(res){
                      let tmp=JSON.parse(res.data)
                      const path=tmp.data.urls
                      console.log(path)
                      that.data.EditorContext.insertImage({
                        src: getApp().globalData.apiUrl+path,
                        success: () => {
                          console.log('插入图片成功');
                        },
                        fail: (error) => {
                          console.error('插入图片失败：', error);
                        }
                    })  
                    }
                  })
                }})
              }})
    },
    blogready(e){
      let that=this
        this.createSelectorQuery().select('#bless').context(
          (res)=>{
            this.data.EditorContext=res.context
            this.data.EditorContext.setContents({
              html: that.data.task.itemNote.content ? that.data.task.itemNote.content : ' ',
              success: function (res) {
              console.log("渲染成功")
              that.data.EditorContext.blur()
              },
              fail: function (err) {
              console.log("渲染失败")
              }
              })
          }).exec()
    },
    bloginput(e){
      let that=this
      this.data.EditorContext.getContents({
        success: function (res) {
          console.log("获取成功")
          that.setData({
            'task.itemNote.content':res.html
          })
          if(that.data.isadd==false)
          {
            that.triggerEvent('change',{task:that.data.task})
          }
          },
          fail: function (err) {
          console.log("获取失败")
          }
        })
    },
    build(){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
          if(that.data.type==0)
         {wx.request({
           url: getApp().globalData.apiUrl+'/item/personal',
           method:"POST",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
             "content":that.data.task.content,
             "scheduledTime":that.data.task.scheduledTime,
             "isToday":that.data.task.isToday
           },
           success(res){
              console.log("创建成功")
              that.triggerEvent('build')
           }})}
           else{
            wx.request({
              url: getApp().globalData.apiUrl+'/item/group',
              method:"POST",
              header: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'token':res.data
              },
              data:{
                "content":that.data.task.content,
                "scheduledTime":that.data.task.scheduledTime,
                "isToday":that.data.task.isToday,
                "groupId":that.data.groupid,
                "type":"1"
              },
              success(res){
                 console.log("创建成功")
                 that.triggerEvent('build')
              }})
           }
        }})
    },
    hidemask(){
      this.triggerEvent('close')
    }
  }
})
