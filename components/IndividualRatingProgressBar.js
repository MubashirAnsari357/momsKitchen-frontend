import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const IndividualRatingProgressBar = ({ totalCount, rating, count }) => {
  const progress = (totalCount === 0 ? 0 : (count / totalCount) * 100);

  const progressBarStyle = {
    width: `${progress}%`
  };


  return (
    <View className="flex-row justify-between items-center space-x-2">
      <View className={`flex-row justify-center items-center`}>
        <Text
          className={`text-xs text-center ${
            rating === 5 || rating === 4 ? "w-[8px]" : "w-[9px]"
          }`}
        >
          {rating}
        </Text>
        <Ionicons name="star" color="#262525" size={10} />
      </View>
      <View className="bg-slate-300 h-2 w-28 rounded-full">
        <View className={`bg-[#FFDD43] h-2 rounded-full`} style={progressBarStyle}/>
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-xs text-gray-500">{count}</Text>
      </View>
    </View>
  );
};

export default IndividualRatingProgressBar;
