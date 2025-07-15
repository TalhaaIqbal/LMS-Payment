"use client"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const CourseCard = ({ course }) => {
    const navigate = useNavigate()
    const { user, hasPremiumAccess } = useAuth()

    const hasAccess = hasPremiumAccess(course._id)

    const handleBuyNow = () => {
        if (!user) {
            navigate("/login")
            return
        }
        navigate(`/checkout/${course._id}`)
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">By {course.instructor}</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.level}</span>
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">{course.category}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">${course.price}</span>

                    {hasAccess ? (
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-default" disabled>
                            ✓ Purchased
                        </button>
                    ) : (
                        <button
                            onClick={handleBuyNow}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Buy Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
