import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, updateDeliveryStatus, updateOrderStatus } from "../redux/actions/orderAction";
import { useState } from "react";
import OrderStatus from "../components/OrderStatus";
import DeliveryStatus from "../components/DeliveryStatus";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderDetails = ({ route, navigation }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { order, loadindO } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const {
    params: { id },
  } = route;

  const [refreshing, setRefreshing] = useState(false);

  const onUpdateStatus = (orderId, orderStatus) => {
    dispatch(updateOrderStatus(orderId, orderStatus))
    setRefreshing(true);

  }

  const onUpdateDelivery = (orderId, deliveryStatus) => {
    dispatch(updateDeliveryStatus(orderId, deliveryStatus))
    setRefreshing(true);
  }

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    dispatch(getOrderDetails(id));
    setRefreshing(false);
  }, [dispatch, route, refreshing]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AppBar title="Order Details" />
      {loadindO ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#262525" size="large" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 100,
          }}
          className="px-4 min-h-screen flex-1"
        >
          <View className="space-y-4">
            <View className="space-y-2">
              <Text className="text-base font-thin text-gray-600">
                Order Id: #{order?.order.orderId}
              </Text>
              <View className="bg-white shadow shadow-black px-4 py-3 mx-1 rounded-xl space-y-4">
                <View className="flex-row">
                  <View className="w-28 h-28 rounded-3xl bg-white shadow-md shadow-black">
                    <Image
                      source={{ uri: order?.order.dish.photo }}
                      className="w-28 h-28 rounded-3xl"
                    />
                  </View>
                  <View className="justify-evenly pl-3">
                    <Text className="text-base font-semibold">
                      {order?.order.dish.name.slice(0, 17) +
                        (order?.order.dish.name.length > 15 ? "..." : "")}
                    </Text>
                    <Text className="text-slate-500 -mt-2">
                      {order?.order.dish.chefName.slice(0, 15) +
                        (order?.order.dish.chefName.length > 15 ? "..." : "")}
                    </Text>
                    <Text className="font-semibold text-lg">
                      ₹{order?.order.dish.price}
                    </Text>
                    <Text>Qty: {order?.order.dish.quantity}</Text>
                  </View>
                </View>
                <View className={`${(order?.order.orderStatus !== 'Created' && order?.order.orderStatus !== 'Rejected' && order?.order.deliveryStatus !== 'Delivered') && 'border-t-2 border-slate-300'} -mb-2`}>
                  {isAuthenticated &&
                    user.userType === "Chef" &&
                    (order?.order.orderStatus === "Accepted" ? (
                      <View className="flex-row space-x-2 items-center justify-evenly p-2">
                        {(order?.order.deliveryStatus !== "Preparing" &&
                          order?.order.deliveryStatus !== "Shipped" &&
                          order?.order.deliveryStatus !== "Delivered") && (
                            <TouchableOpacity
                              onPress={() =>
                                onUpdateDelivery(order?.order._id, "Preparing")
                              }
                              className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                            >
                              <Text className="text-violet-500 font-semibold">
                                Preparing
                              </Text>
                            </TouchableOpacity>
                          )}
                        {order?.order.deliveryStatus !== "Shipped" &&
                          order?.order.deliveryStatus !== "Delivered" && (
                            <TouchableOpacity
                              onPress={() =>
                                onUpdateDelivery(order?.order._id, "Shipped")
                              }
                              className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                            >
                              <Text className="text-cyan-500 font-semibold">
                                Shipped
                              </Text>
                            </TouchableOpacity>
                          )}
                        {order?.order.deliveryStatus !== "Delivered" && (
                          <TouchableOpacity
                            onPress={() =>
                              onUpdateDelivery(order?.order._id, "Delivered")
                            }
                            className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                          >
                            <Text className="text-green-600 font-semibold">
                              Delivered
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : order?.order.orderStatus === "Rejected" ? (
                      <View />
                    ) : (
                      <View className="flex-row space-x-2 items-center justify-evenly p-2">
                        <TouchableOpacity
                          onPress={() =>
                            onUpdateStatus(order?.order._id, "Accepted")
                          }
                          className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                        >
                          <Text className="text-green-600 font-semibold">
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            onUpdateStatus(order?.order._id, "Rejected")
                          }
                          className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                        >
                          <Text className="text-red-500 font-semibold">
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>
              </View>
            </View>
            <View className="space-y-2">
              <Text className="text-base font-thin text-gray-600">Status</Text>
              <View className="px-4 bg-white py-3 rounded-xl shadow shadow-black mx-1 space-y-2">
                <OrderStatus orderStatus={order?.order.orderStatus} />
                <DeliveryStatus deliveryStatus={order?.order.deliveryStatus} />
              </View>
            </View>
            <View className="space-y-2">
              <Text className="text-base font-thin text-gray-600">
                Shipping Details
              </Text>
              <View className="px-4 bg-white py-3 rounded-xl shadow shadow-black mx-1 space-y-2">
                <Text className="text-base font-thin">
                  <Text className="text-slate-500 font-semibold text-sm">
                    Name:
                  </Text>{" "}
                  {order?.order.name}
                </Text>
                <Text className="text-base font-thin">
                  <Text className="text-slate-500 font-semibold text-sm">
                    Phone:
                  </Text>{" "}
                  {order?.order.phone}
                </Text>
                <Text className="text-base font-thin">
                  <Text className="text-slate-500 font-semibold text-sm">
                    Address:
                  </Text>{" "}
                  {order?.order.deliveryAddress.houseNo +
                    ", " +
                    order?.order.deliveryAddress.street +
                    ", " +
                    order?.order.deliveryAddress.city +
                    ", " +
                    order?.order.deliveryAddress.pincode}
                </Text>
              </View>
            </View>
            <View className="space-y-2">
              <Text className="text-base font-thin text-gray-600">
                Price Details
              </Text>
              <View className="bg-white mx-1 p-4 justify-center space-y-4 shadow shadow-black rounded-xl mb-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg">Item Price</Text>
                  <Text className="text-lg font-semibold">
                    ₹{order?.order.dish.price}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg">Item Qty</Text>
                  <Text className="text-lg font-semibold">
                    {order?.order.dish.quantity}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg">Delivery Charge</Text>
                  <Text className="text-lg font-semibold text-green-600">
                    Free
                  </Text>
                </View>
                <View className="border-b border-gray-300" />
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-bold">Total Amount</Text>
                  <Text className="text-lg font-bold">
                    ₹{order?.order.totalAmount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrderDetails;
