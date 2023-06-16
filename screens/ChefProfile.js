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

  const {
    params: { _id, name, address, email, photo, chefSpecialization },
  } = useRoute();

  const { dishes } = useSelector((state) => state.dishes);
  const [loading, setLoading] = useState(true);
  const [dishesChefs, setDishesChefs] = useState(dishes?.Dishes || []);
  const [refreshing, setRefreshing] = useState(false);
  const [view, setView] = useState("List");
  const [viewIcon, setViewIcon] = useState("grid");

  const handleView = () => {
    if (view == "List") {
      setView("Grid");
      setViewIcon("list");
    }
    if (view == "Grid") {
      setView("List");
      setViewIcon("grid");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    setLoading(true);
    setDishesChefs((prevDishes) =>
      prevDishes.filter((item) => item.chef._id === _id)
    );
    setLoading(false);
    setRefreshing(false);
  }, [refreshing]);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView className="bg-[#f4f8fc] flex-1">
      <View className="bg-white py-4 flex-row justify-between items-center px-6 shadow-md shadow-black z-50 space-x-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-[#e4eaf0] rounded-full w-8 h-8 justify-center items-center"
        >
          <Ionicons name="chevron-back-outline" color="#262525" size={25} />
        </TouchableOpacity>
        <Text className="text-black font-semibold text-lg flex-1">{name}</Text>
        <TouchableOpacity onPress={handleView}>
          <Ionicons name={viewIcon} color="#262525" size={25} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View className="bg-white flex-1 w-max shadow-lg shadow-black">
          <Dishes
            view={view}
            dishes={dishesChefs}
            chef={{
              name,
              address,
              email,
              photo,
              chefSpecialization,
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChefProfile;
