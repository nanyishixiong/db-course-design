const Student = require('../model/student.model')
const DeFaultService = require('./default.service')
class StudentService extends DeFaultService {
  constructor() {
    super(Student, "Student")
  }

}

module.exports = new StudentService()