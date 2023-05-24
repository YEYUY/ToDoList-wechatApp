// components/group/group.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    group:{
      type:Object,
      value:null
    },
    index:{
      type:Number,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    alllist:[],
    showmask:false,
    hide:true,
    show:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    add(){
      this.setData({
        show:true
      })
    },
    showpassword(){
      this.setData({
        hide:false
      })
    },
    hidepassword(){
      this.setData({
        hide:true
      })
    },
    showmask(){
      let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/item/group/'+that.data.group.id,
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
          "groupId":that.data.group.id
         },
         success(res){
           that.setData({
            alllist:res.data.data.group_item_all,
            showmask:true
           })
           that.getTabBar().setData({
            showtab:false
          })
         }})
      }
    })
    },
    hidemask(){
      this.setData({
        showmask:false
      })
      this.getTabBar().setData({
        showtab:true
      })
    },
    input_name(e){
      this.setData({
        "group.groupName":e.detail.value
      })
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
              "id":that.data.group.id,
              "groupName":e.detail.value
           },
           success(res){
           }})
        }
      })
    },
    input_password(e){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/group',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
              "id":that.data.group.id,
              "password":e.detail.value
           },
           success(res){
             console.res
           }})
        }
      })
    },
    deletegroup(){
      let that=this
      wx.showModal({
        title: '删除',
        content: '您确定要退出此群组吗？',
        success: function(res) {
          if (res.confirm) {
            wx.getStorage({
              key:'token',
              success(res){
               wx.request({
                 url: getApp().globalData.apiUrl+'/group/withdraw/'+that.data.group.id,
                 method:"POST",
                 header: {
                   'Accept': '*/*',
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'token':res.data
                 },
                 data:{
                    "group_id":that.data.group.id,
                    "password":that.data.group.password
                 },
                 success(res){
                   console.log(res)
                   that.setData({
                     showmask:false
                   })
                   that.triggerEvent('deletegroup',{index:that.data.index})
                   that.getTabBar().setData({
                    showtab:true
                  })
                 }})
              }
            })
            // 在这里执行确认操作
          } else if (res.cancel) {
            console.log('用户点击取消');
            // 在这里执行取消操作
          }
        }
      });
    },
    finishchange(e){
      const index = e.detail.index;
      const key = `alllist[${index}].isDone`;
      this.setData({
        [key]: !this.data.alllist[index].isDone,
      });
    },
    change(e){
      const index = e.detail.index;
      const task = e.detail.task;
      const key = `alllist[${index}]`;
      this.setData({
        [key]: task
      });
    },
    delete(e){
      const index = e.detail.index;
      const key = this.data.alllist;
      key.splice(index,1)
      this.setData({
        alllist: key
      });
      this.getTabBar().setData({
        showtab:true
      })
    },
    pushback(){
      let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/item/group/'+that.data.group.id,
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
          "groupId":that.data.group.id
         },
         success(res){
           that.setData({
            alllist:res.data.data.group_item_all,
            show:false
           })
           that.getTabBar().setData({
            showtab:false
          })
         }})
      }
    })
    }
  }
})
