import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TeacherProfile() {
  const router = useRouter();
  const { currentUser } = useAuth();

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-6">

      {/* Profile Header */}
      <View className="items-center mt-5">
        <View className="w-24 h-24 rounded-full bg-[#8E7CC3] items-center justify-center">
          <Ionicons
            name="person"
            size={45}
            color="white"
          />
        </View>

        <Text className="text-2xl font-bold text-gray-800 mt-4">
          {currentUser?.name}
        </Text>

        <Text className="text-gray-500 mt-1">
          Teacher
        </Text>
      </View>

      {/* Information */}
      <View className="bg-white rounded-2xl p-5 mt-8">

        <View className="mb-5">
          <Text className="text-xs text-gray-400">
            USER ID
          </Text>

          <Text className="text-base font-semibold text-gray-800 mt-1">
            {currentUser?.userId}
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-xs text-gray-400">
            SCHOOL CODE
          </Text>

          <Text className="text-base font-semibold text-gray-800 mt-1">
            {currentUser?.schoolCode}
          </Text>
        </View>

        <View>
          <Text className="text-xs text-gray-400">
            ROLE
          </Text>

          <Text className="text-base font-semibold text-gray-800 mt-1">
            {currentUser?.role}
          </Text>
        </View>

      </View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-[#8E7CC3] rounded-xl py-3.5 items-center mt-6"
      >
        <Text className="text-white font-bold">
          Back to Dashboard
        </Text>
      </TouchableOpacity>

    </View>
  );
}