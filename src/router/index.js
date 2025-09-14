import Login from '@/page/Login'
import Register from '@/page/Register'
import Layout from '@/page/Layout'
import Dashboard from '@/page/Dashboard'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {   
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
        
    }
])
    
export default router