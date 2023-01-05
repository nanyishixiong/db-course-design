const { DataTypes } = require('sequelize')

const seq = require('../db/seq')


const Grade = seq.define('grade', {
  student_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'student_id'
    },
    comment: '成绩的学生的学号'
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Course',
      key: 'course_id'
    },
    comment: '成绩的课程的编号'
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: '平时成绩'
  },
  exam_grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: '考试成绩'
  },
  final_grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: '总评成绩'
  }
}, {
  timestamps: false
})

Grade.sync({ force: true });

module.exports = Grade