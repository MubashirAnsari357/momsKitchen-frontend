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
import { updateDeliveryStatus, updateOrderStatus } from "../redux/actions/orderAction";
import { useState } from "react";
import OrderStatus from "../components/OrderStatus";
import DeliveryStatus from "../components/DeliveryStatus";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_URL } from "@env";
import PaymentStatus from "../components/PaymentStatus";
import Loading from "../components/Loading";

const OrderDetails = ({ route, navigation }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [Order, setOrder] = useState({})

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

  const fetchOrder = async (orderId) => {
    const {data: {order}} = await axios.get(`${API_URL}/getorderdetails/${orderId}`);
    setOrder(order);
    setLoading(false)
  }

  useEffect(() => {
    fetchOrder(id);
    setRefreshing(false);
  }, [dispatch, route, refreshing]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AppBar title="Order Details" />
      {loading ? (
        <Loading />
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
                Order Id: #{Order.orderId}
              </Text>
              <View className="bg-white shadow shadow-black px-4 py-3 mx-1 rounded-xl space-y-4">
                <View className="flex-row">
                  <View className="w-28 h-28 rounded-3xl bg-white shadow-md shadow-black">
                    <Image
                      source={{ uri: Order.dish.photo }}
                      className="w-28 h-28 rounded-3xl"
                    />
                  </View>
                  <View className="justify-evenly pl-3">
                    <Text className="text-base font-semibold">
                      {Order.dish.name.slice(0, 17) +
                        (Order.dish.name.length > 15 ? "..." : "")}
                    </Text>
                    <Text className="text-slate-500 -mt-2">
                      {Order.dish.chefName.slice(0, 15) +
                        (Order.dish.chefName.length > 15 ? "..." : "")}
                    </Text>
                    <Text className="font-semibold text-lg">
                      ₹{Order.dish.price}
                    </Text>
                    <Text>Qty: {Order.dish.quantity}</Text>
                  </View>
                </View>
                <View className={`${(Order.orderStatus !== 'Created' && Order.orderStatus !== 'Rejected' && Order.deliveryStatus !== 'Delivered') && 'border-t-2 border-slate-300'} -mb-2`}>
                  {isAuthenticated &&
                    user.userType === "Chef" &&
                    (Order.orderStatus === "Accepted" ? (
                      <View className="flex-row space-x-2 items-center justify-evenly p-2">
                        {(Order.deliveryStatus !== "Preparing" &&
                          Order.deliveryStatus !== "Shipped" &&
                          Order.deliveryStatus !== "Delivered") && (
                            <TouchableOpacity
                              onPress={() =>
                                onUpdateDelivery(Order._id, "Preparing")
                              }
                              className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                            >
                              <Text className="text-violet-500 font-semibold">
                                Preparing
                              </Text>
                            </TouchableOpacity>
                          )}
                        {Order.deliveryStatus !== "Shipped" &&
                          Order.deliveryStatus !== "Delivered" && (
                            <TouchableOpacity
                              onPress={() =>
                                onUpdateDelivery(Order._id, "Shipped")
                              }
                              className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                            >
                              <Text className="text-cyan-500 font-semibold">
                                Shipped
                              </Text>
                            </TouchableOpacity>
                          )}
                        {Order.deliveryStatus !== "Delivered" && (
                          <TouchableOpacity
                            onPress={() =>
                              onUpdateDelivery(Order._id, "Delivered")
                            }
                            className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                          >
                            <Text className="text-green-600 font-semibold">
                              Delivered
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : Order.orderStatus === "Rejected" ? (
                      <View />
                    ) : (
                      <View className="flex-row space-x-2 items-center justify-evenly p-2">
                        <TouchableOpacity
                          onPress={() =>
                            onUpdateStatus(Order._id, "Accepted")
                          }
                          className="items-center space-y-1 active:bg-gray-100 active:rounded-md p-2"
                        >
                          <Text className="text-green-600 font-semibold">
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            onUpdateStatus(Order._id, "Rejected")
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
                <OrderStatus orderStatus={Order.orderStatus} />
                <PaymentStatus paymentStatus={Order.paymentStatus} />
                <DeliveryStatus deliveryStatus={Order.deliveryStatus} />
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
                  {Order.name}
                </Text>
                <Text className="text-base font-thin">
                  <Text className="text-slate-500 font-semibold text-sm">
                    Phone:
                  </Text>{" "}
                  {Order.phone}
                </Text>
                <Text className="text-base font-thin">
                  <Text className="text-slate-500 font-semibold text-sm">
                    Address:
                  </Text>{" "}
                  {Order.deliveryAddress.houseNo +
                    ", " +
                    Order.deliveryAddress.street +
                    ", " +
                    Order.deliveryAddress.city +
                    ", " +
                    Order.deliveryAddress.pincode}
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
                    ₹{Order.dish.price}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg">Item Qty</Text>
                  <Text className="text-lg font-semibold">
                    {Order.dish.quantity}
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
                    ₹{Order.totalAmount}
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
