const { createDepartment, modifyDepartment, queryDepartment, deleteDepartment } = require('../service/department.service')
const { deleteError, createError, modifyError, queryError } = require('../constant/err.type')
class DepartmentController {

  static keys = ['dept_id', 'name', 'description']

  async addDepartment(ctx, next) {

    try {
      const createData = DepartmentController.getBodyData(ctx.request.body)
      const res = await createDepartment(createData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功添加院系',
        result: res,
      }
    } catch (error) {
      console.error('添加院系失败', error);
      ctx.app.emit('error', createError, ctx)
    }
  }

  async modifyDepartment(ctx, next) {
    const modifyData = DepartmentController.getBodyData(ctx.request.body)
    try {
      const res = await modifyDepartment(modifyData, { dept_id: modifyData.dept_id })
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功修改院系信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', modifyError, ctx)
      console.error("修改院系失败", error);
    }
  }

  async queryDepartment(ctx, next) {
    const queryData = DepartmentController.getBodyData(ctx.request.body)
    try {
      const res = await queryDepartment(queryData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功查询院系信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', queryError, ctx)
      console.error("查询院系失败", error);
    }
  }

  async deleteDepartment(ctx, next) {
    const deleteData = DepartmentController.getBodyData(ctx.request.body)
    try {
      const res = await deleteDepartment(deleteData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功删除院系',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', deleteError, ctx)
      console.error("删除院系失败", error);
    }
  }

  static getBodyData(body = {}, keys = DepartmentController.keys) {
    let data = {}
    keys.forEach(key => {
      body[key] && (data[key] = body[key])
    })
    return data
  }
}

module.exports = new DepartmentController()