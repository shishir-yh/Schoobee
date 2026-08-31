import React, { useEffect, useRef, useState } from "react";
import "../global.css";
import { Slot } from "expo-router";
import { AppState, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, setStatusBarStyle, setStatusBarBackgroundColor } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";

const BG_COLOR = "#625373";

function applyStatusBar() {
  setStatusBarStyle("light");
  if (Platform.OS === "android") {
    setStatusBarBackgroundColor(BG_COLOR, false);
  }
}

export default function RootLayout() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    
    applyStatusBar();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        
        applyStatusBar();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar
          style="light"
          backgroundColor={Platform.OS === "android" ? BG_COLOR : undefined}
          translucent={false}
        />
        <Slot />
      </AuthProvider>
    </SafeAreaProvider>
  );
}