const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

// 读取当前目录下的文件名
fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

module.exports = router