const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

function getDate(time_stamp)
{
  var date = new Date(time_stamp)
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()   // getDate()是获取具体日  ， getDay()是获取周次
  let week = date.getDay()
  let weekArray=["周日","周一","周二","周三","周四","周五","周六"]
  return month+"-"+day+"  "+weekArray[week]
}

module.exports = {
  formatTime,
  getDate,
}