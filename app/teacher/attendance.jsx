import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { teacherAttendanceStudents } from "../../data/users";
import Navbar from "../../Common_Components/CommonNavbar/Navbar";

export default function TeacherAttendance() {
  const router = useRouter();

  const [students, setStudents] = useState(teacherAttendanceStudents);

  const handleAttendance = (id) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  const presentCount = students.filter((student) => student.present).length;
  const absentCount = students.filter((student) => !student.present).length;

  const handleSave = () => {
    Alert.alert("Success", "Attendance saved successfully!");
    console.log(students);
  };

  return (
    <View className="flex-1 bg-gray-50">

      {/* =====================================================
          STATIC COMMON NAVBAR
          ===================================================== */}

      <Navbar
        title="Attendance"
        onBack={() => router.back()}
        onMenu={() => console.log("Menu opened")}
      />

      {/* =====================================================
          SCROLLABLE CONTENT
          ===================================================== */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      >

        <Text className="text-2xl font-bold text-gray-800">
          Student Attendance
        </Text>

        <Text className="text-gray-500 mt-1">
          Mark today's attendance
        </Text>

        {/* Summary */}
        <View className="flex-row justify-between mt-5">
          <View className="bg-green-50 rounded-2xl p-4 w-[48%]">
            <Text className="text-green-600 text-2xl font-bold">
              {presentCount}
            </Text>

            <Text className="text-gray-500 mt-1">Present</Text>
          </View>

          <View className="bg-red-50 rounded-2xl p-4 w-[48%]">
            <Text className="text-red-500 text-2xl font-bold">
              {absentCount}
            </Text>

            <Text className="text-gray-500 mt-1">Absent</Text>
          </View>
        </View>

        {/* Student List */}
        <View className="mt-5">
          {students.map((student) => (
            <View
              key={student.id}
              className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between"
            >
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-800">
                  {student.name}
                </Text>

                <Text className="text-gray-500 text-xs mt-1">
                  Roll: {student.roll}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleAttendance(student.id)}
                className={`px-4 py-2.5 rounded-xl ${
                  student.present ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name={student.present ? "checkmark-circle" : "close-circle"}
                    size={20}
                    color={student.present ? "#16A34A" : "#DC2626"}
                  />

                  <Text
                    className={`font-bold ml-1 ${
                      student.present ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {student.present ? "Present" : "Absent"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Save */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-[#8E7CC3] rounded-xl py-4 items-center mt-3 mb-8"
        >
          <View className="flex-row items-center">
            <Ionicons name="save-outline" size={20} color="white" />

            <Text className="text-white font-bold ml-2">
              Save Attendance
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}