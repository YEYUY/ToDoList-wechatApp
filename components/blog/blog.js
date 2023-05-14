// components/blog/blog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "blog":{
      type:Object,
      value:null
    },
    "index":{
      type:Number,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showmask:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    delete(){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/blog/'+that.data.blog.id,
           method:"DELETE",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/x-www-form-urlencoded',
             'token':res.data
           },
           data:{
              "blog_id":that.data.blog.id,
           },
           success(res){
             that.setData({
               showmask:false
             })
             that.triggerEvent('deleteblog',{index:that.data.index})
           }})
        }
      })
    },
    showmask(){
      this.setData({
        showmask:true
      })
    },
    hidemask(){
      this.setData({
        showmask:false
      })
    },
    input_name(e){
      this.setData({
        "blog.header":e.detail.value
      })
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/blog',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
              "id":that.data.blog.id,
              "header":e.detail.value
           },
           success(res){
           }})
        }
      })
    },
  
    input_descr(e){
      let that=this
      wx.getStorage({
        key:'token',
        success(res){
         wx.request({
           url: getApp().globalData.apiUrl+'/blog',
           method:"PUT",
           header: {
             'Accept': '*/*',
             'Content-Type': 'application/json',
             'token':res.data
           },
           data:{
              "id":that.data.blog.id,
              "description":e.detail.value
           },
           success(res){
           }})
        }
      })
    }
  }
})
