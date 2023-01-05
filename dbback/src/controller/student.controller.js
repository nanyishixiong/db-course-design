const { createStudent, modifyStudent, queryStudent, deleteStudent } = require('../service/student.service')
const { deleteError, createError, modifyError, queryError } = require('../constant/err.type')
class StudentController {

  static keys = ['student_id', 'name', 'gender', 'dob', 'grade', 'dept_id', 'status']

  async addStudent(ctx, next) {

    try {
      const createData = StudentController.getBodyData(ctx.request.body)
      const res = await createStudent(createData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功添加学生',
        result: res,
      }
    } catch (error) {
      console.error('添加学生失败', error);
      ctx.app.emit('error', createError, ctx)
    }
  }

  async modifyStudent(ctx, next) {
    const modifyData = StudentController.getBodyData(ctx.request.body)
    try {
      const res = await modifyStudent(modifyData, { student_id: modifyData.student_id })
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功修改学生信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', modifyError, ctx)
      console.error("修改学生失败", error);
    }
  }

  async queryStudent(ctx, next) {
    const queryData = StudentController.getBodyData(ctx.request.body)
    try {
      const res = await queryStudent(queryData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功查询学生信息',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', queryError, ctx)
      console.error("查询学生失败", error);
    }
  }

  async deleteStudent(ctx, next) {
    const deleteData = StudentController.getBodyData(ctx.request.body)
    try {
      const res = await deleteStudent(deleteData)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '成功删除学生',
        result: res,
      }
    } catch (error) {
      ctx.app.emit('error', deleteError, ctx)
      console.error("删除学生失败", error);
    }
  }


  static getBodyData(body = {}, keys = StudentController.keys) {
    if (Array.isArray(body)) return body
    let data = {}
    keys.forEach(key => {
      body[key] && (data[key] = body[key])
    })
    return data
  }
}

module.exports = new StudentController()