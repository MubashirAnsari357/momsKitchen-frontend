import { FlatList, RefreshControl, Text, View } from "react-native";
import React from "react";
import ChefCard from "./ChefCard";

const Chefs = ({ view, chefs, refreshing, onRefresh }) => {

  const getChefHeader = () => {
    return (
      <View>
        <Text className="px-5 text-lg font-semibold text-gray-500">
          {chefs?.length} chefs
        </Text>
      </View>
    );
  };

  return (
    <>
      {view == 'homeGrid' && <FlatList
        horizontal
        contentContainerStyle={{
          paddingTop: 10,
          paddingRight: 30,
        }}
        data={chefs}
        renderItem={({ item }) => <ChefCard chef={item} view={view} />}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />}
      {view == 'Grid' && <FlatList
        vertical
        contentContainerStyle={{
          paddingTop: 10,
          paddingLeft: 1,
          paddingBottom: 50,
        }}
        data={chefs}
        renderItem={({ item }) => <ChefCard chef={item} view={view} />}
        numColumns={3}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={getChefHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />}
      {view == 'List' && <FlatList
        vertical
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 50,
        }}
        data={chefs}
        renderItem={({ item }) => <ChefCard chef={item} view={view} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={getChefHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />}
    </>
  );
};

export default Chefs;
