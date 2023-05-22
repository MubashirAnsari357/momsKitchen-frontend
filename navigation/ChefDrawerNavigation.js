import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ChefHome from "../screens/ChefHome";
import ChefSettings from "../screens/ChefSettings";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { logout } from "../redux/actions/userAction";
import Search from "../screens/Search";
import { Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChefDishes from "../screens/ChefDishes";
import ChefAddDish from "../screens/ChefAddDish";
import ChefOrders from "../screens/ChefOrders";
import Profile from "../screens/Profile";

const ChefDrawerNavigation = () => {
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function CustomDrawerContent(props) {
    const handleLogout = () => {
      dispatch(logout());
      Toast.show({
        type: "info",
        text1: "Log out successfull!",
      });
      props.navigation.closeDrawer();
    };
    return (
      <DrawerContentScrollView {...props}>
        <View className="justify-center px-4 pb-6 space-y-2">
          <View className="flex-1 flex-row justify-between pt-4">
            <Image
              source={{ uri: user?.photo.url }}
              className="w-14 h-14 rounded-full"
            />
            <TouchableOpacity
              onPress={() => props.navigation.closeDrawer()}
              className="px-2"
            >
              <Ionicons name="close" size={30} color="#262525" />
            </TouchableOpacity>
          </View>
          <View className="">
            <Text className="font-semibold text-lg -mb-2">{user?.name}</Text>
            <Text className="font-thin text-base text-slate-600">
              {user?.email}
            </Text>
          </View>
          <View className="border-b border-gray-200 pt-4" />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          labelStyle={{color: 'red'}}
          onPress={handleLogout}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color='red' />
          )}
        />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        swipeEdgeWidth: 100,
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ChefHome") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "ChefDishes") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "ChefAddDish") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "ChefOrders") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: "#262525",
        drawerInactiveTintColor: "gray",
        headerShown: true,
      })}
    >
      <Drawer.Screen
        name="ChefHome"
        component={ChefHome}
        options={{ headerShown: false, drawerLabel: "Dashboard" }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ChefDishes"
        component={ChefDishes}
        options={{ headerShown: false, drawerLabel: "My Dishes" }}
      />
      <Drawer.Screen
        name="ChefAddDish"
        component={ChefAddDish}
        options={{ headerShown: false, drawerLabel: "Add Dish" }}
      />
      <Drawer.Screen
        name="ChefOrders"
        component={ChefOrders}
        options={{ headerShown: false, drawerLabel: "My Orders" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, drawerLabel: "Profile" }}
      />
    </Drawer.Navigator>
  );
};

export default ChefDrawerNavigation;
