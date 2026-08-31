import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { teacherOnlineClasses } from "../../data/users";
import Navbar from "../../Common_Components/CommonNavbar/Navbar";

export default function OnlineClass() {
  // React Navigation
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-50">

      {/* =========================================
          STATIC NAVBAR
          This is OUTSIDE the ScrollView.
          So it will NOT scroll.
      ========================================= */}
      <Navbar
        title="Online Classes"
        onBack={() => navigation.goBack()}
        onMenu={() => console.log("Menu pressed")}
      />


      {/* =========================================
          SCROLLABLE CONTENT
          Only this section will scroll.
      ========================================= */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 30,
        }}
      >

        {/* Page Heading */}
        <Text className="text-2xl font-bold text-gray-800">
          Online Classes
        </Text>

        {/* Page Description */}
        <Text className="text-gray-500 mt-1 mb-5">
          Today's teaching schedule
        </Text>


        {/* =========================================
            ONLINE CLASS LIST
        ========================================= */}
        {teacherOnlineClasses.map((item) => (

          <View
            key={item.id}
            className="bg-white rounded-2xl p-5 mb-4"
          >

            {/* =====================================
                CARD TOP SECTION
                Subject + Status
            ===================================== */}
            <View className="flex-row items-center justify-between">

              {/* Subject information */}
              <View className="flex-row items-center flex-1">

                {/* Video Icon */}
                <View className="w-12 h-12 rounded-xl bg-[#F0EBFF] items-center justify-center">

                  <Ionicons
                    name="videocam-outline"
                    size={25}
                    color="#8E7CC3"
                  />

                </View>


                {/* Subject name + code */}
                <View className="ml-3 flex-1">

                  <Text className="text-lg font-bold text-gray-800">
                    {item.subject}
                  </Text>

                  <Text className="text-gray-500 text-xs mt-1">
                    {item.code}
                  </Text>

                </View>

              </View>


              {/* Status */}
              <Text
                className={
                  item.status === "Live"
                    ? "text-red-500 font-bold"
                    : "text-orange-500 font-bold"
                }
              >
                {item.status}
              </Text>

            </View>


            {/* =====================================
                TIME + ROOM
            ===================================== */}
            <View className="mt-5">

              {/* Time */}
              <Text className="text-gray-600">
                🕐 {item.time}
              </Text>

              {/* Room */}
              <Text className="text-gray-600 mt-2">
                📍 {item.room}
              </Text>

            </View>


            {/* =====================================
                BUTTON
            ===================================== */}
            <TouchableOpacity
              activeOpacity={0.8}
              className={`rounded-xl py-3 items-center mt-5 ${
                item.status === "Live"
                  ? "bg-[#8E7CC3]"
                  : "bg-gray-200"
              }`}
            >

              <Text
                className={
                  item.status === "Live"
                    ? "text-white font-bold"
                    : "text-gray-500 font-bold"
                }
              >
                {item.status === "Live"
                  ? "Join Class"
                  : "View Class"}
              </Text>

            </TouchableOpacity>

          </View>

        ))}

      </ScrollView>

    </View>
  );
}

