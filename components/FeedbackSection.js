import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { dateConvert } from "../utils/helper";
import IndividualRatingProgressBar from "./IndividualRatingProgressBar";

const FeedbackSection = ({ feedbacksData, stars }) => {
  
  const { ratings, avgRating, feedbacks, reviewsCount, feedbackCount } = feedbacksData
  const { filledStars, hasHalfStar, emptyStars } = stars

  const route = useRoute();
  const limitedFeedbacks = feedbacks.slice(0, 3);

  return (
    <ScrollView contentContainerStyle={{
    }}>
      <TouchableNativeFeedback>
        <View className={`flex-row flex-1 justify-between py-4 ${route.name!=='DishDetails' && 'px-4'}`}>
          <View className="items-center justify-center">
            <Text className="font-semibold text-4xl">{avgRating}</Text>
            <View className="flex-row">
              {[...Array(filledStars)].map((_, index) => {
                return (
                  <Ionicons key={index} name="star" color="#FFDD43" size={15} />
                );
              })}
              {hasHalfStar && (
                <Ionicons name="star-half" color="#FFDD43" size={15} />
              )}
              {[...Array(emptyStars)].map((_, index) => {
                return (
                  <Ionicons
                    key={index}
                    name="star-outline"
                    color="#FFDD43"
                    size={15}
                  />
                );
              })}
            </View>
            <Text className="text-xs text-gray-500 font-semibold">
              {reviewsCount} Reviews
            </Text>
          </View>
          <View className="items-center justify-center">
            {ratings.map((rating, index) => {
              return (
                <View key={index}>
                  <IndividualRatingProgressBar
                    totalCount={feedbackCount}
                    rating={rating.stars}
                    count={rating.count}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </TouchableNativeFeedback>
      {route.name === "DishDetails" ? (
        <View className="">
          {limitedFeedbacks.map((item) => {
            const date = dateConvert(item.createdAt);
            return (
              <View key={item._id} className="my-2">
                <Text className="text-base font-bold">
                  {item.customer.name}
                </Text>
                <View className="flex-row justify-start items-center mb-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" color="#FFDD43" size={13} />
                  ))}
                  <Text className="mx-1">&bull;</Text>
                  <Text className="font-semibold text-xs">{date}</Text>
                </View>
                <Text className="">
                  {item.feedbackDesc.slice(0, 100) +
                    (item.feedbackDesc.length > 100 ? "..." : "")}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View className="px-4">
          {feedbacks.map((item) => {
            const date = dateConvert(item.createdAt);
            return (
              <View key={item._id} className="my-2">
                <Text className="text-base font-bold">
                  {item.customer.name}
                </Text>
                <View className="flex-row justify-start items-center mb-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" color="#FFDD43" size={13} />
                  ))}
                  <Text className="mx-1">&bull;</Text>
                  <Text className="font-semibold text-xs">{date}</Text>
                </View>
                <Text className="">{item.feedbackDesc}</Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default FeedbackSection;
