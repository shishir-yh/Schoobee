import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TeacherTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Active / Inactive colors
        tabBarActiveTintColor: "#8E7CC3",
        tabBarInactiveTintColor: "#999",

        // Tab bar design
        tabBarStyle: {
          height: 110,
          paddingTop: 8,
          paddingBottom: 8,
          paddingHorizontal: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarItemStyle: {
          borderRadius: 16,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ROUTINE */}
      <Tabs.Screen
        name="routine"
        options={{
          title: "Routine",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* INBOX */}
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "mail" : "mail-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}






// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TeacherTabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#8E7CC3",
//         tabBarInactiveTintColor: "#999",
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons
//               name="home-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="routine"
//         options={{
//           title: "Routine",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons
//               name="calendar-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="inbox"
//         options={{
//           title: "Inbox",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons
//               name="mail-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons
//               name="person-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }