import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import{ useState } from 'react'

import {
  Pressable,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";
import Banner from "../../../Teacher-components/Banner/Banner";
import Overview from "../../../Teacher-components/Overview/Overview";

import {
  teacherDashboardItems,
  teacherSummaryItems,
  teacherAttendanceData,
} from "../../../data/users";
import Attendance from "../../../Teacher-components/Attendance/Attendance";

// =========================
// Helper: time-based greeting
// =========================
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function TeacherDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentUser, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);


  // Set this from your real notification state/hook when you have one
  const hasUnreadNotifications = false;

  // =========================
  // Dashboard Card Navigation
  // =========================
  const handleNavigation = (title) => {
    if (title === "Profile") {
      router.push("/teacher/profile");
    }

    if (title === "Online Class") {
      router.push("/teacher/online-class");
    }

    if (title === "Mark Entry") {
      router.push("/teacher/marks");
    }

    if (title === "Take Attend") {
      router.push("/teacher/attendance");
    }

    if (title === "Student List") {
      router.push("/teacher/students");
    }

    // Routine এখন Bottom Tab
    if (title === "Routine") {
      router.push("/teacher/(tabs)/routine");
    }

    if (title === "My Attendance") {
      router.push("/teacher/my-attendance");
    }

    if (title === "Academic Cal") {
      router.push("/teacher/academic-calendar");
    }

    if (title === "Notices") {
      router.push("/teacher/notices");
    }
  };


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

const handleMenuPress = (title) => {
  setMenuVisible(false);

  if (title === "Dashboard") {
    router.replace("/teacher/(tabs)");
  }

  if (title === "Students") {
    router.push("/teacher/students");
  }

  if (title === "Attendance") {
    router.push("/teacher/attendance");
  }

  if (title === "Mark Entry") {
    router.push("/teacher/marks");
  }

  if (title === "Routine") {
    router.push("/teacher/(tabs)/routine");
  }

  if (title === "Notices") {
    router.push("/teacher/notices");
  }
};

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
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
          onPress: () => {
            logout();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    // Root wrapper — header + scroll content are now SIBLINGS,
    // not parent/child, which is what keeps the header fixed on screen.
    <View className="flex-1 bg-white">
{/* =========================
          HEADER (STATIC — lives outside ScrollView)
      ========================= */}
      <View
        className="bg-[#8E7CC3] px-5 pb-16 relative"
        style={{ paddingTop: insets.top + 20 }}
      >
        {/* Header Content */}
        <View className="flex-row items-center justify-between">

          {/* Profile + User Info */}
          <View className="flex-row items-center flex-1 mr-3">
            <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
              <Ionicons
                name="person"
                size={32}
                color="#8E7CC3"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-white/80 text-sm">
                {getGreeting()} 👋
              </Text>

              <Text
                className="text-white text-2xl font-bold"
                numberOfLines={1}
              >
                {currentUser?.name || "Teacher"}
              </Text>

              <Text className="text-white/80 text-xs mt-0.5">
                Teacher
              </Text>
            </View>
          </View>

          {/* Notification */}
          {/* <TouchableOpacity
            onPress={() => router.push("/teacher/(tabs)/inbox")}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            className="w-11 h-11 rounded-full bg-white/15 items-center justify-center"
          >
            <Ionicons
              name="notifications-outline"
              size={26}
              color="white"
            />

            {hasUnreadNotifications && (
              <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border border-[#8E7CC3]" />
            )}
          </TouchableOpacity> */}

      {/* Side menu visible */}
          <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}
        className="w-11 h-11 rounded-full bg-white/15 items-center justify-center"
      >
        <Ionicons
          name="menu-outline"
          size={28}
          color="white"
        />
      </TouchableOpacity>

        </View>

        {/* Bottom White Curve */}
        <View
          className="absolute bg-white left-0 right-0"
          style={{
            height: 28,
            bottom: 0,
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          }}
        />
      </View>
      
      

      {/* =========================
          SCROLLABLE WHITE CONTENT
      ========================= */}
      <ScrollView
        className="bg-white flex-1"
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >


        {/* Side menu model */}

        {/* =========================
    SIDE MENU
========================= */}

<Modal
  visible={menuVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setMenuVisible(false)}
>
  <View className="flex-1 flex-row">

    {/* Dark Overlay */}
    <Pressable
      className="flex-1 bg-black/40"
      onPress={() => setMenuVisible(false)}
    />

    {/* Side Menu */}
    <View className="w-[82%] bg-white">

      <SafeAreaView className="flex-1">

        {/* Menu Header */}
        <View className="flex-row items-center justify-between border-b border-[#EEEAF2] px-5 py-5">

          <Text className="text-[19px] font-bold text-[#33303A]">
            Edu Menu
          </Text>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

    

          {/* Menu Items */}
          <View className="mt-4 px-3">

            {menuItems.map((item) => (
              <Pressable
                key={item.title}
                onPress={() =>
                  handleMenuPress(item.title)
                }
                className="mb-1 flex-row items-center rounded-xl px-3 py-3.5"
              >

                <Ionicons
                  name={item.icon}
                  size={21}
                  color="#5E5965"
                />

                <Text className="ml-4 flex-1 text-[13px] text-[#403C46]">
                  {item.title}
                </Text>

                {item.badge ? (
                  <View className="min-w-5 h-5 px-1 rounded-full bg-red-500 items-center justify-center">

                    <Text className="text-white text-[9px] font-bold">
                      {item.badge}
                    </Text>

                  </View>
                ) : null}

              </Pressable>
            ))}

            {/* Switch Role */}
            {/* <Pressable
              onPress={() =>
                handleMenuPress("Switch Role")
              }
              className="mt-2 flex-row items-center rounded-xl bg-[#F4F0FA] px-3 py-3.5"
            >

              <Ionicons
                name="swap-horizontal-outline"
                size={21}
                color="#8E7CC3"
              />

              <Text className="ml-4 flex-1 text-[13px] font-medium text-[#403C46]">
                Switch Role
              </Text>

              <View className="rounded-full bg-[#8E7CC3] px-2.5 py-1">

                <Text className="text-[9px] font-semibold text-white">
                  Teacher
                </Text>

              </View>

            </Pressable> */}

             {/* =========================
            LOGOUT
        ========================= */}
        <View className="px-5 mt-6 mb-12">

          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.8}
            className="bg-red-500 flex-row items-center justify-center py-3.5 rounded-2xl shadow-md"
          >

            <Ionicons
              name="log-out-outline"
              size={20}
              color="white"
            />

            <Text className="text-white font-bold text-base ml-2">
              Logout
            </Text>

          </TouchableOpacity>

        </View>


          </View>

        </ScrollView>

        {/* Version */}
        <View className="items-center border-t border-[#EEEAF2] py-4">

          <Text className="text-[10px] text-[#AAA4AF]">
            Version 7.0.0
          </Text>

        </View>

      </SafeAreaView>
    </View>

  </View>
</Modal>

        {/* =========================
            DASHBOARD GRID
        ========================= */}
        <View className="px-5 pt-6">

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Quick Access
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {teacherDashboardItems.map((item) => (
              <TouchableOpacity
                key={item.title}
                className="w-[31%] mb-5 items-center"
                onPress={() => handleNavigation(item.title)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.title}
              >

                {/* Icon */}
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center"
                  style={{
                    backgroundColor: `${item.color}20`,
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={item.color}
                  />
                </View>

                {/* Title */}
                <Text className="text-xs text-gray-700 text-center mt-2">
                  {item.title}
                </Text>

                {/* Badge */}
                {item.badge && (
                  <View className="absolute top-0 right-3 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">
                      {item.badge}
                    </Text>
                  </View>
                )}

              </TouchableOpacity>
            ))}

          </View>
        </View>


        {/* Banner */}

        <View className="mt-1 mb-6 rounded-[20px] ">
          <Banner />
        </View>

        {/* =========================
            SUMMARY OVERVIEW
        ========================= */}
        <View className="px-5 mt-4">

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Overview
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {teacherSummaryItems.map((item) => (
              <View
                key={item.label}
                className="w-[48%] bg-white rounded-2xl p-4 mb-3"
              >
                <View className="flex-row items-center justify-between">

                  <View>
                    <Text className="text-2xl font-bold text-gray-800">
                      {item.value}
                    </Text>

                    <Text className="text-gray-500 text-xs mt-1">
                      {item.label}
                    </Text>
                  </View>

                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: `${item.color}20`,
                    }}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.color}
                    />
                  </View>

                </View>
              </View>
            ))}

          </View>
        </View>

        {/* <View className="mt-1 mb-6 rounded-[20px] ">
          <Overview />
        </View> */}

        {/* =========================
            ATTENDANCE OVERVIEW
        ========================= */}
        <View className="px-5 mt-4 mb-6">

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Attendance Overview
          </Text>

          <View className="rounded-2xl border border-[#EEEAF2] bg-white p-4">

            <Text className="mb-4 text-[14px] font-medium text-[#33303A]">
              Class Attendance Average
            </Text>

            <View className="h-[210px] flex-row items-end justify-between px-2">

              {teacherAttendanceData.map((item) => (
                <View
                  key={item.label}
                  className="h-full flex-1 items-center justify-end"
                >

                  {/* Percentage */}
                  <Text className="mb-1 text-[10px] font-medium text-[#77727F]">
                    {item.value}%
                  </Text>

                  {/* Vertical Bar */}
                  <View className="h-[155px] w-9 justify-end">

                    <View
                      className="w-full rounded-t-md bg-[#8E7CC3]"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />

                  </View>

                  {/* Label */}
                  <Text
                    className="mt-2 text-[9px] text-[#77727F]"
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>

                </View>
              ))}

            </View>

          </View>
        </View>

       
      </ScrollView>
    </View>
  );
}






// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useAuth } from "../../../context/AuthContext";
// import Banner from "../../../Teacher-components/Banner/Banner";

// import {
//   teacherDashboardItems,
//   teacherSummaryItems,
//   teacherAttendanceData,
// } from "../../../data/users";

// export default function TeacherDashboard() {
//   const router = useRouter();
//   const { currentUser, logout } = useAuth();

//   // =========================
//   // Dashboard Card Navigation
//   // =========================
//   const handleNavigation = (title) => {
//     if (title === "Profile") {
//       router.push("/teacher/profile");
//     }

//     if (title === "Online Class") {
//       router.push("/teacher/online-class");
//     }

//     if (title === "Mark Entry") {
//       router.push("/teacher/marks");
//     }

//     if (title === "Take Attend") {
//       router.push("/teacher/attendance");
//     }

//     if (title === "Student List") {
//       router.push("/teacher/students");
//     }

//     // Routine এখন Bottom Tab
//     if (title === "Routine") {
//       router.push("/teacher/(tabs)/routine");
//     }

//     if (title === "My Attendance") {
//       router.push("/teacher/my-attendance");
//     }

//     if (title === "Academic Cal") {
//       router.push("/teacher/academic-calendar");
//     }

//     if (title === "Notices") {
//       router.push("/teacher/notices");
//     }
//   };

//   // =========================
//   // Logout
//   // =========================
//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: () => {
//             logout();
//             router.replace("/");
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <ScrollView
//       className="flex-1 bg-white"
//       showsVerticalScrollIndicator={false}
//     >
//       {/* =========================
//           HEADER
//       ========================= */}
//       <View className="bg-[#8E7CC3] px-5 pt-12 pb-12 relative">
//         {/* Header Content */}
//         <View className="flex-row items-center justify-between">

//           {/* Profile + User Info */}
//           <View className="flex-row items-center">
//             <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
//               <Ionicons
//                 name="person"
//                 size={25}
//                 color="#8E7CC3"
//               />
//             </View>

//             <View className="ml-3">
//               <Text className="text-white text-xs">
//                 Welcome Back
//               </Text>

//               <Text className="text-white text-lg font-bold">
//                 {currentUser?.name || "Teacher"}
//               </Text>

//               <Text className="text-white/80 text-xs">
//                 Teacher
//               </Text>
//             </View>
//           </View>

//           {/* Notification */}
//           <TouchableOpacity
//             onPress={() => router.push("/teacher/(tabs)/inbox")}
//           >
//             <Ionicons
//               name="notifications-outline"
//               size={25}
//               color="white"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Bottom White Curve */}
//         <View
//           className="absolute bg-white left-0 right-0"
//           style={{
//             height: 25,
//             bottom: 0,
//             borderTopLeftRadius: 45,
//             borderTopRightRadius: 45,
//           }}
//         />
//       </View>

//       {/* =========================
//           WHITE CONTENT
//       ========================= */}
//       <View
//         className="bg-white flex-1"
//         style={{
//           marginTop: -0,
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//         }}
//       >

//         {/* =========================
//             DASHBOARD GRID
//         ========================= */}
//         <View className="px-5 pt-6">

//           <Text className="text-xl font-bold text-gray-800 mb-4">
//             Quick Access
//           </Text>

//           <View className="flex-row flex-wrap justify-between">

//             {teacherDashboardItems.map((item) => (
//               <TouchableOpacity
//                 key={item.title}
//                 className="w-[31%] mb-5 items-center"
//                 onPress={() => handleNavigation(item.title)}
//               >

//                 {/* Icon */}
//                 <View
//                   className="w-16 h-16 rounded-2xl items-center justify-center"
//                   style={{
//                     backgroundColor: `${item.color}20`,
//                   }}
//                 >
//                   <Ionicons
//                     name={item.icon}
//                     size={28}
//                     color={item.color}
//                   />
//                 </View>

//                 {/* Title */}
//                 <Text className="text-xs text-gray-700 text-center mt-2">
//                   {item.title}
//                 </Text>

//                 {/* Badge */}
//                 {item.badge && (
//                   <View className="absolute top-0 right-3 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
//                     <Text className="text-white text-[10px] font-bold">
//                       {item.badge}
//                     </Text>
//                   </View>
//                 )}

//               </TouchableOpacity>
//             ))}

//           </View>
//         </View>


//         {/* Banner */}

//         <View className="mt-1 mb-6 rounded-[20px] ">
//         <Banner />
//         </View>

//         {/* =========================
//             SUMMARY OVERVIEW
//         ========================= */}
//         <View className="px-5 mt-4">

//           <Text className="text-xl font-bold text-gray-800 mb-4">
//             Overview
//           </Text>

//           <View className="flex-row flex-wrap justify-between">

//             {teacherSummaryItems.map((item) => (
//               <View
//                 key={item.label}
//                 className="w-[48%] bg-white rounded-2xl p-4 mb-3"
//               >
//                 <View className="flex-row items-center justify-between">

//                   <View>
//                     <Text className="text-2xl font-bold text-gray-800">
//                       {item.value}
//                     </Text>

//                     <Text className="text-gray-500 text-xs mt-1">
//                       {item.label}
//                     </Text>
//                   </View>

//                   <View
//                     className="w-10 h-10 rounded-xl items-center justify-center"
//                     style={{
//                       backgroundColor: `${item.color}20`,
//                     }}
//                   >
//                     <Ionicons
//                       name={item.icon}
//                       size={20}
//                       color={item.color}
//                     />
//                   </View>

//                 </View>
//               </View>
//             ))}

//           </View>
//         </View>

//         {/* =========================
//             ATTENDANCE OVERVIEW
//         ========================= */}
//         <View className="px-5 mt-4 mb-6">

//           <Text className="text-xl font-bold text-gray-800 mb-4">
//             Attendance Overview
//           </Text>

//           <View className="rounded-2xl border border-[#EEEAF2] bg-white p-4">

//             <Text className="mb-4 text-[14px] font-medium text-[#33303A]">
//               Class Attendance Average
//             </Text>

//             <View className="h-[210px] flex-row items-end justify-between px-2">

//               {teacherAttendanceData.map((item) => (
//                 <View
//                   key={item.label}
//                   className="h-full flex-1 items-center justify-end"
//                 >

//                   {/* Percentage */}
//                   <Text className="mb-1 text-[10px] font-medium text-[#77727F]">
//                     {item.value}%
//                   </Text>

//                   {/* Vertical Bar */}
//                   <View className="h-[155px] w-9 justify-end">

//                     <View
//                       className="w-full rounded-t-md bg-[#8E7CC3]"
//                       style={{
//                         height: `${item.value}%`,
//                       }}
//                     />

//                   </View>

//                   {/* Label */}
//                   <Text
//                     className="mt-2 text-[9px] text-[#77727F]"
//                     numberOfLines={1}
//                   >
//                     {item.label}
//                   </Text>

//                 </View>
//               ))}

//             </View>
//           </View>
//         </View>

//         {/* =========================
//             LOGOUT
//         ========================= */}
//         <View className="px-5 mt-6 mb-12">

//           <TouchableOpacity
//             onPress={handleLogout}
//             className="bg-red-500 flex-row items-center justify-center py-3.5 rounded-2xl shadow-md"
//           >

//             <Ionicons
//               name="log-out-outline"
//               size={20}
//               color="white"
//             />

//             <Text className="text-white font-bold text-base ml-2">
//               Logout
//             </Text>

//           </TouchableOpacity>

//         </View>

//       </View>
//     </ScrollView>
//   );
// }