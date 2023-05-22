import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../redux/actions/userAction";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppBar from "../components/AppBar";
import { cuisinePicker, genderPicker } from "../MockData/MockData";
import ChefAppBar from "../components/ChefAppBar";
import mime from "mime";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = ({ navigation, route }) => {
  const { loadingA, user, isAuthenticated, error, message } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState(user?.name || "");
  const [chefSpecialization, setChefSpecialization] = useState(
    user?.chefSpecialization || ""
  );
  const [gender, setGender] = useState(user?.gender || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [image, setImage] = useState(user?.photo.url || "");
  const [houseNo, sethouseNo] = useState(user?.address.houseNo || "");
  const [street, setStreet] = useState(user?.address.street || "");
  const [city, setCity] = useState(user?.address.city || "");
  const [pincode, setPincode] = useState(user?.address.pincode || "");
  const [genIcon, setGenIcon] = useState("");

  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("gender", gender);
    myForm.append("phone", Number(phone));
    myForm.append("houseNo", houseNo);
    myForm.append("street", street);
    myForm.append("city", city);
    myForm.append("pincode", Number(pincode));
    if (route.params) {
      if (route.params.image) {
        myForm.append("photo", {
          uri: image,
          type: mime.getType(image),
          name: image.split("/").pop(),
        });
      }
    }
    if (user.userType === "Chef") {
      myForm.append("chefSpecialization", chefSpecialization);
    }

    await dispatch(updateProfile(myForm));
  };

  const renderItem = (item) => {
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

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setImage(route.params.image);
      }
    }
    if (!isAuthenticated) {
      Toast.show({
        type: "success",
        text1: "Please Login first!",
      });
      navigation.replace("Login");
    } else {
      dispatch(loadUser());
    }
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [message, error, dispatch, route, isAuthenticated]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {isAuthenticated && user.userType === "Chef" ? <ChefAppBar title="Profile" /> : <AppBar title="My Profile" />}
      <ScrollView
        className="space-y-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 100 }}
      >
        <View className="px-4">
          <Text className="text-lg font-semibold">Profile</Text>
          {isAuthenticated && user.userType === "Chef" && (
            <View className="items-center justify-center">
              {route?.params ? route?.params.image && (
                <Image
                  source={{ uri: image }}
                  className="w-32 h-32 rounded-full"
                />
              ) : (
                <Image
                  source={{ uri: image }}
                  className="w-32 h-32 rounded-full"
                />
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Camera", { mode: "Profile" })
                }
                className="mt-2 px-4 py-2 rounded-lg active:bg-gray-200 border border-gray-200"
              >
                <Text className="font-semibold text-base text-center">
                  Upload photo
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="justify-center my-2 space-y-3 mx-1">
            {isAuthenticated && user.userType === "Chef" ? <TextInput
              className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
              keyboardType="default"
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            /> : <TextInput
            className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB] text-gray-500"
            keyboardType="email-address"
            placeholder="Email address"
            value={user?.email}
            editable={false}
          />}
            <View className="flex-row items-center space-x-2 justify-between">
              {isAuthenticated && user.userType === "Chef" ? <Dropdown
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
              /> : <TextInput
              className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />}
              <Dropdown
                className="flex-1 bg-white py-2 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
                data={genderPicker}
                iconStyle={{ width: 20, height: 20 }}
                // search
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
                renderItem={renderItem}
                renderLeftIcon={() => (
                  <Ionicons color="black" name={genIcon} size={20} />
                )}
              />
            </View>
            <TextInput
              className="flex-1 bg-white py-3 px-4 border border-slate-100 rounded-md shadow shadow-black text-base focus:border-[#5E72EB]"
              placeholder="Mobile number"
              keyboardType="phone-pad"
              value={phone.toString()}
              onChangeText={setPhone}
            />
          </View>
        </View>
        <View className="px-4">
          <Text className="text-lg font-semibold">Address</Text>
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
            <View className="flex-row items-center space-x-2 justify-between">
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
                value={pincode.toString()}
                onChangeText={setPincode}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 z-50 w-full bg-white py-2 shadow-2xl shadow-black">
        <TouchableOpacity
          onPress={handleUpdateProfile}
          className="flex-row justify-center space-x-2 items-center p-3 mx-4 rounded-full bg-[#5E72EB] shadow shadow-black"
        >
          {loadingA ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-center font-semibold text-white text-lg">
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
