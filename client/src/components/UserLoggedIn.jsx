import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

const UserLoggedIn = ({children}) => {
  const user = localStorage.getItem("user")
  return user ? <Navigate to="/dashboard" /> : children
}

export default UserLoggedIn