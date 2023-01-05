import React from 'react'
import { Tabs } from 'antd';
import './style.less'
import { TextBox } from './TextBox';
export default function Login() {

  const onChange = function () { }


  return (
    <>
      <h1 id='title'>教学管理系统</h1>
      <div id='login-contain'>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: '登录',
              key: '1',
              children: <TextBox btnText={"登录"} />,
            },
            {
              label: '注册',
              key: '2',
              children: <TextBox btnText={"注册"} />,
            }
          ]}
        />
      </div>
    </>
  )
}
