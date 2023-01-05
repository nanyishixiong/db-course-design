const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, jsonWebTokenError } = require('../constant/err.type')


const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    // user 包含payload的信息id, user_name, is_admin
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {

    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token已过期', error);
        ctx.app.emit('error', tokenExpiredError, ctx)
        break;
      case 'JsonWebTokenError':
        console.error('无效的token', error);
        ctx.app.emit('error', jsonWebTokenError, ctx)
        break;
    }
    return;
  }
  await next()
}

module.exports = {
  auth
}