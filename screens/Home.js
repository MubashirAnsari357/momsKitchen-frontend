import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DishesList from "../components/Dishes";
import Chefs from "../components/Chefs";
import Category from "../components/Category";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../redux/actions/dishAction";
import { ActivityIndicator } from "react-native";
import { getChefs, loadUser } from "../redux/actions/userAction";
import Loading from "../components/Loading";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { isAuthenticated, user, chefs, loadingA } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { loadingD, dishes } = useSelector((state) => state.dishes);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (!user?.verified) {
        return navigation.replace("Verify", {
          email: user?.email,
          mode: "User",
        });
      }
    }
    dispatch(getChefs());
    dispatch(getDishes());
    setRefreshing(false);
  }, [dispatch, refreshing, route, user?.verified]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo and Notification */}
      <View className="bg-white py-3 flex-row justify-between items-center px-6 shadow-md shadow-black z-50">
        {/* <Text className="text-black font-semibold text-2xl flex-1">
          Mom's Kitchen
        </Text> */}
        <Image source={require('../assets/momsKitchen-logo.png')} className="h-10 w-44"/>
        {isAuthenticated ? (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-circle" color="#262525" size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons name="log-in-outline" color="#262525" size={30} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        className="bg-slate-50 flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Address Section*/}
        <View className="flex-row px-4 items-center justify-between py-3 rounded-b-md bg-white shadow-md shadow-black">
          <Ionicons name="navigate" color="#262525" size={30} />
          <View className="flex-row justify-between flex-1 px-2 items-center">
            <View className="px-1">
              <Text className="text-black font-semibold">Deliver to</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                className="flex-row space-x-3 items-center"
              >
                <Text className="text-gray-600 text-md w-44">
                  {user?.address.houseNo
                    ? user?.address.houseNo +
                      ", " +
                      user?.address.street +
                      ", " +
                      user?.address.city +
                      ", " +
                      user?.address.pincode
                    : "Set your address"}
                </Text>
                <Ionicons name="pencil" color="#262525" size={20} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
              <Ionicons name="cart-outline" color="#262525" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className="px-6 mt-4 font-bold text-2xl text-[#262525]">
            Categories
          </Text>
          <Category />
          {/* HomeChefs */}
          <TouchableOpacity className="flex-row justify-between items-center px-6 mt-5">
            <Text className="font-bold text-2xl text-[#262525]">HomeChefs</Text>
            <Ionicons
              name="chevron-forward-outline"
              color="#262525"
              size={20}
            />
          </TouchableOpacity>
          {loadingA ? (
            <Loading />
          ) : (
            <View>
              <Chefs view="homeGrid" chefs={chefs?.chefs} />
            </View>
          )}

          {/* Dishes */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Dishes")}
            className="flex-row justify-between items-center px-6 mt-4"
          >
            <Text className="font-bold text-2xl text-[#262525]">Dishes</Text>
            <Ionicons
              name="chevron-forward-outline"
              color="#262525"
              size={20}
            />
          </TouchableOpacity>
          {loadingD ? (
            <Loading />
          ) : (
            <View>
              <DishesList view="homeGrid" dishes={dishes?.Dishes} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
