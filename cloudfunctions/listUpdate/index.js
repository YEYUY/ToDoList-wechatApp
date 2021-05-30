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
    return await db.collection('users').where({
      '_id': event.users_id,
      'myCreatLists.list_id': event.list.list_id,
    }).update({
      data: {
        'myCreatLists.$.unfinishedTaskAmount':event.list.unfinishedTaskAmount,
      },
    })
  } catch (error) {
    console.log(error)
  }
}