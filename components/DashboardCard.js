import { View, Text } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const DashboardCard = ({count, title, color, icon}) => {
  return (
    <View className={`flex-row flex-1 justify-between p-4 ${color} rounded-2xl shadow shadow-black mx-1 my-2`}>
      <View className="items-start justify-center">
        <Text className="text-3xl font-bold text-white">{count}</Text>
        <Text className="text-lg font-semibold text-white">{title}</Text>
      </View>
      <View className="items-center justify-center">
        <MaterialIcons name={icon} color="white" size={40} />
      </View>
    </View>
  );
};

export default DashboardCard;
