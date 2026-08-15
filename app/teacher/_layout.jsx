import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TeacherLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect href="/" />;
  }

  if (currentUser.role !== "teacher") {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Teacher Dashboard" }}
      />

      <Stack.Screen
        name="profile"
        options={{ title: "Profile" }}
      />

      <Stack.Screen
        name="students"
        options={{ title: "Students" }}
      />

      <Stack.Screen
        name="attendance"
        options={{ title: "Attendance" }}
      />

      <Stack.Screen
        name="marks"
        options={{ title: "Marks" }}
      />
    </Stack>
  );
}