// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // 检查用户是否已登录（基于localStorage中的用户信息）
    const isAuthenticated = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    // 如果用户未认证，重定向到登录页面
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // 如果用户已认证，渲染子组件
    return children;
};

export default ProtectedRoute;