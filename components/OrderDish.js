import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { dateConvert } from "../utils/helper";

const OrderDish = ({ orders, refreshing, onRefresh }) => {
  const navigation = useNavigation();

  return (
    <>
      {orders?.length < 1 ? <View className="justify-center items-center my-36">
        <Text className="text-base"> You do not have any orders yet </Text>
      </View> : <ScrollView
        className="min-h-screen"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {orders?.map((item) => {
          const { _id, dish, name, createdAt, updatedAt } = item;
          const date = dateConvert(createdAt);

          return (
            <TouchableOpacity
              key={_id}
              onPress={() => navigation.navigate("OrderDetails", { id: _id })}
              className="flex-row my-1 w-max items-center active:bg-gray-200 rounded-2xl py-2 px-2 active:scale-105"
            >
              <View className="w-24 h-24 mx-4 rounded-3xl bg-white shadow-md shadow-black">
                <Image
                  source={{ uri: dish.photo }}
                  className="w-24 h-24 rounded-3xl"
                />
              </View>
              <View className="flex-row flex-1 justify-between">
                <View className="justify-center items-start py-2 space-y-2">
                  <Text className="font-semibold text-[#262525] text-base">
                    {dish.name.slice(0, 17) +
                      (dish.name.length > 15 ? "..." : "")}
                  </Text>
                  <View className="flex-row items-center justify-start">
                    <Text className="text-slate-500">
                      {dish.chefName.slice(0, 15) +
                        (dish.chefName.length > 15 ? "..." : "")}
                    </Text>
                  </View>
                  <View className="flex-row space-x-1 justify-start items-center">
                    <Text className="text-sm font-bold text-gray-500">
                      {date}
                    </Text>
                  </View>
                </View>
                <View className="items-center justify-center">
                  <Ionicons name="chevron-forward" color="gray" size={30} />
                </View>
              </View>
              <View className="border-b border-gray-300 mx-3" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>}
    </>
  );
};

export default OrderDish;
