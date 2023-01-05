const Koa = require("koa")
const router = require('../router')
const { koaBody } = require('koa-body')
const errHandler = require('./errorHandler')
var cors = require('koa2-cors');

const app = new Koa()

app.use(koaBody())
app.use(cors());
app.use(router.routes())

//
app.use(router.allowedMethods())

app.on('error', errHandler)

module.exports = app