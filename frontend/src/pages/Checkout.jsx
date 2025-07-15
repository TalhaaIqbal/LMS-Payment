"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import StripeCheckoutForm from "../components/StripeCheckoutForm"
import PayPalButtonsWrapper from "../components/PaypalButtonsWrapper"
import axiosInstance from "../api/axiosInstance"
import { useAuth } from "../context/AuthContext"


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const Checkout = () => {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const { user, addPremiumCourse } = useAuth()

    const [course, setCourse] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("stripe")
    const [clientSecret, setClientSecret] = useState("")
    const [paypalOrderId, setPaypalOrderId] = useState("")
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate("/login")
            return
        }
        fetchCourse()
    }, [courseId, user, navigate])

    const fetchCourse = async () => {
        try {
            const response = await axiosInstance.get(`/api/courses/${courseId}`)
            setCourse(response.data)
        } catch (error) {
            setError("Failed to fetch course details")
            console.error("Error fetching course:", error)
        } finally {
            setLoading(false)
        }
    }

    const createOrder = async (method) => {
        setProcessing(true)
        setError("")

        try {
            const response = await axiosInstance.post("/api/payment/create-order", {
                courseId,
                paymentMethod: method,
            })

            if (method === "stripe") {
                setClientSecret(response.data.clientSecret)
            } else if (method === "paypal") {
                setPaypalOrderId(response.data.orderId)
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create order")
        } finally {
            setProcessing(false)
        }
    }

    const confirmPayment = async (orderId) => {
        try {
            const response = await axiosInstance.post("/api/payment/confirm-payment", {
                orderId,
                paymentMethod,
                courseId,
            })

            setSuccess(true)
            addPremiumCourse(course)

            setTimeout(() => {
                navigate("/premium-courses")
            }, 3000)
        } catch (error) {
            setError(error.response?.data?.message || "Payment confirmation failed")
        }
    }

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method)
        setClientSecret("")
        setPaypalOrderId("")
        setError("")
    }

    const handleStripeSuccess = async () => {
        const paymentIntentId = clientSecret.split("_secret_")[0]
        await confirmPayment(paymentIntentId)
    }

    const handlePayPalSuccess = async () => {
        await confirmPayment(paypalOrderId)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Course not found</p>
                    <button
                        onClick={() => navigate("/premium-courses")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">You now have access to "{course.title}". Redirecting to courses...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Course Details */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
                        <p className="text-gray-600 mb-4">{course.description}</p>

                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Instructor:</span> {course.instructor}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Duration:</span> {course.duration}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Level:</span> {course.level}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Category:</span> {course.category}
                            </p>
                        </div>

                        <div className="text-3xl font-bold text-green-600">${course.price}</div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h3>

                        {/* Payment Method Selection */}
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => handlePaymentMethodChange("stripe")}
                                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${paymentMethod === "stripe"
                                        ? "border-blue-600 bg-blue-50 text-blue-600"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                                    }`}
                            >
                                Credit Card (Stripe)
                            </button>
                            <button
                                onClick={() => handlePaymentMethodChange("paypal")}
                                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${paymentMethod === "paypal"
                                        ? "border-blue-600 bg-blue-50 text-blue-600"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                                    }`}
                            >
                                Other
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>
                        )}

                        {/* Payment Forms */}
                        {paymentMethod === "stripe" && (
                            <div>
                                {!clientSecret ? (
                                    <button
                                        onClick={() => createOrder("stripe")}
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                    >
                                        {processing ? "Creating Order..." : "Continue with Stripe"}
                                    </button>
                                ) : (
                                    <Elements
                                        stripe={stripePromise}
                                        options={{
                                            clientSecret,
                                            appearance: {
                                                theme: "stripe",
                                            },
                                        }}
                                    >
                                        <StripeCheckoutForm
                                            clientSecret={clientSecret}
                                            onSuccess={handleStripeSuccess}
                                            onError={setError}
                                        />
                                    </Elements>
                                )}
                            </div>
                        )}

                        {paymentMethod === "paypal" && (
                            <div>
                                {!paypalOrderId ? (
                                    <button
                                        onClick={() => createOrder("paypal")}
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                    >
                                        {processing ? "Creating Order..." : "Continue with PayPal"}
                                    </button>
                                ) : (
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                                            currency: "USD",
                                        }}
                                    >
                                        <PayPalButtonsWrapper orderId={paypalOrderId} onSuccess={handlePayPalSuccess} onError={setError} />
                                    </PayPalScriptProvider>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
