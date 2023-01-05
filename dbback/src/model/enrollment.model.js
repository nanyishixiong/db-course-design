const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Enrollment = seq.define('enrollment', {
  student_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'student',
      key: 'student_id'
    },
    comment: '选课学生的学号'
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'course',
      key: 'course_id'
    },
    comment: '选课的课程的编号'
  }
})

// Enrollment.sync({ force: true });

module.exports = Enrollment