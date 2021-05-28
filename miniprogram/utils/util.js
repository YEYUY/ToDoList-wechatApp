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
  if (month < 10)
    month = '0' + month
  if (day < 10)
    day = '0' + day
  if (hour < 10)
    hour = '0' + hour
  if (minute < 10)
    minute = '0' + minute
  var time = year + '-' + month + '-' + day + ' ' + hour + ":" + minute
  return time
}

function show_loading(title)
{
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

const cloud_getList = (collection_name) => {
    return new Promise((resolve, reject) => {
      db.collection(collection_name).get({
        success(res) {
          console.log("获取列表成功", res)
          resolve(res)
        },
        fail(res) {
          console.log("获取列表失败", res)
          reject(res)
        }
      })
    })
  }


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





module.exports = {
  formatTime,
  changeDate,
  getDate,
  cloud_getList,
  cloud_remove,
  cloud_add,
  show_loading,
}