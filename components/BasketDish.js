import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { basket } from "../MockData/MockData";
import { useNavigation } from "@react-navigation/native";

const BasketDish = ({ basketItems, onAddItem, onDecrementQuantity, onRemoveItem }) => {

  const navigation = useNavigation();

  return (
    <ScrollView>
      {basketItems.items.map((item) => {
        const { _id, chefName, chefId, name, photo, price, quantity, itemTotal, userId } = item;
        return (
          <View key={item._id}>
            <View className="flex-row mx-4 my-1 bg-white w-max items-center rounded-2xl shadow shadow-black">
              <TouchableOpacity
                onPress={() => navigation.navigate("DishDetails", {})}
                className="w-28 h-28 mr-4 rounded-l-2xl bg-white"
              >
                <Image
                  source={{ uri: photo }}
                  className="w-28 h-28 rounded-l-2xl"
                />
              </TouchableOpacity>
              <View className="flex-row flex-1 justify-between pr-4 py-2">
                <View className="justify-start space-y-2 pb-1 h-full w-4/6">
                  <View className="flex-1 items-start justify-start">
                    <Text className="font-semibold text-[#262525] text-base">
                      {name.slice(0, 17) + (name.length > 15 ? "..." : "")}
                    </Text>
                    <Text className="text-slate-500">
                      {chefName.slice(0, 15) + (chefName.length > 15 ? "..." : "")}
                    </Text>
                  </View>
                  <View className="flex-row justify-start items-center space-x-4">
                    <TouchableOpacity
                      disabled={quantity <= 1}
                      onPress={()=>onDecrementQuantity(_id, userId)}
                      className={`bg-slate-50 w-9 h-9 justify-center items-center rounded-full shadow shadow-black ${
                        quantity <= 1 && "opacity-50"
                      }`}
                    >
                      <Ionicons name="remove" color="#262525" size={20} />
                    </TouchableOpacity>
                    <Text className="text-base font-semibold">{quantity}</Text>
                    <TouchableOpacity
                      onPress={()=>onAddItem(_id, name, chefName, chefId, price, photo, userId)}
                      className="bg-slate-50 w-9 h-9 justify-center items-center rounded-full shadow shadow-black"
                    >
                      <Ionicons name="add" color="#262525" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="space-y-3 items-center">
                  <Text className="pt-2 font-bold text-2xl text-[#262525]">
                    ₹{itemTotal}
                  </Text>
                  <TouchableOpacity
                    onPress={()=>onRemoveItem(_id, userId)}
                    className="bg-[#5E72EB] w-10 h-10 rounded-full items-center justify-center shadow shadow-black"
                  >
                    <Ionicons name="trash" color="white" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BasketDish;
