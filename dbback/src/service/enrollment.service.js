const Enrollment = require('../model/enrollment.model')
const DeFaultService = require('./default.service')
class EnrollmentService extends DeFaultService {
  constructor() {
    super(Enrollment, "Enrollment")
  }

}

module.exports = new EnrollmentService()