import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import BasketDish from "../components/BasketDish";
import { useDispatch, useSelector } from "react-redux";
import { getBasket } from "../utils/basket";
import { addItem, decrementQuantity, removeItem } from "../redux/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Basket = ({ navigation }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [basket, setBasket] = useState({ items: [], total: 0 });

  useEffect(() => {
    const fetchBasket = async () => {
      if (isAuthenticated) {
        const basketData = await getBasket(user._id);
        if(basketData){
          setBasket(basketData);
        }
      }
    };

    fetchBasket();
  }, [isAuthenticated, user]);

  const updateBasketState = async () => {
    const updatedBasket = await getBasket(user?._id);
    setBasket(updatedBasket);
  };

  const onDecrementQuantity = async (_id, userId) => {
    await dispatch(decrementQuantity({ _id, userId }));
    updateBasketState();
  };

  const onAddItem = async (_id, name, chefName, chefId, price, photo, userId)=> {
    let item = {
      _id: _id,
      name: name,
      chefName: chefName,
      chefId: chefId,
      price: price,
      photo: photo,
      quantity: 1,
      itemTotal: 0,
      userId: userId
    };
    await dispatch(addItem(item));
    updateBasketState();
  }

  const onRemoveItem = async (_id, userId) => {
    await dispatch(removeItem({ _id, userId }));
    updateBasketState();
  }

  return (
    <>
      {basket?.items.length > 0 && (
        <View className="absolute bottom-0 z-50 w-full bg-white py-2 shadow-2xl shadow-black">
          <TouchableOpacity
            onPress={() => navigation.replace("Checkout")}
            className="flex-row justify-center space-x-2 items-center p-3 mx-4 rounded-full bg-[#5E72EB] shadow shadow-black"
          >
            <Text className="text-center font-semibold text-white text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="bg-white py-4 flex-row justify-between items-center px-6 shadow-md shadow-black z-50">
          <Text className="text-black font-semibold text-xl">Basket</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close-outline" color="#262525" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView className="mt-4">
          {basket?.items.length < 1 && basket ? (
            <View className="flex-1 my-44 justify-center items-center space-y-4">
              <Image
                source={require("../assets/shopping-basket.gif")}
                className="h-28 w-28 rounded-xl"
              />
              <View className="justify-center items-center">
                <Text className="text-lg">Your Basket is empty!</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserTabNavigation", { screen: "Home" })
                  }
                >
                  <Text className="text-lg text-[#5E72EB]">Go Shopping</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <BasketDish
              basketItems={basket}
              onAddItem={onAddItem}
              onDecrementQuantity={onDecrementQuantity}
              onRemoveItem={onRemoveItem}
            />
          )}
          {basket?.items.length > 0 && (
            <View className="flex-row justify-between m-4 py-5 px-4 bg-white rounded-xl shadow shadow-black">
              <Text className="font-bold text-lg">Subtotal</Text>
              <Text className="font-bold text-lg">₹{basket.total}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Basket;
