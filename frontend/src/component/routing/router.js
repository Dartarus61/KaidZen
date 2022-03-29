import { Navigate } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />},
]