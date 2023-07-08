import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Chefs from "../components/Chefs";
import AppBar from "../components/AppBar";
import { SafeAreaView } from "react-native-safe-area-context";

const AllChefs = ({ route }) => {

  const { chefs } = useSelector((state) => state.auth);
  
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AppBar title={'Chefs'} />
      <View className="">
          <Chefs view="List" chefs={chefs.chefs}/>
      </View>
    </SafeAreaView>
  );
};

export default AllChefs;
