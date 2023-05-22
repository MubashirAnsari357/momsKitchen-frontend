import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBasket = async (userId) => {
  const basketKey = `basket-${userId}`;
  try {
    const basket = await AsyncStorage.getItem(basketKey);
    return basket ? JSON.parse(basket) : { items: [], total: 0 };
  } catch (error) {
    console.log("Error getting basket:", error);
    return { items: [], total: 0 };
  }
};

export const setBasket = async (userId, basket) => {
  const basketKey = `basket-${userId}`;
  try {
    await AsyncStorage.setItem(basketKey, JSON.stringify(basket));
  } catch (error) {
    console.log("Error setting basket:", error);
  }
};

export const removeBasket = async (userId) => {
  const basketKey = `basket-${userId}`;
  try {
    await AsyncStorage.removeItem(basketKey);
  } catch (error) {
    console.log("Error Removing basket:", error);
  }
};
