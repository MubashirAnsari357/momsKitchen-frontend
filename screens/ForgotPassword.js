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
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/actions/userAction";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const { loadingA, message, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleForgot = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({ type: "clearMessage" });
      navigation.replace("Verify", { email, mode: "Forgot" });
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [error, message, dispatch]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-12 my-7">
        <View className="items-center justify-center">
          <Image
            source={require("../assets/forgot.jpg")}
            resizeMode="center"
            className="w-full h-80 my-2"
          />
        </View>
        <View>
          <Text className="font-{n} text-2xl font-bold text-black">
            Forgot Password ?
          </Text>
          <Text className="font-{n} text-lg  mb-6">
            Don't worry Enter Mail & Follow Steps !
          </Text>
        </View>
        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <Ionicons name="md-mail-open-outline" size={25} color="#666" />
          <TextInput
            keyboardType="email-address"
            placeholder="Please Enter Email id"
            className="flex-1 text-lg pl-3"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="my-10">
          <TouchableOpacity
            onPress={handleForgot}
            className="bg-sky-400 rounded-lg border-blue-400 border-r-5 py-3"
          >
            {loadingA ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-center text-xl text-white font-ui-monospace font-bold">
                SUBMIT
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
