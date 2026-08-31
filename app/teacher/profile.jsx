import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../Common_Components/CommonNavbar/Navbar";

// Small reusable row for one piece of info inside a card
const InfoRow = ({ icon, label, value }) => (
  <View className="flex-row items-center py-3 border-b border-gray-100">
    <View className="w-9 h-9 rounded-full bg-[#8E7CC3]/10 items-center justify-center mr-3">
      <Ionicons name={icon} size={18} color="#8E7CC3" />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-400">{label}</Text>
      <Text className="text-sm font-semibold text-gray-800 mt-0.5">
        {value || "N/A"}
      </Text>
    </View>
  </View>
);

// Card wrapper with a section title
const InfoCard = ({ title, children }) => (
  <View className="bg-white rounded-2xl p-5 mt-5 shadow-sm">
    <Text className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wide">
      {title}
    </Text>
    {children}
  </View>
);

export default function TeacherProfile() {
  const router = useRouter();
  const { currentUser } = useAuth();

  return (
    <View className="flex-1 bg-gray-50">

      <Navbar
        title="My Profile"
        onBack={() => router.back()}
        onMenu={() => console.log("Profile menu pressed")}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 100,
        }}
      >

        {/* ===== PROFILE HEADER ===== */}
        <View className="items-center">
          <View
            className="rounded-full p-1"
            style={{ backgroundColor: "#8E7CC3" }}
          >
            <Image
              source={{ uri: currentUser?.img }}
              style={{ width: 96, height: 96, borderRadius: 48 }}
            />
          </View>

          <Text className="text-2xl font-bold text-gray-800 mt-4">
            {currentUser?.name || "Teacher"}
          </Text>

          <Text className="text-gray-500 mt-0.5">
            {currentUser?.designation || "Teacher"}
          </Text>

          {/* Role badge */}
          <View className="bg-[#8E7CC3]/10 px-3 py-1 rounded-full mt-2">
            <Text className="text-xs font-bold text-[#8E7CC3] uppercase">
              {currentUser?.role}
            </Text>
          </View>
        </View>

        {/* ===== PROFESSIONAL DETAILS ===== */}
        <InfoCard title="Professional Details">
          <InfoRow icon="school-outline" label="Department" value={currentUser?.department} />
          <InfoRow icon="people-outline" label="Section" value={currentUser?.section} />
          <InfoRow icon="business-outline" label="School Code" value={currentUser?.schoolCode} />
          <InfoRow icon="calendar-outline" label="Joining Date" value={currentUser?.joiningDate} />
          <View className="pt-3">
            <InfoRow icon="finger-print-outline" label="User ID" value={currentUser?.userId} />
          </View>
        </InfoCard>

        {/* ===== CONTACT INFORMATION ===== */}
        <InfoCard title="Contact Information">
          <InfoRow icon="mail-outline" label="Email" value={currentUser?.email} />
          <InfoRow icon="call-outline" label="Mobile" value={currentUser?.contact} />
          <InfoRow icon="call-outline" label="Office Phone" value={currentUser?.officePhone} />
          <View className="pt-3">
            <InfoRow icon="location-outline" label="Address" value={currentUser?.address} />
          </View>
        </InfoCard>

        {/* ===== PERSONAL INFORMATION ===== */}
        <InfoCard title="Personal Information">
          <InfoRow icon="calendar-clear-outline" label="Date of Birth" value={currentUser?.dateOfBirth} />
          <InfoRow icon="water-outline" label="Blood Group" value={currentUser?.bloodGroup} />
          <View className="pt-3">
            <InfoRow icon="card-outline" label="NID" value={currentUser?.nid} />
          </View>
        </InfoCard>

        {/* ===== BACK BUTTON ===== */}
        {/* <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="bg-[#8E7CC3] rounded-xl py-3.5 items-center mt-6"
        >
          <Text className="text-white font-bold">
            Back to Dashboard
          </Text>
        </TouchableOpacity> */}

      </ScrollView>

    </View>
  );
}