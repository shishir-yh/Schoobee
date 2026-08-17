import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { teacherOnlineClasses } from "../../data/users";

export default function OnlineClass() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-5">
      <Text className="text-2xl font-bold text-gray-800">
        Online Classes
      </Text>

      <Text className="text-gray-500 mt-1 mb-5">
        Today's teaching schedule
      </Text>

      {teacherOnlineClasses.map((item) => (
        <View
          key={item.id}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-xl bg-[#F0EBFF] items-center justify-center">
                <Ionicons
                  name="videocam-outline"
                  size={25}
                  color="#8E7CC3"
                />
              </View>

              <View className="ml-3">
                <Text className="text-lg font-bold text-gray-800">
                  {item.subject}
                </Text>

                <Text className="text-gray-500 text-xs mt-1">
                  {item.code}
                </Text>
              </View>
            </View>

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

          <View className="mt-5">
            <Text className="text-gray-600">
              🕐 {item.time}
            </Text>

            <Text className="text-gray-600 mt-2">
              📍 {item.room}
            </Text>
          </View>

          <TouchableOpacity
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
  );
}