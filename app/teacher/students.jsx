import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Navbar from "../../Common_Components/CommonNavbar/Navbar";

/*
=========================================================
DATA — students grouped by class
=========================================================
*/

const classesData = [
  {
    id: "class_10a",
    name: "Class 10 - A",
    subject: "Computer Science",
    students: [
      { id: "s1", name: "Aarav Sharma", roll: "01", present: true },
      { id: "s2", name: "Diya Patel", roll: "02", present: true },
      { id: "s3", name: "Rohan Verma", roll: "03", present: false },
      { id: "s4", name: "Ananya Iyer", roll: "04", present: true },
      { id: "s5", name: "Kabir Khan", roll: "05", present: true },
    ],
  },
  {
    id: "class_10b",
    name: "Class 10 - B",
    subject: "Computer Science",
    students: [
      { id: "s6", name: "Meera Nair", roll: "01", present: true },
      { id: "s7", name: "Vivaan Gupta", roll: "02", present: false },
      { id: "s8", name: "Ishita Roy", roll: "03", present: true },
      { id: "s9", name: "Aditya Bose", roll: "04", present: true },
    ],
  },
  {
    id: "class_9a",
    name: "Class 9 - A",
    subject: "Computer Science",
    students: [
      { id: "s10", name: "Saanvi Joshi", roll: "01", present: true },
      { id: "s11", name: "Arjun Mehta", roll: "02", present: true },
      { id: "s12", name: "Riya Kapoor", roll: "03", present: true },
    ],
  },
];

// Avatar palette — cycles per student
const AVATAR_COLORS = [
  { bg: "#EDE9FE", text: "#7C3AED" },
  { bg: "#D1FAE5", text: "#059669" },
  { bg: "#DBEAFE", text: "#2563EB" },
  { bg: "#FEF3C7", text: "#D97706" },
  { bg: "#FCE7F3", text: "#DB2777" },
];

const getAvatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Students() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [expandedClass, setExpandedClass] = useState("class_10a");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  /*
  =========================================================
  SEARCH FILTER
  =========================================================
  */

  const searchText = search.toLowerCase().trim();

  const filteredClasses = classesData
    .map((cls) => ({
      ...cls,
      students: cls.students.filter(
        (s) =>
          !searchText ||
          s.name.toLowerCase().includes(searchText) ||
          s.roll.toLowerCase().includes(searchText)
      ),
    }))
    .filter((cls) => cls.students.length > 0);

  /*
  =========================================================
  TOGGLE CLASS EXPANSION
  =========================================================
  */

  const toggleClass = (classId) => {
    setExpandedClass((current) => (current === classId ? null : classId));
  };

  const totalStudents = classesData.reduce(
    (sum, cls) => sum + cls.students.length,
    0
  );

  return (
    <View className="flex-1 bg-slate-50">

      {/* =====================================================
          STATIC COMMON NAVBAR
          ===================================================== */}

      <Navbar
        title="Students"
        onBack={() => router.back()}
        onMenu={() => console.log("Menu opened")}
      />

      {/* =====================================================
          SCROLLABLE CONTENT
          ===================================================== */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >

        {/* ===================================================
            HEADER
            =================================================== */}

        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-slate-900">
              Students
            </Text>

            <Text className="mt-1 text-xs text-slate-500">
              {classesData.length} classes · {totalStudents} students
            </Text>
          </View>

          <View className="h-10 min-w-10 flex-row items-center justify-center rounded-full bg-brand px-3">
            <Ionicons name="people" size={16} color="#fff" />
            <Text className="ml-1.5 text-sm font-bold text-white">
              {totalStudents}
            </Text>
          </View>
        </View>

        {/* ===================================================
            SEARCH BAR
            =================================================== */}

        <View
          className={`mb-6 flex-row items-center rounded-2xl border bg-white px-4 shadow-sm ${
            isSearchFocused ? "border-brand" : "border-slate-200"
          }`}
        >
          <Ionicons
            name="search"
            size={18}
            color={isSearchFocused ? "#7C3AED" : "#9CA3AF"}
            style={{ marginRight: 8 }}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search student by name or roll..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 py-3.5 text-sm text-slate-800"
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* ===================================================
            CLASS ACCORDION LIST
            =================================================== */}

        {filteredClasses.map((cls) => {
          const isExpanded = expandedClass === cls.id;

          return (
            <View
              key={cls.id}
              className="mb-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >

              {/* Class header — tappable to expand/collapse */}
              <TouchableOpacity
                onPress={() => toggleClass(cls.id)}
                activeOpacity={0.7}
                className="flex-row items-center p-4"
              >
                <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-brandSoft">
                  <Ionicons name="school-outline" size={22} color="#7C3AED" />
                </View>

                <View className="flex-1">
                  <Text className="text-base font-bold text-slate-900">
                    {cls.name}
                  </Text>

                  <Text className="mt-0.5 text-xs text-slate-500">
                    {cls.subject} · {cls.students.length} students
                  </Text>
                </View>

                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#94A3B8"
                />
              </TouchableOpacity>

              {/* Student list (only when expanded) */}
              {isExpanded && (
                <View className="border-t border-slate-100 px-4 pb-3 pt-2">
                  {cls.students.map((student, index) => {
                    const avatarColor = getAvatarColor(index);

                    return (
                      <View
                        key={student.id}
                        className="flex-row items-center py-3"
                      >
                        {/* Avatar */}
                        <View
                          style={{ backgroundColor: avatarColor.bg }}
                          className="mr-3 h-11 w-11 items-center justify-center rounded-full"
                        >
                          <Text
                            style={{ color: avatarColor.text }}
                            className="text-xs font-bold"
                          >
                            {getInitials(student.name)}
                          </Text>
                        </View>

                        {/* Name + roll */}
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-slate-900">
                            {student.name}
                          </Text>

                          <Text className="mt-0.5 text-[11px] text-slate-400">
                            Roll No: {student.roll}
                          </Text>
                        </View>

                        {/* Present / Absent badge */}
                        <View
                          className={`rounded-full px-3 py-1 ${
                            student.present ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          <Text
                            className={`text-[11px] font-bold ${
                              student.present
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {student.present ? "Present" : "Absent"}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

            </View>
          );
        })}

        {/* ===================================================
            EMPTY STATE
            =================================================== */}

        {filteredClasses.length === 0 && (
          <View className="items-center rounded-2xl bg-white p-10 shadow-sm">
            <Ionicons name="people-outline" size={40} color="#c7c7c7" />

            <Text className="mt-3 text-center text-sm font-semibold text-slate-700">
              No students found
            </Text>

            <Text className="mt-1 text-center text-xs text-slate-400">
              Try a different name or roll number
            </Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}