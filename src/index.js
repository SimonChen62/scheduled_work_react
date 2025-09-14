//项目入口

//必要的核心包

import React from 'react'
import ReactDOM from 'react-dom/client'
//导入路由包
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
//导入项目根组件
import Praroute from './practice/praroute'

import router from './router'


//把app组件渲染到页面上 id为root的dom节点上

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
)
