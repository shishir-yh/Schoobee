import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { teacherMarkEntryStudents } from "../../data/users";

export default function TeacherMarks() {
  const [students, setStudents] = useState(
    teacherMarkEntryStudents
  );

  const handleMarksChange = (id, value) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, marks: value }
          : student
      )
    );
  };

  const handleSave = () => {
    Alert.alert(
      "Success",
      "Student marks saved successfully!"
    );

    console.log(students);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-5">

      <Text className="text-2xl font-bold text-gray-800">
        Mark Entry
      </Text>

      <Text className="text-gray-500 mt-1 mb-5">
        Enter student marks
      </Text>

      {/* Subject */}
      <View className="bg-white rounded-2xl p-5 mb-4">
        <Text className="text-xs text-gray-400">
          SUBJECT
        </Text>

        <Text className="text-lg font-bold text-gray-800 mt-1">
          Computer Science
        </Text>

        <Text className="text-gray-500 text-xs mt-1">
          CS101
        </Text>
      </View>

      {/* Student List */}
      {students.map((student) => (
        <View
          key={student.id}
          className="bg-white rounded-2xl p-4 mb-3"
        >
          <View className="flex-row items-center justify-between">

            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">
                {student.name}
              </Text>

              <Text className="text-gray-500 text-xs mt-1">
                Roll: {student.roll}
              </Text>
            </View>

            <View className="w-20">
              <TextInput
                value={student.marks}
                onChangeText={(value) =>
                  handleMarksChange(student.id, value)
                }
                placeholder="Marks"
                keyboardType="numeric"
                className="h-11 border border-gray-300 rounded-lg text-center text-gray-800"
              />
            </View>
          </View>
        </View>
      ))}

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-[#8E7CC3] rounded-xl py-4 items-center mt-3 mb-8"
      >
        <View className="flex-row items-center">
          <Ionicons
            name="save-outline"
            size={20}
            color="white"
          />

          <Text className="text-white font-bold ml-2">
            Save Marks
          </Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}