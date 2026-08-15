import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-gray-800">
        Student Dashboard
      </Text>

      <Text className="text-lg text-gray-700 mt-4">
        Welcome, {currentUser?.name}!
      </Text>

      <Text className="text-gray-500 mt-2">
        User ID: {currentUser?.userId}
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-8 py-3 rounded-lg mt-8"
      >
        <Text className="text-white font-bold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}