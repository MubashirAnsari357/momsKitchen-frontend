import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userAction";
import Toast from "react-native-toast-message";
import AppBar from "../components/AppBar";
import { cuisinePicker, genderPicker } from "../MockData/MockData";
import { Dropdown } from "react-native-element-dropdown";
import mime from "mime";
import { SafeAreaView } from "react-native-safe-area-context";

const ChefSignup2 = ({ navigation, route }) => {
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState(route.params.password);
  const [userType, setUserType] = useState(route.params.userType);
  const [chefSpecialization, setChefSpecialization] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [genIcon, setGenIcon] = useState("");
  const [houseNo, sethouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState(null);

  const { error, isAuthenticated, loadingA } = useSelector(
    (state) => state.auth
  );

  const renderGenderItem = (item) => {
    return (
      <View className="flex-row justify-between items-center p-4">
        <Text className="flex-1">{item.label}</Text>
        {item.value === gender && (
          <Ionicons color="black" name={item.icon} size={20} />
        )}
      </View>
    );
  };

  const renderCuisineItem = (item) => {
    return (
      <View className="flex-row justify-between items-center p-4">
        <Text className={`flex-1 ${item.label === "Others" && "font-bold"}`}>
          {item.label}
        </Text>
      </View>
    );
  };

  const dispatch = useDispatch();

  const handleRegister = () => {
    if (
      !chefSpecialization ||
      !gender ||
      !phone ||
      !houseNo ||
      !street ||
      !city ||
      !pincode
    ) {
      return Toast.show({
        type: "error",
        text1: "Please fill all the fields",
      });
    }
    if (!image) {
      return Toast.show({
        type: "error",
        text1: "Please upload your photo",
      });
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("gender", gender);
    myForm.append("phone", Number(phone));
    myForm.append("houseNo", houseNo);
    myForm.append("street", street);
    myForm.append("city", city);
    myForm.append("pincode", Number(pincode));
    myForm.append("userType", userType);
    myForm.append(`photo`, {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setImage(route.params.image);
      }
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [isAuthenticated, error, dispatch, route]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <AppBar title="Signup as Chef" basketShown={false} />
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 my-7">
        <View className="items-center justify-center">
          <Image source={{ uri: image }} className="w-32 h-32 rounded-full" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera", { mode: "Register" })}
            className="mt-2 px-4 py-2 rounded-lg active:bg-gray-200 border border-gray-200"
          >
            <Text className="font-semibold text-base text-center">
              Upload photo
            </Text>
          </TouchableOpacity>
        </View>

        <View className="justify-center my-2 space-y-3 mx-1">
          <View className="flex-row items-center space-x-2 justify-between">
            <Dropdown
              className="flex-1 bg-white py-2 px-4 border border-slate-100 rounded-md shadow-sm shadow-black text-base focus:border-[#5E72EB]"
              data={cuisinePicker}
              iconStyle={{ width: 20, height: 20 }}
              search
              selectedTextStyle={{ marginLeft: 5 }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Specialization"
              searchPlaceholder="Search..."
              value={chefSpecialization}
              onChange={(item) => {
                setChefSpecialization(item.value);
              }}
              renderItem={renderCuisineItem}
            />
            <Dropdown
              className="flex-1 bg-white py-2 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
              data={genderPicker}
              iconStyle={{ width: 20, height: 20 }}
              selectedTextStyle={{ marginLeft: 5 }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Choose Gender"
              searchPlaceholder="Search..."
              value={gender}
              onChange={(item) => {
                setGender(item.value);
                setGenIcon(item.icon);
              }}
              renderItem={renderGenderItem}
              renderLeftIcon={() => (
                <Ionicons color="black" name={genIcon} size={20} />
              )}
            />
          </View>
          <TextInput
            className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
            placeholder="Mobile number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View className="my-2">
          <Text className="text-sm font-semibold">Address</Text>
          <View className="justify-center my-2 space-y-3 mx-1">
            <TextInput
              className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
              placeholder="House No / Flat No / Floor"
              value={houseNo}
              onChangeText={sethouseNo}
            />
            <TextInput
              className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
              placeholder="Society / Street Name"
              value={street}
              onChangeText={setStreet}
            />
            <View className="flex-row flex-1 items-center space-x-2 justify-between">
              <TextInput
                className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
                placeholder="Pincode"
                keyboardType="number-pad"
                value={pincode}
                onChangeText={setPincode}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loadingA}
          className={`bg-[#5E72EB] border-[#5E72EB] rounded-xl p-3 my-4`}
        >
          {loadingA ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-center font-bold text-lg text-white">
              REGISTER
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChefSignup2;
