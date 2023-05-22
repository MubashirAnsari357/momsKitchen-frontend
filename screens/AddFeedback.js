import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback, updateFeedback } from "../redux/actions/feedbackAction";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const AddFeedback = ({ navigation, route }) => {
  const {
    params: { dishId, dish, photo, chef, userFeedback },
  } = route;

  const [rating, setRating] = useState(userFeedback?.rating || 0);
  const [feedbackDesc, setFeedbackDesc] = useState(
    userFeedback?.feedbackDesc || ""
  );
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  

  const { message, error, loadingF } = useSelector(
    (state) => state.feedbacks
  );

  const dispatch = useDispatch();

  const submitFeedback = (id) => {
    if (userFeedback) {
      dispatch(updateFeedback(userFeedback._id, rating, feedbackDesc));
    } else {
      dispatch(addFeedback(id, rating, feedbackDesc));
    }
  };

  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({ type: "clearMessage" });
      navigation.navigate('Home')
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [dispatch, message, error]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white py-4 flex-row justify-between items-center px-6 shadow-md shadow-black z-50">
        <Text className="text-black font-semibold text-xl">Add Feedback</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" color="#262525" size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-start my-6 space-y-4">
          <View className="justify-center items-center">
            <View className="bg-white w-20 h-20 rounded-md shadow shadow-black my-2">
              <Image
                source={{ uri: photo }}
                className="w-20 h-20 rounded-md"
              />
            </View>
            <Text className="text-base font-semibold -mb-1">{dish}</Text>
            <Text className="text-gray-500 text-sm">{chef}</Text>
          </View>

          <View className="items-center space-y-2">
            <Text className="text-base font-semibold">Rate the dish</Text>
            <View className="flex-row justify-center space-x-4">
              {maxRating.map((item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={item}
                    onPress={() => setRating(item)}
                  >
                    <Ionicons
                      name={`${item <= rating ? "star" : "star-outline"}`}
                      color={`${item <= rating ? "#FFDD43" : "gray"}`}
                      size={35}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View className="items-start flex-row mx-4">
              <TextInput
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={feedbackDesc}
                onChangeText={setFeedbackDesc}
                maxLength={500}
                placeholder="Write your feedback"
                className="flex-1 border px-4 py-2 rounded bg-white"
              />
            </View>
          </View>
          <View className="items-end mx-4 space-y-2">
            <Text>{feedbackDesc.length}/500</Text>
            <TouchableOpacity
              onPress={() => submitFeedback(dishId)}
              className={`px-4 py-2 ${
                feedbackDesc.length > 0
                  ? "bg-[#262525] shadow shadow-black"
                  : "border border-[#262525] shadow-none"
              } rounded-md `}
            >
              {loadingF ? <ActivityIndicator size='small' color='white' /> : <Text
                className={`${
                  feedbackDesc.length > 0 ? "text-white" : "text-black"
                }`}
              >
                {feedbackDesc.length > 0 ? "Finish" : "Skip & Finish"}
              </Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFeedback;
