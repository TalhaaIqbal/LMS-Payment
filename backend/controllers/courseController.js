const Course = require("../models/Course")

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPremium: true }).sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    console.error("Get courses error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    res.json(course)
  } catch (error) {
    console.error("Get course error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { getAllCourses, getCourseById }
