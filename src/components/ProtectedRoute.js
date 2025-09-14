// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import request from '@/utils/request';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await request.get('/'); // 或者其他需要验证的端点
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>检查登录状态中...</div>; // 加载中状态
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;