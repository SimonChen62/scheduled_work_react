// src/router/index.js
import Login from '@/page/Login'
import Register from '@/page/Register'
import Layout from '@/page/Layout'
import Dashboard from '@/page/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
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
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            }
        ]
    }
])
    
export default router