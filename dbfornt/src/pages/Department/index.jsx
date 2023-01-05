import React, { useState } from 'react'
import PlusForm from '@/pubulic/PlusForm';
import PlusTable from '@/pubulic/PlusTable';
import { departmentOptions } from '@/pages/Student';

export default function Department() {
  const [data, setData] = useState([])

  const tableConfig = {
    columns: [
      {
        title: '系号',
        dataIndex: 'dept_id',
      }, {
        title: '系名',
        dataIndex: 'name',
      }, {
        title: '院系简介',
        dataIndex: 'description',
      }
    ],
    operation: {
      delete: {
        name: '删除',
        url: '/department/deleteDepartment'
      },
      modify: {
        name: '修改',
        config: {
          url: '/department/addDepartment',
          data: [
            {
              type: 'Input',
              name: '系号',
              key: 'dept_id'
            }, {
              type: 'Input',
              name: '系名',
              key: 'name'
            }, {
              type: 'Input',
              name: '简介',
              key: 'description',
            }
          ]
        },
        title: '修改院系信息',
      },
    },
    url: '/department/queryDepartment'
  }

  const formConfig = {
    data: [
      {
        type: 'Input',
        name: '系号',
        key: 'dept_id',
        width: 200
      }, {
        type: 'Input',
        name: '系名',
        key: 'name',
        width: 200
      },
      {
        type: 'Add',
        config: {
          url: '/department/addDepartment',
          data: [
            {
              type: 'Input',
              name: '系号',
              key: 'dept_id'
            }, {
              type: 'Input',
              name: '系名',
              key: 'name'
            }, {
              type: 'Input',
              name: '简介',
              key: 'description',
            }
          ]
        },
        title: '录入院系信息'
      }
    ],
    url: '/department/queryDepartment',
  }

  return (
    <>
      <PlusForm config={formConfig} setData={setData} />
      <PlusTable config={tableConfig} data={data} setData={setData} />
    </>
  )
}
