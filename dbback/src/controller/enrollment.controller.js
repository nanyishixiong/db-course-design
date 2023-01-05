const { createEnrollment, modifyEnrollment, queryEnrollment, deleteEnrollment } = require('../service/enrollment.service')
const { deleteError, createError, modifyError, queryError } = require('../constant/err.type')
class EnrollmentController {

  static keys = ['student_id', 'course_id']

  async addEnrollment(ctx, next) {

    try {
      const createData = EnrollmentController.getBodyData(ctx.request.body)

      const res = await createEnrollment(createData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功添加选课',
        result: res,
      }
    } catch (error) {
      console.error('添加选课失败', error);
      ctx.app.emit('error', createError, ctx)
    }
  }

  async modifyEnrollment(ctx, next) {
    const modifyData = EnrollmentController.getBodyData(ctx.request.body)
    try {
      const res = await modifyEnrollment(modifyData, { student_id: modifyData.student_id, course_id: modifyData.course_id, })
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功修改选课信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', modifyError, ctx)
      console.error("修改选课失败", error);
    }
  }

  async queryEnrollment(ctx, next) {
    const queryData = EnrollmentController.getBodyData(ctx.request.body)
    try {
      const res = await queryEnrollment(queryData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功查询选课信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', queryError, ctx)
      console.error("查询选课失败", error);
    }
  }

  async deleteEnrollment(ctx, next) {
    const deleteData = EnrollmentController.getBodyData(ctx.request.body)
    try {
      const res = await deleteEnrollment(deleteData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功删除选课',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', deleteError, ctx)
      console.error("删除选课失败", error);
    }
  }

  static getBodyData(body = {}, keys = EnrollmentController.keys) {
    let data = {}
    keys.forEach(key => {
      body[key] && (data[key] = body[key])
    })
    return data
  }
}

module.exports = new EnrollmentController()