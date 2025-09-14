import { useParams , useSearchParams , useNavigate} from "react-router-dom"
import React from "react"
import {Card, Form, Input, Button, message} from 'antd'
import axios from "axios"
import request from '@/utils/request' // 路径根据你的文件位置调整

const Register = () => {

    //const [params] = useSearchParams()
    //const id = params.get('id')

    //const params = useParams()
    //const id = params.id
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
        try{//try某一步错了就会直接进入catch
            if (values.password !== values.password2) {
                alert('password is not same')
                return
            }
            const response = await request.post('/register', {
                username: values.username,
                password: values.password
            })
            alert('registered successfully')
            navigate('/login') // 跳转到登录页面; 
        }catch (error) { 
             if (error.response && error.response.data.error) {
                alert(error.response.data.error) //就是直接获取的后端返回json格式，直接输出
            } else {
                alert('register failed')
            }
        }

    }
    return (
        <div >
            <Card  title="Register Page">
                <Form onFinish={onFinish}>
                    <Form.Item rules={rules.username} name='username'>
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item rules={rules.password} name='password'>
                        <Input placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item rules={rules.password2} name='password2'> 
                        <Input placeholder="Enter your password again" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Register