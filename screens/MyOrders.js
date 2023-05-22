import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OrderDish from "../components/OrderDish";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/actions/orderAction";
import AppBar from "../components/AppBar";
import Loading from "../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { orders, loadingO } = useSelector((state) => state.orders);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    dispatch(getUserOrders(user?._id));
    setRefreshing(false);
  }, [dispatch, refreshing]);

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppBar title="My Orders" />

      <View className="px-2">
        {isAuthenticated ? (
          loadingO ? (
            <Loading />
          ) : (
            <OrderDish
              orders={orders?.Orders}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )
        ) : (
          <View className="justify-center items-center my-36 space-y-3">
            <Text className="font-semibold text-xl">Please Login First</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Login")} className="px-4 py-2 border border-gray-200 rounded-lg active:bg-gray-200">
              <Text className="text-base">Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyOrders;
