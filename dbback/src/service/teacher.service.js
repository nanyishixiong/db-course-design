const Teacher = require('../model/teacher.model')
const DeFaultService = require('./default.service')
class TeacherService extends DeFaultService {
  constructor() {
    super(Teacher, "Teacher")
  }

}

module.exports = new TeacherService()