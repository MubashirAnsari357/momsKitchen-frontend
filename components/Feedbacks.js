import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { feedbacks } from "../MockData/MockData";
import Ionicons from "@expo/vector-icons/Ionicons";

const Feedbacks= () => {
  return (
    <FlatList
      scrollEnabled={false}
      vertical
      contentContainerStyle={{
        paddingHorizontal: 6,
        paddingBottom: 200,
        paddingTop: 25,
      }}
      data={feedbacks}
      renderItem={({ item }) => (
        <View className="my-2">
          <Text>{item.customer.name}</Text>
          <View className="flex-row justify-start items-center mb-1">
            {[...Array(item.rating)].map((_, i) => (
              <Ionicons key={i} name="star" color="#FFDD43" size={15} />
            ))}
            <Text>{item.createdAt}</Text>
          </View>
          <Text>{item.feedbackDesc}</Text>
        </View>
      )}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Feedbacks;
