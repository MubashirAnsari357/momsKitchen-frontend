import { View, Text } from "react-native";
import React from "react";

const OrderStatus = ({ orderStatus }) => {
  return (
    <View>
      <Text className="text-gray-600"> Order Status </Text>
      {orderStatus === "Created" && (
        <View className="mx-2 flex-row items-center justify-start space-x-2">
          <Text className={"font-extrabold text-2xl text-blue-500"}>
            &bull;
          </Text>
          <Text className="font-semibold text-base text-blue-500">
            {orderStatus}
          </Text>
        </View>
      )}
      {orderStatus === "Accepted" && (
        <View className="mx-2 flex-row items-center justify-start space-x-2">
          <Text className={"font-extrabold text-2xl text-green-600"}>
            &bull;
          </Text>
          <Text className="font-semibold text-base text-green-600">
            {orderStatus}
          </Text>
        </View>
      )}
      {(orderStatus === "Rejected" || orderStatus === "Cancelled") && (
        <View className="mx-2 flex-row items-center justify-start space-x-2">
          <Text className={"font-extrabold text-2xl text-red-600"}>&bull;</Text>
          <Text className="font-semibold text-base text-red-600">
            {orderStatus}
          </Text>
        </View>
      )}
    </View>
  );
};

export default OrderStatus;
