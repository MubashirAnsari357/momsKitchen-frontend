import axios from "axios";
import { API_URL } from "@env";

export const addFeedback =
  (dishId, rating, feedbackDesc) => async (dispatch) => {
    try {
      
      
      dispatch({ type: "addFeedbackRequest" });
      const { data } = await axios.post(
        `${API_URL}/addfeedback/${dishId}`,
        { rating, feedbackDesc },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "addFeedbackSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "addFeedbackFailure",
        payload: error.response.data.message,
      });
    }
  };


export const updateFeedback =
  (feedbackId, rating, feedbackDesc) => async (dispatch) => {
    try {
      
      dispatch({ type: "updateFeedbackRequest" });
      const { data } = await axios.put(
        `${API_URL}/updatefeedback/${feedbackId}`,
        { rating, feedbackDesc },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updateFeedbackSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateFeedbackFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getDishFeedbacks = (dishId) => async (dispatch) => {
  try {
    dispatch({ type: "getDishFeedbackRequest" });
    const { data } = await axios.get(`${API_URL}/getdishfeedbacks/${dishId}`);
    dispatch({ type: "getDishFeedbackSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getDishFeedbackFailure",
      payload: error.response.data.message,
    });
  }
};

export const getChefFeedbacks = (chefId) => async (dispatch) => {
  try {
    dispatch({ type: "getChefFeedbacksRequest" });
    const { data } = await axios.get(`${API_URL}/getcheffeedbacks/${chefId}`);
    dispatch({ type: "getChefFeedbacksSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getChefFeedbacksFailure",
      payload: error.response.data.message,
    });
  }
};

