import React, { useState } from 'react'
import PlusForm from '@/pubulic/PlusForm';
import PlusTable from '@/pubulic/PlusTable';

export default function Grade() {
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
      }, {
        title: '成绩',
        dataIndex: 'grade',
      }, {
        title: '考试成绩',
        dataIndex: 'exam_grade',
      }, {
        title: '总评成绩',
        dataIndex: 'final_grade',
      }
    ],
    operation: {
      delete: {
        name: '删除',
        url: '/grade/deleteGrade'
      },
      modify: {
        name: '修改',
        config: {
          url: '/grade/addGrade',
          data: [
            {
              type: 'Input',
              name: '学号',
              key: 'student_id'
            }, {
              type: 'Input',
              name: '课程号',
              key: 'course_id'
            }, {
              type: 'Input',
              name: '成绩',
              key: 'grade'
            }, {
              type: 'Input',
              name: '考试成绩',
              key: 'exam_grade',
            }, {
              type: 'Input',
              name: '总评成绩',
              key: 'final_grade',
            }
          ]
        },
        title: '修改成绩信息',
      },
    },
    url: '/grade/queryGrade'
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
          url: '/grade/addGrade',
          data: [
            {
              type: 'Input',
              name: '学号',
              key: 'student_id'
            }, {
              type: 'Input',
              name: '课程号',
              key: 'course_id'
            }, {
              type: 'Input',
              name: '成绩',
              key: 'grade'
            }, {
              type: 'Input',
              name: '考试成绩',
              key: 'exam_grade',
            }, {
              type: 'Input',
              name: '总评成绩',
              key: 'final_grade',
            }
          ]
        },
        title: '录入成绩信息'
      }
    ],
    url: '/grade/queryGrade',
  }

  return (
    <>
      <PlusForm config={formConfig} setData={setData} />
      <PlusTable config={tableConfig} data={data} setData={setData} />
    </>
  )
}
