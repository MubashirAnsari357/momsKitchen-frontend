import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, resetPassOtp, verify } from "../redux/actions/userAction";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const Verify = ({ route, navigation }) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const lastInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });

  const { loadingA, message, error, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleVerify = async () => {
    const {
      params: { email },
    } = route;
    let otpV = "";
    for (var key in otp) {
      otpV += otp[key];
    }
    if (route?.params.mode === "Forgot") {
      dispatch(resetPassOtp(email, Number(otpV)));
    } else {
      await dispatch(verify(Number(otpV)));
      dispatch(loadUser())
    }
  };

  useEffect(() => {

    if (route?.params.mode === "Chef") {
      if (user?.verified) {
        dispatch({ type: "clearMessage" });
        return navigation.replace("ChefDrawerNavigation", {
          screen: "ChefHome",
        });
      }
    }
    if (route?.params.mode === "User") {
      if (user?.verified) {
        dispatch({ type: "clearMessage" });
        return navigation.replace("UserTabNavigation", { screen: "Home" });
      }
    }

    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
    
    if (message) {
      if (route?.params.mode === "Forgot") {
        dispatch({ type: "clearMessage" });
        const {
          params: { email },
        } = route;
        return navigation.replace("ResetPassword", { email });
      }
      if (route?.params.mode === "Chef") {
        dispatch({ type: "clearMessage" });
        return navigation.replace("ChefDrawerNavigation", {
          screen: "ChefHome",
        });
      }
      if (route?.params.mode === "User") {
        dispatch({ type: "clearMessage" });
        return navigation.replace("UserTabNavigation", { screen: "Home" });
      }
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch, user?.verified]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-12">
        <View className="items-center justify-center">
          <Image
            source={require("../assets/otp.jpg")}
            resizeMode="center"
            className="w-full h-80 my-2"
          />
        </View>
        <View>
          <Text className="font-{n} text-3xl font-bold text-black my-3 text-center">
            Enter OTP
          </Text>
        </View>
        <View>
          <Text className="text-center">4 digit code has been sent to</Text>
          <Text className="text-center">
            Your Email:{" "}
            <Text className="text-m font-semibold text-green-700 text-center">
              {route?.params.email}
            </Text>
          </Text>
        </View>
        <View className="flex-row my-8 mx-4 mb-7 text-center justify-evenly">
          <View className="border-r-4 border-green-900 border-2">
            <TextInput
              className="text-lg text-black p-0 text-center px-4 py-3"
              ref={firstInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => {
                setOtp({ ...otp, 1: text });
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View className="border-r-4 border-green-900 border-2">
            <TextInput
              className="text-lg text-black p-0 text-center px-4 py-3"
              ref={secondInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => {
                setOtp({ ...otp, 2: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View className="border-r-4 border-green-900 border-2">
            <TextInput
              className="text-lg text-black p-0 text-center px-4 py-3"
              ref={thirdInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => {
                setOtp({ ...otp, 3: text });
                text ? lastInput.current.focus() : secondInput.current.focus();
              }}
            />
          </View>
          <View className="border-r-4 border-green-900 border-2">
            <TextInput
              className="text-lg text-black p-0 text-center px-4 py-3"
              ref={lastInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => {
                setOtp({ ...otp, 4: text });
                !text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          disabled={loadingA}
          onPress={handleVerify}
          className="bg-green-500 border-r-1 border-5 rounded-md mx-4 justify-center align-middle mt-2 p-2"
        >
          {loadingA ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-lg text-white text-center font-semibold">
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verify;
