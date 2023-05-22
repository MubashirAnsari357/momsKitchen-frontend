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
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/actions/userAction";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = ({ navigation }) => {
  const [opass, setOpass] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [opassVisible, setOpassVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [passVisible2, setPassVisible2] = useState(false);

  const { isAuthenticated, loadingA, message, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const handleChangePassword = () => {
    if (!opass || !pass || !cpass) {
      return Toast.show({
        type: "error",
        text1: "Please fill all the fields",
      });
    }
    if (pass !== cpass) {
      return Toast.show({
        type: "error",
        text1: "Passwords do not match!",
      });
    }
    dispatch(changePassword(opass, pass));
  };

  useEffect(() => {
    if (!isAuthenticated) {
        Toast.show({
            type: "success",
            text1: message,
            text2: "Please Login with your new password!",
        });
        dispatch({ type: "clearMessage" });
      navigation.replace("Login");
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [isAuthenticated, error, dispatch]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-12">
        <View className="items-center justify-center">
          <Image
            source={require("../assets/reset-password.png")}
            resizeMode="center"
            className="w-full h-80 my-1"
          />
        </View>
        <View>
          <Text className="font-{n} text-3xl font-bold text-black my-3">
            Change Password
          </Text>
        </View>
        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <TextInput
            placeholder="Enter Old Password"
            className="flex-1 text-lg"
            value={opass}
            onChangeText={setOpass}
            secureTextEntry={!opassVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setOpassVisible(!opassVisible);
            }}
          >
            <FontAwesome5
              name={`${opassVisible ? "eye" : "eye-slash"}`}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-4 items-center justify-center">
          <TextInput
            placeholder="Enter New Password"
            className="flex-1 text-lg"
            value={pass}
            onChangeText={setPass}
            secureTextEntry={!passVisible}
          />
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
        <View className="flex-row flex-1 space-x-2 border-[#5E72EB] border-b-2 py-2 mb-2 items-center justify-center">
          <TextInput
            placeholder="Enter Confirm Password"
            className="flex-1 text-lg"
            value={cpass}
            onChangeText={setCpass}
            secureTextEntry={!passVisible2}
          />
          <TouchableOpacity
            onPress={() => {
              setPassVisible2(!passVisible2);
            }}
          >
            <FontAwesome5
              name={`${passVisible2 ? "eye" : "eye-slash"}`}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View className="my-10">
          <TouchableOpacity
            onPress={handleChangePassword}
            className="bg-[#5E72EB] flex-row w-full space-x-2 p-3 shadow-black justify-center rounded-xl border-r-5"
          >
            {loadingA ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-center text-2xl  text-white">CHANGE</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
