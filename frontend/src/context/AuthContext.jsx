"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axiosInstance from "../api/axiosInstance"

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [premiumCourses, setPremiumCourses] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        if (token && userData) {
            setUser(JSON.parse(userData))
            fetchPremiumCourses()
        }
        setLoading(false)
    }, [])

    const fetchPremiumCourses = async () => {
        try {
            const response = await axiosInstance.get("/api/user/premium-courses")
            setPremiumCourses(response.data)
        } catch (error) {
            console.error("Error fetching premium courses:", error)
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email,
                password,
            })

            const { token, user: userData } = response.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(userData))

            setUser(userData)
            await fetchPremiumCourses()

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            }
        }
    }

    const register = async (name, email, password) => {
        try {
            const response = await axiosInstance.post("/api/auth/register", {
                name,
                email,
                password,
            })

            const { token, user: userData } = response.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(userData))

            setUser(userData)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed",
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setPremiumCourses([])
    }

    const hasPremiumAccess = (courseId) => {
        return premiumCourses.some((pc) => pc.course._id === courseId)
    }

    const addPremiumCourse = (course) => {
        setPremiumCourses((prev) => [...prev, { course, purchaseDate: new Date() }])
    }

    const value = {
        user,
        loading,
        premiumCourses,
        login,
        register,
        logout,
        hasPremiumAccess,
        addPremiumCourse,
        fetchPremiumCourses,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
