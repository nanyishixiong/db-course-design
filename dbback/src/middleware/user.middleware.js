const bcrypt = require('bcryptjs')
const { getUerInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} = require('../constant/err.type')


const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    let res = await getUerInfo({ user_name })
    if (res) {
      console.error("用户名已经存在");
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error("获取用户信息失败", err);
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }


  await next()
}

const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  try {
    let res = await getUerInfo({ user_name })

    if (!res) {
      console.error("用户不存在");
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }

    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (error) {
    console.error("获取用户信息失败", error);
    ctx.app.emit('error', userLoginError, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}