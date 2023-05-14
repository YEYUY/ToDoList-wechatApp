// pages/today/today.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alllist:[],
    date:'',
    hours:'',
    show:false,
    // task:{
    //   "content": "",
    //   "createTime": "",
    //   "finishTime": "",
    //   "id": 0,
    //   "isDone": true,
    //   "scheduledTime": "",
    //   "tag": "",
    //   "type": 0,
    //   "updateTime": ""
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/today',
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{

         },
         success(res){
           that.setData({
            alllist:res.data.data.personal_item_today
           })
         }})
      }
    })
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    this.setData({
      date: `${year}-${month}-${day}`,
      hours:`${hours}`
    });
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
        selected: 0
      })
    }
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/today',
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
         },
         success(res){
           that.setData({
            alllist:res.data.data.personal_item_today
           })
         }})
      }
    })
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    this.setData({
      date: `${year}-${month}-${day}`,
      hours:`${hours}`
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

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
    const task = e.detail.task;
    const key = this.data.alllist;
    key.splice(index,1)
    this.setData({
      alllist: key
    });
    this.getTabBar().setData({
      showtab:true
    })
  },
  add(){
    this.setData({
      show:true
    })
    this.getTabBar().setData({
      showtab:false
    })
  },
  finishied(e){
    this.setData({
      show:false
    })
    this.getTabBar().setData({
      showtab:true
    })
  },
  pushback(e){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
       wx.request({
         url: getApp().globalData.apiUrl+'/today',
         method:"GET",
         header: {
           'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'token':res.data
         },
         data:{
         },
         success(res){
           that.setData({
            alllist:res.data.data.personal_item_today
           })
           
         }})
      }
    })
    this.setData({
      show:false
    })
    this.getTabBar().setData({
      showtab:true
    })
  }

})