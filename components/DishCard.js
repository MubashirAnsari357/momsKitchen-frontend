import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/basketSlice";

const DishCard = ({ dish, view }) => {
  const { user } = useSelector((state) => state.auth);

  const [feedbackCount, setFeedbackCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [avgRating, setAvgRating] = useState(null);

  const [isChef, setisChef] = useState(user?.userType == "Chef" ? true : false);
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
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
  }, [feedbackCount, reviewsCount]);

  const addToBasket = (_id, name, chefName, chefId, price, photo) => {
    if (availableQty > 0) {
      let item = {
        _id: _id,
        name: name,
        chefName: chefName,
        chefId: chefId,
        price: price,
        photo: photo,
        quantity: 1,
        itemTotal: 0,
        userId: user?._id,
      };
      dispatch(addItem(item));
    }
  };

  return (
    <>
      {view == "homeGrid" && (
        <Pressable
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
          className="ml-4 my-1 bg-white active:bg-gray-100 w-48 items-center justify-start rounded-3xl shadow shadow-black"
        >
          <View className="w-40 h-40 mt-3 rounded-3xl bg-white shadow-xl shadow-slate-500">
            <Image
              source={{ uri: photos[0].url }}
              className="w-40 h-40 rounded-3xl"
            />
          </View>
          <View className="justify-start my-3 w-36">
            <Text className="font-semibold text-[#262525] text-base">
              {name.slice(0, 17) + (name.length > 15 ? "..." : "")}
            </Text>
            <View className="flex-row space-x-1 justify-start items-center">
              <Ionicons name="star" color="#FFDD43" size={15} />
              <Text className="font-bold text-[#262525]">{avgRating}</Text>
              <Text className="text-xs font-bold text-gray-500">{`(${reviewsCount} Reviews)`}</Text>
            </View>
            <Text className="text-slate-500 mt-1">
              {chef.name.slice(0, 15) + (chef.name.length > 15 ? "..." : "")}
            </Text>
            <View className="flex-row justify-between">
              <Text className="pt-2 font-bold text-2xl text-[#262525]">
                ₹{price}
              </Text>
              {!isChef && (
                <TouchableOpacity
                disabled={availableQty<1}
                  onPress={() =>
                    addToBasket(
                      _id,
                      name,
                      chef.name,
                      chef._id,
                      price,
                      photos[0].url
                    )
                  }
                  className="bg-[#5E72EB] rounded-full items-centers justify-center w-10 h-10 shadow shadow-black"
                >
                  <View className="justify-center items-center">
                    <Ionicons name="add" color="white" size={30} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      )}

      {view == "Grid" && (
        <Pressable
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
          className="m-1 bg-white active:bg-gray-100 flex-1 items-center justify-start rounded-3xl shadow shadow-black"
        >
          <View className="w-40 h-40 mt-3 rounded-3xl bg-white shadow-xl shadow-slate-500">
            <Image
              source={{ uri: photos[0].url }}
              className="w-40 h-40 rounded-3xl"
            />
          </View>
          <View className="justify-start my-3 w-36">
            <Text className="font-semibold text-[#262525] text-base">
              {name.slice(0, 17) + (name.length > 15 ? "..." : "")}
            </Text>
            <View className="flex-row space-x-1 justify-start items-center">
              <Ionicons name="star" color="#FFDD43" size={15} />
              <Text className="font-bold text-[#262525]">{avgRating}</Text>
              <Text className="text-xs font-bold text-gray-500">{`(${reviewsCount} Reviews)`}</Text>
            </View>
            <Text className="text-slate-500 mt-1">
              {chef.name.slice(0, 15) + (chef.name.length > 15 ? "..." : "")}
            </Text>
            <View className="flex-row justify-between">
              <Text className="pt-2 font-bold text-2xl text-[#262525]">
                ₹{price}
              </Text>
              {!isChef && (
                <TouchableOpacity
                disabled={availableQty<1}
                  onPress={() =>
                    addToBasket(
                      _id,
                      name,
                      chef.name,
                      chef._id,
                      price,
                      photos[0].url
                    )
                  }
                  className="bg-[#5E72EB] rounded-full items-centers justify-center w-10 h-10 shadow shadow-black"
                >
                  <View className="justify-center items-center">
                    <Ionicons name="add" color="white" size={30} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      )}

      {view == "List" && (
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
          className="flex-row my-1 mx-4 bg-white active:bg-gray-100 w-max items-center rounded-2xl shadow shadow-black py-2 hover:scale-105"
        >
          <View className="w-24 h-24 mx-4 rounded-3xl bg-white shadow-md shadow-black">
            <Image
              source={{ uri: photos[0].url }}
              className="w-24 h-24 rounded-3xl"
            />
          </View>
          <View className="flex-row flex-1 justify-between pr-4">
            <View className="justify-center items-start py-2 space-y-2 w-4/6">
              <Text className="font-semibold text-[#262525] text-base">
                {name.slice(0, 17) + (name.length > 15 ? "..." : "")}
              </Text>
              <View className="flex-row items-center justify-start">
                <Text className="text-slate-500">
                  {chef.name.slice(0, 15) +
                    (chef.name.length > 15 ? "..." : "")}
                </Text>
              </View>
              <View className="flex-row space-x-1 justify-start items-center">
                <Ionicons name="star" color="#FFDD43" size={20} />
                <Text className="text-lg font-bold text-[#262525]">
                  {avgRating}
                </Text>
                <Text className="text-sm font-bold text-gray-500">{`(${reviewsCount} Reviews)`}</Text>
              </View>
            </View>
            <View className="space-y-3 items-center">
              <Text className="pt-2 font-bold text-2xl text-[#262525]">
                ₹{price}
              </Text>
              {!isChef && (
                <TouchableOpacity
                disabled={availableQty<1}
                  onPress={() =>
                    addToBasket(
                      _id,
                      name,
                      chef.name,
                      chef._id,
                      price,
                      photos[0].url
                    )
                  }
                  className="bg-[#5E72EB] rounded-xl flex-row items-center justify-center py-2 px-3 space-x-1 shadow shadow-black"
                >
                  <Ionicons name="cart" color="white" size={15} />
                  <Text className="font-bold text-sm text-white">Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}

      {view == "recommendGrid" && (
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
          className="ml-3 my-1 bg-white w-36 items-center justify-start rounded-3xl shadow shadow-black"
        >
          <View className="w-32 h-32 mt-3 rounded-3xl bg-white shadow-xl shadow-slate-500">
            <Image
              source={{ uri: photos[0].url }}
              className="w-32 h-32 rounded-3xl"
            />
          </View>
          <View className="justify-start my-3 w-36 px-2">
            <Text className="font-semibold text-[#262525] text-[13px]">
              {name.slice(0, 17) + (name.length > 15 ? "..." : "")}
            </Text>
            <View className="flex-row space-x-1 justify-start items-center">
              <Ionicons name="star" color="#FFDD43" size={15} />
              <Text className="font-bold text-[12px] text-[#262525]">
                {avgRating}
              </Text>
              <Text className="text-[12px] font-bold text-gray-500">{`(${reviewsCount} Reviews)`}</Text>
            </View>
            <Text className="text-slate-500 mt-1 text-[12px]">
              {chef.name.slice(0, 15) + (chef.name.length > 15 ? "..." : "")}
            </Text>
            <View className="flex-row justify-between">
              <Text className="pt-2 font-bold text-xl text-[#262525]">
                ₹{price}
              </Text>
              {!isChef && (
                <TouchableOpacity
                disabled={availableQty<1}
                  onPress={() =>
                    addToBasket(
                      _id,
                      name,
                      chef.name,
                      chef._id,
                      price,
                      photos[0].url
                    )
                  }
                  className="bg-[#5E72EB] rounded-full items-centers justify-center w-9 h-9 shadow shadow-black"
                >
                  <View className="justify-center items-center">
                    <Ionicons name="add" color="white" size={25} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default DishCard;
