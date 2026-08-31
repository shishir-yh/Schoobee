import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // অন্য অ্যাপ থেকে ফিরে আসার সময় tab bar কে force re-render/re-measure
  // করানোর জন্য একটা key ব্যবহার করছি।
  const [tabBarKey, setTabBarKey] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        // ছোট delay দিয়ে insets স্থির হওয়ার সময় দিচ্ছি, তারপর re-render force করছি
        setTimeout(() => {
          setTabBarKey((prev) => prev + 1);
        }, 50);
      }
    });

    return () => subscription.remove();
  }, []);

  // Bottom spacing এখন device এর safe area অনুযায়ী dynamic,
  // কিন্তু তুমি আগে যে "floating" লুকটা চেয়েছিলে সেটা বজায় রাখতে
  // একটা ন্যূনতম base value যোগ করে দিলাম।
  const bottomSpacing = Math.max(insets.bottom, 12) ;

  return (
    <Tabs
      key={tabBarKey}
      screenOptions={{
        // আমরা নিজের কোনো Stack/Screen header ব্যবহার করছি না।
        headerShown: false,

        tabBarActiveTintColor: "#8E7CC3",
        tabBarInactiveTintColor: "#999999",

        // Keyboard open হলে tab bar hide হবে।
        tabBarHideOnKeyboard: true,

        // ======================================================
        // TAB BAR
        // ======================================================
        tabBarStyle: {
          // IMPORTANT:
          // position: "absolute" দেওয়ার ফলে tab bar screen এর
          // normal layout flow থেকে বের হয়ে সরাসরি screen এ
          // pin হয়ে থাকবে। এতে app resume হওয়ার সময় navigation
          // bar height পরিবর্তন হলেও tab bar এর position জাম্প করবে না।
          position: "absolute",

          height: 68,

          // Side spacing
          marginHorizontal: 12,

          // IMPORTANT:
          // Fixed 50 এর বদলে safe area insets থেকে dynamic bottom
          // spacing নেওয়া হচ্ছে। এটাই মূল ফিক্স — device এর
          // navigation bar/gesture bar এর state যাই হোক না কেন,
          // এই ভ্যালু সবসময় সঠিকভাবে calculate হবে।
          bottom: bottomSpacing,

          backgroundColor: "#FFFFFF",

          borderRadius: 20,
          borderTopWidth: 0,

          paddingTop: 6,
          paddingBottom: 6,

          elevation: 8,

          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
      }}
    >
      {/* তোমার Tabs.Screen গুলো এখানে থাকবে, যেমন: */}
      {/* <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ... }} /> */}
    
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

      {/* ======================================================
          ROUTINE
      ====================================================== */}
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

      {/* ======================================================
          INBOX
      ====================================================== */}
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

      {/* ======================================================
          PROFILE
      ====================================================== */}
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


// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         // আমরা নিজের কোনো Stack/Screen header ব্যবহার করছি না।
//         headerShown: false,

//         tabBarActiveTintColor: "#8E7CC3",
//         tabBarInactiveTintColor: "#999999",

//         // Keyboard open হলে tab bar hide হবে।
//         tabBarHideOnKeyboard: true,

//         // ======================================================
//         // TAB BAR
//         // ======================================================
//         tabBarStyle: {
//           height: 68,

//           // Side spacing
//           marginHorizontal: 12,

//           // IMPORTANT:
//           // marginBottom: 12 বাদ দেওয়া হয়েছে।
//           //
//           // Android safe-area/navigation inset-এর সাথে marginBottom
//           // ব্যবহার করলে app foreground-এ ফেরার সময় tab bar-এর
//           // position jump করার সম্ভাবনা থাকে।
//           //
//           // Bottom spacing আমরা padding/inset দিয়ে control করব।
//           marginBottom: 50,

//           backgroundColor: "#FFFFFF",

//           borderRadius: 20,
//           borderTopWidth: 0,

//           paddingTop: 6,
//           paddingBottom: 6,

//           elevation: 8,

//           shadowColor: "#000000",
//           shadowOffset: {
//             width: 0,
//             height: 4,
//           },
//           shadowOpacity: 0.08,
//           shadowRadius: 12,
//         },

//         // ======================================================
//         // TAB ITEM
//         // ======================================================
//         tabBarItemStyle: {
//           borderRadius: 16,
//         },

//         // ======================================================
//         // TAB LABEL
//         // ======================================================
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: "600",
//           marginTop: 2,
//         },

//         // ======================================================
//         // TAB ICON
//         // ======================================================
//         tabBarIconStyle: {
//           marginBottom: -2,
//         },
//       }}
//     >
//       {/* ======================================================
//           HOME
//       ====================================================== */}
      // <Tabs.Screen
      //   name="index"
      //   options={{
      //     title: "Home",

      //     tabBarIcon: ({ color, size, focused }) => (
      //       <Ionicons
      //         name={focused ? "home" : "home-outline"}
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />

      // {/* ======================================================
      //     ROUTINE
      // ====================================================== */}
      // <Tabs.Screen
      //   name="routine"
      //   options={{
      //     title: "Routine",

      //     tabBarIcon: ({ color, size, focused }) => (
      //       <Ionicons
      //         name={focused ? "calendar" : "calendar-outline"}
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />

      // {/* ======================================================
      //     INBOX
      // ====================================================== */}
      // <Tabs.Screen
      //   name="inbox"
      //   options={{
      //     title: "Inbox",

      //     tabBarIcon: ({ color, size, focused }) => (
      //       <Ionicons
      //         name={focused ? "mail" : "mail-outline"}
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />

      // {/* ======================================================
      //     PROFILE
      // ====================================================== */}
      // <Tabs.Screen
      //   name="profile"
      //   options={{
      //     title: "Profile",

      //     tabBarIcon: ({ color, size, focused }) => (
      //       <Ionicons
      //         name={focused ? "person" : "person-outline"}
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />
//     </Tabs>
//   );
// }
// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TeacherTabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,

//         // Active / Inactive colors
//         tabBarActiveTintColor: "#8E7CC3",
//         tabBarInactiveTintColor: "#999",

//         // Tab bar design
//         tabBarStyle: {
//           height: 110,
//           paddingTop: 8,
//           paddingBottom: 8,
//           paddingHorizontal: 8,
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 0,
//           elevation: 8,
//           shadowColor: "#000",
//           shadowOffset: {
//             width: 0,
//             height: -2,
//           },
//           shadowOpacity: 0.08,
//           shadowRadius: 10,
//         },

//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "600",
//           marginTop: 2,
//         },

//         tabBarItemStyle: {
//           borderRadius: 16,
//         },
//       }}
//     >
//       {/* HOME */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "home" : "home-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       {/* ROUTINE */}
//       <Tabs.Screen
//         name="routine"
//         options={{
//           title: "Routine",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "calendar" : "calendar-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       {/* INBOX */}
//       <Tabs.Screen
//         name="inbox"
//         options={{
//           title: "Inbox",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "mail" : "mail-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       {/* PROFILE */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "person" : "person-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }






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