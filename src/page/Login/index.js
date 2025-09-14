import { useParams , useSearchParams , useNavigate} from "react-router-dom"
import React from "react"
import {Card, Form, Input, Button, message} from 'antd'
import axios from "axios"
import request from '@/utils/request' // 路径根据你的文件位置调整


const Login = () => {

    //const [params] = useSearchParams()
    //const id = params.get('id')

    //const params = useParams()
    //const id = params.id
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
            //settingStorage.setItem('user', JSON.stringify(response.data.user))
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
        <div >
            <Card  title="Login Page">
                <Form onFinish={onFinish}>
                    <Form.Item rules={rules.username} name="username">
                        <Input placeholder="Enter your username"  />
                    </Form.Item>
                    <Form.Item rules={rules.password} name="password" >
                        <Input placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
    }

export default Login