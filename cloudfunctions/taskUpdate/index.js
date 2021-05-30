// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('lists').where({
      '_id': event.list_id,
      'tasks.creat_timeStampKey': event.task.creat_timeStampKey,
    }).update({
      data: {
        'tasks.$':event.task,
      },
    })
  } catch (error) {
    console.log(error)
  }
}