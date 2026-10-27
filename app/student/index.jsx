import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Redirect } from "expo-router";

export default function StudentIndex() {
  const [loading, setLoading] = useState(true);
  const scale = React.useRef(new Animated.Value(0.8)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return <Redirect href="/student/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>

        {/* App Name */}
        <Text style={styles.title}>Student Portal</Text>

        {/* Loading */}
        <ActivityIndicator
          size="small"
          color="#4F46E5"
          style={styles.loader}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
  },

  logo: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 8,
  },

  logoText: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  title: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.2,
  },

  loader: {
    marginTop: 22,
  },
});
