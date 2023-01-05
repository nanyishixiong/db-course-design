import React, { useState } from 'react'
import { Menu, Layout, Dropdown, Button } from 'antd'
import menuConfig from './menuconfig'
import { useNavigate, Outlet } from 'react-router-dom'
const { Header, Content, Sider } = Layout

export default function Main() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate();
  const onSelect = function ({ item, key, keyPath, domEvent }) {
    navigate(`/Main${key}`)
  }

  return (
    <Layout style={{ minHeight: '97vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          onSelect={onSelect}
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={menuConfig}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>
          <Dropdown trigger={['click']} menu={{
            items: [
              {
                key: '1',
                label: <Button type="text"
                  onClick={() => {
                    navigate(`/Login`)
                    localStorage.clear()
                  }}>退出登录</Button>,
              },
            ]
          }}>
            <a onClick={(e) => e.preventDefault()}>
              用户名：{JSON.parse(localStorage.getItem('user')).user_name}
            </a>
          </Dropdown>
        </Header>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
