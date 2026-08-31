import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const recentTasks = [
  {
    id: "1",
    title: "Check Student Attendance",
    subtitle: "Class 10 - A",
    icon: "checkmark-circle-outline",
    iconColor: "#8E7CC3",
  },
  {
    id: "2",
    title: "Enter Exam Marks",
    subtitle: "Mathematics - Class 9",
    icon: "create-outline",
    iconColor: "#4CAF50",
  },
  {
    id: "3",
    title: "Review Assignment",
    subtitle: "English - Class 8",
    icon: "document-text-outline",
    iconColor: "#FF9800",
  },
  {
    id: "4",
    title: "Update Class Routine",
    subtitle: "Weekly Routine",
    icon: "calendar-outline",
    iconColor: "#2196F3",
  },

  // =========================
  // Additional 8 Tasks
  // =========================

  {
    id: "5",
    title: "Review Student Profile",
    subtitle: "Class 7 - B",
    icon: "person-outline",
    iconColor: "#E91E63",
  },
  {
    id: "6",
    title: "Prepare Lesson Plan",
    subtitle: "Science - Class 8",
    icon: "book-outline",
    iconColor: "#9C27B0",
  },
  {
    id: "7",
    title: "Check Pending Assignments",
    subtitle: "Class 9 - A",
    icon: "clipboard-outline",
    iconColor: "#009688",
  },
  {
    id: "8",
    title: "Update Student Marks",
    subtitle: "Bangla - Class 10",
    icon: "stats-chart-outline",
    iconColor: "#795548",
  },
  {
    id: "9",
    title: "Review Class Performance",
    subtitle: "Class 8 - A",
    icon: "analytics-outline",
    iconColor: "#3F51B5",
  },
  {
    id: "10",
    title: "Check New Notices",
    subtitle: "School Administration",
    icon: "notifications-outline",
    iconColor: "#F44336",
  },
  {
    id: "11",
    title: "Prepare Exam Questions",
    subtitle: "Final Examination",
    icon: "document-outline",
    iconColor: "#607D8B",
  },
  {
    id: "12",
    title: "Submit Monthly Report",
    subtitle: "August 2026",
    icon: "cloud-upload-outline",
    iconColor: "#FF5722",
  },
];

export default function RecentTasks() {
  const [showAll, setShowAll] = useState(false);

  // প্রথমে ৪টা দেখাবে
  // View All করলে সব ১২টা দেখাবে
  const visibleTasks = showAll
    ? recentTasks
    : recentTasks.slice(0, 3);

  return (
    <View className="px-5 mt-5">

      {/* =========================
          HEADER
      ========================= */}

      <View className="flex-row items-center justify-between mb-4">

        <Text className="text-xl font-bold text-gray-800">
          Recent Tasks
        </Text>

        {/* View All / View Less */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowAll(!showAll)}
        >
          <Text className="text-sm font-semibold text-[#8E7CC3]">
            {showAll ? "View Less" : "View All"}
          </Text>
        </TouchableOpacity>

      </View>

      {/* =========================
          TASK LIST
      ========================= */}

      <View className="bg-white rounded-2xl border border-[#EEEAF2] overflow-hidden">

        {visibleTasks.map((task, index) => (
          <TouchableOpacity
            key={task.id}
            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-4 ${
              index !== visibleTasks.length - 1
                ? "border-b border-[#EEEAF2]"
                : ""
            }`}
          >

            {/* =========================
                TASK ICON
            ========================= */}

            <View
              className="w-11 h-11 rounded-xl items-center justify-center"
              style={{
                backgroundColor: `${task.iconColor}20`,
              }}
            >
              <Ionicons
                name={task.icon}
                size={21}
                color={task.iconColor}
              />
            </View>

            {/* =========================
                TASK INFORMATION
            ========================= */}

            <View className="flex-1 ml-3">

              <Text
                className="text-sm font-semibold text-[#33303A]"
                numberOfLines={1}
              >
                {task.title}
              </Text>

              <Text className="text-xs text-[#77727F] mt-1">
                {task.subtitle}
              </Text>

            </View>

          </TouchableOpacity>
        ))}

      </View>

    </View>
  );
}