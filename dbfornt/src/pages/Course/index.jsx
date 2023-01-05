import React, { useState } from 'react'
import PlusForm from '@/pubulic/PlusForm';
import PlusTable from '@/pubulic/PlusTable';
import { departmentOptions } from '@/pages/Student';

export default function Course() {
  const [data, setData] = useState([])

  const tableConfig = {
    columns: [
      {
        title: '课程号',
        dataIndex: 'course_id',
      }, {
        title: '课程名',
        dataIndex: 'name',
      }, {
        title: '学分',
        dataIndex: 'credit',
      }, {
        title: '院系',
        dataIndex: 'dept_id',
        render: function (text, record) {
          let map = JSON.parse(localStorage.getItem('department'))
          return map[record.dept_id]
        }
      }, {
        title: '职工号',
        dataIndex: 'teacher_id',
      }, {
        title: '开设学期',
        dataIndex: 'semester',
      }, {
        title: '上课时间',
        dataIndex: 'time',
      }, {
        title: '上课地点',
        dataIndex: 'location',
      }, {
        title: '课程容量',
        dataIndex: 'capacity',
      }, {
        title: '已选课学生',
        dataIndex: 'enrolled',
      }, {
        title: '等待的学生',
        dataIndex: 'waitlisted',
      },
    ],
    operation: {
      delete: {
        name: '删除',
        url: '/course/deleteCourse'
      },
      modify: {
        name: '修改',
        config: {
          url: '/course/modifyCourse',
          data: [
            {
              type: 'Input',
              name: '课程号',
              key: 'course_id'
            }, {
              type: 'Input',
              name: '课程名',
              key: 'name'
            }, {
              type: 'Input',
              name: '学分',
              key: 'credit',
            }, {
              type: 'Select',
              name: '院系',
              key: 'dept_id',
              options: departmentOptions
            }, {
              type: 'Input',
              name: '职工号',
              key: 'teacher_id',
            }, {
              type: 'Input',
              name: '开设学期',
              key: 'semester',
            }, {
              type: 'Time',
              name: '上课时间',
              key: 'time',
            }, {
              type: 'Input',
              name: '课程容量',
              key: 'capacity',
            }, {
              type: 'Input',
              name: '已选课学生',
              key: 'enrolled',
            }, {
              type: 'Input',
              name: '等待的学生',
              key: 'waitlisted',
            }
          ]
        },
        title: '修改课程信息',
      },
    },
    url: '/course/queryCourse'
  }

  const formConfig = {
    data: [
      {
        type: 'Input',
        name: '课程号',
        key: 'course_id',
        width: 200
      }, {
        type: 'Input',
        name: '课程名',
        key: 'name',
        width: 200
      }, {
        type: 'Input',
        name: '任课老师',
        key: 'teacher_name',
        width: 200
      },
      {
        type: 'Add',
        config: {
          url: '/course/addCourse',
          data: [
            {
              type: 'Input',
              name: '课程号',
              key: 'course_id'
            }, {
              type: 'Input',
              name: '课程名',
              key: 'name'
            }, {
              type: 'Input',
              name: '学分',
              key: 'credit',
            }, {
              type: 'Select',
              name: '院系',
              key: 'dept_id',
              options: departmentOptions
            }, {
              type: 'Input',
              name: '职工号',
              key: 'teacher_id',
            }, {
              type: 'Input',
              name: '开设学期',
              key: 'semester',
            }, {
              type: 'Time',
              name: '上课时间',
              key: 'time',
            }, {
              type: 'Input',
              name: '课程容量',
              key: 'capacity',
            }, {
              type: 'Input',
              name: '已选课学生',
              key: 'enrolled',
            }, {
              type: 'Input',
              name: '等待的学生',
              key: 'waitlisted',
            }
          ]
        },
        title: '录入课程信息'
      }
    ],
    url: '/course/queryCourse',
  }

  return (
    <>
      <PlusForm config={formConfig} setData={setData} />
      <PlusTable config={tableConfig} data={data} setData={setData} />
    </>
  )
}
