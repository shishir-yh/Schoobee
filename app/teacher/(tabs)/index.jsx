import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import Banner from "../../../Teacher-components/Banner/Banner";

import {
  teacherDashboardItems,
  teacherSummaryItems,
  teacherAttendanceData,
} from "../../../data/users";

export default function TeacherDashboard() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  // =========================
  // Dashboard Card Navigation
  // =========================
  const handleNavigation = (title) => {
    if (title === "Profile") {
      router.push("/teacher/profile");
    }

    if (title === "Online Class") {
      router.push("/teacher/online-class");
    }

    if (title === "Mark Entry") {
      router.push("/teacher/marks");
    }

    if (title === "Take Attend") {
      router.push("/teacher/attendance");
    }

    if (title === "Student List") {
      router.push("/teacher/students");
    }

    // Routine এখন Bottom Tab
    if (title === "Routine") {
      router.push("/teacher/(tabs)/routine");
    }

    if (title === "My Attendance") {
      router.push("/teacher/my-attendance");
    }

    if (title === "Academic Cal") {
      router.push("/teacher/academic-calendar");
    }

    if (title === "Notices") {
      router.push("/teacher/notices");
    }
  };

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          HEADER
      ========================= */}
      <View className="bg-[#8E7CC3] px-5 pt-12 pb-12 relative">
        {/* Header Content */}
        <View className="flex-row items-center justify-between">

          {/* Profile + User Info */}
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
              <Ionicons
                name="person"
                size={25}
                color="#8E7CC3"
              />
            </View>

            <View className="ml-3">
              <Text className="text-white text-xs">
                Welcome Back
              </Text>

              <Text className="text-white text-lg font-bold">
                {currentUser?.name || "Teacher"}
              </Text>

              <Text className="text-white/80 text-xs">
                Teacher
              </Text>
            </View>
          </View>

          {/* Notification */}
          <TouchableOpacity
            onPress={() => router.push("/teacher/(tabs)/inbox")}
          >
            <Ionicons
              name="notifications-outline"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom White Curve */}
        <View
          className="absolute bg-white left-0 right-0"
          style={{
            height: 25,
            bottom: 0,
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          }}
        />
      </View>

      {/* =========================
          WHITE CONTENT
      ========================= */}
      <View
        className="bg-white flex-1"
        style={{
          marginTop: -0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >

        {/* =========================
            DASHBOARD GRID
        ========================= */}
        <View className="px-5 pt-6">

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Quick Access
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {teacherDashboardItems.map((item) => (
              <TouchableOpacity
                key={item.title}
                className="w-[31%] mb-5 items-center"
                onPress={() => handleNavigation(item.title)}
              >

                {/* Icon */}
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center"
                  style={{
                    backgroundColor: `${item.color}20`,
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={item.color}
                  />
                </View>

                {/* Title */}
                <Text className="text-xs text-gray-700 text-center mt-2">
                  {item.title}
                </Text>

                {/* Badge */}
                {item.badge && (
                  <View className="absolute top-0 right-3 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">
                      {item.badge}
                    </Text>
                  </View>
                )}

              </TouchableOpacity>
            ))}

          </View>
        </View>


        {/* Banner */}

        <View className="mt-1 mb-6 rounded-[20px] ">
        <Banner />
        </View>

        {/* =========================
            SUMMARY OVERVIEW
        ========================= */}
        <View className="px-5 mt-4">

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Overview
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {teacherSummaryItems.map((item) => (
              <View
                key={item.label}
                className="w-[48%] bg-white rounded-2xl p-4 mb-3"
              >
                <View className="flex-row items-center justify-between">

                  <View>
                    <Text className="text-2xl font-bold text-gray-800">
                      {item.value}
                    </Text>

                    <Text className="text-gray-500 text-xs mt-1">
                      {item.label}
                    </Text>
                  </View>

                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: `${item.color}20`,
                    }}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.color}
                    />
                  </View>

                </View>
              </View>
            ))}

          </View>
        </View>

        {/* =========================
            ATTENDANCE OVERVIEW
        ========================= */}
        <View className="px-5 mt-4 mb-6">

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Attendance Overview
          </Text>

          <View className="rounded-2xl border border-[#EEEAF2] bg-white p-4">

            <Text className="mb-4 text-[14px] font-medium text-[#33303A]">
              Class Attendance Average
            </Text>

            <View className="h-[210px] flex-row items-end justify-between px-2">

              {teacherAttendanceData.map((item) => (
                <View
                  key={item.label}
                  className="h-full flex-1 items-center justify-end"
                >

                  {/* Percentage */}
                  <Text className="mb-1 text-[10px] font-medium text-[#77727F]">
                    {item.value}%
                  </Text>

                  {/* Vertical Bar */}
                  <View className="h-[155px] w-9 justify-end">

                    <View
                      className="w-full rounded-t-md bg-[#8E7CC3]"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />

                  </View>

                  {/* Label */}
                  <Text
                    className="mt-2 text-[9px] text-[#77727F]"
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>

                </View>
              ))}

            </View>
          </View>
        </View>

        {/* =========================
            LOGOUT
        ========================= */}
        <View className="px-5 mt-6 mb-12">

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 flex-row items-center justify-center py-3.5 rounded-2xl shadow-md"
          >

            <Ionicons
              name="log-out-outline"
              size={20}
              color="white"
            />

            <Text className="text-white font-bold text-base ml-2">
              Logout
            </Text>

          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
}