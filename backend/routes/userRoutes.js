const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const User = require("../models/User")

const router = express.Router()

router.get("/premium-courses", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("premiumCourses.courseId")
    const premiumCourses = user.premiumCourses.map((pc) => ({
      course: pc.courseId,
      purchaseDate: pc.purchaseDate,
      paymentMethod: pc.paymentMethod,
    }))

    res.json(premiumCourses)
  } catch (error) {
    console.error("Get premium courses error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
