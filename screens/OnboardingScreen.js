import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({ navigation }) => {
  const DotComponent = ({ selected }) => {
    return (
      <View
        className={`w-4 h-4 mx-1 flex items-center justify-center rounded-full ${
          selected ? "border border-orange-400" : ""
        } p-2`}
      >
        <View
          className={`w-2 h-2 ${
            selected ? "bg-orange-400" : "bg-orange-200"
          } rounded-full`}
        ></View>
      </View>
    );
  };

  const Skip = ({ ...props }) => {
    return (
      <TouchableOpacity
        className="bg-red-600 rounded-2xl w-20 h-8 justify-center"
        {...props}
      >
        <Text className="text-lg text-white text-center">Skip</Text>
      </TouchableOpacity>
    );
  };

  const Next = ({ ...props }) => {
    return (
      <TouchableOpacity
        className="bg-red-600 rounded-2xl w-20 h-8 justify-center"
        {...props}
      >
        <Text className="text-white text-center text-lg">Next</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Onboarding
      onSkip={() => navigation.navigate("BottomTab", { screen: "Home" })}
      onDone={() => navigation.navigate("BottomTab", { screen: "Home" })}
      DotComponent={DotComponent}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      controlStatusBar={false}
      pages={[
        {
          backgroundColor: "#fff1e9",
          image: (
            <Image
              source={require("../assets/OnBoard1.png")}
              className="box-content w-80 h-64 object-fill"
            />
          ),
          title: "Welcome To",
          subtitle: "the world of Home-Made Food",
        },
        {
          backgroundColor: "#75FFE8",
          image: (
            <Image
              source={require("../assets/OnBoard2.png")}
              className="w-80 h-80 object-contain"
            />
          ),
          title: "Timely Delivery",
          subtitle: "Explore the Healthy Food",
        },
        {
          backgroundColor: "#cb202d",
          image: (
            <Image
              source={require("../assets/OnBoard3.png")}
              className="w-72 h-72 object-contain"
            />
          ),
          title: "It's Done",
          subtitle: "Order & Enjoy Your Meals",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
