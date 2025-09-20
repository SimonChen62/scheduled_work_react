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
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    }
])
    
export default router