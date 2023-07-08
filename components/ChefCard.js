import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ChefCard = ({ chef, view }) => {
  
  const navigation = useNavigation();
  const {
    _id,
    name,
    address,
    email,
    phone,
    photo,
    chefSpecialization,
    userType,
    verified,
  } = chef;
  return (
    <>
      {view == "homeGrid" && (
        <View
          
          className="relative ml-4 items-center w-36 h-48 -mt-4"
        >
          <TouchableOpacity onPress={() =>
            navigation.navigate("ChefProfile", {
              _id,
              name,
              address,
              email,
              phone,
              photo,
              chefSpecialization,
              userType,
              verified,
            })
          } className="w-24 h-24 mt-4 rounded-full z-50 bg-white active:bg-gray-100 shadow-md shadow-black">
            <Image
              source={{ uri: photo.url }}
              className="w-24 h-24 rounded-full shadow-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            navigation.navigate("ChefProfile", {
              _id,
              name,
              address,
              email,
              phone,
              photo,
              chefSpecialization,
              userType,
              verified,
            })
          } className="absolute top-16 bg-white active:bg-gray-100 items-center rounded-2xl w-36 justify-center pb-3 shadow shadow-black">
            <Text className="pt-16 font-semibold text-[#262525] text-base text-center">
            {name.slice(0, 12) + (name.length > 12 ? "..." : "")}
            </Text>
            <Text className="text-slate-500">{address?.city}</Text>
          </TouchableOpacity>
        </View>
      )}
      {view == "List" && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChefProfile", {
              _id,
              name,
              address,
              email,
              phone,
              photo,
              chefSpecialization,
              userType,
              verified,
            })
          }
          className="flex-row flex-1 mx-4 my-1 bg-white active:bg-gray-100 justify-between items-center rounded-2xl shadow shadow-black py-2 hover:scale-105"
        >
          <View className="w-16 h-16 mx-4 rounded-full bg-white shadow-md shadow-black">
            <Image
              source={{ uri: photo.url }}
              className="w-16 h-16 rounded-full"
            />
          </View>
          <View className="items-start justify-start flex-1">
            <Text className="font-semibold text-[#262525] text-base">
              {name}
            </Text>
            <Text className="text-slate-500">{address?.city}</Text>
          </View>
        </TouchableOpacity>
      )}
      {view == "Grid" && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChefProfile", {
              _id,
              name,
              address,
              email,
              phone,
              photo,
              chefSpecialization,
              userType,
              verified,
            })
          }
          className="mx-1 bg-white w-[30vw] px-1 my-1 items-center justify-center rounded-2xl shadow shadow-black"
        >
          <Image
            source={{ uri: photo.url }}
            className="w-16 h-16 my-2 rounded-full"
          />
          <View className="justify-center items-center pb-2 mt-2">
            <Text className="font-semibold text-[#262525] text-base text-center">
            {name.slice(0, 11) + (name.length > 11 ? "..." : "")}
            </Text>
            <Text className="text-slate-500">{address?.city}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ChefCard;
