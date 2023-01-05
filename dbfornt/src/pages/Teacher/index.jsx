import React, { useState } from 'react'
import PlusForm from '@/pubulic/PlusForm';
import PlusTable from '@/pubulic/PlusTable';
import { departmentOptions } from '@/pages/Student';

export default function Teacher() {
  const [data, setData] = useState([])

  const tableConfig = {
    columns: [
      {
        title: '职工号',
        dataIndex: 'teacher_id',
      }, {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '性别',
        dataIndex: 'gender',
      }, {
        title: '出生日期',
        dataIndex: 'dob',
      }, {
        title: '院系',
        dataIndex: 'dept_id',
        render: function (text, record) {
          let map = JSON.parse(localStorage.getItem('department'))
          return map[record.dept_id]
        }
      }, {
        title: '职称',
        dataIndex: 'title',
      }, {
        title: '教学方向',
        dataIndex: 'specialty',
      }
    ],
    operation: {
      delete: {
        name: '删除',
        url: '/teacher/deleteTeacher'
      },
      modify: {
        name: '修改',
        config: {
          url: '/teacher/modifyTeacher',
          data: [
            {
              type: 'Input',
              name: '职工号',
              key: 'teacher_id'
            }, {
              type: 'Input',
              name: '姓名',
              key: 'name'
            }, {
              type: 'Select',
              name: '性别',
              key: 'gender',
              options: [
                {
                  label: '男',
                  value: '男',
                }, {
                  label: '女',
                  value: '女',
                }
              ]
            }, {
              type: 'Date',
              name: '出生日期',
              key: 'dob'
            }, {
              type: 'Select',
              name: '院系',
              key: 'dept_id',
              options: departmentOptions
            }, {
              type: 'Input',
              name: '职称',
              key: 'title',
            }, {
              type: 'Input',
              name: '教学方向',
              key: 'specialty',
            }
          ]
        },
        title: '修改教师信息',
      },
    },
    url: '/teacher/queryTeacher'
  }

  const formConfig = {
    data: [
      {
        type: 'Input',
        name: '职工号',
        key: 'teacher_id',
        width: 200
      }, {
        type: 'Input',
        name: '姓名',
        key: 'name',
        width: 200
      }, {
        type: 'Select',
        name: '院系',
        key: 'dept_id',
        width: 200,
        options: departmentOptions
      },
      {
        type: 'Add',
        config: {
          url: '/teacher/addTeacher',
          data: [
            {
              type: 'Input',
              name: '职工号',
              key: 'teacher_id'
            }, {
              type: 'Input',
              name: '姓名',
              key: 'name'
            }, {
              type: 'Select',
              name: '性别',
              key: 'gender',
              options: [
                {
                  label: '男',
                  value: '男',
                }, {
                  label: '女',
                  value: '女',
                }
              ]
            }, {
              type: 'Date',
              name: '出生日期',
              key: 'dob'
            }, {
              type: 'Select',
              name: '院系',
              key: 'dept_id',
              options: departmentOptions
            }, {
              type: 'Input',
              name: '职称',
              key: 'title',
            }, {
              type: 'Input',
              name: '教学方向',
              key: 'specialty',
            }
          ]
        },
        title: '录入教师信息'
      }
    ],
    url: '/teacher/queryTeacher',
  }

  return (
    <>
      <PlusForm config={formConfig} setData={setData} />
      <PlusTable config={tableConfig} data={data} setData={setData} />
    </>
  )
}
