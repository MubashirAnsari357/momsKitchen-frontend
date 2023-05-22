import { View } from "react-native";
import React from "react";
import ChefAppBar from "../components/ChefAppBar";
import { SafeAreaView } from "react-native-safe-area-context";

const ChefSettings= () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ChefAppBar title="Settings" />
    </SafeAreaView>
  );
};

export default ChefSettings;
