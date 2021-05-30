const db = wx.cloud.database()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

//转换时间函数 --自己写了才发现原来这里本来就有 - -！
function changeDate(time) {
  var year = time.getFullYear()
  var month = time.getMonth() + 1 //注意getMonth()返回是 0-11
  var day = time.getDate()
  var hour = time.getHours()
  var minute = time.getMinutes()
  var seconds = time.getSeconds()
  if (month < 10)
    month = '0' + month
  if (day < 10)
    day = '0' + day
  if (hour < 10)
    hour = '0' + hour
  if (minute < 10)
    minute = '0' + minute
  if (seconds < 10)
    seconds = '0' + seconds
  var time = year + '年' + month + '月' + day + '日' + hour + ":" + minute + ":" + seconds
  return time
}

function show_loading(title) {
  wx.showLoading({
    title: title,
  })
}

function getDate(time_stamp) {
  var date = new Date(time_stamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate() // getDate()是获取具体日  ， getDay()是获取周次
  let week = date.getDay()
  let weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  return month + "-" + day + "  " + weekArray[week]
}


//获取列表
const cloud_getList = (collection_name) => {
  return new Promise((resolve, reject) => {
    db.collection(collection_name).get({
      success(res) {
        console.log("获取列表成功", res)
        resolve(res)
      },
      fail(res) {
        console.log("???")
        console.log("获取列表失败", res)
        reject(res)
      }
    })
  })
}

//删除
const cloud_remove = (collection_name, _id, openid) => {
  return new Promise((resolve, reject) => {
    db.collection(collection_name).where({
      _id: _id,
      _openid: openid
    }).remove({
      success(res) {
        console.log("删除成功", res)
        resolve(res)
      },
      fail(res) {
        console.log("删除失败", res)
        reject(res)
      }
    })
  })
}

//查询
const cloud_get = (collection_name, _id) => {
  return new Promise((resolve, reject) => {
    db.collection(collection_name).doc(_id).get({
      success(res) {
        console.log("查询成功", res)
        resolve(res)
      },
      fail(res) {
        console.log("查询失败", res)
        reject(res)
      }
    })
  })
}

//添加
const cloud_add = (collection_name, data) => {
  return new Promise((resolve, reject) => {
    db.collection(collection_name).add({
      data: data,
      success(res) {
        console.log("添加成功", res)
        resolve(res)
      },
      fail(res) {
        console.log("添加失败", res)
        reject(res)
      }
    })
  })
}

//云函数调用
const cloud_function = (name, data) => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: name,
      data: data,
      success: res => {
        resolve(res)
      },
      fail: err => {
        console.log(err)
        reject(err)
      }
    })
  })
}

//lists中tasks更新
const cloud_listTasksUpadte = (name, list_id ,tasks) => {
  return new Promise((resolve, reject) => {
    db.collection(name).doc(list_id).update({
      data: {
        tasks: tasks
      },
      success(res) {
        console.log("lists中tasks更新成功", res)
        resolve(res)
      },
      fail(err) {
       reject(res)
      }
    })
  })
}

//lists中unfinishedTasks更新
const cloud_taskAmountUpadte = (name, list_id ,unfinishedTaskAmount) => {
  return new Promise((resolve, reject) => {
    db.collection(name).doc(list_id).update({
      data: {
        unfinishedTaskAmount: unfinishedTaskAmount
      },
      success(res) {
        console.log("lists中unfinishedTaskAmount更新成功", unfinishedTaskAmount)

        let data={
          users_id:wx.getStorageSync('users_id'),
          list:{
            list_id:list_id,
            unfinishedTaskAmount:unfinishedTaskAmount,
          }
        }
        console.log("传的data",data)
    
        wx.cloud.callFunction({
          name: "listUpdate",
          data: data,
          success: res => {
            resolve(res)
          },
          fail: err => {
            console.log(err)
            reject(err)
          }
        })
      },
      fail(err) {
       reject(res)
      }
    })



  })
}

function playAudio() {
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true // 是否自动开始播放，默认为 false
  innerAudioContext.loop = false // 是否循环播放，默认为 false
  wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
    obeyMuteSwitch: false, // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
    success: function (e) {
      console.log(e)
      console.log('play success')
    },
    fail: function (e) {
      console.log(e)
      console.log('play fail')
    }
  })
  innerAudioContext.src = 'cloud://main-6gsnf8ac856384e6.6d61-main-6gsnf8ac856384e6-1305997284/resource/finished.mp3'; // 音频资源的地址
  //innerAudioContext.src = '/miniprogram/resource/finished.mp3'; // 音频资源的地址
  innerAudioContext.onPlay(() => { // 监听音频播放事件
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => { // 监听音频播放错误事件
    console.log(res.errMsg)
    console.log(res.errCode)
  })
}

//users中myCreatLists更新
const cloud_usersCtUpadte = (name, users_id ,myCreatLists) => {
  return new Promise((resolve, reject) => {
    db.collection(name).doc(users_id).update({
      data: {
        myCreatLists: myCreatLists
      },
      success(res) {
        console.log("users中myCreatLists更新", res)
        resolve(res)
      },
      fail(err) {
       reject(res)
      }
    })
  })
}

module.exports = {
  formatTime,
  changeDate,
  getDate,
  cloud_getList,
  cloud_remove,
  cloud_add,
  show_loading,
  playAudio,
  cloud_get,
  cloud_function,
  cloud_listTasksUpadte,
  cloud_taskAmountUpadte,
  cloud_usersCtUpadte,
}