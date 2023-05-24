// app.js
App({
  globalData:{
    apiUrl:"http://124.70.195.38:996"
    //apiUrl:"https://blog-and-todo-50123-9-1318285875.sh.run.tcloudbase.com"
  },

  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: getApp().globalData.apiUrl+'/user/login',
          method:"POST",
          header: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:{"code":res.code},
          success(res){
            wx.setStorage({
              key:"token",
              data:res.data.data.token
            })
            wx.setStorage({
              key:"avatar",
              data:res.data.data.user.avatar
            })
            wx.setStorage({
              key:"wxName",
              data:res.data.data.user.wxName
            })
            console.log(res.data.data)
            // wx.getStorage({
            //   key:'token',
            //   success(res){
            //     console.log(res.data)
            //   }
            // })
          }
        })
      }
    })
  },
})
