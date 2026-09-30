import React from "react";
import "../global.css";
import { Slot } from "expo-router";
import { View, Platform } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";

const BG_COLOR = "#625373";

function StatusBarBackground() {
  // Android status bar is always transparent now (edge-to-edge is enforced),
  // so we draw our own colored strip behind it using the top safe-area inset.
  const insets = useSafeAreaInsets();

  if (Platform.OS !== "android") return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: insets.top,
        backgroundColor: BG_COLOR,
        zIndex: 1,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* style still works fine (light/dark/auto icon color).
            backgroundColor / translucent are deprecated no-ops on Android
            now, so we don't pass them and instead draw our own bar below. */}
        <StatusBar style="light" />

        {/* Draws the colored bar behind the (now transparent) Android status bar */}
        <StatusBarBackground />

        <Slot />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

// import React from "react";
// import "../global.css";
// import { Slot } from "expo-router";
// import { View, Platform } from "react-native";
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";
// import { SystemBars } from "react-native-edge-to-edge";
// import { AuthProvider } from "../context/AuthContext";

// const BG_COLOR = "#625373";

// function StatusBarBackground() {
//   // Android status bar is transparent now (edge-to-edge is enforced),
//   // so we draw our own colored strip behind it using the top safe-area inset.
//   const insets = useSafeAreaInsets();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <View
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         height: insets.top,
//         backgroundColor: BG_COLOR,
//         zIndex: 1,
//       }}
//     />
//   );
// }

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <AuthProvider>
//         {/* Controls icon/text color only (light/dark/auto). */}
//         <SystemBars style="light" />

//         {/* Draw the colored bar behind the transparent Android status bar */}
//         <StatusBarBackground />

//         <Slot />
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// }



// import React from "react";
// import "../global.css";
// import { Slot } from "expo-router";
// import { Platform } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { AuthProvider } from "../context/AuthContext";

// const BG_COLOR = "#625373";

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <AuthProvider>
//         <StatusBar
//           style="light"
//           backgroundColor={Platform.OS === "android" ? BG_COLOR : undefined}
//           translucent={true}
//         />
//         <Slot />
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// }


// import React, { useEffect, useRef, useState } from "react";
// import "../global.css";
// import { Slot } from "expo-router";
// import { AppState, Platform } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StatusBar, setStatusBarStyle, setStatusBarBackgroundColor } from "expo-status-bar";
// import { AuthProvider } from "../context/AuthContext";

// const BG_COLOR = "#625373";

// function applyStatusBar() {
//   setStatusBarStyle("light");
//   if (Platform.OS === "android") {
//     setStatusBarBackgroundColor(BG_COLOR, false);
//   }
// }

// export default function RootLayout() {
//   const appState = useRef(AppState.currentState);

//   useEffect(() => {
    
//     applyStatusBar();

//     const subscription = AppState.addEventListener("change", (nextAppState) => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === "active"
//       ) {
        
//         applyStatusBar();
//       }
//       appState.current = nextAppState;
//     });

//     return () => subscription.remove();
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <AuthProvider>
//         <StatusBar
//           style="light"
//           backgroundColor={Platform.OS === "android" ? BG_COLOR : undefined}
//           translucent={false}
//         />
//         <Slot />
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// }