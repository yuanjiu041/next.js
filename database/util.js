const mongodb = require('mongodb')
const mongoUrl = require('../config/common').mongoUrl

const { MongoClient, ObjectId } = mongodb

// 链接数据库，用await的形式获取DB对象
const connectDB = (url = mongoUrl) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err)
        return reject(err)
      return resolve(db)
    })
  })
}

const formatInsertData = (opts) => {
  return {
    ...opts,
    createdTime: Date.now()
  }
}

const formatUpdateData = (opts) => {
  return {
    ...opts,
    updateTime: Date.now()
  }
}

const formatId = (opts) => {
  if (opts._id) {
    opts._id = ObjectId(opts._id)
  }

  return opts
}

const logPrint = (cb) => {
  return async function () {
    const startTime = Date.now()
    const rlt = await cb.apply(null, arguments)
    console.log(`use ${Date.now() - startTime}ms in mongodb`)
    return rlt
  }
}

module.exports = {
  connectDB,
  formatUpdateData,
  formatInsertData,
  formatId,
  logPrint
}
