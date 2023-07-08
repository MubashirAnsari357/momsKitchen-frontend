import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { categories } from "../MockData/MockData";
import { SafeAreaView } from "react-native-safe-area-context";

const Filter = ({ route }) => {
  const navigation = useNavigation();

  const sortCriteria = [
    {
      title: "Lowest to highest",
      value: 1,
      icon: "radio-button-off",
      iconSelected: "radio-button-on",
    },
    {
      title: "Highest to Lowest",
      value: -1,
      icon: "radio-button-off",
      iconSelected: "radio-button-on",
    },
  ];

  const [catList, setCatList] = useState(
    route?.params.dishType == "all" || !route?.params.dishType
      ? []
      : route?.params.dishType
  );
  const [sort, setSort] = useState(
    route?.params.sortType ? route?.params.sortType : null
  );

  const handleCategory = (name) => {
    if (!catList.includes(name)) {
      setCatList((catList) => [...catList, name]);
    } else {
      setCatList((catList) => catList.filter((item) => item != name));
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="bg-white py-4 flex-row justify-between items-center px-6 shadow-md shadow-black z-50">
          <Text className="text-black font-semibold text-xl">Filters</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close-outline" color="#262525" size={30} />
          </TouchableOpacity>
        </View>
        <View className="p-4 space-y-4">
          <View className="">
            <Text className="text-base font-semibold">Sort by:</Text>
            <View className="flex-row items-center justify-start space-x-6 pt-2">
              {sortCriteria.map((item) => {
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => setSort(item.value)}
                    className="ml-2 flex-row justify-center items-center space-x-2"
                  >
                    <Ionicons
                      name={`${
                        item.value == sort ? item.iconSelected : item.icon
                      }`}
                      color="#252626"
                      size={25}
                    />
                    <Text>{item.title}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View className="">
            <Text className="text-base font-semibold">Categories: </Text>
            <View className="flex-row flex-wrap ">
              {categories.map((item) => {
                return (
                  <Pressable
                    key={item.name}
                    onPress={() => handleCategory(item.name)}
                    className={`${
                      catList.includes(item.name) && "border-2 border-[#262525]"
                    } bg-white flex-row items-center space-x-2 w-[40vw] my-2 py-2 shadow-sm shadow-black rounded-md ml-2`}
                  >
                    <Image source={item.categoryImg} className="w-7 h-7 ml-2" />
                    <Text className="font-semibold text-[#262525] text-base">
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View className="absolute bottom-3 z-50 w-full">
        <TouchableOpacity
          onPress={() => navigation.navigate("Search", { catList, sort })}
          className="flex-row justify-center space-x-2 items-center p-3 mx-6 rounded-full bg-[#5E72EB] shadow shadow-black"
        >
          <Text className="text-center font-semibold text-white text-lg">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Filter;
