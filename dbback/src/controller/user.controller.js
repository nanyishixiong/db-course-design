
const {
  createUser,
  getUerInfo,
  updateById,
} = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
class UserController {
  async register(ctx, next) {
    const { user_name, password, identity } = ctx.request.body

    // 2. 操作数据库
    try {
      const res = await createUser({ user_name, password, identity })
      ctx.status = 200
      ctx.body = {
        code: 10000,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (err) {
      console.error('注册失败', err);
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const { password, ...res } = await getUerInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          user_name,
          identity: res.identity,
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),// token有效时间 1d 一天 10 10秒
        },
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }

  async changePassword(ctx, next) {
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '成功修改密码',
        result: ''
      }
    } else {
      ctx.body = {
        code: 10007,
        message: '修改密码失败',
        result: ''
      }
    }
  }
}

module.exports = new UserController()