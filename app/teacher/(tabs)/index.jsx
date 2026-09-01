import React, { useState } from "react";

import {
  View,
  ScrollView,
} from "react-native";

import {
  useRouter,
} from "expo-router";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useAuth } from "../../../context/AuthContext";

import Header from "../../../Common_Components/Header/Header";
import TeacherSideMenu from "../../../Teacher-components/TeacherSideMenu/TeacherSideMenu";

import Banner from "../../../Teacher-components/Banner/Banner";
import AttendanceOverview from "../../../Teacher-components/AttendanceOverview/AttendanceOverview";
import Overview from "../../../Teacher-components/Overview/Overview";
import QuickAccess from "../../../Teacher-components/QuickAccess/QuickAccess";
import RecentTasks from "../../../Teacher-components/RecentTasks/RecentTasks";
import QuickFeatures from "../../../Teacher-components/QuickFeaturesLast/QuickFeaturesLast";

import BelowSpace from "../../../Common_Components/BelowSpace";


// Teacher Dashboard
export default function TeacherDashboard() {

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    currentUser,
    logout,
  } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuOpen = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  // Side menu navigation
  const handleMenuNavigation = (title) => {

    if (title === "Dashboard") {
      router.replace("/teacher/(tabs)");
      return;
    }

    if (title === "Students") {
      router.push("/teacher/students");
      return;
    }

    if (title === "Attendance") {
      router.push("/teacher/attendance");
      return;
    }

    if (title === "Mark Entry") {
      router.push("/teacher/marks");
      return;
    }

    if (title === "Routine") {
      router.push("/teacher/(tabs)/routine");
      return;
    }

    if (title === "Notices") {
      router.push("/teacher/notices");
      return;
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <Header
        currentUser={currentUser}
        insets={insets}
        onMenuPress={handleMenuOpen}
        role="Teacher"
      />

      {/* Dashboard Content */}
      <ScrollView
        className="bg-white flex-1"
        style={{
          marginTop: -20,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 1,
          paddingBottom: Math.max(
            20,
            insets.bottom + 80
          ),
        }}
      >

        <QuickAccess />

        <Banner />

        <Overview />

        <AttendanceOverview />

        <RecentTasks />

        <QuickFeatures />

        <BelowSpace />

      </ScrollView>

      {/* Teacher Side Menu */}
      <TeacherSideMenu
        visible={menuVisible}
        onClose={handleMenuClose}
        onNavigate={handleMenuNavigation}
        onLogout={handleLogout}
        insets={insets}
      />

    </View>
  );
}




// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Animated,
//   Image,
//   Pressable,
//   Modal,
//   ImageBackground
// } from "react-native";

// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";


// import { useAuth } from "../../../context/AuthContext";
// import Banner from "../../../Teacher-components/Banner/Banner";
// import AttendanceOverview from "../../../Teacher-components/AttendanceOverview/AttendanceOverview";
// import Overview from "../../../Teacher-components/Overview/Overview";
// import QuickAccess from "../../../Teacher-components/QuickAccess/QuickAccess";
// import RecentTasks from "../../../Teacher-components/RecentTasks/RecentTasks";
// import QuickFeatures from "../../../Teacher-components/QuickFeaturesLast/QuickFeaturesLast";
// import BelowSpace from "../../../Common_Components/BelowSpace"
// import Header from "../../../Common_Components/Header/Header";
// import TeacherSideMenu from "../../../Teacher-components/TeacherSideMenu/TeacherSideMenu";



// export default function TeacherDashboard() {

//   const router = useRouter();

//   const insets = useSafeAreaInsets();

//   const {
//     currentUser,
//     logout,
//   } = useAuth();

//   const [menuVisible, setMenuVisible] =
//     useState(false);


//   const handleMenuOpen = () => {
//     setMenuVisible(true);
//   };


//   const handleMenuClose = () => {
//     setMenuVisible(false);
//   };


//   const handleMenuNavigation = (title) => {

//     if (title === "Dashboard") {
//       router.replace("/teacher/(tabs)");
//     }

//     if (title === "Students") {
//       router.push("/teacher/students");
//     }

//     if (title === "Attendance") {
//       router.push("/teacher/attendance");
//     }

//     if (title === "Mark Entry") {
//       router.push("/teacher/marks");
//     }

//     if (title === "Routine") {
//       router.push("/teacher/(tabs)/routine");
//     }

//     if (title === "Notices") {
//       router.push("/teacher/notices");
//     }

//   };


//   const handleLogout = () => {

//     logout();

//     router.replace("/");

//   };


//   return (
//     <View className="flex-1 bg-white">

//       {/* =========================
//           COMMON HEADER
//       ========================= */}

//       <Header
//         currentUser={currentUser}
//         insets={insets}
//         onMenuPress={handleMenuOpen}
//         role="Teacher"
//       />


//       {/* =========================
//           DASHBOARD
//       ========================= */}

//       <ScrollView
//         className="bg-white flex-1"
//         style={{
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//         }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: Math.max(
//             20,
//             insets.bottom + 80
//           ),
//         }}
//       >

//         <QuickAccess />

//         <Banner />

//         <Overview />

//         <AttendanceOverview />

//         <RecentTasks />

//         <QuickFeatures />

//         <BelowSpace />

//       </ScrollView>


//       {/* =========================
//           TEACHER SIDE MENU
//       ========================= */}

//       <TeacherSideMenu
//         visible={menuVisible}
//         onClose={handleMenuClose}
//         onNavigate={handleMenuNavigation}
//         onLogout={handleLogout}
//         insets={insets}
//       />

//     </View>
//   );
// }


// =========================
// Helper: time-based greeting
// =========================


// export default function TeacherDashboard() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();

//   const { currentUser, logout } = useAuth();

//   const [menuVisible, setMenuVisible] = useState(false);

//   // Notification state
//   // Later you can replace this with your real notification state
//   const hasUnreadNotifications = false;

//   // =========================
//   // Dashboard navigation
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
//   // Side menu items
//   // =========================

//   const menuItems = [
//     {
//       title: "Dashboard",
//       icon: "home-outline",
//     },
//     {
//       title: "Students",
//       icon: "people-outline",
//     },
//     {
//       title: "Attendance",
//       icon: "checkmark-circle-outline",
//     },
//     {
//       title: "Mark Entry",
//       icon: "create-outline",
//     },
//     {
//       title: "Routine",
//       icon: "calendar-outline",
//     },
//     {
//       title: "Notices",
//       icon: "notifications-outline",
//       badge: 3,
//     },
//     {
//       title: "Logout",
//       icon: "log-out-outline",
//     },
//   ];

//   // =========================
//   // Side menu navigation
//   // =========================

//   const handleMenuPress = (title) => {
//     handleMenuClose();

//     if (title === "Dashboard") {
//       setTimeout(() => {
//         router.replace("/teacher/(tabs)");
//       }, 220);
//     }

//     if (title === "Students") {
//       setTimeout(() => {
//         router.push("/teacher/students");
//       }, 220);
//     }

//     if (title === "Attendance") {
//       setTimeout(() => {
//         router.push("/teacher/attendance");
//       }, 220);
//     }

//     if (title === "Mark Entry") {
//       setTimeout(() => {
//         router.push("/teacher/marks");
//       }, 220);
//     }

//     if (title === "Routine") {
//       setTimeout(() => {
//         router.push("/teacher/(tabs)/routine");
//       }, 220);
//     }

//     if (title === "Notices") {
//       setTimeout(() => {
//         router.push("/teacher/notices");
//       }, 220);
//     }

//     if (title === "Logout") {
//       handleLogout();
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

//   // =========================
//   // Drawer animation
//   // =========================

//   const slideAnim = useRef(
//     new Animated.Value(350)
//   ).current;

//   const handleMenuOpen = () => {
//     slideAnim.setValue(350);

//     setMenuVisible(true);

//     requestAnimationFrame(() => {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 280,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const handleMenuClose = () => {
//     Animated.timing(slideAnim, {
//       toValue: 350,
//       duration: 220,
//       useNativeDriver: true,
//     }).start(({ finished }) => {
//       if (finished) {
//         setMenuVisible(false);
//       }
//     });
//   };

//   // const HeaderImage =
//   // "https://i.ibb.co.com/5WGFcCgf/image.png";

//   return (
//     <View className="flex-1 bg-white">



//       {/* =========================
//           HEADER
//       ========================= */}
//     <Header
//   currentUser={currentUser}
//   insets={insets}
//   onMenuPress={handleMenuOpen}
//   role="Teacher"
//    />


      

//       {/* =========================
//           SCROLLABLE CONTENT
//       ========================= */}

//       <ScrollView
//         className="bg-white flex-1"
//         style={{
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//         }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: Math.max(
//             20,
//             insets.bottom + 80
//           ),
//         }}
//       >

//         {/* =========================
//             QUICK ACCESS
//         ========================= */}
//         <QuickAccess/>

//         {/* =========================
//             BANNER
//         ========================= */}

//         <Banner />

//         {/* =========================
//             OVERVIEW
//         ========================= */}

//        <Overview />

//         {/* =========================
//             ATTENDANCE OVERVIEW
//         ========================= */}

//         <AttendanceOverview/>

//         {/* =========================
//            Recent Tasks
//         ========================= */}
//         <RecentTasks/>

//           {/* =========================
//           QuickFeaturesLast
//         ========================= */}
//         <QuickFeatures/>

//         <BelowSpace/>
        
        
     
//       </ScrollView>

//       {/* =========================
//           SIDE MENU
//       ========================= */}

//       <Modal
//         visible={menuVisible}
//         transparent={true}
//         animationType="none"
//         onRequestClose={handleMenuClose}
//         statusBarTranslucent={true}
//       >

//         <View className="flex-1 flex-row">

//           {/* Dark Overlay */}

//           <Pressable
//             className="flex-1"
//             onPress={handleMenuClose}
//             accessibilityRole="button"
//             accessibilityLabel="Close menu"
//           />

//           {/* Side Menu */}

//           <Animated.View
//             className="w-[80%] bg-white"
//             style={{
//               transform: [
//                 {
//                   translateX: slideAnim,
//                 },
//               ],

//               paddingTop: insets.top,
//               paddingBottom: insets.bottom,
//             }}
//           >

//             <SafeAreaView
//               edges={["left", "right"]}
//               className="flex-1"
//             >

//               {/* =========================
//                   MENU HEADER
//               ========================= */}

//               <View className="flex-row items-center justify-between border-b border-[#EEEAF2] px-5 mt-14">

//                 <Text className="text-[24px] font-bold text-[#33303A]">
//                   Edu Menu
//                 </Text>

//                 {/* Close Button */}

//                 <TouchableOpacity
//                   onPress={handleMenuClose}
//                   activeOpacity={0.7}
//                   accessibilityRole="button"
//                   accessibilityLabel="Close menu"
//                   className="w-9 h-9 rounded-full bg-[#F2EEF7] items-center justify-center"
//                 >

//                   <Ionicons
//                     name="close"
//                     size={21}
//                     color="#5E5965"
//                   />

//                 </TouchableOpacity>

//               </View>

//               {/* =========================
//                   MENU CONTENT
//               ========================= */}

//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{
//                   paddingBottom: 20,
//                 }}
//               >

//                 <View className="mt-6 px-3">

//                   {menuItems.map((item) => (

//                     <Pressable
//                       key={item.title}
//                       onPress={() =>
//                         handleMenuPress(item.title)
//                       }
//                       className="mb-1 flex-row items-center rounded-xl px-3 py-3.5"
//                     >

//                       {/* Icon */}

//                       <Ionicons
//                         name={item.icon}
//                         size={21}
//                         color="#5E5965"
//                       />

//                       {/* Title */}

//                       <Text className="ml-4 flex-1 text-[13px] text-[#403C46]">
//                         {item.title}
//                       </Text>

//                       {/* Badge */}

//                       {item.badge ? (
//                         <View className="min-w-5 h-5 px-1 rounded-full bg-red-500 items-center justify-center">

//                           <Text className="text-white text-[9px] font-bold">
//                             {item.badge}
//                           </Text>

//                         </View>
//                       ) : null}

//                     </Pressable>

//                   ))}

//                 </View>

//               </ScrollView>

//               {/* =========================
//                   VERSION
//               ========================= */}

//               <View className="items-center border-t border-[#EEEAF2] py-4">

//                 <Text className="text-[10px] text-[#AAA4AF]">
//                   Version 7.0.0
//                 </Text>

//               </View>

//             </SafeAreaView>

//           </Animated.View>

//         </View>

//       </Modal>

//     </View>
//   );
// }


// import React, { useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   Image,
//   Modal,
//   Pressable,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";

// import { useAuth } from "../../../context/AuthContext";
// import Banner from "../../../Teacher-components/Banner/Banner";

// import {
//   teacherDashboardItems,
//   teacherSummaryItems,
//   teacherAttendanceData,
// } from "../../../data/users";

// // ============================================================
// // Helper: Time-based greeting
// // ============================================================
// function getGreeting() {
//   const hour = new Date().getHours();

//   if (hour < 12) {
//     return "Good Morning";
//   }

//   if (hour < 17) {
//     return "Good Afternoon";
//   }

//   return "Good Evening";
// }

// // ============================================================
// // Side Menu Items
// // ============================================================
// const MENU_ITEMS = [
//   {
//     title: "Dashboard",
//     icon: "home-outline",
//   },
//   {
//     title: "Students",
//     icon: "people-outline",
//   },
//   {
//     title: "Attendance",
//     icon: "checkmark-circle-outline",
//   },
//   {
//     title: "Mark Entry",
//     icon: "create-outline",
//   },
//   {
//     title: "Routine",
//     icon: "calendar-outline",
//   },
//   {
//     title: "Notices",
//     icon: "notifications-outline",
//     badge: 3,
//   },
//   {
//     title: "Logout",
//     icon: "log-out-outline",
//   },
// ];

// // ============================================================
// // Dashboard Card Routes
// // ============================================================
// // সব route এক জায়গায় রাখলে future-এ maintain করা সহজ হয়।
// const DASHBOARD_ROUTES = {
//   Profile: "/teacher/profile",
//   "Online Class": "/teacher/online-class",
//   "Mark Entry": "/teacher/marks",
//   "Take Attend": "/teacher/attendance",
//   "Student List": "/teacher/students",
//   Routine: "/teacher/(tabs)/routine",
//   "My Attendance": "/teacher/my-attendance",
//   "Academic Cal": "/teacher/academic-calendar",
//   Notices: "/teacher/notices",
// };

// // ============================================================
// // Side Menu Routes
// // ============================================================
// const MENU_ROUTES = {
//   Dashboard: "/teacher/(tabs)",
//   Students: "/teacher/students",
//   Attendance: "/teacher/attendance",
//   "Mark Entry": "/teacher/marks",
//   Routine: "/teacher/(tabs)/routine",
//   Notices: "/teacher/notices",
// };

// // ============================================================
// // Main Teacher Dashboard
// // ============================================================
// export default function TeacherDashboard() {
//   const router = useRouter();

//   // ----------------------------------------------------------
//   // Safe area information
//   // এটি status bar / notch / bottom navigation area handle করে।
//   // ----------------------------------------------------------
//   const insets = useSafeAreaInsets();

//   const { currentUser, logout } = useAuth();

//   // ----------------------------------------------------------
//   // Drawer visibility
//   // ----------------------------------------------------------
//   const [menuVisible, setMenuVisible] = useState(false);

//   // ----------------------------------------------------------
//   // Drawer animation value
//   //
//   // 350 = screen-এর বাইরে
//   // 0   = screen-এর ভিতরে
//   // ----------------------------------------------------------
//   const slideAnim = useRef(new Animated.Value(350)).current;

//   // ----------------------------------------------------------
//   // Notification state
//   // পরে আপনার real notification state দিয়ে replace করবেন।
//   // ----------------------------------------------------------
//   const hasUnreadNotifications = false;

//   // ==========================================================
//   // Dashboard Card Navigation
//   // ==========================================================
//   const handleNavigation = (title) => {
//     const route = DASHBOARD_ROUTES[title];

//     if (route) {
//       router.push(route);
//     }
//   };

//   // ==========================================================
//   // Open Side Menu
//   // ==========================================================
//   const handleMenuOpen = () => {
//     // প্রতিবার menu open করার আগে animation শুরু হবে বাইরে থেকে।
//     slideAnim.setValue(350);

//     // প্রথমে modal render/mount করানো হচ্ছে।
//     setMenuVisible(true);

//     // Modal mount হওয়ার পর animation শুরু করছি।
//     requestAnimationFrame(() => {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 280,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   // ==========================================================
//   // Close Side Menu
//   // ==========================================================
//   const handleMenuClose = () => {
//     Animated.timing(slideAnim, {
//       toValue: 350,
//       duration: 220,
//       useNativeDriver: true,
//     }).start(({ finished }) => {
//       // Animation complete হওয়ার পর modal unmount হবে।
//       if (finished) {
//         setMenuVisible(false);
//       }
//     });
//   };

//   // ==========================================================
//   // Side Menu Navigation
//   // ==========================================================
//   const handleMenuPress = (title) => {
//     // Logout আলাদাভাবে handle করা হচ্ছে।
//     if (title === "Logout") {
//       handleLogout();
//       return;
//     }

//     // আগে drawer close করি।
//     handleMenuClose();

//     const route = MENU_ROUTES[title];

//     if (route) {
//       // Drawer close হওয়ার পর navigation করলে UI transition
//       // অনেক বেশি stable থাকে।
//       setTimeout(() => {
//         router.push(route);
//       }, 220);
//     }
//   };

//   // ==========================================================
//   // Logout
//   // ==========================================================
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

//   // ==========================================================
//   // UI
//   // ==========================================================
//   return (
//     <View className="flex-1 bg-white">

//       {/* ======================================================
//           MAIN STATUS BAR

//           Important:
//           এখানে translucent=false রাখা হয়েছে।

//           এর ফলে status bar-এর কারণে header-এর position
//           বারবার change হওয়ার chance কমে যায়।
//       ====================================================== */}
//      <StatusBar
//   style="light"
//   backgroundColor="#8E7CC3"
//   translucent={false}
//   hidden={true}
//   networkActivityIndicatorVisible={true}
// />

//       {/* ======================================================
//           HEADER

//           IMPORTANT:
//           Header ScrollView-এর বাইরে।

//           তাই dashboard scroll করলেও header নিজে move করবে না।
//       ====================================================== */}
//       <View
//         className="bg-[#8E7CC3] px-5 pb-16 relative"
//         style={{
//           // Status bar / notch-এর জন্য safe padding।
//           paddingTop: insets.top + 20,
//         }}
//       >

//         {/* Header Content */}
//         <View className="flex-row items-center justify-between">

//           {/* ==================================================
//               Profile + User Information
//           ================================================== */}
//           <View className="flex-row items-center flex-1 mr-3">

//             {/* Profile Picture */}
//             <View className="w-16 h-16 rounded-full bg-white items-center justify-center overflow-hidden">

//               {currentUser?.img ? (
//                 <Image
//                   source={{
//                     uri: currentUser.img,
//                   }}
//                   className="w-16 h-16"
//                   resizeMode="cover"
//                 />
//               ) : (
//                 <Ionicons
//                   name="person"
//                   size={32}
//                   color="#8E7CC3"
//                 />
//               )}

//             </View>

//             {/* User Information */}
//             <View className="ml-3 flex-1">

//               <Text className="text-white/80 text-sm">
//                 {getGreeting()} 👋
//               </Text>

//               <Text
//                 className="text-white text-2xl font-bold"
//                 numberOfLines={1}
//               >
//                 {currentUser?.name || "Teacher"}
//               </Text>

//               <Text className="text-white/80 text-xs mt-0.5">
//                 Teacher
//               </Text>

//             </View>
//           </View>

//           {/* ==================================================
//               Menu Button
//           ================================================== */}
//           <TouchableOpacity
//             onPress={handleMenuOpen}
//             activeOpacity={0.7}
//             accessibilityRole="button"
//             accessibilityLabel="Open menu"
//             className="w-11 h-11 rounded-full bg-white/15 items-center justify-center"
//           >
//             <Ionicons
//               name="menu-outline"
//               size={28}
//               color="white"
//             />
//           </TouchableOpacity>

//         </View>

//         {/* ==================================================
//             Bottom White Curve
//         ================================================== */}
//         <View
//           className="absolute bg-white left-0 right-0"
//           style={{
//             height: 28,
//             bottom: 0,

//             borderTopLeftRadius: 45,
//             borderTopRightRadius: 45,
//           }}
//         />

//       </View>

//       {/* ======================================================
//           DASHBOARD SCROLL AREA

//           IMPORTANT:
//           শুধু dashboard content এখানে থাকবে।

//           Modal এখানে থাকবে না।
//       ====================================================== */}
//       <ScrollView
//         className="bg-white flex-1"
//         style={{
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//         }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           // Bottom navigation / safe area-এর জন্য।
//           paddingBottom: Math.max(
//             20,
//             insets.bottom + 10
//           ),
//         }}
//       >

//         {/* ====================================================
//             QUICK ACCESS
//         ==================================================== */}
//         <View className="px-5 pt-6">

//           <Text className="text-xl font-bold text-gray-800 mb-4">
//             Quick Access
//           </Text>

//           <View className="flex-row flex-wrap justify-between">

//             {teacherDashboardItems.map((item) => (
//               <TouchableOpacity
//                 key={item.title}
//                 className="w-[31%] mb-5 items-center"
//                 onPress={() =>
//                   handleNavigation(item.title)
//                 }
//                 activeOpacity={0.7}
//                 accessibilityRole="button"
//                 accessibilityLabel={item.title}
//               >

//                 {/* Icon Container */}
//                 <View
//                   className="w-16 h-16 rounded-2xl items-center justify-center"
//                   style={{
//                     backgroundColor:
//                       `${item.color}20`,
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

//         {/* ====================================================
//             BANNER
//         ==================================================== */}
//         <View className="mt-1 mb-6 rounded-[20px]">
//           <Banner />
//         </View>

//         {/* ====================================================
//             OVERVIEW
//         ==================================================== */}
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

//                   {/* Summary Icon */}
//                   <View
//                     className="w-10 h-10 rounded-xl items-center justify-center"
//                     style={{
//                       backgroundColor:
//                         `${item.color}20`,
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

//         {/* ====================================================
//             ATTENDANCE OVERVIEW
//         ==================================================== */}
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

//                   {/* Bar */}
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

//       </ScrollView>

//       {/* ======================================================
//           SIDE MENU / DRAWER

//           ⭐⭐⭐ MOST IMPORTANT FIX ⭐⭐⭐

//           Modal এখন ScrollView-এর বাইরে।

//           আপনার আগের code-এ Modal ScrollView-এর ভিতরে ছিল।
//           ScrollView যখন re-measure/re-render করত তখন header,
//           profile picture অথবা অন্যান্য UI-এর position jump
//           করার possibility ছিল।

//           এখন Modal completely independent।
//       ====================================================== */}
//       <Modal
//         visible={menuVisible}
//         transparent={true}
//         animationType="none"
//         onRequestClose={handleMenuClose}
//         statusBarTranslucent={true}
//       >

//         <View className="flex-1 flex-row">

//           {/* ==================================================
//               DARK OVERLAY
//           ================================================== */}
//           <Pressable
//             className="flex-1 "
//             onPress={handleMenuClose}
//             accessibilityRole="button"
//             accessibilityLabel="Close menu"
//           />

//           {/* ==================================================
//               SIDE DRAWER
//           ================================================== */}
//           <Animated.View
//             className="w-[80%] bg-white"
//             style={{
//               transform: [
//                 {
//                   translateX: slideAnim,
//                 },
//               ],

//               // Drawer-এর ভিতরের content safe রাখার জন্য।
//               paddingTop: insets.top,
//               paddingBottom: insets.bottom,
//             }}
//           >

//             <SafeAreaView
//               edges={["left", "right"]}
//               className="flex-1"
//             >

//               {/* =================================================
//                   DRAWER HEADER
//               ================================================= */}
//               <View className="flex-row items-center justify-between border-b border-[#EEEAF2] px-5 mt-14">

//                 <Text className="text-[24px] font-bold text-[#33303A]">
//                   Edu Menu
//                 </Text>

//                 {/* Close Button */}
//                 <TouchableOpacity
//                   onPress={handleMenuClose}
//                   activeOpacity={0.7}
//                   accessibilityRole="button"
//                   accessibilityLabel="Close menu"
//                   className="w-9 h-9 rounded-full bg-[#F2EEF7] items-center justify-center"
//                 >

//                   <Ionicons
//                     name="close"
//                     size={21}
//                     color="#5E5965"
//                   />

//                 </TouchableOpacity>

//               </View>

//               {/* =================================================
//                   DRAWER CONTENT
//               ================================================= */}
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{
//                   paddingBottom: 20,
//                 }}
//               >

//           <View className="mt-6 px-3">

//                   {MENU_ITEMS.map((item) => (
//                     <Pressable
//                       key={item.title}
//                       onPress={() =>
//                         handleMenuPress(item.title)
//                       }
//                       className="mb-1 flex-row items-center rounded-xl px-3 py-3.5"
//                     >

//                       {/* Menu Icon */}
//                       <Ionicons
//                         name={item.icon}
//                         size={21}
//                         color="#5E5965"
//                       />

//                       {/* Menu Title */}
//                       <Text className="ml-4 flex-1 text-[13px] text-[#403C46]">
//                         {item.title}
//                       </Text>

//                       {/* Notification Badge */}
//                       {item.badge ? (
//                         <View className="min-w-5 h-5 px-1 rounded-full bg-red-500 items-center justify-center">

//                           <Text className="text-white text-[9px] font-bold">
//                             {item.badge}
//                           </Text>

//                         </View>
//                       ) : null}

//                     </Pressable>
//                   ))}

//                 </View>

//               </ScrollView>

//               {/* =================================================
//                   VERSION
//               ================================================= */}
//               <View className="items-center border-t border-[#EEEAF2] py-4">

//                 <Text className="text-[10px] text-[#AAA4AF]">
//                   Version 7.0.0
//                 </Text>

//               </View>

//             </SafeAreaView>

//           </Animated.View>

//         </View>

//       </Modal>

//     </View>

    
//   );
// }


// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Animated,
//   Image,
// } from "react-native";

// import{ useState,useRef } from 'react'
// import { StatusBar } from "expo-status-bar";

// import {
//   Pressable,
//   Modal,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useAuth } from "../../../context/AuthContext";
// import Banner from "../../../Teacher-components/Banner/Banner";
// import Overview from "../../../Teacher-components/Overview/Overview";

// import {
//   teacherDashboardItems,
//   teacherSummaryItems,
//   teacherAttendanceData,
// } from "../../../data/users";
// import Attendance from "../../../Teacher-components/Attendance/Attendance";

// // =========================
// // Helper: time-based greeting
// // =========================
// function getGreeting() {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good Morning";
//   if (hour < 17) return "Good Afternoon";
//   return "Good Evening";
// }

// export default function TeacherDashboard() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { currentUser, logout } = useAuth();
//   const [menuVisible, setMenuVisible] = useState(false);


//   // Set this from your real notification state/hook when you have one
//   const hasUnreadNotifications = false;

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


//   const menuItems = [
//   {
//     title: "Dashboard",
//     icon: "home-outline",
//   },
//   {
//     title: "Students",
//     icon: "people-outline",
//   },
//   {
//     title: "Attendance",
//     icon: "checkmark-circle-outline",
//   },
//   {
//     title: "Mark Entry",
//     icon: "create-outline",
//   },
//   {
//     title: "Routine",
//     icon: "calendar-outline",
//   },
//   {
//     title: "Notices",
//     icon: "notifications-outline",
//     badge: 3,
//   },
//   {
//     title: "Logout",
//     icon: "log-out-outline",
//   },
// ];

// const handleMenuPress = (title) => {
//   setMenuVisible(false);

//   if (title === "Dashboard") {
//     router.replace("/teacher/(tabs)");
//   }

//   if (title === "Students") {
//     router.push("/teacher/students");
//   }

//   if (title === "Attendance") {
//     router.push("/teacher/attendance");
//   }

//   if (title === "Mark Entry") {
//     router.push("/teacher/marks");
//   }

//   if (title === "Routine") {
//     router.push("/teacher/(tabs)/routine");
//   }

//   if (title === "Notices") {
//     router.push("/teacher/notices");
//   }

//   if (title === "Logout") {
//     handleLogout();
//   }
// };
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

//   const slideAnim = useRef(
//   new Animated.Value(350)
//  ).current;

//  const handleMenuOpen = () => {
//   setMenuVisible(true);

//   Animated.timing(slideAnim, {
//     toValue: 0,
//     duration: 400,
//     useNativeDriver: true,
//   }).start();
// };

// const handleMenuClose = () => {
//   Animated.timing(slideAnim, {
//     toValue: 350,
//     duration: 300,
//     useNativeDriver: true,
//   }).start(() => {
//     setMenuVisible(false);
//   });
// };

//   return (
//     // Root wrapper — header + scroll content are now SIBLINGS,
//     // not parent/child, which is what keeps the header fixed on screen.
//     <View className="flex-1 bg-white">
    
//     <StatusBar
//       style="light"
//       backgroundColor="#8E7CC3"
//       translucent={false}
//     />
// {/* =========================
//           HEADER (STATIC — lives outside ScrollView)
//       ========================= */}
//       <View
//         className="bg-[#8E7CC3] px-5 pb-16 relative"
//         style={{ paddingTop: insets.top + 20 }}
//       >
//         {/* Header Content */}
//         <View className="flex-row items-center justify-between">
// <View className="flex-row items-center flex-1 mr-3">
//   {/* Profile Picture */}
//   <View className="w-16 h-16 rounded-full bg-white items-center justify-center overflow-hidden">
//     {currentUser?.img ? (
//       <Image
//         source={{ uri: currentUser.img }}
//         className="w-16 h-16"
//         resizeMode="cover"
//       />
//     ) : (
//       <Ionicons
//         name="person"
//         size={32}
//         color="#8E7CC3"
//       />
//     )}
//   </View>

//   {/* User Info */}
//   <View className="ml-3 flex-1">
//     <Text className="text-white/80 text-sm">
//       {getGreeting()} 👋
//     </Text>

//     <Text
//       className="text-white text-2xl font-bold"
//       numberOfLines={1}
//     >
//       {currentUser?.name || "Teacher"}
//     </Text>

//     <Text className="text-white/80 text-xs mt-0.5">
//       Teacher
//     </Text>
//   </View>
// </View>
          
//           {/* Notification */}
//           {/* <TouchableOpacity
//             onPress={() => router.push("/teacher/(tabs)/inbox")}
//             activeOpacity={0.7}
//             hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
//             accessibilityRole="button"
//             accessibilityLabel="Notifications"
//             className="w-11 h-11 rounded-full bg-white/15 items-center justify-center"
//           >
//             <Ionicons
//               name="notifications-outline"
//               size={26}
//               color="white"
//             />

//             {hasUnreadNotifications && (
//               <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border border-[#8E7CC3]" />
//             )}
//           </TouchableOpacity> */}

//       {/* Side menu visible */}
//           <TouchableOpacity
//         onPress={handleMenuOpen}
//         activeOpacity={0.7}
//         className="w-11 h-11 rounded-full bg-white/15 items-center justify-center"
//       >
//         <Ionicons
//           name="menu-outline"
//           size={28}
//           color="white"
//         />
//       </TouchableOpacity>

//         </View>

//         {/* Bottom White Curve */}
//         <View
//           className="absolute bg-white left-0 right-0"
//           style={{
//             height: 28,
//             bottom: 0,
//             borderTopLeftRadius: 45,
//             borderTopRightRadius: 45,
//           }}
//         />
//       </View>
      
      

//       {/* =========================
//           SCROLLABLE WHITE CONTENT
//       ========================= */}
//       <ScrollView
//         className="bg-white flex-1"
//         style={{
//           borderTopLeftRadius: 40,
//           borderTopRightRadius: 40,
//         }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       >


//         {/* Side menu model */}


// <Modal
//   visible={menuVisible}
//   transparent
//   animationType="none"
//   onRequestClose={handleMenuClose}
//   statusBarTranslucent={true}
  
// >
//   <View className="flex-1 flex-row">


  

//     <StatusBar
//     style="dark"
//     backgroundColor="transparent"  
//     translucent={true}              
// />


//     {/* =========================
//         DARK OVERLAY
//     ========================= */}

//     <Pressable
//       className="flex-1"
//       onPress={handleMenuClose}
//     />

//     {/* =========================
//         SIDE MENU
//     ========================= */}

//     <Animated.View
//       className="w-[80%] bg-white"
//       style={{
//         transform: [
//           {
//             translateX: slideAnim,
//           },
//         ],
//       }}
//     >
      
//       <View className="flex-1">

//         {/* =========================
//             MENU HEADER
//         ========================= */}

//         <View className="flex-row items-center justify-between border-b border-[#EEEAF2] px-5 py-5">

//           <Text className="text-[19px] font-bold text-[#33303A]">
//             Edu Menu
//           </Text>

//           {/* Close Button */}
//           <TouchableOpacity
//             onPress={handleMenuClose}
//             className="w-9 h-9 rounded-full bg-[#F2EEF7] items-center justify-center"
//           >
//             <Ionicons
//               name="close"
//               size={21}
//               color="#5E5965"
//             />
//           </TouchableOpacity>

//         </View>

//         {/* =========================
//             MENU CONTENT
//         ========================= */}

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingBottom: 20,
//           }}
//         >

//           {/* =========================
//               MENU ITEMS
//           ========================= */}

//           <View className="mt-4 px-3">

//             {menuItems.map((item) => (
//               <Pressable
//                 key={item.title}
//                 onPress={() => handleMenuPress(item.title)}
//                 className="mb-1 flex-row items-center rounded-xl px-3 py-3.5"
//               >

//                 {/* Icon */}
//                 <Ionicons
//                   name={item.icon}
//                   size={21}
//                   color="#5E5965"
//                 />

//                 {/* Title */}
//                 <Text className="ml-4 flex-1 text-[13px] text-[#403C46]">
//                   {item.title}
//                 </Text>

//                 {/* Badge */}
//                 {item.badge ? (
//                   <View className="min-w-5 h-5 px-1 rounded-full bg-red-500 items-center justify-center">

//                     <Text className="text-white text-[9px] font-bold">
//                       {item.badge}
//                     </Text>

//                   </View>
//                 ) : null}

//               </Pressable>
//             ))}

           

          

//           </View>

//         </ScrollView>

//         {/* =========================
//             VERSION
//         ========================= */}

//         <View className="items-center border-t border-[#EEEAF2] py-4">

//           <Text className="text-[10px] text-[#AAA4AF]">
//             Version 7.0.0
//           </Text>

//         </View>

//       </View>
//     </Animated.View>

//   </View>
// </Modal>

        
        
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
//                 activeOpacity={0.7}
//                 accessibilityRole="button"
//                 accessibilityLabel={item.title}
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
//           <Banner />
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

//         {/* <View className="mt-1 mb-6 rounded-[20px] ">
//           <Overview />
//         </View> */}

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
        

       
//       </ScrollView>
//     </View>
//   );
// }






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
