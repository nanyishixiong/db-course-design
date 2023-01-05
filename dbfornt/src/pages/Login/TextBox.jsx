import React, { useState } from 'react'
import { Input, Radio, Button, message } from 'antd';
import { debounce, instance } from '@/utils';
import { useNavigate } from 'react-router-dom';

export function TextBox({ btnText }) {
  const [identity, setIdentity] = useState('student')
  const [userName, setUseName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  function onChange3({ target: { value } }) {
    setIdentity(value)
  }
  const onChange2 = debounce(({ target: { value } }) => {
    setUseName(value)
  }, 500)
  const onChange1 = debounce(({ target: { value } }) => {
    setPassword(value)
  }, 500)

  const submit = function () {
    if (btnText === '登录') {
      instance.post('/users/login', JSON.stringify({
        user_name: userName,
        password: password,
        identity: identity,
      })).then((res) => {
        navigate('/Main')
        localStorage.setItem('user', JSON.stringify(res.data.result))
        instance.post('/department/queryDepartment').then((res) => {
          let department = {}
          res.data.result.forEach(item => {
            department[item.dept_id] = item.name
          })
          localStorage.setItem('department', JSON.stringify(department))
        })
        instance.post('/course/queryCourse').then((res) => {
          let course = {}
          res.data.result.forEach(item => {
            course[item.course_id] = item.name
          })
          localStorage.setItem('course', JSON.stringify(course))
        })
      }).catch((err) => {
        message.error(`${err.response.data.message}`)
      })
    } else {
      instance.post('/users/register', JSON.stringify({
        user_name: userName,
        password: password,
        identity: identity,
      }))
    }
  }

  return (
    <div id='input-contain'>
      <Radio.Group
        options={[
          { label: '学生', value: 'student' },
          { label: '老师', value: 'teacher' },
          { label: '管理员', value: 'admin' },
        ]}
        onChange={onChange3}
        value={identity}
        optionType="button"
      />
      <Input prefix={"账号"} size="large" onChange={onChange2} />
      <Input.Password prefix={"密码"} size="large" onChange={onChange1} />
      <Button style={{ width: "100px" }} size="large" onClick={submit}>{btnText}</Button>
    </div>
  )
}