import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React from "react";
import ChefAppBar from "../components/ChefAppBar";
import DashboardCard from "../components/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { getChefDishes } from "../redux/actions/dishAction";
import { getChefOrders } from "../redux/actions/orderAction";
import { getChefFeedbacks } from "../redux/actions/feedbackAction";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ChefHome = ({ navigation }) => {
  const { user, loadingA, isAuthenticated } = useSelector((state) => state.auth);
  const { dishesChefs, loadinD } = useSelector((state) => state.dishes);
  const { chefOrders, loadingO } = useSelector((state) => state.orders);
  const { chefFeedbacks, loadingF } = useSelector((state) => state.feedbacks);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
  }

  useLayoutEffect(() => {
    if(!user?.verified){
      navigation.replace("Verify", {email: user?.email, mode: "Chef"})
    }
    dispatch(getChefDishes(user._id));
    dispatch(getChefOrders());
    dispatch(getChefFeedbacks(user._id));
    setRefreshing(false)
  }, [dispatch, refreshing, user?.verified]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ChefAppBar title="Dashboard" />
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 100,
        }}
        className="bg-slate-50 px-4"
      >
        {loadinD ? (
          <ActivityIndicator size="small" color="#262525" />
        ) : (
          <DashboardCard
            count={dishesChefs?.Dishes.length}
            title="Dishes"
            color="bg-blue-400"
            icon="food-bank"
          />
        )}
        {loadingO ? (
          <ActivityIndicator size="small" color="#262525" />
        ) : (
          <DashboardCard
            count={chefOrders?.Orders.length}
            title="Orders"
            color="bg-violet-400"
            icon="history"
          />
        )}
        {loadingF ? (
          <ActivityIndicator size="small" color="#262525" />
        ) : (
          <DashboardCard
            count={chefFeedbacks?.feedbacks.length}
            title="Feedbacks"
            color="bg-red-400"
            icon="feedback"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChefHome;
