import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
import ChefAppBar from "../components/ChefAppBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteDish, getChefDishes } from "../redux/actions/dishAction";
import ChefDishCard from "../components/ChefDishCard";
import { useState } from "react";
import Loading from "../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

const ChefDishes = ({ route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dishesChefs, loadingD } = useSelector((state) => state.dishes);

  const [refreshing, setRefreshing] = useState(false);

  const handleDeleteDish = (id) => {
    dispatch(deleteDish(id));
    setRefreshing(true)
  };

  useEffect(() => {
    dispatch(getChefDishes(user?._id));
    setRefreshing(false);
  }, [dispatch, route, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ChefAppBar title="My Dishes" />
      {loadingD ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: 100,
          }}
          className="bg-slate-50 min-h-screen"
        >
          <Text className="px-5 text-lg font-semibold text-gray-500">
            {dishesChefs?.Dishes.length} dishes
          </Text>
          {dishesChefs?.Dishes.map((item) => {
            return (
              <ChefDishCard key={item._id} dish={item} onDeleteDish={handleDeleteDish} />
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ChefDishes;
