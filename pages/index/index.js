// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    useravatar: "",
    usernickName:"微信用户"
  },
  onLoad() {
    let that=this
    wx.getStorage(({
      key:"avatar",
      success(res){
        that.setData({
          useravatar:getApp().globalData.apiUrl+res.data
        })
      }
      }))
      wx.getStorage(({
        key:"wxName",
        success(res){
          if(res.data!=null){
          that.setData({
            usernickName:res.data
          })}
        }
        }))
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
},
  // 事件处理函数
  chooseavatar(e){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
        wx.uploadFile({
          filePath: e.detail.avatarUrl,
          name: 'avatar',
          url: getApp().globalData.apiUrl+"/user/avatar",
          method:'POST',
          header: {
            'Accept': '*/*',
            'Content-Type':'multipart/form-data',
            'token':res.data
          },
          success(res){
            console.log(res)
            let tmp=JSON.parse(res.data)
            if(tmp.success==true)
            {that.setData({
              useravatar:e.detail.avatarUrl
            })}
            else{
              wx.showToast({
                title: tmp.message,
              })
            }
          }
        })
       
      }})
  },
  bindchange(e){
    let that=this
    wx.getStorage({
      key:'token',
      success(res){
        wx.request({
          url: getApp().globalData.apiUrl+'/user/nickname',
          method:"POST",
          header: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'token':res.data
          },
          data:{
           "nickName":e.detail.value
          },
          success(res){
            that.setData({
              usernickName:e.detail.value
            })
          }})
      }})
  },
})
