import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import ChefAppBar from '../components/ChefAppBar'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getChefOrders, updateDeliveryStatus, updateOrderStatus } from '../redux/actions/orderAction';
import Loading from '../components/Loading';
import ChefOrderCard from '../components/ChefOrderCard';
import Toast from "react-native-toast-message";
import { SafeAreaView } from 'react-native-safe-area-context';

const ChefOrders = ({route}) => {

  const dispatch = useDispatch();
  const { chefOrders, loadingO, message, error } = useSelector((state) => state.orders);

  const [refreshing, setRefreshing] = useState(false);

  const handleUpdateStatus = (orderId, orderStatus) => {
    dispatch(updateOrderStatus(orderId, orderStatus))
  }

  const handleDeliveryStatus = (orderId, deliveryStatus) => {
    dispatch(updateDeliveryStatus(orderId, deliveryStatus))
  }

  useEffect(() => {
    dispatch(getChefOrders());
    setRefreshing(false);
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
  }, [dispatch, route, refreshing, message, error]);

  const onRefresh = () => {
    setRefreshing(true);
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ChefAppBar title="My Orders"/>

      {loadingO ? (
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
            {chefOrders?.Orders.length} orders
          </Text>
          {chefOrders?.Orders.map((item) => {
            return (
              <ChefOrderCard key={item._id} order={item} onUpdateStatus={handleUpdateStatus} onUpdateDelivery={handleDeliveryStatus} />
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default ChefOrders