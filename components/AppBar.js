import { View, Text, TouchableOpacity, StatusBar, Platform, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const AppBar = ({title, basketShown}) => {

  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
   const navigation = useNavigation()
   const route = useRoute()
   
  return (
    <View className={`bg-white py-4 flex-row justify-between items-center px-6 shadow-md shadow-black z-50 space-x-4`}>
      {route.name=='Settings' || route.name=='Orders' ? '' : <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-[#e4eaf0] rounded-full w-8 h-8 justify-center items-center"
      >
        <Ionicons name="chevron-back-outline" color="#262525" size={25} />
      </TouchableOpacity>}
      <Text className="text-black font-semibold text-lg flex-1">
        {title}
      </Text>
      {!basketShown ? '' : <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
        <Ionicons name="cart-outline" color="#262525" size={30} />
      </TouchableOpacity>}
    </View>
  );
};

export default AppBar;
