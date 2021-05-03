// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
// 返回20天内的疫苗接种数目
  return {
    vaccineData: await db.collection('vaccineChina')
    .where({
    })
    .field({
      _id:false,
      date:true,
      total_vaccinations: true,
    })
    .orderBy('total_vaccinations','asc')
    .limit(20)
    .get()
  }
  
}