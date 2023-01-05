const Grade = require('../model/grade.model')
const DeFaultService = require('./default.service')
class GradeService extends DeFaultService {
  constructor() {
    super(Grade, "Grade")
  }

}

module.exports = new GradeService()