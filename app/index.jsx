import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [schoolCode, setSchoolCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login
  const handleLogin = () => {
    if (!schoolCode || !userId || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = login(schoolCode, userId, password);

    if (!result.success) {
      Alert.alert("Login Failed", result.message);
      return;
    }

    if (result.user.role === "student") {
      router.replace("/student");
    } else if (result.user.role === "teacher") {
      router.replace("/teacher");
    }
  };

  // Autofill Demo Accounts
  const autofill = (role) => {
    setSchoolCode("DHAKA100");

    if (role === "student") {
      setUserId("EDU-STU-001");
      setPassword("EDU-STU-001");
    } else {
      setUserId("EDU-TEA-001");
      setPassword("EDU-TEA-001");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar
        style="light"
        backgroundColor="#8E7CC3"
      /> */}

      <View className="flex-1 bg-white px-6 pt-20">
      {/* Logo */}
      <View className="items-center mb-4">
        <Ionicons name="school" size={64} color="#8E7CC3" />

        <Text className="text-2xl font-bold text-gray-800 mt-1">
          EduManage
        </Text>
      </View>

      {/* Welcome */}
      <Text className="text-xl font-bold text-gray-800 text-center">
        Welcome Back!
      </Text>

      <Text className="text-xs text-gray-500 text-center leading-5 mt-1 mb-5">
        Enter school credentials to access your dashboard
      </Text>

      {/* School Code */}
      <View className="mb-4">
        <Text className="text-[11px] font-bold text-gray-800 mb-1 tracking-wider">
          SCHOOL CODE
        </Text>

        <View className="relative justify-center">
          <Ionicons
            name="business-outline"
            size={20}
            color="#999"
            style={{
              position: "absolute",
              left: 12,
              zIndex: 1,
            }}
          />

          <TextInput
            className="h-12 w-full border border-gray-300 rounded-lg pl-10 pr-3 text-sm text-gray-800"
            placeholder="e.g. DHAKA100"
            value={schoolCode}
            onChangeText={setSchoolCode}
          />
        </View>
      </View>

      {/* User ID */}
      <View className="mb-4">
        <Text className="text-[11px] font-bold text-gray-800 mb-1 tracking-wider">
          USER ID / USERNAME
        </Text>

        <View className="relative justify-center">
          <Ionicons
            name="person-outline"
            size={20}
            color="#999"
            style={{
              position: "absolute",
              left: 12,
              zIndex: 1,
            }}
          />

          <TextInput
            className="h-12 w-full border border-gray-300 rounded-lg pl-10 pr-3 text-sm text-gray-800"
            placeholder="e.g. EDU-STU-001"
            value={userId}
            onChangeText={setUserId}
          />
        </View>
      </View>

      {/* Password */}
      <View className="mb-4">
        <Text className="text-[11px] font-bold text-gray-800 mb-1 tracking-wider">
          PASSWORD
        </Text>

        <View className="relative justify-center">
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#999"
            style={{
              position: "absolute",
              left: 12,
              zIndex: 1,
            }}
          />

          <TextInput
            className="h-12 w-full border border-gray-300 rounded-lg pl-10 pr-3 text-sm text-gray-800"
            placeholder="Password (same as ID)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="w-full bg-[#8E7CC3] py-3.5 rounded-lg items-center mt-1"
        onPress={handleLogin}
      >
        <Text className="text-white text-sm font-bold">
          Login to Account
        </Text>
      </TouchableOpacity>

      {/* Demo Accounts */}
      <View className="mt-6">
        <Text className="text-xs text-gray-400 text-center mb-3">
          Demo Accounts Quick Autofill:
        </Text>

        <View className="flex-row gap-2.5">
          <TouchableOpacity
            className="flex-1 py-2.5 border border-dashed border-[#8E7CC3] bg-[#F8F5FF] rounded-lg items-center"
            onPress={() => autofill("student")}
          >
            <Text className="text-[11px] font-bold text-[#8E7CC3]">
              Autofill Student
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-2.5 border border-dashed border-[#674EA7] bg-[#F7F4FF] rounded-lg items-center"
            onPress={() => autofill("teacher")}
          >
            <Text className="text-[11px] font-bold text-[#674EA7]">
              Autofill Teacher
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  );
}