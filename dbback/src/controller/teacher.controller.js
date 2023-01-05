const { createTeacher, modifyTeacher, queryTeacher, deleteTeacher } = require('../service/teacher.service')
const { deleteError, createError, modifyError, queryError } = require('../constant/err.type')
class TeacherController {

  static keys = ['teacher_id', 'name', 'gender', 'dob', 'dept_id', 'title', 'specialty']

  async addTeacher(ctx, next) {

    try {
      const createData = TeacherController.getBodyData(ctx.request.body)
      const res = await createTeacher(createData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功添加老师',
        result: res,
      }
    } catch (error) {
      console.error('添加老师失败', error);
      ctx.app.emit('error', createError, ctx)
    }
  }

  async modifyTeacher(ctx, next) {
    const modifyData = TeacherController.getBodyData(ctx.request.body)
    try {
      const res = await modifyTeacher(modifyData, { teacher_id: modifyData.teacher_id })
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功修改老师信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', modifyError, ctx)
      console.error("修改老师失败", error);
    }
  }

  async queryTeacher(ctx, next) {
    const queryData = TeacherController.getBodyData(ctx.request.body)
    try {
      const res = await queryTeacher(queryData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功查询老师信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', queryError, ctx)
      console.error("查询老师失败", error);
    }
  }

  async deleteTeacher(ctx, next) {
    const deleteData = TeacherController.getBodyData(ctx.request.body)
    try {
      const res = await deleteTeacher(deleteData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功删除老师',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', deleteError, ctx)
      console.error("删除老师失败", error);
    }
  }

  static getBodyData(body = {}, keys = TeacherController.keys) {
    let data = {}
    keys.forEach(key => {
      body[key] && (data[key] = body[key])
    })
    return data
  }
}

module.exports = new TeacherController()