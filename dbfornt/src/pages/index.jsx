import React from 'react'
import { Navigate } from 'react-router-dom'

export default function index() {
  // 路由 '/' 重定向到 '/Login'
  return <Navigate to={'/Login'} replace={true} />
}
