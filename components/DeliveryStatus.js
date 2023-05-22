import { View, Text } from "react-native";
import React from "react";

const DeliveryStatus = ({deliveryStatus}) => {
  return (
    <View>
      <Text className="text-gray-600"> Delivery Status </Text>
      <View className="mx-2 flex-row items-center justify-start space-x-2">
        <Text
          className={`${
            deliveryStatus === "Pending"
              ? "text-blue-500 font-extrabold text-2xl"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          &bull;
        </Text>
        <Text
          className={`${
            deliveryStatus === "Pending"
              ? "text-blue-500 font-semibold text-base"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          Pending
        </Text>
      </View>
      <View className="mx-2 flex-row items-center justify-start space-x-2">
        <Text
          className={`${
            deliveryStatus === "Preparing"
              ? "text-blue-500 font-extrabold text-2xl"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          &bull;
        </Text>
        <Text
          className={`${
            deliveryStatus === "Preparing"
              ? "text-blue-500 font-semibold text-base"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          Preparing
        </Text>
      </View>
      <View className="mx-2 flex-row items-center justify-start space-x-2">
        <Text
          className={`${
            deliveryStatus === "Shipped"
              ? "text-blue-500 font-extrabold text-2xl"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          &bull;
        </Text>
        <Text
          className={`${
            deliveryStatus === "Shipped"
              ? "text-blue-500 font-semibold text-base"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          Shipped
        </Text>
      </View>
      <View className="mx-2 flex-row items-center justify-start space-x-2">
        <Text
          className={`${
            deliveryStatus === "Deliveres"
              ? "text-blue-500 font-extrabold text-2xl"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          &bull;
        </Text>
        <Text
          className={`${
            deliveryStatus === "Delivered"
              ? "text-blue-500 font-semibold text-base"
              : "text-gray-400 font-thin text-sm"
          }`}
        >
          Delivered
        </Text>
      </View>
    </View>
  );
};

export default DeliveryStatus;
