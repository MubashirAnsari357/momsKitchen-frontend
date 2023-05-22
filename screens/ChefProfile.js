import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Dishes from "../components/Dishes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ChefProfile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const {
    params: {
      _id,
      name,
      address,
      email,
      phone,
      photo,
      chefSpecialization,
      userType,
    },
  } = useRoute();
  
  const { dishes } = useSelector((state) => state.dishes);
  
  const [dishesChefs, setDishesChefs] = useState(dishes?.Dishes || []);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    setLoading(true);
    setDishesChefs((dishesChefs) =>
      dishesChefs.filter((item) => item.chef._id === _id)
    );
    setLoading(false);
    setRefreshing(false)
  }, [refreshing]);



  return (
    <SafeAreaView className="bg-[#f4f8fc] flex-1">
      <View className="relative bg-white h-36 mb-20 border-b border-gray-300">
        <View className="px-6 pt-2 shadow-md flex-row space-x-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-[#e4eaf0] rounded-full w-8 h-8 justify-center items-center mt-3"
          >
            <Ionicons name="chevron-back-outline" color="#262525" size={25} />
          </TouchableOpacity>
          <View className=" justify-start p-4 rounded-xl">
            <Text className="text-xl font-bold -mb-1">{name}</Text>
            <Text className="text-gray-500">{address?.city}</Text>
          </View>
        </View>
        <View className="absolute top-[90px] flex-row items-center">
          <View className="ml-6 w-28 h-28 rounded-full bg-white shadow shadow-black">
            <Image
              source={{ uri: photo.url }}
              className="w-28 h-28 rounded-full"
            />
          </View>
          <View className="bg-white flex-1 flex-row justify-around items-center rounded-lg p-4 mx-8 shadow shadow-black">
            <View className="items-center justify-center">
              <Text className="font-semibold text-lg">{dishesChefs.length}</Text>
              <Text className="text-gray-600 text-sm">Dishes</Text>
            </View>
            <View className="items-center justify-center">
              <Text className="font-semibold text-lg">4.2</Text>
              <Text className="text-gray-600 text-sm">Ratings</Text>
            </View>
          </View>
        </View>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View className="bg-slate-50 flex-1 w-max rounded-t-2xl shadow-lg shadow-black">
          <Dishes view="List" dishes={dishesChefs} refreshing={refreshing} onRefresh={onRefresh}/>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChefProfile;
