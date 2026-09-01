import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";


// =========================
// Time-based Greeting
// =========================

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 17) {
    return "Good Afternoon";
  }

  return "Good Evening";
}


// =========================
// Header Component
// =========================

export default function Header({
  currentUser,
  insets,
  onMenuPress,
  role = "Teacher",
}) {

  const HeaderImage =
    "https://i.ibb.co.com/5WGFcCgf/image.png";


  return (
    <ImageBackground
      source={{ uri: HeaderImage }}
      resizeMode="cover"
      className="px-5 pb-16 relative"
      style={{
        paddingTop: insets.top + 20,
      }}
    >

      {/* =========================
          DARK OVERLAY
      ========================= */}

      <View
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.20)",
        }}
      />


      {/* =========================
          HEADER CONTENT
      ========================= */}

      <View className="flex-row items-center justify-between">

        {/* =========================
            PROFILE + USER INFO
        ========================= */}

        <View className="flex-row items-center flex-1 mr-3">

          {/* Profile Picture */}

          <View
            className="
              w-16
              h-16
              rounded-full
              bg-white
              items-center
              justify-center
              overflow-hidden
            "
          >

            {currentUser?.img ? (

              <Image
                source={{
                  uri: currentUser.img,
                }}
                className="w-16 h-16"
                resizeMode="cover"
              />

            ) : (

              <Ionicons
                name="person"
                size={32}
                color="#8E7CC3"
              />

            )}

          </View>


          {/* =========================
              USER INFO
          ========================= */}

          <View className="ml-3 flex-1">

            <Text className="text-white text-sm">
              {getGreeting()} 👋
            </Text>


            <Text
              className="
                text-white
                text-2xl
                font-bold
              "
              numberOfLines={1}
            >
              {currentUser?.name || "User"}
            </Text>


            <Text className="text-white text-xs font-semibold tracking-wider uppercase opacity-90">
                  {role}
            </Text>

          </View>

        </View>


        {/* =========================
            MENU BUTTON
        ========================= */}

        <TouchableOpacity
          onPress={onMenuPress}
          activeOpacity={0.7}
          className="
            w-11
            h-11
            rounded-full
            bg-white/20
            items-center
            justify-center
          "
        >

          <Ionicons
            name="menu-outline"
            size={28}
            color="white"
          />

        </TouchableOpacity>

      </View>


      {/* =========================
          BOTTOM WHITE CURVE
      ========================= */}

      <View
  className="absolute bg-white left-0 right-0"
  style={{
    height: 20,
    bottom: 0,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  }}
/>

    </ImageBackground>
  );
}



