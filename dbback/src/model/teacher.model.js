const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Teacher = seq.define('teacher', {
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '教职工的工号'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '教职工的姓名'
  },
  gender: {
    type: DataTypes.CHAR,
    allowNull: false,
    comment: '教职工的性别'
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '教职工的出生日期'
  },
  dept_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Department',
      key: 'dept_id'
    },
    comment: '教职工所属的系的编号'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '教职工的职称'
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '教职工的专业及教学方向'
  }
}, {
  timestamps: false
})

// Teacher.sync({ force: true });

module.exports = Teacher