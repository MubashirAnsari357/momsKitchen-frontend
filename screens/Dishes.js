import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DishesList from "../components/Dishes";
import Loading from "../components/Loading";
import AppBar from "../components/AppBar";
import { SafeAreaView } from "react-native-safe-area-context";

const Dishes = ({ route }) => {
  const { dishes } = useSelector((state) => state.dishes);

  const [loading, setLoading] = useState(false);
  const [categoryDishes, setCategoryDishes] = useState(dishes?.Dishes ? dishes?.Dishes : []);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (route.params) {
      const { name } = route?.params;
      setCategoryDishes((categoryDishes) =>
        categoryDishes.filter((item) => item.type === name)
      );
    }
    setLoading(false);
    setRefreshing(false);
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };


  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AppBar title={`${route?.params ? route?.params.name : 'All'} Dishes`} />
      <View className="">
        {loading && !dishes?.Dishes ? (
          <Loading />
        ) : (
          <DishesList view="List" dishes={categoryDishes} refreshing={refreshing}
          onRefresh={onRefresh}/>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Dishes;
