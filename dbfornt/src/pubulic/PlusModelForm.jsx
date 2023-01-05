import React from "react";
import { Input, Select, Form, DatePicker } from 'antd';
import { instance } from '@/utils';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';


export default function PlusModelForm({ config, form, updateTable }) {

  const createInput = ({ name, key, ...res }) => {
    return (
      <Form.Item
        name={key}
        label={name}
        key={key}
      >
        <Input />
      </Form.Item>
    )
  }

  const createSelect = ({ name, key, ...res }) => {
    return <Form.Item
      name={key}
      label={name}
      key={key}
    >
      <Select
        options={res.options}
      />
    </Form.Item>
  }

  const createDate = ({ name, key, ...res }) => {
    return <Form.Item
      name={key}
      label={name}
      key={key}
    >
      <DatePicker loacle={locale} format={'YYYY-MM-DD'} />
    </Form.Item>
  }

  const createTime = ({ name, key, ...res }) => {
    return <Form.Item
      name={key}
      label={name}
      key={key}
    >
      <DatePicker loacle={locale} picker={'time'} format={'hh:mm'} />
    </Form.Item>
  }

  const onFinish = (values) => {
    if (values.dob) {
      values.dob = values.dob.format('YYYY-MM-DD').toString()
    }
    instance.post(config.url, values).then(() => {
      updateTable && updateTable()
    })

  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      preserve={false}
    >
      {
        config.data.map((item) => {
          switch (item.type) {
            case 'Input':
              return createInput(item)
            case 'Select':
              return createSelect(item)
            case 'Date':
              return createDate(item)
            case 'Time':
              return createTime(item)
            default:
              return createInput(item)
          }
        })
      }
    </Form>
  )
}