// components/task.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "task":{
      "type":Object,
      "value":null,
      observer(newval,oldval){
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
      "value":true
    },
    "index":{
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
  },
  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    date:'',
    mindate:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapFinish(){
      //上传数据
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
          const token=res.data
         wx.request({
           url: getApp().globalData.apiUrl+'/item/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
             "id":that.data.task.id,
             "groupId":that.data.groupid,
             "isDone":true
           },
           success(res){
             console.log(res)
             that.setData({
              finished:true
            })
              that.triggerEvent('finishchanged',{index:that.data.index})
           }})
        }})
    },
    tapCancel(){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/item/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
             "id":that.data.task.id,
             "groupId":that.data.groupid,
             "isDone":false
           },
           success(res){
             //console.log(res)
             that.setData({
              finished:true
            })
              that.triggerEvent('finishchanged',{index:that.data.index})
           }})
        }})
      //上传数据
    },
    input_name(e){
      //上传数据
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/item/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
             "id":that.data.task.id,
             "content":e.detail.value,
             "groupId":that.data.groupid
           },
           success(res){
             console.log(res)
             that.setData({
              text:e.detail.value,
              'task.content':e.detail.value,
            })
              that.triggerEvent('changed',{index:that.data.index,task:that.data.task})
           }})
        }})
    },
    onDateChange(e){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/item/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
             "id":that.data.task.id,
             "scheduledTime":e.detail.value+" 23:59:59",
             "groupId":that.data.groupid
           },
           success(res){
             that.setData({
              "date":e.detail.value,
              'task.scheduledTime':e.detail.value+" 23:59:59"
            })
            that.triggerEvent('changed',{index:that.data.index,task:that.data.task})
           }})
        }})
      this.getTabBar().setData({
        showtab:true
      })
      //上传数据
    },
    showdate(){
      this.getTabBar().setData({
        showtab:false
      })
    },
    showmask(){
      this.setData({
        show:true
      })
      this.getTabBar().setData({
        showtab:false
      })
    },
    hidemask(){
      this.setData({
        show:false
      })
      this.getTabBar().setData({
        showtab:true
      })
      //上传数据
    },
    maskdelete(e){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/item/group/'+e.detail.task.id,
           method:"DELETE",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/x-www-form-urlencoded',
             'token':res.data
           },
           data:{
             "item_id":e.detail.task.id,
           },
           success(res){
             console.log(res)
            that.triggerEvent('deleted',{index:that.data.index})
            that.setData({
              show:false
            })
           }})
        }})
    }
    ,
    maskchange(e){
      this.setData({
        task:e.detail.task,
        text:e.detail.task.content,
        finished:e.detail.task.isDone,
        hasdate:e.detail.task.scheduledTime==null?false:true
      })
      if(this.data.hasdate===true)
      {
        this.setData({
          date:this.data.task.scheduledTime.slice(0,10)
        })
      }
      console.log(this.data.task)
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/item/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
             "content":that.data.task.content,
             "id":that.data.task.id,
              "isDone": that.data.task.isDone,
              "scheduledTime": that.data.task.scheduledTime==null?"0001-01-01 00:00:00":that.data.task.scheduledTime,
              "tag": that.data.task.tag,
              "isToday":that.data.task.isToday,
              "groupId":that.data.groupid
           },
           success(res){
             console.log(res)
             console.log("修改事项成功")
           }})
           ,
           wx.request({
            url: getApp().globalData.apiUrl+'/note',
            method:"PUT",
            header: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              'token':res.data
            },
            data:{
              "id":that.data.task.itemNote.id,
              "itemId":that.data.task.id,
              "content":that.data.task.itemNote.content
            },
            success(res){
              console.log("修改内容成功")
            }})
        
        }})
    }
  }
})
