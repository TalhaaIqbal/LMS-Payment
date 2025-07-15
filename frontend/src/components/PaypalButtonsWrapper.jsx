import { PayPalButtons } from "@paypal/react-paypal-js"

const PayPalButtonsWrapper = ({ orderId, onSuccess, onError }) => {
    return (
        <PayPalButtons
            createOrder={() => orderId}
            onApprove={async (data, actions) => {
                try {
                    await actions.order.capture()
                    onSuccess()
                } catch (error) {
                    onError("PayPal payment failed")
                }
            }}
            onError={(error) => {
                console.error("PayPal error:", error)
                onError("PayPal payment failed")
            }}
            style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
            }}
        />
    )
}

export default PayPalButtonsWrapper
