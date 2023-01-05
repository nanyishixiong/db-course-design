import React, { useState } from 'react'
import PlusForm from '@/pubulic/PlusForm';
import PlusTable from '@/pubulic/PlusTable';

export let departmentOptions = (function () {
  let department = JSON.parse(localStorage.getItem('department'))
  let result = []
  for (const key in department) {
    result.push({
      value: Number(key),
      label: department[key]
    })
  }
  return result
})()

export default function Student() {
  const [data, setData] = useState([])

  const tableConfig = {
    columns: [
      {
        title: '学号',
        dataIndex: 'student_id',
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
        title: '入学成绩',
        dataIndex: 'grade',
      }, {
        title: '院系',
        dataIndex: 'dept_id',
        render: function (text, record) {
          let map = JSON.parse(localStorage.getItem('department'))
          return map[record.dept_id]
        }
      }, {
        title: '状态',
        dataIndex: 'status',
      }
    ],
    operation: {
      delete: {
        name: '删除',
        url: '/student/deleteStudent'
      },
      modify: {
        name: '修改',
        config: {
          url: '/student/modifyStudent',
          data: [
            {
              type: 'Input',
              name: '学号',
              key: 'student_id'
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
              type: 'Input',
              name: '入学成绩',
              key: 'grade'
            }, {
              type: 'Select',
              name: '院系',
              key: 'dept_id',
              options: departmentOptions
            }, {
              type: 'Select',
              name: '状态',
              key: 'status',
              options: [
                {
                  label: '在读',
                  value: '在读',
                }, {
                  label: '毕业',
                  value: '毕业',
                }, {
                  label: '转学',
                  value: '转学',
                },
              ]
            },
          ]
        },
        title: '修改学生信息',
      },
    },
    url: '/student/queryStudent'
  }

  const formConfig = {
    data: [
      {
        type: 'Input',
        name: '学号',
        key: 'student_id',
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
          url: '/student/addStudent',
          data: [
            {
              type: 'Input',
              name: '学号',
              key: 'student_id'
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
              type: 'Input',
              name: '入学成绩',
              key: 'grade'
            }, {
              type: 'Select',
              name: '院系',
              key: 'dept_id',
              options: departmentOptions
            }, {
              type: 'Select',
              name: '状态',
              key: 'status',
              options: [
                {
                  label: '在学',
                  value: '在学',
                }, {
                  label: '毕业',
                  value: '毕业',
                }, {
                  label: '转学',
                  value: '转学',
                },
              ]
            },
          ]
        },
        title: '录入学生信息'
      }
    ],
    url: '/student/queryStudent',
  }

  return (
    <>
      <PlusForm config={formConfig} setData={setData} />
      <PlusTable config={tableConfig} data={data} setData={setData} />
    </>
  )
}
