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
    <Stack screenOptions={{
        headerShown: false,
      }}>
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
        options={{title: "Mark Entry",}}
      />

      <Stack.Screen
        name="online-class"
        options={{title: "Online Classes",}}
      />

      <Stack.Screen
        name="routine"
        options={{title: "Routine",}}
      />

      <Stack.Screen
        name="notices"
        options={{
        title: "Notices",}}
      />

      <Stack.Screen
        name="academic-calendar"
        options={{
          title: "Academic Calendar",
        }}
      />
      <Stack.Screen
        name="my-attendance"
        options={{
          title: "My Attendance",
        }}
      />  

    </Stack>

    
  );
}