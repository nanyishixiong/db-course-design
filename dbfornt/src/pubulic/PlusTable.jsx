import React, { useLayoutEffect } from 'react'
import { instance } from '@/utils';
import { Table, Button, Modal, Form } from 'antd';
import PlusModelForm from './PlusModelForm';
import dayjs from 'dayjs';

export default function PlusTable({ config, data, setData }) {

  const [form] = Form.useForm()
  const { delect, modify } = config.operation
  const operation = {
    title: '操作',
    key: 'operation',
    render: function (text, record, index) {
      return (
        <>
          <Button
            size='small'
            onClick={function () {
              data.splice(index, 1)
              setData([...data])
              instance.post(delect.url, { student_id: record.student_id })
            }}
          >删除</Button>
          <Button
            size='small'
            onClick={function () {
              Modal.confirm({
                icon: <></>,
                title: modify.title || '',
                content: <PlusModelForm config={modify.config} form={form} updateTable={updateTable} />,
                cancelText: '取消',
                okText: '提交',
                closable: true,
                onOk: function () {
                  form.submit?.()
                },
              })
              Array.prototype.forEach.call(['dob', 'time'], (key) => {
                if (record[key]) {
                  record[key] = dayjs(record[key], ['YYYY-MM-DD', 'hh:mm'])
                }
              })
              form.setFieldsValue?.(record)
            }}
          >修改
          </Button>
        </>
      )
    }
  }
  config.columns.push(operation)

  const updateTable = function () {
    instance.post(config.url).then((res) => {
      res.data.result.forEach((item, index) => {
        item.key = index
      })
      setData(res.data.result)
    })
  }

  useLayoutEffect(() => {
    updateTable()
  }, [])

  return (
    <Table
      scroll={{ y: 340 }}
      columns={config.columns}
      dataSource={data}
    />
  )
}