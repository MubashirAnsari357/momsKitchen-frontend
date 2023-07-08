import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import ReadMore from "@fawazahmed/react-native-read-more";
import Dishes from "../components/Dishes";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { addItem } from "../redux/basketSlice";
import FeedbackSection from "../components/FeedbackSection";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_URL } from "@env";
import { ratingCalc, starsCalc } from "../utils/helper";

const DishDetails = () => {
  const navigation = useNavigation();

  const {
    params: { _id },
  } = useRoute();

  // Redux - useSelector and useDispatch
  const { dishes } = useSelector((state) => state.dishes);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, total } = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  // State Variables - useState()
  const [Dish, setDish] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [avgRating, setAvgRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [filledStars, setFilledStars] = useState(0);
  const [hasHalfStar, setHasHalfStar] = useState(null);
  const [emptyStars, setEmptyStars] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userFeedback, setUserFeedback] = useState(null);
  const [initialRecommendDishes, setInitialRecommendDishes] = useState(
    dishes?.Dishes || []
  );
  const [recommendDishes, setRecommendDishes] = useState(dishes?.Dishes || []);

  // Image Scroll
  const handleScroll = (event) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offset / width);
    setActiveIndex(index);
  };

  // Refresh on Pull down
  const onRefresh = () => {
    setRefreshing(true);
  };

  // Fetch Ratings and Stars calculations
  const fetchCalculations = (feedbacks) => {
    const { feedbackCountCalc, reviewsCountCalc, avgRatingCalc } =
      ratingCalc(feedbacks);
    setFeedbackCount(feedbackCountCalc);
    setReviewsCount(reviewsCountCalc);
    setAvgRating(avgRatingCalc);

    const {
      filledStarsCalc,
      hasHalfStarCalc,
      emptyStarsCalc,
      updatedRatingsCalc,
    } = starsCalc(avgRatingCalc, feedbacks);
    setFilledStars(filledStarsCalc);
    setHasHalfStar(hasHalfStarCalc);
    setEmptyStars(emptyStarsCalc);
    setRatings(updatedRatingsCalc);
  };

  // Axios Get Dish Details
  const fetchDishDetails = async (dishId) => {
    setLoading(true);
    const {
      data: { dish },
    } = await axios.get(`${API_URL}/getdishdetails/${dishId}`);
    setDish(dish);
    setFeedbacks(dish.feedbacks);
    setUserFeedback(
      dish.feedbacks.find((feedback) => feedback.customer._id === user?._id)
    );

    const recommendedDishes = initialRecommendDishes.filter(
      (item) => item.type === dish.type && item._id !== dishId
    );
    setRecommendDishes(recommendedDishes);

    fetchCalculations(dish.feedbacks);

    setLoading(false);
  };

  // Side Effects - useEffect()
  useEffect(() => {
    fetchDishDetails(_id);
    setRefreshing(false);
  }, [_id, refreshing]);

  // Add To Cart - Dispatch
  const addToCart = async () => {
    if (Dish.availableQty > 0) {
      let item = {
        _id: Dish._id,
        name: Dish.name,
        chefName: Dish.chef.name,
        chefId: Dish.chef._id,
        price: Dish.price,
        photo: Dish.photos[0].url,
        quantity: 1,
        itemTotal: 0,
        userId: user?._id,
      };
      await dispatch(addItem(item));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {!loading && (
        <View className="absolute bottom-10 z-50 w-full">
          {isAuthenticated && user?.userType == "Chef" ? (
            <View />
          ) : items.findIndex((item) => item._id === _id) !== -1 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Basket")}
              className={`flex-row justify-center space-x-2 items-center p-3 mx-6 rounded-2xl bg-[#5E72EB] shadow shadow-black ${
                Dish?.availableQty < 1 && "opacity-0"
              }`}
            >
              <Ionicons name="cart" color="white" size={25} />
              <Text className="text-center font-semibold text-white text-lg">
                Go to Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={Dish?.availableQty < 1}
              onPress={addToCart}
              className={`flex-row justify-center space-x-2 items-center p-3 mx-6 rounded-2xl bg-[#5E72EB] shadow shadow-black ${
                Dish?.availableQty < 1 && "opacity-0"
              }`}
            >
              <Ionicons name="cart" color="white" size={25} />
              <Text className="text-center font-semibold text-white text-lg">
                Add to Basket
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="relative bg-slate-50 flex-1"
        >
          <View className="relative py-2 rounded-3xl justify-between items-center">
            <View className="w-[95vw] h-[95vw] relative bg-white object-contain rounded-3xl shadow-md shadow-black">
              <ScrollView
                className="rounded-3xl"
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
              >
                {Dish.photos.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: image.url }}
                      className="w-[95vw] h-[95vw] object-contain mx-auto rounded-3xl"
                    />
                  );
                })}
              </ScrollView>
              <View className="absolute bottom-2 left-0 right-0 flex-row justify-center items-center space-x-2">
                {Dish.photos.map((image, index) => (
                  <View
                    key={index}
                    className={`rounded-full
                    ${
                      activeIndex === index
                        ? "bg-gray-900 w-3 h-3"
                        : "bg-gray-300 w-2 h-2"
                    }
                  `}
                  />
                ))}
              </View>
            </View>
            <View className="absolute top-8 flex-row flex-1 items-center justify-between w-full px-7">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className=" bg-[#e4eaf0] rounded-full w-8 h-8 justify-center items-center"
              >
                <Ionicons
                  name="chevron-back-outline"
                  color="#262525"
                  size={25}
                />
              </TouchableOpacity>
              <Text className=" text-white font-semibold text-base">
                Details
              </Text>
              <TouchableOpacity className="bg-[#e4eaf0] rounded-full w-8 h-8 justify-center items-center">
                <Ionicons name="heart-outline" color="#262525" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <Animatable.View
            animation="slideInUp"
            iterationCount={1}
            className="mt-1 pt-3 pb-28 px-6 space-y-4 h-full bg-white rounded-3xl shadow-2xl shadow-black"
          >
            <View className="flex-row justify-between items-center">
              <View className="w-3/4">
                <Text className="text-2xl font-bold text-[#262525]">
                  {Dish.name}
                </Text>
                <Text className="text-sm text-gray-500">{Dish.type}</Text>
                <View className="flex-row space-x-2 justify-start items-center mt-2">
                  <Ionicons name="star" color="#FFDD43" size={20} />
                  <Text className="text-lg font-bold text-[#262525]">
                    {avgRating}
                  </Text>
                  <Text className="text-sm font-bold text-gray-500">
                    {`(${reviewsCount} Reviews)`}
                  </Text>
                </View>
              </View>
              <Text className="text-3xl text-center font-bold text-[#262525] rounded-md">
                ₹{Dish.price}
              </Text>
            </View>
            <ReadMore
              style={{ color: "#6B7280", fontWeight: "500" }}
              numberOfLines={3}
              seeLessStyle={{ color: "#5E72EB" }}
              seeMoreStyle={{ color: "#5E72EB" }}
            >
              {Dish.desc}
            </ReadMore>
            <Text className="font-semibold text-base py-2 -mb-2">
              Available Quantity:{" "}
              <Text
                className={`font-extrabold ${
                  Dish.availableQty < 1 && "text-red-600"
                }`}
              >
                {Dish.availableQty}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChefProfile", {
                  _id: Dish.chef._id,
                  name: Dish.chef.name,
                  address: Dish.chef.address,
                  email: Dish.chef.email,
                  phone: Dish.chef.phone,
                  photo: Dish.chef.photo,
                  chefSpecialization: Dish.chef.chefSpecialization,
                  userType: Dish.chef.userType,
                  verified: Dish.chef.verified
                })
              }
              className="flex-row items-center space-x-4 py-2 active:bg-gray-100 active:-mx-6 active:px-6"
            >
              <Image
                source={{ uri: Dish.chef.photo.url }}
                className="h-10 w-10 rounded-full b"
              />
              <View className="flex-row justify-center items-center space-x-2">
                <Text className="font-medium text-lg">{Dish.chef.name}</Text>
                {Dish.chef.verified && <MaterialIcons name="verified" color="#262525" size={17} />}
              </View>
            </TouchableOpacity>

            <View className="border-b border-gray-300" />
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="flex-1 text-lg font-semibold">
                  Ratings & Feedbacks
                </Text>
                {isAuthenticated && user.userType === "Chef" ? (
                  <View />
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AddFeedback", {
                        dishId: Dish._id,
                        dish: Dish.name,
                        photo: Dish.photos[0].url,
                        chef: Dish.chef.name,
                        userFeedback,
                      })
                    }
                    className="bg-white border p-2 rounded-md border-[#5E72EB] shadow shadow-[#5E72EB]"
                  >
                    <Text className="text-[#5E72EB]">Rate Dish</Text>
                  </TouchableOpacity>
                )}
              </View>

              {feedbacks.length <= 0 ? (
                <Text className="text-base text-gray-500">No Feedbacks</Text>
              ) : (
                <FeedbackSection
                  feedbacksData={{
                    feedbacks,
                    ratings,
                    avgRating,
                    reviewsCount,
                    feedbackCount,
                  }}
                  stars={{ filledStars, emptyStars, hasHalfStar }}
                />
              )}
              <TouchableOpacity
                disabled={feedbacks.length <= 0}
                onPress={() =>
                  navigation.navigate("Feedbacks", {
                    feedbacksData: {
                      feedbacks,
                      ratings,
                      avgRating,
                      reviewsCount,
                      feedbackCount,
                    },
                    stars: { filledStars, emptyStars, hasHalfStar },
                  })
                }
                className="active:bg-slate-100 rounded-xl p-2 w-16 justify-start"
              >
                <Text className="text-[#5E72EB] font-semibold">See All</Text>
              </TouchableOpacity>
            </View>
            <View className="border-b border-gray-300" />

            {recommendDishes.length > 0 && (
              <View className="-ml-4">
                <View className="flex-row justify-between pl-4 -pr-4">
                  <Text className="text-base">More {Dish.type} dishes</Text>
                  <TouchableOpacity>
                    <Text className="text-base text-[#5E72EB]">See more</Text>
                  </TouchableOpacity>
                </View>
                {loading ? (
                  <Loading />
                ) : (
                  <Dishes view="recommendGrid" dishes={recommendDishes} />
                )}
              </View>
            )}
          </Animatable.View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DishDetails;
