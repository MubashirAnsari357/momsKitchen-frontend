import axios from "axios";
import { API_URL } from "@env";

export const login = (email, password) => async (dispatch) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  try {
    
    dispatch({ type: "loginRequest" });
    if (!emailRegex.test(email)) {
      return dispatch({
        type: "loginFailure",
        payload: "Invalid Email format",
      });
    }

    const { data } = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFailure", payload: error.response.data.message });
  }
};

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${API_URL}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "verificationSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });

    const { data } = await axios.post(
      `${API_URL}/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgotPasswordSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });
    const { data } = await axios.put(
      `${API_URL}/resetotp`,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "verificationSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });
    const { data } = await axios.put(
      `${API_URL}/resetpassword`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "resetPasswordSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordRequest" });

      const { data } = await axios.put(
        `${API_URL}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "changePasswordSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "changePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (profileForm) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(`${API_URL}/updateProfile`, profileForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "updateProfileSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const { data } = await axios.get(`${API_URL}/logout`);
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${API_URL}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

export const getChefs = () => async (dispatch) => {
  try {
    dispatch({ type: "getChefsRequest" });

    const { data } = await axios.get(`${API_URL}/getchefs`);
    dispatch({ type: "getChefsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getChefsFailure", payload: error.response.data.message });
  }
};
