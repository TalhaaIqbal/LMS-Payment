const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const paypal = require("@paypal/checkout-server-sdk")
const paypalClient = require("../utils/paypalClient")
const Course = require("../models/Course")
const User = require("../models/User")

const createOrder = async (req, res) => {
  try {
    const { courseId, paymentMethod } = req.body
    const userId = req.user._id

    // Get course details
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Check if user already owns the course
    const user = await User.findById(userId)
    const alreadyOwned = user.premiumCourses.some((pc) => pc.courseId.toString() === courseId)
    if (alreadyOwned) {
      return res.status(400).json({ message: "Course already purchased" })
    }

    if (paymentMethod === "stripe") {
      // Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(course.price * 100), // Convert to cents
        currency: "usd",
        metadata: {
          courseId: courseId,
          userId: userId.toString(),
          courseName: course.title,
        },
      })

      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId: paymentIntent.id,
      })
    } else if (paymentMethod === "paypal") {
      // Create PayPal Order
      const request = new paypal.orders.OrdersCreateRequest()
      request.prefer("return=representation")
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: course.price.toString(),
            },
            description: course.title,
            custom_id: `${userId}_${courseId}`,
          },
        ],
      })

      const order = await paypalClient.execute(request)
      res.json({
        orderId: order.result.id,
      })
    } else {
      res.status(400).json({ message: "Invalid payment method" })
    }
  } catch (error) {
    console.error("Create order error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const confirmPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, courseId } = req.body
    const userId = req.user._id

    let paymentConfirmed = false
    let transactionId = orderId

    if (paymentMethod === "stripe") {
      // Verify Stripe payment
      const paymentIntent = await stripe.paymentIntents.retrieve(orderId)
      paymentConfirmed = paymentIntent.status === "succeeded"
    } else if (paymentMethod === "paypal") {
      // Capture PayPal payment
      const request = new paypal.orders.OrdersCaptureRequest(orderId)
      request.requestBody({})

      const capture = await paypalClient.execute(request)
      paymentConfirmed = capture.result.status === "COMPLETED"
      transactionId = capture.result.id
    }

    if (paymentConfirmed) {
      // Add course to user's premium courses
      await User.findByIdAndUpdate(userId, {
        $push: {
          premiumCourses: {
            courseId,
            paymentMethod,
            transactionId,
            purchaseDate: new Date(),
          },
        },
      })

      const course = await Course.findById(courseId)
      res.json({
        message: "Payment confirmed and course unlocked",
        course: {
          id: course._id,
          title: course.title,
        },
      })
    } else {
      res.status(400).json({ message: "Payment not confirmed" })
    }
  } catch (error) {
    console.error("Confirm payment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { createOrder, confirmPayment }
