import { useNavigate } from "react-router-dom"
import React from "react"
import {Card, Form, Input, Button} from 'antd'
import request from '@/utils/request'

const Register = () => {
    const navigate = useNavigate()
    const rules={
        username:[
            {required:true,message:'Please input your username'},
        ],
        password:[
            {required:true, message:'please input your password'},
        ],
        password2:[
            {required:true, message:'please input your password again'},
        ]
    }
    
    const onFinish = async (values) => {
        try{
            if (values.password !== values.password2) {
                alert('password is not same')
                return
            }
            const response = await request.post('/register', {
                username: values.username,
                password: values.password
            })
            alert('registered successfully')
            navigate('/login')
        }catch (error) { 
             if (error.response && error.response.data.error) {
                alert(error.response.data.error)
            } else {
                alert('register failed')
            }
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
            <div style={{ width: '400px' }}>
                <Card title="Register Page" style={{ textAlign: 'center' }}>
                    <Form onFinish={onFinish}>
                        <Form.Item rules={rules.username} name='username'>
                            <Input placeholder="Enter your username" />
                        </Form.Item>
                        <Form.Item rules={rules.password} name='password'>
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>
                        <Form.Item rules={rules.password2} name='password2'> 
                            <Input.Password placeholder="Enter your password again" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>Register</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" onClick={() => navigate('/login')} block>
                                Already have account? Login now
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
export default Register