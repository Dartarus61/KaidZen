import { Navigate } from "react-router-dom"
import Login from "../../pages/Login/Login"
import Register from "../../pages/Register/Register"
import Profile from "../../pages/Profile/Profile"
import SendSuggest from "../../pages/SendSuggest/SendSuggest"
import GetSaggestions from "../../pages/GetSaggestions/GetSaggestions"
import AdminPanel from "../../pages/AdminPanel/AdminPanel"
import AllSuggestions from "../../pages/AllSuggestions/AllSuggestions"

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
    {path: "/saggestions", element: <GetSaggestions />},
    {path: "/profile", element: <Profile />},
    {path: "*", element: <Navigate to="/profile" replace />},
]

export const adminRoutes = [
    {path: "/allSuggestions", element: <AllSuggestions />},
    {path: "/admin", element: <AdminPanel />},
    {path: "*", element: <Navigate to="/admin" replace />},
]