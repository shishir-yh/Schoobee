import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function StudentLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect href="/" />;
  }

  if (currentUser.role !== "student") {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Student Dashboard" }}
      />

      <Stack.Screen
        name="profile"
        options={{ title: "Profile" }}
      />

      <Stack.Screen
        name="attendance"
        options={{ title: "Attendance" }}
      />

      <Stack.Screen
        name="results"
        options={{ title: "Results" }}
      />

      <Stack.Screen
        name="routine"
        options={{ title: "Routine" }}
      />

      <Stack.Screen
        name="notices"
        options={{ title: "Notices" }}
      />

      <Stack.Screen
        name="fees"
        options={{ title: "Fees" }}
      />
    </Stack>
  );
}