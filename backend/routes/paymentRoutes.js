const express = require("express")
const { createOrder, confirmPayment } = require("../controllers/paymentController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create-order", authMiddleware, createOrder)
router.post("/confirm-payment", authMiddleware, confirmPayment)

module.exports = router
