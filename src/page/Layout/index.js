import { useParams , useSearchParams ,Link,Outlet, useLocation} from "react-router-dom"
import {Typography, Layout , Menu, App, Button} from 'antd'; //这不是一个单一的组件，而是包含多个相关组件的对象
import { DesktopOutlined ,AppstoreOutlined,MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';
import React, { useState , useEffect} from 'react'

const{Title} = Typography; //等价于 const Title = Typogrphy.Title;直接命名一样的
const{ Header, Content, Sider } = Layout;
const menuItems =[
    {key:'Account' , icon:<DesktopOutlined/> ,label:'Account' , children :[
        {key:'/login' , label:<Link to ="/login">Login</Link>},
        {key:'/register' , label:<Link to ="/register">Register</Link>},
    ]},
    {key:'Function' ,icon:<AppstoreOutlined/>, label:'Function' , children :[
        {key:'/dashboard' , label:<Link to ="/dashboard">Dashboard</Link>}
        ]
    }
];

//用于当前路径被访问时，可以自动找到菜单栏里的key
const getOpenKeys = (pathname) => {
    for (const item of menuItems){
        if(item.children && item.children.some(child => child.key === pathname)){
            return [item.key]; //返回父级菜单的key
        }
    }
    return [];//没找到
}
const Article = () => {
    const [collapsed, setCollapsed] = useState(false);//侧边栏收起状态
    const location = useLocation(); //1.从react-router-dom获取location对象
    const defaultOpenKeys = getOpenKeys(location.pathname);

    return (
        <Layout style={{minHeight:'100vh'}}>
            <Sider  collapsible collapsed={collapsed}>
                <Menu
                    theme='dark'
                    mode ='inline'
                    selectedKeys={[location.pathname]} 
                    
                    defaultOpenKeys={defaultOpenKeys} 
                    items={menuItems}
                />
                {/*这三个都是默认的，item是辅助，给出查询的目标，前面两个一个自动高光，一个自动展开菜单栏 */}
            </Sider>
            <Layout>
                <Header style={{padding:0, background:'#fff'}}>
                    <Button type="text" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} onClick={() => setCollapsed(!collapsed)} style={{fontSize:'16px', width:64, height:64}} />
                    <Title level={3} style={{ display: 'inline-block', marginLeft: '16px', verticalAlign: 'middle', margin: 0 }}>
                        Timed Scheduling System
                    </Title>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
                    {/* 子页面会在这里显示 */}
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
    
};
export default Article;