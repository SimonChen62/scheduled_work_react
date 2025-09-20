import { useNavigate } from "react-router-dom"
import React from "react"
import {Card, Form, Input, Button} from 'antd'
import request from '@/utils/request'

const Login = () => {
    const navigate = useNavigate()
    const rules = {
        username: [
            { required: true, message: 'please input your username' },
        ],
        password: [
            { required: true, message: 'please input your password' },
        ]
    }
    const onFinish = async (values) => {
        try {
            const response = await request.post('/login', {
                username: values.username,
                password: values.password
            })
            
            // 登录成功提示
            alert('login successfully')
            // 保存用户信息到本地存储
            localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/dashboard') // 登录成功后跳转到主页
        } catch (error) {
            // 登录失败提示
            if (error.response && error.response.data.error) {
                alert(error.response.data.error)
            } else {
                alert('something else went wrong')
            }
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
            <div style={{ width: '400px' }}>
                <Card title="Login Page" style={{ textAlign: 'center' }}>
                    <Form onFinish={onFinish}>
                        <Form.Item rules={rules.username} name="username">
                            <Input placeholder="Enter your username" />
                        </Form.Item>
                        <Form.Item rules={rules.password} name="password">
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>Login</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" onClick={() => navigate('/register')} block>
                                No account? Register now
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login