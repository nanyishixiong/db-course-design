const Course = require('../model/course.model')
const DeFaultService = require('./default.service')
class CourseService extends DeFaultService {
  constructor() {
    super(Course, "Course")
  }

}

module.exports = new CourseService()