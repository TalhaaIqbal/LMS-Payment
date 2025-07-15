"use client"

import { useState, useEffect } from "react"
import CourseCard from "../components/CourseCard"
import axiosInstance from "../api/axiosInstance"

const PremiumCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get("/api/courses")
            setCourses(response.data)
        } catch (error) {
            setError("Failed to fetch courses")
            console.error("Error fetching courses:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading courses...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button onClick={fetchCourses} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Courses</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Unlock your potential with our premium course collection. Learn from industry experts and advance your
                        career.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No premium courses available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PremiumCourses
