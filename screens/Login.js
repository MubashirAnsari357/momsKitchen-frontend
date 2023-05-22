import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userAction";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const { error, isAuthenticated, loadingA, message } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);


  const dispatch = useDispatch();

  const handleLogin = () => {
    if(!email || !password){
      return Toast.show({
        type: "error",
        text1: "Please fill all the fields",
      });
    }
    dispatch(login(email, password));

  };

  useEffect(() => {
    
    if (isAuthenticated) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({ type: "clearMessage" });
      navigation.replace("UserTabNavigation", { screen: "Home" });
    } 
    if(error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [isAuthenticated, error, message, dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-12" contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          source={require("../assets/26.jpg")}
          resizeMode="center"
          className="w-full h-64 mb-2"
        />
        <Text className="font-{n} text-4xl my-2">WelCome Back</Text>
        <Text className="font-{n} text-m">Log in to Your Existing Account</Text>
        <View className="border-2 flex-row mt-5 bg-white px-2 py-2 space-x-3 shadow-lg items-center rounded-md border-[#8c9dfd] focus:border-[#5E72EB]">
          <FontAwesome5 name="user-circle" size={24} color="#5E72EB" />
          <TextInput
            className="text-lg flex-1"
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          ></TextInput>
        </View>
        <Text></Text>
        <View className="border-2 border-[#8c9dfd] focus:border-[#5E72EB] mt-2 flex-row bg-white px-2 py-2 shadow-lg items-center rounded-md">
          <MaterialIcons name="lock-outline" size={24} color="#5E72EB" />
          <TextInput
            className="text-lg flex-1 ml-3 mr-1"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passVisible}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setPassVisible(!passVisible);
            }}
          >
            <FontAwesome5
              name={`${passVisible ? "eye" : "eye-slash"}`}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row mt-6 mb-3 justify-between items-center ">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Signup")}
          >
            <Text className=" text-[#5E72EB] font-bold">Or Register !</Text>
          </TouchableOpacity>
          <TouchableOpacity className="" onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className=" text-gray-900 font-bold">Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loadingA}
          className={`flex-row w-full justify-center space-x-2 items-center p-3 rounded-xl bg-[#5E72EB] shadow shadow-black`}
        >
          {loadingA ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <MaterialIcons name="login" color="white" size={25} />
              <Text className="text-center font-semibold text-white text-lg">
                LOGIN
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
