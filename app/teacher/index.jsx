import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Redirect } from "expo-router";

export default function TeacherIndex() {
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
    return <Redirect href="/teacher/(tabs)" />;
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
          <Text style={styles.logoText}>T</Text>
        </View>

        {/* App Name */}
        <Text style={styles.title}>Teacher Portal</Text>

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

// import React from "react";
// import { Redirect } from "expo-router";

// export default function TeacherIndex() {
//   return <Redirect href="/teacher/(tabs)" />;
// }



//Most important file for teacher dashboard. This file contains the main dashboard screen for teachers, including navigation to various features like profile, online class, mark entry, attendance, student list, routine, my attendance, academic calendar, and notices. It also includes a logout button and an overview section with summary cards and attendance data visualization.

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useAuth } from "../../context/AuthContext";
// import {
//   teacherDashboardItems,
//   teacherSummaryItems,
//   teacherAttendanceData,
// } from "../../data/users";



// export default function TeacherDashboard() {
//   const router = useRouter();
//   const { currentUser, logout } = useAuth();

//   const handleLogout = () => {
//       Alert.alert("Logout", "Are you sure you want to logout?", [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           onPress: () => {
//             logout();
//             router.replace("/");
//           },
//         },
//       ]);
//     };

//   return (
//     <ScrollView className="flex-1 bg-white">
      
//       {/* Header */}
//       <View className="bg-[#8E7CC3] px-5 pt-12 pb-12 relative">

//     {/* Header Content */}
//     <View className="flex-row items-center justify-between">

//       {/* Profile + User Info */}
//       <View className="flex-row items-center">
//         <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
//           <Ionicons
//             name="person"
//             size={25}
//             color="#8E7CC3"
//           />
//         </View>

//         <View className="ml-3">
//           <Text className="text-white text-xs">
//             Welcome Back
//           </Text>

//           <Text className="text-white text-lg font-bold">
//             {currentUser?.name}
//           </Text>

//           <Text className="text-white/80 text-xs">
//             Teacher
//           </Text>
//         </View>
//       </View>

//       {/* Notification */}
//       <TouchableOpacity>
//         <Ionicons
//           name="notifications-outline"
//           size={25}
//           color="white"
//         />
//       </TouchableOpacity>

//     </View>

//     {/* Bottom White Curve */}
//     <View
//       className="absolute bg-white left-0 right-0"
//       style={{
//         height: 25,
//         bottom: 0,
//         borderTopLeftRadius: 45,
//         borderTopRightRadius: 45,
//       }}
//     />

//       </View>

//       {/* White Content */}
//       <View
//         className="bg-white flex-1"
//         style={{
//           marginTop: -30,
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//         }}
//       >
//         {/* Your content here */}
//       </View>

//       {/* Dashboard Grid */}
//       <View className="px-5 pt-6">
//         <View className="flex-row flex-wrap justify-between">
//           {teacherDashboardItems.map((item) => (
//             <TouchableOpacity
//               key={item.title}
//               className="w-[31%] mb-4 items-center"
//               onPress={() => {
//                 if (item.title === "Profile") {
//                   router.push("/teacher/profile");
//                 }
//                 if (item.title === "Online Class") {
//                   router.push("/teacher/online-class");
//                 }
//                 if (item.title === "Mark Entry") {
//                   router.push("/teacher/marks");
//                 }
//                 if (item.title === "Take Attend") {
//                   router.push("/teacher/attendance");
//                 }
//                 if (item.title === "Student List") {
//                   router.push("/teacher/students");
//                } 
//                if (item.title === "Routine") {
//                   router.push("/teacher/routine");
//                }
//                if (item.title === "My Attendance") {
//                   router.push("/teacher/my-attendance");
//                }
//                 if (item.title === "Academic Cal") { 
//                   router.push("/teacher/academic-calendar");
//               }
//                if (item.title === "Notices") {
//                   router.push("/teacher/notices");
//               }

//               }}
//             >
//               <View
//                 className="w-16 h-16 rounded-2xl items-center justify-center"
//                 style={{
//                   backgroundColor: `${item.color}20`,
//                 }}
//               >
//                 <Ionicons
//                   name={item.icon}
//                   size={28}
//                   color={item.color}
//                 />
//               </View>

//               <Text className="text-xs text-gray-700 text-center mt-2">
//                 {item.title}
//               </Text>

//               {item.badge && (
//                 <View className="absolute top-0 right-3 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
//                   <Text className="text-white text-[10px] font-bold">
//                     {item.badge}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           ))}
  
//         </View>

        
//       </View>

//       {/* summary overview */}
//       <View className="px-5 mt-4">
//         <Text className="text-xl font-bold text-gray-800 mb-4">
//           Overview
//         </Text>

//         <View className="flex-row flex-wrap justify-between">
//           {teacherSummaryItems.map((item) => (
//             <View
//               key={item.label}
//               className="w-[48%] bg-white rounded-2xl p-4 mb-3"
//             >
//               <View className="flex-row items-center justify-between">
                
//                 <View>
//                   <Text className="text-2xl font-bold text-gray-800">
//                     {item.value}
//                   </Text>

//                   <Text className="text-gray-500 text-xs mt-1">
//                     {item.label}
//                   </Text>
//                 </View>

//                 <View
//                   className="w-10 h-10 rounded-xl items-center justify-center"
//                   style={{
//                     backgroundColor: `${item.color}20`,
//                   }}
//                 >
//                   <Ionicons
//                     name={item.icon}
//                     size={20}
//                     color={item.color}
//                   />
//                 </View>

//               </View>
//             </View>
//           ))}
//         </View>
        
      
//       </View>

//       {/* Class Attendance Average */}
//       {/* Attendance Overview  */}
//       <View className="px-5 mt-4 mb-6">
//   <Text className="text-xl font-bold text-gray-800 mb-4">
//     Attendance Overview
//   </Text>

//   <View className="rounded-2xl border border-[#EEEAF2] bg-white p-4">
//     <Text className="mb-4 text-[14px] font-medium text-[#33303A]">
//       Class Attendance Average
//     </Text>

//     <View className="h-[210px] flex-row items-end justify-between px-2">
//       {teacherAttendanceData.map((item) => (
//         <View
//           key={item.label}
//           className="h-full flex-1 items-center justify-end"
//         >
//           {/* Percentage */}
//           <Text className="mb-1 text-[10px] font-medium text-[#77727F]">
//             {item.value}%
//           </Text>

//           {/* Vertical Bar */}
//           <View className="h-[155px] w-9 justify-end">
//             <View
//               className="w-full rounded-t-md bg-[#8E7CC3]"
//               style={{
//                 height: `${item.value}%`,
//               }}
//             />
//           </View>

//           {/* Label */}
//           <Text
//             className="mt-2 text-[9px] text-[#77727F]"
//             numberOfLines={1}
//           >
//             {item.label}
//           </Text>
//         </View>
//       ))}
//     </View>
//   </View>
//       </View>


//       {/* Logout Button Section */}
//       <View className="px-5 mt-6 mb-12">
//         <TouchableOpacity
//           onPress={handleLogout}
//           className="bg-red-500 flex-row items-center justify-center py-3.5 rounded-2xl shadow-md"
//         >
//           <Ionicons name="log-out-outline" size={20} color="white" className="mr-2" />
//           <Text className="text-white font-bold text-base ml-2">
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>



//     </ScrollView>
//   );
// }
































// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   ScrollView,
//   Pressable,
//   Image,
//   Modal,
//   Alert,
//   StatusBar,
//   TouchableOpacity,
// } from "react-native";

// import {
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "expo-router";

// /* =====================================================
//    DATA
// ===================================================== */

// const dashboardItems = [
//   {
//     title: "Profile",
//     icon: "person-outline",
//     color: "#14B8A6",
//   },
//   {
//     title: "Online Class",
//     icon: "videocam-outline",
//     color: "#8E7CC3",
//     badge: 1,
//   },
//   {
//     title: "Mark Entry",
//     icon: "clipboard-outline",
//     color: "#E74C3C",
//   },
//   {
//     title: "Take Attend",
//     icon: "calendar-outline",
//     color: "#2ECC71",
//   },
//   {
//     title: "Student List",
//     icon: "list-outline",
//     color: "#3498DB",
//   },
//   {
//     title: "Routine",
//     icon: "time-outline",
//     color: "#F39C12",
//   },
//   {
//     title: "My Attendance",
//     icon: "calendar-clear-outline",
//     color: "#14B8A6",
//   },
//   {
//     title: "Academic Cal",
//     icon: "calendar-outline",
//     color: "#F39C12",
//   },
//   {
//     title: "Notices",
//     icon: "megaphone-outline",
//     color: "#E74C3C",
//   },
// ];

// const summaryItems = [
//   {
//     value: "5",
//     label: "Total Students",
//     icon: "account-group-outline",
//     color: "#8E7CC3",
//   },
//   {
//     value: "95%",
//     label: "Avg Attendance",
//     icon: "chart-line",
//     color: "#2ECC71",
//   },
//   {
//     value: "5",
//     label: "To Grade",
//     icon: "file-document-edit-outline",
//     color: "#E74C3C",
//   },
//   {
//     value: "Dec 1",
//     label: "Next Pay",
//     icon: "calendar-outline",
//     color: "#3498DB",
//   },
// ];

// const attendanceData = [
//   {
//     label: "CS101",
//     value: 85,
//   },
//   {
//     label: "CS102",
//     value: 92,
//   },
//   {
//     label: "MATH201",
//     value: 78,
//   },
//   {
//     label: "PHY101",
//     value: 88,
//   },
// ];

// const recentTasks = [
//   {
//     title: "CS101 Midterms",
//     subtitle: "Grading Published",
//     value: "45/45",
//     status: "Done",
//     icon: "check-circle-outline",
//     color: "#2ECC71",
//   },
//   {
//     title: "Leave Request",
//     subtitle: "For Nov 25",
//     value: "Pending",
//     status: "HR Review",
//     icon: "clock-outline",
//     color: "#F39C12",
//   },
// ];

// const quickFeatures = [
//   {
//     title: "Staff Meet",
//     icon: "account-group-outline",
//     color: "#F39C12",
//   },
//   {
//     title: "Training",
//     icon: "presentation",
//     color: "#3498DB",
//   },
//   {
//     title: "Research",
//     icon: "flask-outline",
//     color: "#9B59B6",
//   },
// ];

// const menuItems = [
//   {
//     title: "Profile",
//     icon: "person-outline",
//   },
//   {
//     title: "Online Class",
//     icon: "videocam-outline",
//     badge: 1,
//   },
//   {
//     title: "Mark Entry",
//     icon: "clipboard-outline",
//   },
//   {
//     title: "Student Attendance",
//     icon: "calendar-outline",
//   },
//   {
//     title: "Student List",
//     icon: "list-outline",
//   },
//   {
//     title: "Routine",
//     icon: "time-outline",
//   },
//   {
//     title: "Personal Attendance",
//     icon: "calendar-clear-outline",
//   },
//   {
//     title: "Academic Calendar",
//     icon: "calendar-number-outline",
//   },
//   {
//     title: "Notices",
//     icon: "megaphone-outline",
//   },
//   {
//     title: "Inbox",
//     icon: "mail-outline",
//     badge: 2,
//   },
// ];

// /* =====================================================
//    BADGE
// ===================================================== */

// function Badge({ value, small = false }) {
//   return (
//     <View
//       className={
//         small
//           ? "absolute -right-1 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-[#8E7CC3] px-1"
//           : "min-w-5 rounded-full bg-[#8E7CC3] px-1.5 py-0.5"
//       }
//     >
//       <Text
//         className={
//           small
//             ? "text-[8px] font-bold text-white"
//             : "text-center text-[9px] font-bold text-white"
//         }
//       >
//         {value}
//       </Text>
//     </View>
//   );
// }

// /* =====================================================
//    DASHBOARD GRID
// ===================================================== */

// function DashboardGrid({ onPress }) {
//   return (
//     <View className="flex-row flex-wrap px-4 pt-5">
//       {dashboardItems.map((item) => (
//         <Pressable
//           key={item.title}
//           onPress={() => onPress(item.title)}
//           className="mb-6 w-1/3 items-center"
//         >
//           <View className="relative">
//             <View
//               className="h-[58px] w-[58px] items-center justify-center rounded-2xl"
//               style={{
//                 backgroundColor: `${item.color}18`,
//               }}
//             >
//               <Ionicons
//                 name={item.icon}
//                 size={25}
//                 color={item.color}
//               />
//             </View>

//             {item.badge ? (
//               <Badge
//                 value={item.badge}
//                 small
//               />
//             ) : null}
//           </View>

//           <Text
//             className="mt-2 text-center text-[11px] font-medium text-[#55505D]"
//             numberOfLines={1}
//           >
//             {item.title}
//           </Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// }

// /* =====================================================
//    SUMMARY CARDS
// ===================================================== */

// function SummaryCards() {
//   return (
//     <View className="flex-row flex-wrap justify-between">
//       {summaryItems.map((item) => (
//         <View
//           key={item.label}
//           className="mb-3 w-[48.5%] flex-row items-center rounded-2xl border border-[#EEEAF2] bg-white p-3"
//         >
//           <View
//             className="h-11 w-11 items-center justify-center rounded-xl"
//             style={{
//               backgroundColor: `${item.color}18`,
//             }}
//           >
//             <MaterialCommunityIcons
//               name={item.icon}
//               size={22}
//               color={item.color}
//             />
//           </View>

//           <View className="ml-3 flex-1">
//             <Text
//               className="text-[18px] font-bold"
//               style={{
//                 color: item.color,
//               }}
//             >
//               {item.value}
//             </Text>

//             <Text
//               className="mt-0.5 text-[10px] text-[#77727F]"
//               numberOfLines={1}
//             >
//               {item.label}
//             </Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// }

// /* =====================================================
//    ATTENDANCE CHART
// ===================================================== */

// function AttendanceChart() {
//   return (
//     <View className="mt-2 rounded-2xl border border-[#EEEAF2] bg-white p-4">
//       <Text className="mb-4 text-[14px] font-medium text-[#33303A]">
//         Class Attendance Average
//       </Text>

//       <View className="h-[210px] flex-row items-end justify-between px-2">
//         {attendanceData.map((item) => (
//           <View
//             key={item.label}
//             className="h-full flex-1 items-center justify-end"
//           >
//             <Text className="mb-1 text-[10px] font-medium text-[#77727F]">
//               {item.value}%
//             </Text>

//             <View className="h-[155px] w-9 justify-end">
//               <View
//                 className="w-full rounded-t-md bg-[#8E7CC3]"
//                 style={{
//                   height: `${item.value}%`,
//                 }}
//               />
//             </View>

//             <Text
//               className="mt-2 text-[9px] text-[#77727F]"
//               numberOfLines={1}
//             >
//               {item.label}
//             </Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

// /* =====================================================
//    RECENT TASKS
// ===================================================== */

// function RecentTasks({ onPress }) {
//   return (
//     <View>
//       <Text className="mb-3 mt-5 text-[15px] font-semibold text-[#33303A]">
//         Recent Tasks
//       </Text>

//       <View className="overflow-hidden rounded-2xl border border-[#EEEAF2] bg-white">
//         {recentTasks.map((item, index) => (
//           <Pressable
//             key={item.title}
//             onPress={() => onPress(item.title)}
//             className="flex-row items-center p-4"
//             style={{
//               borderBottomWidth:
//                 index === recentTasks.length - 1
//                   ? 0
//                   : 1,
//               borderBottomColor: "#F0EDF3",
//             }}
//           >
//             <View
//               className="h-10 w-10 items-center justify-center rounded-xl"
//               style={{
//                 backgroundColor: `${item.color}18`,
//               }}
//             >
//               <MaterialCommunityIcons
//                 name={item.icon}
//                 size={21}
//                 color={item.color}
//               />
//             </View>

//             <View className="ml-3 flex-1">
//               <Text className="text-[13px] font-semibold text-[#33303A]">
//                 {item.title}
//               </Text>

//               <Text className="mt-1 text-[11px] text-[#8A8490]">
//                 {item.subtitle}
//               </Text>
//             </View>

//             <View className="items-end">
//               <Text className="text-[12px] font-semibold text-[#44404A]">
//                 {item.value}
//               </Text>

//               <Text
//                 className="mt-1 text-[10px] font-medium"
//                 style={{
//                   color: item.color,
//                 }}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// }

// /* =====================================================
//    QUICK FEATURES
// ===================================================== */

// function QuickFeatures({ onPress }) {
//   return (
//     <View>
//       <Text className="mb-3 mt-5 text-[15px] font-semibold text-[#33303A]">
//         Quick Features
//       </Text>

//       <View className="flex-row justify-between">
//         {quickFeatures.map((item) => (
//           <Pressable
//             key={item.title}
//             onPress={() => onPress(item.title)}
//             className="w-[31.5%] items-center rounded-2xl border bg-white px-2 py-4"
//             style={{
//               borderColor: `${item.color}55`,
//             }}
//           >
//             <MaterialCommunityIcons
//               name={item.icon}
//               size={24}
//               color={item.color}
//             />

//             <Text
//               className="mt-2 text-center text-[10px] font-medium text-[#55505D]"
//               numberOfLines={1}
//             >
//               {item.title}
//             </Text>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// }

// /* =====================================================
//    SIDE MENU
// ===================================================== */

// function SideMenu({
//   visible,
//   onClose,
//   onPress,
// }) {
//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View className="flex-1 flex-row">
//         <Pressable
//           className="flex-1 bg-black/40"
//           onPress={onClose}
//         />

//         <View className="w-[82%] bg-white">
//           <SafeAreaView className="flex-1">
//             {/* Header */}
//             <View className="flex-row items-center justify-between border-b border-[#EEEAF2] px-5 py-5">
//               <Text className="text-[19px] font-bold text-[#33303A]">
//                 Edu Menu
//               </Text>

//               <View className="flex-row rounded-full bg-[#F2EEF7] p-1">
//                 <View className="rounded-full bg-[#8E7CC3] px-3 py-1">
//                   <Text className="text-[10px] font-semibold text-white">
//                     Eng
//                   </Text>
//                 </View>

//                 <Text className="px-3 py-1 text-[10px] text-[#77727F]">
//                   বাং
//                 </Text>
//               </View>
//             </View>

//             <ScrollView
//               showsVerticalScrollIndicator={false}
//             >
//               {/* AVA */}
//               <Pressable
//                 onPress={() =>
//                   onPress("AVA Assistant")
//                 }
//                 className="mx-4 mt-4 flex-row items-center rounded-2xl bg-[#F5F1FA] p-4"
//               >
//                 <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#8E7CC3]">
//                   <MaterialCommunityIcons
//                     name="robot"
//                     size={24}
//                     color="white"
//                   />
//                 </View>

//                 <View className="ml-3">
//                   <View className="flex-row items-center">
//                     <Text className="text-[14px] font-bold text-[#33303A]">
//                       AVA
//                     </Text>

//                     <Text className="ml-1 text-[8px] font-bold text-[#8E7CC3]">
//                       BETA
//                     </Text>
//                   </View>

//                   <Text className="mt-1 text-[10px] text-[#77727F]">
//                     Active virtual Assistant
//                   </Text>
//                 </View>
//               </Pressable>

//               {/* Items */}
//               <View className="mt-4 px-3">
//                 {menuItems.map((item) => (
//                   <Pressable
//                     key={item.title}
//                     onPress={() =>
//                       onPress(item.title)
//                     }
//                     className="mb-1 flex-row items-center rounded-xl px-3 py-3.5"
//                   >
//                     <Ionicons
//                       name={item.icon}
//                       size={21}
//                       color="#5E5965"
//                     />

//                     <Text className="ml-4 flex-1 text-[13px] text-[#403C46]">
//                       {item.title}
//                     </Text>

//                     {item.badge ? (
//                       <Badge value={item.badge} />
//                     ) : null}
//                   </Pressable>
//                 ))}

//                 {/* Switch Role */}
//                 <Pressable
//                   onPress={() =>
//                     onPress("Switch Role")
//                   }
//                   className="mt-2 flex-row items-center rounded-xl bg-[#F4F0FA] px-3 py-3.5"
//                 >
//                   <Ionicons
//                     name="swap-horizontal-outline"
//                     size={21}
//                     color="#8E7CC3"
//                   />

//                   <Text className="ml-4 flex-1 text-[13px] font-medium text-[#403C46]">
//                     Switch Role
//                   </Text>

//                   <View className="rounded-full bg-[#8E7CC3] px-2.5 py-1">
//                     <Text className="text-[9px] font-semibold text-white">
//                       Teacher
//                     </Text>
//                   </View>
//                 </Pressable>
//               </View>
//             </ScrollView>

//             <View className="items-center border-t border-[#EEEAF2] py-4">
//               <Text className="text-[10px] text-[#AAA4AF]">
//                 Version 7.0.0
//               </Text>
//             </View>
//           </SafeAreaView>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// /* =====================================================
//    MAIN SCREEN
// ===================================================== */

// export default function TeacherDashboard() {
//   const { logout } = useAuth();
//     const [menuVisible, setMenuVisible] =
//     useState(false);
//     const router = useRouter();
    

//   const [balanceVisible, setBalanceVisible] =
//     useState(false);


//   /* -----------------------------------------------
//      PUT YOUR REAL LOGOUT CODE HERE
//   ------------------------------------------------ */

//   const handleLogout = () => {
//     // Example:
//     //
//     // await AsyncStorage.removeItem("token");
//     // navigation.replace("Login");

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

//   /* -----------------------------------------------
//      OTHER ACTIONS
//   ------------------------------------------------ */

//   const handleAction = (action) => {
//     setMenuVisible(false);

//     Alert.alert(action);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#F8F7FA]">
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="#FFFFFF"
//       />

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <View className="border-b border-[#EAE7EF] bg-white">
//         <View className="flex-row items-center justify-between px-4 py-3">
//           {/* Profile */}
//           <View className="flex-1 flex-row items-center">
//             <Pressable
//               onPress={() =>
//                 handleAction("Profile")
//               }
//             >
//               <Image
//                 source={{
//                   uri:
//                     "https://api.dicebear.com/7.x/avataaars/svg?seed=Anisul&backgroundColor=8E7CC3",
//                 }}
//                 className="h-12 w-12 rounded-full bg-[#F0ECF7]"
//               />
//             </Pressable>

//             <View className="ml-3 flex-1">
//               <Text
//                 className="text-[16px] font-semibold text-[#222222]"
//                 numberOfLines={1}
//               >
//                 Prof. Anisul Islam
//               </Text>

//               <Text className="mt-0.5 text-[12px] text-[#77727F]">
//                 Teacher
//               </Text>

//               <Pressable
//                 onPress={() =>
//                   setBalanceVisible(
//                     (value) => !value
//                   )
//                 }
//                 className="mt-1 flex-row items-center self-start rounded-full bg-[#F3F0F8] px-2.5 py-1"
//               >
//                 <Ionicons
//                   name="wallet"
//                   size={13}
//                   color="#8E7CC3"
//                 />

//                 <Text className="ml-1 text-[10px] font-medium text-[#8E7CC3]">
//                   {balanceVisible
//                     ? "৳ 25,000"
//                     : "Tap for Balance"}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* Search + Menu */}
//           <View className="flex-row items-center">
//             <Pressable
//               onPress={() =>
//                 handleAction("Search")
//               }
//               className="mr-1 h-10 w-10 items-center justify-center"
//             >
//               <Ionicons
//                 name="search-outline"
//                 size={22}
//                 color="#55505D"
//               />
//             </Pressable>

//             <Pressable
//               onPress={() =>
//                 setMenuVisible(true)
//               }
//               className="relative h-10 w-10 items-center justify-center"
//             >
//               <Ionicons
//                 name="menu-outline"
//                 size={26}
//                 color="#55505D"
//               />

//               <View className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#8E7CC3]" />
//             </Pressable>
//           </View>
//         </View>
//       </View>

//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: 40,
//         }}
//       >
//         {/* Dashboard modules */}
//         <DashboardGrid
//           onPress={handleAction}
//         />

//         <View className="px-4">
//           {/* Summary */}
//           <SummaryCards />

//           {/* Attendance */}
//           <AttendanceChart />

//           {/* Recent tasks */}
//           <RecentTasks
//             onPress={handleAction}
//           />

//           {/* Quick features */}
//           <QuickFeatures
//             onPress={handleAction}
//           />

//           {/* =================================================
//               LOGOUT BUTTON
//           ================================================= */}

//           <TouchableOpacity
//             onPress={handleLogout}
//             className="mt-8 mb-5 items-center rounded-lg bg-red-500 px-8 py-3"
//           >
//             <Text className="font-bold text-white">
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* =================================================
//           SIDE MENU
//       ================================================= */}

//       <SideMenu
//         visible={menuVisible}
//         onClose={() =>
//           setMenuVisible(false)
//         }
//         onPress={handleAction}
//       />
//     </SafeAreaView>
//   );
// }