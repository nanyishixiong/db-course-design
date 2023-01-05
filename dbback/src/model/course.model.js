const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Course = seq.define('course', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '课程编号'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '课程名称'
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '课程学分'
  },
  dept_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Department',
      key: 'dept_id'
    },
    comment: '课程所属系的编号'
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Teacher',
      key: 'teacher_id'
    },
    comment: '课程负责教师的工号'
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '课程开设学期'
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '课程上课时间'
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '课程上课地点'
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '课程容量'
  },
  enrolled: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '已选课的学生人数'
  },
  waitlisted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '等待名单上的学生人数'
  }
}, {
  timestamps: false
})

// Course.sync({ force: true });

module.exports = Course