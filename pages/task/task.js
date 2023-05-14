// pages/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    mindate:'',
    showtask:false,
    showblog:false,
    alltask:null,
    allblog:null,
    allgroup:null,
    showcrgrp:false,
    groupname:"",
    groupsecret:"",
    id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData1()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.getData1()
},
  getData1(){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/group/my/page',
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
           "pageSize":100
         },
         success(res){
           //that.setData({
            //alltask:res.data.data.personal_item_today
           //})
            that.setData({
            allgroup:res.data.data.group_page.records
            })
         }})
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  inputname(e){
    this.setData({
      groupname:e.detail.value
    })
  },
  inputpassward(e){
    this.setData({
      groupsecret:e.detail.value
    })
  },
  inputid(e){
    this.setData({
      id:e.detail.value
    })
  },
  creategroup(){
    this.setData({
      showcrgrp:true
    })
    this.getTabBar().setData({
      showtab:false
    })
  },
  joingroup(){
    this.setData({
      showjogrp:true
    })
    this.getTabBar().setData({
      showtab:false
    })
  },
  joingroup1(){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/group/join/'+that.data.id,
         method:"POST",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
          "group_id": that.data.id,
          "password": that.data.groupsecret
         },
         success(res){
           console.log(res)
           if(res.data.success==false)
           {
            wx.showToast({
              title: res.data.message,
              icon:"error"
            })
           }
           else if(res.statusCode==404){
            wx.showToast({
              title: "不存在该小组",
              icon:"error"
            })
           }
           else{
            wx.showToast({
              title: "加入小组成功",
              icon:"success"
            })
           }
            that.getData1()
            that.setData({
              groupname:"",
              groupsecret:"",
              groupid:"",
              showjogrp:false,
            })
            that.getTabBar().setData({
              showtab:true
            })
         }})
      }
    })
  },
  buildgroup(e){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/group',
         method:"POST",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/json',
           'token':res.data
         },
         data:{
          "groupName": that.data.groupname,
          "password": that.data.groupsecret
         },
         success(res){
          if(res.data.success==false)
          {
           wx.showToast({
             title: res.data.message,
             icon:"error"
           })
          }
          else{
           wx.showToast({
             title: "创建小组成功",
             icon:"success"
           })
          }
            that.getData1()
            that.setData({
              groupname:"",
              groupsecret:"",
              showcrgrp:false,
            })
            that.getTabBar().setData({
              showtab:true
            })
         }})
      }
    })
  },
  cancel(){
    this.setData({
      showcrgrp:false,
      showjogrp:false,
      groupname:"",
      groupsecret:"",
    })
    this.getTabBar().setData({
      showtab:true
    })
  },
  showalltask(){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/item/personal/my/page',
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
           "pageSize":100
         },
         success(res){
           console.log(res)
           //that.setData({
            //alltask:res.data.data.personal_item_today
           //})
            that.setData({
            showtask:true,
            alltask:res.data.data.personal_item_page.records
            })
            that.getTabBar().setData({
              showtab:false
            })
         }})
      }
    })
  },
  finishchange(e){
    const index = e.detail.index;
    const key = `alltask[${index}].isDone`;
    this.setData({
      [key]: !this.data.alltask[index].isDone,
    });
  },
  change(e){
    const index = e.detail.index;
    const task = e.detail.task;
    const key = `alltask[${index}]`;
    this.setData({
      [key]: task
    });
  },
  delete(e){
    const index = e.detail.index;
    const task = e.detail.task;
    const key = this.data.alltask;
    key.splice(index,1)
    this.setData({
      alltask: key
    });
    this.getTabBar().setData({
      showtab:true
    })
  },
  deleteblog(e){
    const index = e.detail.index;
    const key = this.data.allblog;
    key.splice(index,1)
    this.setData({
      allblog: key
    });
  },
  deletegroup(e){
    const index = e.detail.index;
    const key = this.data.allgroup;
    key.splice(index,1)
    this.setData({
      allgroup: key
    });
  },
  hidetaskmask(){
    this.setData({
      showtask:false
      })
    this.getTabBar().setData({
      showtab:true
    })
  },
  showallblog(){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/blog/my/page',
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
           "pageSize":100
         },
         success(res){
           console.log(res)
           //that.setData({
            //alltask:res.data.data.personal_item_today
           //})
            that.setData({
            showblog:true,
            allblog:res.data.data.blog_page.records
            })
            that.getTabBar().setData({
              showtab:false
            })
         }})
      }
    })
  },
  hideblogmask(){
    this.setData({
      showblog:false
      })
    this.getTabBar().setData({
        showtab:true
      })
  },
})