const User = require('../model/user.model')
const DeFaultService = require('./default.service')
class UserService extends DeFaultService {
  constructor() {
    super(User, "User")
  }

  // 获取用户信息
  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin', 'identity'],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }

  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id }
    const newUser = {}

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.update(newUser, { where: whereOpt, })
    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()