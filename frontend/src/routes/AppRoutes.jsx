"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import PremiumCourses from "../pages/PremiumCourses"
import Checkout from "../pages/Checkout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return user ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/premium-courses" />} />
            <Route path="/premium-courses" element={<PremiumCourses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/checkout/:courseId"
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes
