import React from "react";
import { Button, Input, Select, Modal, Form } from 'antd';
import { instance, debounce } from '@/utils';
import { PlusOutlined } from '@ant-design/icons'
import PlusModelForm from "./PlusModelForm";
import './style.less'

export default function PlusForm({ config, setData }) {
  const [form] = Form.useForm();
  const requestData = {}

  function createInput(name, key, res) {
    return (
      <Input
        prefix={name}
        key={key}
        style={{
          width: res.width,
        }}
        onChange={debounce(function ({ target: { value } }) {
          requestData[key] = value
          instance.post(config.url, requestData).then((res) => {
            res.data.result.forEach((item, index) => {
              item.key = index
            })
            setData(res.data.result)
          })
        })}
      />
    )
  }

  function createSelect(name, key, res) {
    return (
      <Select
        key={key}
        placeholder={name}
        allowClear
        style={{
          width: res.width,
        }}
        options={res.options}
        onChange={(value) => {
          requestData[key] = value
          instance.post(config.url, requestData).then((res) => {
            res.data.result.forEach((item, index) => {
              item.key = index
            })
            setData(res.data.result)
          })
        }}
      />
    )
  }

  function createAdd(name, key, res) {
    return (
      <Button
        key={key}
        onClick={function () {
          Modal.confirm({
            icon: <></>,
            title: res.title || '',
            content: <PlusModelForm config={res.config} form={form} updateTable={updateTable} />,
            cancelText: '取消',
            okText: '提交',
            closable: true,
            onOk: function () {
              form.submit?.()
            },
          })
        }}
      >
        <PlusOutlined />
      </Button>
    )
  }

  const updateTable = function () {
    instance.post(config.url).then((res) => {
      res.data.result.forEach((item, index) => {
        item.key = index
      })
      setData(res.data.result)
    })
  }

  return (
    <div className='queryForm'>
      {
        config.data.map(({ type, name, key, ...res }) => {
          switch (type) {
            case 'Input':
              return createInput(name, key, res)
            case 'Select':
              return createSelect(name, key, res)
            case 'Add':
              return createAdd(name, key, res)
            default:
              return createInput(name, key)
          }
        })
      }
    </div>
  )
}