import { Link, Outlet, useLocation } from "react-router-dom"
import { Typography, Layout, Menu, Button } from 'antd'
import { AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const { Title } = Typography
const { Header, Content, Sider } = Layout

const menuItems = [
    {
        key: 'Function',
        icon: <AppstoreOutlined />,
        label: 'Function',
        children: [
            { key: '/dashboard', label: <Link to="/dashboard">Dashboard</Link> }
        ]
    }
]

// 用于当前路径被访问时，可以自动找到菜单栏里的key
const getOpenKeys = (pathname) => {
    for (const item of menuItems) {
        if (item.children && item.children.some(child => child.key === pathname)) {
            return [item.key] // 返回父级菜单的key
        }
    }
    return [] // 没找到
}

const Article = () => {
    const [collapsed, setCollapsed] = useState(false) // 侧边栏收起状态
    const location = useLocation()
    const navigate = useNavigate()
    const defaultOpenKeys = getOpenKeys(location.pathname)

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed}>
                <div style={{ 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>
                    {collapsed ? 'TSS' : 'Timed Scheduling'}
                </div>
                <Menu
                    theme='dark'
                    mode='inline'
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={defaultOpenKeys}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', display: 'flex', alignItems: 'center' }}>
                    <Button 
                        type="text" 
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                        onClick={() => setCollapsed(!collapsed)} 
                        style={{ fontSize: '16px', width: 64, height: 64 }} 
                    />
                    <Title 
                        level={3} 
                        style={{ 
                            display: 'inline-block', 
                            marginLeft: '16px', 
                            verticalAlign: 'middle', 
                            margin: 0 
                        }}
                    >
                        Timed Scheduling System
                    </Title>
                    <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
                        <Button onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
                    {/* 子页面会在这里显示 */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Article