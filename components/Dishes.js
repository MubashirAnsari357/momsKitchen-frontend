import {
  View,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
  Text,
} from "react-native";
import React from "react";
import DishCard from "./DishCard";
import { useRoute } from "@react-navigation/native";

const DishesList = ({ view, dishes, refreshing, onRefresh }) => {
  const route = useRoute();

  const getDishHeader = () => {
    return (
      <View>
        <Text className="px-5 text-lg font-semibold text-gray-500">
          {dishes?.length} dishes
        </Text>
      </View>
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
        <FlatList
          vertical
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingHorizontal: 6,
            paddingBottom: 200,
            paddingTop: 10,
          }}
          data={dishes}
          renderItem={({ item }) => <DishCard dish={item} view={view} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
          ListHeaderComponent={getDishHeader}
          showsVerticalScrollIndicator={false}
        />
      )}

      {view == "List" && (
        <FlatList
          vertical
          contentContainerStyle={
            route.name === "ChefProfile" ? styles.listStyle : styles.listStyle2
          }
          data={dishes}
          renderItem={({ item }) => <DishCard dish={item} view={view} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={getDishHeader}
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

const styles = StyleSheet.create({
  listStyle: {
    paddingTop: 10,
    paddingBottom: 250,
  },
  listStyle2: {
    paddingTop: 10,
    paddingBottom: 150,
  },
});

export default DishesList;
