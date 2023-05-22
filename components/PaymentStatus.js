import { View, Text } from "react-native";
import React from "react";

const PaymentStatus = ({ paymentStatus }) => {
  return (
    <View>
      <Text className="text-gray-600"> Payment Status </Text>
      {paymentStatus === "Pending" && (
        <View className="mx-2 flex-row items-center justify-start space-x-2">
          <Text className={"font-extrabold text-2xl text-blue-500"}>
            &bull;
          </Text>
          <Text className="font-semibold text-base text-blue-500">
            {paymentStatus}
          </Text>
        </View>
      )}
      {paymentStatus === "Paid" && (
        <View className="mx-2 flex-row items-center justify-start space-x-2">
          <Text className={"font-extrabold text-2xl text-green-600"}>
            &bull;
          </Text>
          <Text className="font-semibold text-base text-green-600">
            {paymentStatus}
          </Text>
        </View>
      )}
      {(paymentStatus === "Failed") && (
        <View className="mx-2 flex-row items-center justify-start space-x-2">
          <Text className={"font-extrabold text-2xl text-red-600"}>&bull;</Text>
          <Text className="font-semibold text-base text-red-600">
            {paymentStatus}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PaymentStatus;
