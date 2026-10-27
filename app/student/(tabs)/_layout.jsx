import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StudentTabLayout() {
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

  // Bottom spacing device এর safe area অনুযায়ী dynamic,
  // "floating" লুক বজায় রাখতে ন্যূনতম 12 রাখা হয়েছে।
  const bottomSpacing = Math.max(insets.bottom, 12);

  return (
    <Tabs
      key={tabBarKey}
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#8E7CC3",
        tabBarInactiveTintColor: "#999999",

        // Keyboard open হলে tab bar hide হবে।
        tabBarHideOnKeyboard: true,

        // ======================================================
        // TAB BAR
        // ======================================================
        tabBarStyle: {
          // position: "absolute" — tab bar layout flow থেকে বের হয়ে
          // screen এ pin হয়ে থাকবে, app resume এ জাম্প করবে না।
          position: "absolute",

          height: 68,

          // Side spacing
          marginHorizontal: 12,

          // Safe area insets থেকে dynamic bottom spacing
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
      {/* ======================================================
          HOME
      ====================================================== */}
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
