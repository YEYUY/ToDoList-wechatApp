// pages/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog:null,
    date:'',
    hours:'',
    show:false,
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
           if(res.data.success==true)
           {that.setData({
              blog:res.data.data.blog_today,
              show:true
           })
          }
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
          selected: 2
        })
      }
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
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
           if(res.data.success==true)
           {that.setData({
              blog:res.data.data.blog_today,
              show:true
           })
          }
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

  input_name(e){
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
})