import React, { useState } from 'react'
import PlusForm from '@/pubulic/PlusForm';
import PlusTable from '@/pubulic/PlusTable';

export default function Enrollment() {
  const [data, setData] = useState([])

  const tableConfig = {
    columns: [
      {
        title: '编号',
        dataIndex: 'id',
      }, {
        title: '学号',
        dataIndex: 'student_id',
      }, {
        title: '课程',
        dataIndex: 'course_id',
        render: function (text, record) {
          let map = JSON.parse(localStorage.getItem('course'))
          return map?.[record.course_id]
        }
      }
    ],
    operation: {
      delete: {
        name: '删除',
        url: '/enrollment/deleteEnrollment'
      },
      modify: {
        name: '修改',
        config: {
          url: '/enrollment/addEnrollment',
          data: [
            {
              type: 'Input',
              name: '学号',
              key: 'student_id'
            }, {
              type: 'Input',
              name: '课程号',
              key: 'course_id'
            },
          ]
        },
        title: '修改选课信息',
      },
    },
    url: '/enrollment/queryEnrollment'
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
        name: '课程号',
        key: 'course_id',
        width: 200
      },
      {
        type: 'Add',
        config: {
          url: '/enrollment/addEnrollment',
          data: [
            {
              type: 'Input',
              name: '学号',
              key: 'student_id'
            }, {
              type: 'Input',
              name: '课程号',
              key: 'course_id'
            },
          ]
        },
        title: '录入选课信息'
      }
    ],
    url: '/enrollment/queryEnrollment',
  }

  return (
    <>
      <PlusForm config={formConfig} setData={setData} />
      <PlusTable config={tableConfig} data={data} setData={setData} />
    </>
  )
}
