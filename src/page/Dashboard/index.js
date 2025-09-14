// src/page/Dashboard/index.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Table, message, Upload, Modal } from "antd";
import { UploadOutlined, PlayCircleOutlined, StopOutlined } from "@ant-design/icons";
import request from "@/utils/request";

const Dashboard = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await request.get('/get-task');
            setTasks(response.data.tasks);
        } catch (error) {
            if (error.response?.status === 401) {
                alert('please login firstly');
                navigate('/login');
            } else {
                alert('fail to get');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleUpload = async () => {
        const formData = new FormData();
        
        fileList.forEach(file => {
            formData.append('script', file);
        });

        try {
            const response = await request.post('/upload_task', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const returnedPath = response.data.script_path;
            
            // 正确更新表单字段的值
            form.setFieldsValue({
                script_path: returnedPath
            });
            
            alert('脚本上传成功');
            setIsModalVisible(false);
            setFileList([]);
        } catch (error) {
            alert('脚本上传失败: ' + (error.response?.data?.error || '未知错误'));
        }
    };

    const handleCreateTask = async (values) => {
        try {
            await request.post('/create_task', values);
            alert('任务创建成功');
            fetchTasks();
        } catch (error) {
            alert('任务创建失败: ' + (error.response?.data?.error || '未知错误'));
        }
    };

    const startTask = async (taskId) => {
        try {
            await request.post(`/start/${taskId}`);
            alert('任务已启动');
            fetchTasks();
        } catch (error) {
            alert('启动任务失败: ' + (error.response?.data?.error || '未知错误'));
        }
    };

    const stopTask = async (taskId) => {
        try {
            await request.post(`/stop/${taskId}`);
            alert('任务已停止');
            fetchTasks();
        } catch (error) {
            alert('停止任务失败: ' + (error.response?.data?.error || '未知错误'));
        }
    };

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'task_name',
            key: 'task_name',
        },
        {
            title: '脚本路径',
            dataIndex: 'script_path',
            key: 'script_path',
        },
        {
            title: 'Cron表达式',
            dataIndex: 'cron_expr',
            key: 'cron_expr',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{ 
                    color: status === 'running' ? 'green' : 'red',
                    fontWeight: 'bold'
                }}>
                    {status === 'running' ? '运行中' : '已停止'}
                </span>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <div>
                    {record.status === 'running' ? (
                        <Button 
                            type="primary" 
                            danger 
                            icon={<StopOutlined />}
                            onClick={() => stopTask(record.id)}
                            size="small"
                        >
                            停止
                        </Button>
                    ) : (
                        <Button 
                            type="primary" 
                            icon={<PlayCircleOutlined />}
                            onClick={() => startTask(record.id)}
                            size="small"
                        >
                            启动
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const uploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    };

    return (
        <div>
            <Card 
                title="任务调度系统" 
                extra={
                    <Button type="primary" onClick={() => setIsModalVisible(true)}>
                        上传脚本
                    </Button>
                }
            >
                <Table 
                    dataSource={tasks} 
                    columns={columns} 
                    loading={loading}
                    rowKey="id"
                />
            </Card>

            <Card title="创建任务" style={{ marginTop: 20 }}>
                <Form form={form} onFinish={handleCreateTask} layout="vertical">
                    <Form.Item 
                        label="任务名称" 
                        name="task_name"
                        rules={[{ required: true, message: '请输入任务名称' }]}
                    >
                        <Input placeholder="请输入任务名称" />
                    </Form.Item>
                    
                    <Form.Item 
                        label="脚本路径" 
                        name="script_path"
                        rules={[{ required: true, message: '请输入脚本路径' }]}
                    >
                        <Input placeholder="请输入脚本路径" />
                    </Form.Item>
                    
                    <Form.Item 
                        label="Cron表达式" 
                        name="cron_expr"
                        rules={[{ required: true, message: '请输入Cron表达式' }]}
                    >
                        <Input placeholder="例如: 0 0 * * * (每天凌晨执行)" />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            创建任务
                        </Button>
                        <Button style={{ marginLeft: 10 }} onClick={fetchTasks}>
                            刷新列表
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Modal 
                title="上传脚本文件"
                visible={isModalVisible}
                onOk={handleUpload}
                onCancel={() => setIsModalVisible(false)}
            >
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
            </Modal>
        </div>
    );
};

export default Dashboard;