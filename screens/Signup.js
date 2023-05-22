import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const emailRegex = /^\S+@\S+\.\S+$/;

  const { error, isAuthenticated, loadingA } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const handleRegister = () => {
    if(!emailRegex.test(email)){
      return Toast.show({
        type: "error",
        text1: "Invalid email format",
      });
    }
    if(!name || !email || !password || !cpassword){
      return Toast.show({
        type: "error",
        text1: "Please fill all the fields",
      });
    }
    if (password != cpassword) {
      return Toast.show({
        type: "error",
        text1: "Passwords do not match!",
      });
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    dispatch(register(myForm))
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({type: 'clearError'});
    }
  }, [isAuthenticated, error, dispatch]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-12">
        <View className="items-center justify-center">
          <Image
            source={require("../assets/Signup.jpg")}
            resizeMode="center"
            className="w-full h-52 my-2"
          />
        </View>
        <View>
          <Text className="font-{n} text-lg font-bold text-black">
            Getting Started
          </Text>
          <Text className="font-{n} text-m  mb-4">
            Create an account to continue !
          </Text>
        </View>

        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <Ionicons name="md-person-outline" size={20} color="#666" />
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            className="flex-1"
          />
        </View>
        <View className="flex-row flex- space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <MaterialIcons name="alternate-email" size={20} color="#666" />
          <TextInput
            placeholder="Email ID"
            className="flex-1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <Ionicons name="lock-closed-outline" size={20} color="#666" />
          <TextInput
            placeholder="Password"
            className="flex-1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <Ionicons name="md-lock-closed" size={20} color="#666" />
          <TextInput
            placeholder="Confirm Password"
            className="flex-1"
            value={cpassword}
            onChangeText={setCpassword}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loadingA}
          className={`bg-[#5E72EB] border-[#5E72EB] rounded-xl p-3 my-4`}
        >
          {loadingA ? <ActivityIndicator size="small" color="white" /> : <Text className="text-center font-bold text-lg text-white">
            REGISTER
          </Text>}
        </TouchableOpacity>

        <View className="flex-row justify-center mb-7 items-center space-x-1">
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-[#5E72EB] font-bold text-base"> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
