const { createGrade, modifyGrade, queryGrade, deleteGrade } = require('../service/grade.service')
const { deleteError, createError, modifyError, queryError } = require('../constant/err.type')
class GradeController {

  static keys = ['student_id', 'course_id', 'grade', 'exam_grade', 'final_grade']

  async addGrade(ctx, next) {

    try {
      const createData = GradeController.getBodyData(ctx.request.body)
      const res = await createGrade(createData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功添加成绩',
        result: res,
      }
    } catch (error) {
      console.error('添加成绩失败', error);
      ctx.app.emit('error', createError, ctx)
    }
  }

  async modifyGrade(ctx, next) {
    const modifyData = GradeController.getBodyData(ctx.request.body)
    try {
      const res = await modifyGrade(
        modifyData,
        {
          student_id: modifyData.student_id,
          course_id: modifyData.course_id
        }
      )
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功修改成绩信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', modifyError, ctx)
      console.error("修改成绩失败", error);
    }
  }

  async queryGrade(ctx, next) {
    const queryData = GradeController.getBodyData(ctx.request.body)
    try {
      const res = await queryGrade(queryData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功查询成绩信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', queryError, ctx)
      console.error("查询成绩失败", error);
    }
  }

  async deleteGrade(ctx, next) {
    const deleteData = GradeController.getBodyData(ctx.request.body)
    try {
      const res = await deleteGrade(deleteData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功删除成绩',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', deleteError, ctx)
      console.error("删除成绩失败", error);
    }
  }

  static getBodyData(body = {}, keys = GradeController.keys) {
    let data = {}
    keys.forEach(key => {
      body[key] && (data[key] = body[key])
    })
    return data
  }
}

module.exports = new GradeController()