const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Student = seq.define('student', {
  // id 会被sequelize自动创建, 管理
  student_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '学生学号'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '学生姓名'
  },
  gender: {
    type: DataTypes.CHAR,
    allowNull: false,
    comment: '学生性别'
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '学生出生日期'
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: '学生入学成绩'
  },
  dept_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Department',
      key: 'dept_id'
    },
    comment: '学生所属的系的编号'
  },
  status: {
    type: DataTypes.CHAR,
    allowNull: false,
    comment: '学生的当前状态'
  }
}, {
  timestamps: false
})
// Student.sync({ force: true });
module.exports = Student