import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChefOrderCard = ({ order, onUpdateStatus, onUpdateDelivery }) => {
  const navigation = useNavigation();
  const [isExtended, setisExtended] = useState(false);

  return (
    <>
      <TouchableOpacity className="my-1 mx-4 bg-white active:bg-gray-100 w-max rounded-2xl shadow shadow-black hover:scale-105">
        <TouchableOpacity
          onPress={() => setisExtended(!isExtended)}
          className={`flex-row items-center py-3 active:bg-gray-100 ${
            isExtended && "border-b border-gray-300"
          }`}
        >
          <View className="w-16 h-16 mx-4 rounded-2xl bg-white shadow-md shadow-black">
            <Image
              source={{ uri: order.dish.photo }}
              className="w-16 h-16 rounded-2xl"
            />
          </View>
          <View className="flex-row flex-1 justify-between pr-4">
            <View className="justify-center items-start space-y-1 flex-1">
              <Text className="font-semibold text-[#262525] text-base -mb-1">
                {order.dish.name.slice(0, 20) +
                  (order.dish.name.length > 20 ? "..." : "")}
              </Text>
              <View className="flex-row items-center justify-start">
                <Text className="text-slate-500">
                  {order.dish.quantity} x ₹{order.dish.price}
                </Text>
              </View>
              <View className="flex-row items-center justify-start">
                {order.deliveryStatus === "Preparing" ||
                order.deliveryStatus === "Shipped" ||
                order.deliveryStatus === "Delivered" ? (
                  <Text
                    className={`"font-semibold text-base ${
                      order.deliveryStatus === "Preparing" && "text-violet-500"
                    } ${
                      order.deliveryStatus === "Shipped" && "text-cyan-500"
                    } ${
                      order.deliveryStatus === "Delivered" && "text-green-600"
                    }`}
                  >
                    {order.deliveryStatus}
                  </Text>
                ) : (
                  <Text
                    className={`"font-semibold text-base ${
                      order.orderStatus === "Rejected" && "text-red-600"
                    } ${order.orderStatus === "Accepted" && "text-green-600"}`}
                  >
                    {order.orderStatus}
                  </Text>
                )}
              </View>
            </View>
            <View className="space-y-3 items-center justify-center">
              <TouchableOpacity
                onPress={() => setisExtended(!isExtended)}
                className="bg-slate-50 rounded-xl flex-row items-center justify-center p-2 space-x-1 shadow shadow-black"
              >
                <Ionicons
                  name={`${isExtended ? "chevron-up" : "chevron-down"}`}
                  color="black"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        {isExtended &&
          (order.orderStatus === "Accepted" ? (
            <View className="flex-row space-x-2 items-center justify-evenly p-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderDetails", { id: order._id })
                }
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-blue-600 font-semibold">Details</Text>
              </TouchableOpacity>
              {(order.deliveryStatus !== 'Preparing' && order.deliveryStatus !== 'Shipped' && order.deliveryStatus !== 'Delivered') && <TouchableOpacity
                onPress={() => onUpdateDelivery(order._id, "Preparing")}
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-violet-500 font-semibold">Preparing</Text>
              </TouchableOpacity>}
              {(order.deliveryStatus !== 'Shipped' && order.deliveryStatus !== 'Delivered') && <TouchableOpacity
                onPress={() => onUpdateDelivery(order._id, "Shipped")}
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-cyan-500 font-semibold">Shipped</Text>
              </TouchableOpacity>}
              {order.deliveryStatus !== 'Delivered' && <TouchableOpacity
                onPress={() => onUpdateDelivery(order._id, "Delivered")}
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-green-600 font-semibold">Delivered</Text>
              </TouchableOpacity>}
            </View>
          ) : order.orderStatus === "Rejected" ? (
            <View className="flex-row space-x-2 items-center justify-evenly p-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderDetails", { id: order._id })
                }
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-blue-600 font-semibold">Details</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row space-x-2 items-center justify-evenly p-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderDetails", { id: order._id })
                }
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-blue-600 font-semibold">Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onUpdateStatus(order._id, "Accepted")}
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-green-600 font-semibold">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onUpdateStatus(order._id, "Rejected")}
                className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
              >
                <Text className="text-red-500 font-semibold">Reject</Text>
              </TouchableOpacity>
            </View>
          ))}
      </TouchableOpacity>
    </>
  );
};

export default ChefOrderCard;
