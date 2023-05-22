import axios from "axios";
import { API_URL } from "@env";

export const paymentVerification = (orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature) => async (dispatch) => {
  try {
    dispatch({ type: "paymentVerificationRequest" });
    const { data } = await axios.put(
      `${API_URL}/paymentVerification/${orderId}`,
      { razorpay_payment_id, razorpay_order_id, razorpay_signature },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "paymentVerificationSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "paymentVerificationFailure",
      payload: error.response.data.message,
    });
  }
};
