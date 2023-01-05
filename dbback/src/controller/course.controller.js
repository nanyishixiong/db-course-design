const { createCourse, modifyCourse, queryCourse, deleteCourse } = require('../service/course.service')
const { deleteError, createError, modifyError, queryError } = require('../constant/err.type')
class CourseController {

  static keys = ['course_id', 'teacher_id', 'name', 'credit', 'time', 'location', 'semester', 'dept_id', 'waitlisted', 'enrolled', 'capacity']

  async addCourse(ctx, next) {

    try {
      const createData = CourseController.getBodyData(ctx.request.body)
      const res = await createCourse(createData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功添加课程',
        result: res,
      }
    } catch (error) {
      console.error('添加课程失败', error);
      ctx.app.emit('error', createError, ctx)
    }
  }

  async modifyCourse(ctx, next) {
    const modifyData = CourseController.getBodyData(ctx.request.body)
    try {
      const res = await modifyCourse(modifyData, {
        course_id: modifyData.course_id,
      })
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功修改课程信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', modifyError, ctx)
      console.error("修改课程失败", error);
    }
  }

  async queryCourse(ctx, next) {
    const queryData = CourseController.getBodyData(ctx.request.body)
    try {
      const res = await queryCourse(queryData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功查询课程信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', queryError, ctx)
      console.error("查询课程失败", error);
    }
  }

  async deleteCourse(ctx, next) {
    const deleteData = CourseController.getBodyData(ctx.request.body)
    try {
      const res = await deleteCourse(deleteData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功删除课程',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', deleteError, ctx)
      console.error("删除课程失败", error);
    }
  }

  static getBodyData(body = {}, keys = CourseController.keys) {
    let data = {}
    keys.forEach(key => {
      body[key] && (data[key] = body[key])
    })
    return data
  }
}

module.exports = new CourseController()

