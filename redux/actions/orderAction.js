import axios from "axios";
import { API_URL } from "@env";

export const placeOrder =
  (orderId, basket, deliveryAddress, name, email, phone, totalAmount) =>
  async (dispatch) => {
    try {
      
      dispatch({ type: "placeOrderRequest" });
      const { data } = await axios.post(
        `${API_URL}/placeorder`,
        { orderId, basket, deliveryAddress, name, email, phone, totalAmount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "placeOrderSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "placeOrderFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "getUserOrdersRequest" });

    const { data } = await axios.get(`${API_URL}/getmyorders/${userId}`);
    dispatch({ type: "getUserOrdersSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getUserOrdersFailure",
      payload: error.response.data.message,
    });
  }
};

export const getChefOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "getChefOrdersRequest" });

    const { data } = await axios.get(`${API_URL}/getcheforders/`);
    dispatch({ type: "getChefOrdersSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getChefOrdersFailure",
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "getOrderDetailsRequest" });

    const { data } = await axios.get(`${API_URL}/getorderdetails/${orderId}`);
    dispatch({ type: "getOrderDetailsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getOrderDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateOrderStatus = (orderId, orderStatus) => async (dispatch) => {
  try {
    dispatch({ type: "updateOrderStatusRequest" });
    const { data } = await axios.put(
      `${API_URL}/updateorderstatus/${orderId}`,
      { orderStatus },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "updateOrderStatusSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateOrderStatusFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateDeliveryStatus = (orderId, deliveryStatus) => async (dispatch) => {
    try {
      dispatch({ type: "updateDeliveryStatusRequest" });
      const { data } = await axios.put(
        `${API_URL}/updatedeliverystatus/${orderId}`,
        { deliveryStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "updateDeliveryStatusSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateDeliveryStatusFailure",
        payload: error.response.data.message,
      });
    }
  };
