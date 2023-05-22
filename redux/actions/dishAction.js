import axios from "axios";
import { API_URL } from "@env";

export const getDishes = () => async (dispatch) => {
  try {
  
    dispatch({ type: "getDishesRequest" });
    const { data } = await axios.get(`${API_URL}/getdishes`);
    dispatch({ type: "getDishesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getDishesFailure",
      payload: error.response.data.message,
    });
  }
};

export const getDishDetails = (dishId) => async (dispatch) => {
  try {
    dispatch({ type: "getDishDetailsRequest" });
    const { data } = await axios.get(`${API_URL}/getdishdetails/${dishId}`);
    dispatch({ type: "getDishDetailsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getDishDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getChefDishes = (chefId) => async (dispatch) => {
  try {
    dispatch({ type: "chefDishesRequest" });

    const { data } = await axios.get(`${API_URL}/getchefdishes/${chefId}`);
    dispatch({ type: "chefDishesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "chefDishesFailure",
      payload: error.response.data.message,
    });
  }
};

export const getSearchDishes = (search, sort, type) => async (dispatch) => {
  try {
    dispatch({ type: "getSearchDishesRequest" });
    const { data } = await axios.get(
      `${API_URL}/search?type=${type}&sort=${sort}&search=${search}`
    );
    dispatch({ type: "getSearchDishesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getDishesFailure",
      payload: error.message,
    });
    console.log(error.message);
  }
};

export const addDish = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "addDishRequest" });
    const { data } = await axios.post(`${API_URL}/adddish`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "addDishSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addDishFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateDish = (dishId, formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateDishRequest" });
    const { data } = await axios.put(`${API_URL}/updatedish/${dishId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "updateDishSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateDishFailure",
      payload: error.response.data.message,
    });
  }
};


export const deleteDish = (dishId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteDishRequest" });
    const { data } = await axios.delete(`${API_URL}/deletedish/${dishId}`);

    dispatch({ type: "deleteDishSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteDishFailure",
      payload: error.response.data.message,
    });
  }
};
