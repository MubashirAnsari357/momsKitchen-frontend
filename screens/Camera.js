import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const CameraScreen = ({ route, navigation }) => {
  const {
    params: { mode },
  } = route;
  const [type, setType] = useState(
    mode === "Add" || mode === "Edit" ? CameraType.back : CameraType.front
  );
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Requesting camera permission</Text>
      </View>
    );
  }

  const toggleCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity onPress={toggleCameraPermission}>
          <Text>Please give permission to Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openImagePicker = async () => {
    if (mode === "Add" || mode === "Edit") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: true,
      });
      if (!result.canceled) {
        let dishImages = [];
        result.assets.forEach((element) => {
          dishImages.push(element.uri);
        });
        mode === "Add"
          ? navigation.navigate("ChefAddDish", { dishImages: dishImages })
          : navigation.navigate("ChefEditDish", { dishImages: dishImages });
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        mode === "Register" &&
          navigation.navigate("ChefSignup2", { image: result.assets[0].uri });
        mode === "Profile" &&
          navigation.navigate("Profile", { image: result.assets[0].uri });
      }
    }
  };

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();
    mode === "Add" && navigation.navigate("ChefAddDish", { image: data.uri });
    mode === "Edit" && navigation.navigate("ChefEditDish", { image: data.uri });
    mode === "Register" &&
      navigation.navigate("ChefSignup2", { image: data.uri });
    mode === "Profile" && navigation.navigate("Profile", { image: data.uri });
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <Camera
        className="flex-1 aspect-square"
        type={type}
        // ratio={'1:1'}
        ref={(e) => setCamera(e)}
      />
      <View className="flex-row absolute bottom-10 justify-evenly w-full">
        <TouchableOpacity onPress={openImagePicker}>
          <MaterialIcons name="insert-photo" color="white" size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={clickPicture}>
          <MaterialIcons name="camera" color="white" size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType}>
          <MaterialIcons name="flip-camera-android" color="white" size={50} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
