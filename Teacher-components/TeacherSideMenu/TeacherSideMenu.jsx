import React, { useRef } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  Animated,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  SafeAreaView,
} from "react-native-safe-area-context";


export default function TeacherSideMenu({
  visible,
  onClose,
  onNavigate,
  onLogout,
  insets,
}) {

  // =========================
  // DRAWER ANIMATION
  // =========================

  const slideAnim = useRef(
    new Animated.Value(350)
  ).current;


  // =========================
  // OPEN / CLOSE ANIMATION
  // =========================

  React.useEffect(() => {

    if (visible) {

      // Start from right side
      slideAnim.setValue(350);

      requestAnimationFrame(() => {

        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }).start();

      });

    }

  }, [visible]);


  // =========================
  // CLOSE MENU
  // =========================

  const handleMenuClose = () => {

    Animated.timing(slideAnim, {
      toValue: 350,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {

      if (finished) {
        onClose();
      }

    });

  };


  // =========================
  // TEACHER MENU ITEMS
  // =========================

  const menuItems = [

    {
      title: "Dashboard",
      icon: "home-outline",
    },

    {
      title: "Students",
      icon: "people-outline",
    },

    {
      title: "Attendance",
      icon: "checkmark-circle-outline",
    },

    {
      title: "Mark Entry",
      icon: "create-outline",
    },

    {
      title: "Routine",
      icon: "calendar-outline",
    },

    {
      title: "Notices",
      icon: "notifications-outline",
      badge: 3,
    },

  ];


  // =========================
  // MENU ITEM PRESS
  // =========================

  const handleMenuPress = (title) => {

    // Close menu first
    handleMenuClose();


    // Wait for animation
    setTimeout(() => {

      onNavigate(title);

    }, 250);

  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogoutPress = () => {

    // Close menu first
    handleMenuClose();


    setTimeout(() => {

      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",

        [
          {
            text: "Cancel",
            style: "cancel",
          },

          {
            text: "Logout",
            style: "destructive",
            onPress: onLogout,
          },

        ]
      );

    }, 250);

  };


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleMenuClose}
      statusBarTranslucent={true}
    >

      <View className="flex-1 flex-row">

        {/* =========================
            DARK / OUTSIDE AREA
        ========================= */}

        <Pressable
          className="flex-1"
          onPress={handleMenuClose}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />


        {/* =========================
            SIDE MENU
        ========================= */}

        <Animated.View
          className="w-[80%] bg-white"
          style={{
            transform: [
              {
                translateX: slideAnim,
              },
            ],

            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >

          <SafeAreaView
            edges={["left", "right"]}
            className="flex-1"
          >

            {/* =========================
                MENU HEADER
            ========================= */}

            <View
              className="
                flex-row
                items-center
                justify-between
                border-b
                border-[#EEEAF2]
                px-5
                mt-14
              "
            >

              <Text
                className="
                  text-[24px]
                  font-bold
                  text-[#33303A]
                "
              >
                Edu Menu
              </Text>


              {/* CLOSE BUTTON */}

              <TouchableOpacity
                onPress={handleMenuClose}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-[#F2EEF7]
                  items-center
                  justify-center
                "
              >

                <Ionicons
                  name="close"
                  size={21}
                  color="#5E5965"
                />

              </TouchableOpacity>

            </View>


            {/* =========================
                MENU CONTENT
            ========================= */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            >

              <View className="mt-6 px-3">

                {menuItems.map((item) => (

                  <Pressable
                    key={item.title}
                    onPress={() =>
                      handleMenuPress(item.title)
                    }
                    className="
                      mb-1
                      flex-row
                      items-center
                      rounded-xl
                      px-3
                      py-3.5
                    "
                  >

                    {/* ICON */}

                    <Ionicons
                      name={item.icon}
                      size={21}
                      color="#5E5965"
                    />


                    {/* TITLE */}

                    <Text
                      className="
                        ml-4
                        flex-1
                        text-[13px]
                        text-[#403C46]
                      "
                    >
                      {item.title}
                    </Text>


                    {/* BADGE */}

                    {item.badge ? (

                      <View
                        className="
                          min-w-5
                          h-5
                          px-1
                          rounded-full
                          bg-red-500
                          items-center
                          justify-center
                        "
                      >

                        <Text
                          className="
                            text-white
                            text-[9px]
                            font-bold
                          "
                        >
                          {item.badge}
                        </Text>

                      </View>

                    ) : null}

                  </Pressable>

                ))}


                {/* =========================
                    LOGOUT
                ========================= */}

                <Pressable
                  onPress={handleLogoutPress}
                  className="
                    mb-1
                    flex-row
                    items-center
                    rounded-xl
                    px-3
                    py-3.5
                  "
                >

                  <Ionicons
                    name="log-out-outline"
                    size={21}
                    color="#5E5965"
                  />

                  <Text
                    className="
                      ml-4
                      flex-1
                      text-[13px]
                      text-[#403C46]
                    "
                  >
                    Logout
                  </Text>

                </Pressable>

              </View>

            </ScrollView>


            {/* =========================
                VERSION
            ========================= */}

            <View
              className="
                items-center
                border-t
                border-[#EEEAF2]
                py-4
              "
            >

              <Text
                className="
                  text-[10px]
                  text-[#AAA4AF]
                "
              >
                Version 7.0.0
              </Text>

            </View>

          </SafeAreaView>

        </Animated.View>

      </View>

    </Modal>
  );
}

