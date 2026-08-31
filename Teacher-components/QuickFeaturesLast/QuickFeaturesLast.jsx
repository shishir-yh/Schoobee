import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const quickFeatures = [
  {
    id: "1",
    title: "Take Attendance",
    icon: "checkmark-done-outline",
    color: "#8E7CC3",
  },
  {
    id: "2",
    title: "Mark Entry",
    icon: "create-outline",
    color: "#4CAF50",
  },
  {
    id: "3",
    title: "Student List",
    icon: "people-outline",
    color: "#2196F3",
  },
  {
    id: "4",
    title: "My Routine",
    icon: "calendar-outline",
    color: "#FF9800",
  },
  {
    id: "5",
    title: "Notices",
    icon: "notifications-outline",
    color: "#E91E63",
  },
  {
    id: "6",
    title: "Messages",
    icon: "chatbubble-outline",
    color: "#009688",
  },
];

export default function QuickFeatures() {
  return (
    <View className="px-5 mt-6">

      {/* =========================
          SECTION TITLE
      ========================= */}

      <Text className="text-xl font-bold text-gray-800 mb-4">
        Quick Features
      </Text>

      {/* =========================
          FEATURES GRID
      ========================= */}

      <View className="flex-row flex-wrap justify-between">

        {quickFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            activeOpacity={0.75}
            className="w-[31%] mb-4 items-center"
          >

            {/* Icon Box */}
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center"
              style={{
                backgroundColor: `${feature.color}18`,
              }}
            >
              <Ionicons
                name={feature.icon}
                size={27}
                color={feature.color}
              />
            </View>

            {/* Feature Name */}
            <Text
              className="text-xs text-gray-700 text-center mt-2"
              numberOfLines={2}
            >
              {feature.title}
            </Text>

          </TouchableOpacity>
        ))}

      </View>

    </View>
  );
}