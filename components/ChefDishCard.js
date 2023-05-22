import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const ChefDishCard = ({ dish, onDeleteDish }) => {
  const navigation = useNavigation();
  const { message, loadindD, error } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  const [feedbackCount, setFeedbackCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [avgRating, setAvgRating] = useState(null);

  const {
    _id,
    chef,
    name,
    desc,
    cuisine,
    availableQty,
    type,
    price,
    photos,
    feedbacks,
  } = dish;

  const [isExtended, setisExtended] = useState(false);


  useEffect(() => {
    setFeedbackCount(feedbacks.length);
    setReviewsCount(
      feedbacks.filter((feedback) => feedback.feedbackDesc !== "").length
    );
    const totalRating = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );
    setAvgRating((totalRating / feedbackCount || 0).toFixed(1));
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [error, message, dispatch, feedbackCount, reviewsCount]);

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
              source={{ uri: photos[0].url }}
              className="w-16 h-16 rounded-2xl"
            />
          </View>
          <View className="flex-row flex-1 justify-between pr-4">
            <View className="justify-center items-start space-y-1 flex-1">
              <Text className="font-semibold text-[#262525] text-base -mb-1">
                {name.slice(0, 20) + (name.length > 20 ? "..." : "")}
              </Text>
              <View className="flex-row items-center justify-start">
                <Text className="text-slate-500">{type}</Text>
              </View>
              <View className="flex-row items-center justify-start">
                <Text className="font-bold text-base">₹{price}</Text>
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
        {isExtended && (
          <View className="flex-row space-x-2 items-center justify-evenly py-4">
            {loadindD ? (
              <ActivityIndicator color="#262525" size="large" />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DishDetails", {
                      _id,
                      chef,
                      name,
                      desc,
                      cuisine,
                      availableQty,
                      type,
                      price,
                      photos,
                      feedbacks,
                      avgRating,
                      reviewsCount,
                      feedbackCount,
                    })
                  }
                  className="items-center space-y-1"
                >
                  <Ionicons
                    name="information-circle-outline"
                    color="green"
                    size={20}
                  />
                  <Text className="text-green-700">Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChefEditDish", {
                      _id,
                      chef,
                      name,
                      desc,
                      cuisine,
                      availableQty,
                      type,
                      price,
                      photos,
                    })
                  }
                  className="items-center space-y-1"
                >
                  <Ionicons name="pencil-outline" color="blue" size={20} />
                  <Text className="text-blue-800">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>onDeleteDish(_id)}
                  className="items-center space-y-1"
                >
                  <Ionicons name="trash-bin" color="red" size={20} />
                  <Text className="text-red-500">Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default ChefDishCard;
