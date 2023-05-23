import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ChefAppBar from "../components/ChefAppBar";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { categories, cuisinePicker } from "../MockData/MockData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDish } from "../redux/actions/dishAction";
import mime from "mime";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const ChefAddDish = ({navigation, route}) => {

  const {message, loadingD, error} = useSelector(state=>state.dishes)
  const dispatch = useDispatch()

  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [images, setImages] = useState([])

  const renderItem = (item) => {
    return (
      <View className="flex-row justify-between items-center p-4">
        <Text className={`flex-1 ${item.label==="Others" && 'font-bold'}`}>{item.label}</Text>
      </View>
    );
  };

  const handleAddDish = () =>{

    if (
      !name ||
      !cuisine ||
      !description ||
      !type ||
      !price ||
      !qty
    ) {
      return Toast.show({
        type: "error",
        text1: "Please fill all the fields",
      });
    }
    if (Number(price)<1) {
      return Toast.show({
        type: "error",
        text1: "Price is not valid!",
      });
    }
    if (Number(qty)<1) {
      return Toast.show({
        type: "error",
        text1: "Quantity is not valid!",
      });
    }
    if (images.length<1) {
      return Toast.show({
        type: "error",
        text1: "Please upload photos",
      });
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("desc", description)
    formData.append("type", type)
    formData.append("cuisine", cuisine)
    formData.append("availableQty", qty)
    formData.append("price", price)
    images.forEach((image) => {
      formData.append(`photos`, {
        uri: image,
        type: mime.getType(image),
        name: image.split("/").pop(),
      });
    })

    dispatch(addDish(formData))

  }

  useEffect(() => {
    if (route.params) {
        if (route.params.dishImages) {
            setImages(route.params.dishImages)
        }
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
        position: 'top'
      });
      dispatch({type: 'clearMessage'});
      navigation.replace("ChefDrawerNavigation", {screen: "ChefDishes"})
    }

    if (error) {
      Toast.show({
        type: "error",
        text1: error,
        position: 'top'
      });
      dispatch({type: 'clearError'});
    }

}, [route, dispatch, error, message])

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <ChefAppBar title="Add Dish" />

        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 200,
          }}
          className="px-4 space-y-2"
        >
          <View className="flex-row flex-1 space-x-3 m-1">
            <View className="w-[48%]">
              <Text className="text-xs text-gray-500 font-semibold">
                Dish Name
              </Text>
              <TextInput
                className="bg-white py-3 px-4 border border-slate-100 rounded-md shadow-sm shadow-black text-base focus:border-[#262525]"
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View className="w-[48%]">
              <Text className="text-xs text-gray-500 font-semibold">
                Dish Cuisine
              </Text>
              <Dropdown
                className="bg-white py-2 px-4 border border-slate-100 rounded-md shadow-sm shadow-black text-base focus:border-[#262525]"
                data={cuisinePicker}
                iconStyle={{ width: 20, height: 20 }}
                search
                selectedTextStyle={{ marginLeft: 5 }}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Cuisine"
                searchPlaceholder="Search..."
                value={cuisine}
                onChange={(item) => {
                  setCuisine(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View className="m-1">
            <Text className="text-xs text-gray-500 font-semibold">
              Dish Description
            </Text>
            <TextInput
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              maxLength={500}
              placeholder="Add your dish description"
              className="bg-white py-3 px-4 border border-slate-100 rounded-md shadow-sm shadow-black text-base focus:border-[#262525]"
            />
          </View>
          <View className="m-1">
            <Text className="text-xs text-gray-500 font-semibold">
              Dish Type
            </Text>
            <View className="flex-row flex-wrap">
              {categories.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setType(item.name)}
                    className={`${
                      type === item.name && "border-2 border-[#262525]"
                    } bg-white items-center justify-center w-[31%] py-2 my-2 shadow-sm shadow-black rounded-md mx-1`}
                  >
                    <Image source={item.categoryImg} className="w-7 h-7" />
                    <Text className="font-semibold text-[#262525] text-base">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View className="flex-row flex-1 space-x-3 m-1">
            <View className="w-[48%]">
              <Text className="text-xs text-gray-500 font-semibold">
                Dish Price
              </Text>
              <TextInput
                className="bg-white py-3 px-4 border border-slate-100 rounded-md shadow-sm shadow-black text-base focus:border-[#262525]"
                placeholder="Price"
                value={price}
                keyboardType="decimal-pad"
                inputMode="decimal"
                onChangeText={setPrice}
              />
            </View>
            <View className="w-[48%]">
              <Text className="text-xs text-gray-500 font-semibold">
                Dish Quantity
              </Text>
              <TextInput
                className="bg-white py-3 px-4 border border-slate-100 rounded-md shadow-sm shadow-black text-base focus:border-[rgb(221,147,147)]"
                placeholder="Available Qty"
                keyboardType="number-pad"
                inputMode="numeric"
                value={qty}
                onChangeText={setQty}
              />
            </View>
          </View>
          <View className="m-1 flex-1 space-y-2">
            <Text className="text-xs text-gray-500 font-semibold">
              Dish Photos
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              className="flex-row flex-1 mt-5 space-x-1"
            >
              {images.map((image, index)=>{
                return <Image key={index}
                source={{uri: image}}
                className="w-28 h-28 rounded-xl"
              />
              })}
              
            </ScrollView>
            <View className="items-center justify-center">
              <TouchableOpacity onPress={()=>navigation.navigate("Camera", { mode: "Add" })} className="px-4 py-2 rounded-lg active:bg-gray-200 border border-gray-200">
                <Text className="font-semibold text-base text-center">
                  Upload photos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View className="absolute bottom-0 z-50 w-full bg-white py-2 shadow-2xl shadow-black">
        <TouchableOpacity onPress={handleAddDish} disabled={loadingD}
          className="flex-row justify-center space-x-2 items-center p-3 mx-4 rounded-full bg-[#262525] shadow shadow-black"
        >
          {loadingD ? <ActivityIndicator size="small" color="white" /> : <Text className="text-center font-semibold text-white text-lg">
            Add
          </Text>}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChefAddDish;
