import { View, FlatList, RefreshControl, Text, Image } from "react-native";
import React from "react";
import DishCard from "./DishCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const DishesList = ({ view, dishes, refreshing, onRefresh, chef }) => {
  const route = useRoute();

  const getDishHeader = () => {
    return (
      <View className="">
        <Text className="px-5 text-lg font-semibold text-gray-500 text-start">
          {dishes?.length} dishes
        </Text>
      </View>
    );
  };

  const getChefProfileHeader = () => {
    const { name, address, email, photo, chefSpecialization, verified } = chef;
    return (
      <>
        <View className="justify-center items-center my-2">
          <View className="w-28 h-28 rounded-full bg-white shadow shadow-black">
            <Image
              source={{ uri: photo.url }}
              className="w-28 h-28 rounded-full"
            />
          </View>
          <View className="items-center justify-center">
            <View className="flex-row justify-center items-center space-x-2">
              <Text className="text-xl font-bold ">{name}</Text>
              {verified && (
                <MaterialIcons name="verified" color="#262525" size={25} />
              )}
            </View>
            <Text className="text-gray-500">{email}</Text>
            <Text className="text-gray-500">
              {address?.city + " - " + address?.pincode}
            </Text>
          </View>
          <View className="flex-row space-x-2">
            <Text className="text-base text-gray-500 font-semibold">
              Specialization: {chefSpecialization} &bull; {dishes?.length}{" "}
              Dishes
            </Text>
          </View>
        </View>
        <View className="border-b border-gray-300 mx-4 mb-2" />
      </>
    );
  };

  return (
    <>
      {view == "homeGrid" && (
        <FlatList
          horizontal
          contentContainerStyle={{
            paddingTop: 10,
            paddingRight: 30,
          }}
          data={dishes}
          renderItem={({ item }) => <DishCard dish={item} view={view} />}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      )}

      {view == "Grid" && (
        <View className="items-center">
          <FlatList
            vertical
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              paddingHorizontal: 6,
              paddingBottom: 50,
              paddingTop: 10,
            }}
            data={dishes}
            renderItem={({ item }) => <DishCard dish={item} view={view} />}
            keyExtractor={(item) => item._id}
            numColumns={2}
            ListHeaderComponent={
              route.name === "ChefProfile"
                ? getChefProfileHeader
                : getDishHeader
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {view == "List" && (
        <FlatList
          vertical
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 70,
          }}
          data={dishes}
          renderItem={({ item }) => <DishCard dish={item} view={view} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            route.name === "ChefProfile" ? getChefProfileHeader : getDishHeader
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {view == "recommendGrid" && (
        <FlatList
          horizontal
          contentContainerStyle={{
            paddingTop: 5,
            paddingRight: 30,
          }}
          data={dishes}
          renderItem={({ item }) => <DishCard dish={item} view={view} />}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default DishesList;
