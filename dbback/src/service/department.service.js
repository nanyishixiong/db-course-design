const Department = require('../model/department.model')
const DeFaultService = require('./default.service')
class DepartmentService extends DeFaultService {
  constructor() {
    super(Department, 'Department');
  }

}

module.exports = new DepartmentService()