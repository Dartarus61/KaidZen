import { Navigate } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Profile from "../Profile/Profile"

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/profile", element: <Profile />},
    {path: "*", element: <Navigate to="/login" replace />},
]

export const userRoutes = [
    {path: "*", element: <Navigate to="/user" replace />},
]

export const glavaRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />},
]

export const adminRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />},
]