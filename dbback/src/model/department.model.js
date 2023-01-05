const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Department = seq.define('department', {
  dept_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '系编号'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '系名称'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '系简介'
  }
}, {
  timestamps: false
})

// Department.sync({ force: true });

module.exports = Department