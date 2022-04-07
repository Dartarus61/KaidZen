import { Navigate } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Profile from "../Profile/Profile"
import SendSuggest from "../SendSuggest/SendSuggest"

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />},
]

export const userRoutes = [
    {path: "/send", element: <SendSuggest />},
    {path: "/profile", element: <Profile />},
    {path: "*", element: <Navigate to="/profile" replace />},
]

export const glavaRoutes = [
    {path: "/send", element: <SendSuggest />},
    {path: "/profile", element: <Profile />},
    {path: "*", element: <Navigate to="/user" replace />},
]

export const adminRoutes = [
    {path: "/send", element: <SendSuggest />},
    {path: "/profile", element: <Profile />},
    {path: "*", element: <Navigate to="/user" replace />},
]