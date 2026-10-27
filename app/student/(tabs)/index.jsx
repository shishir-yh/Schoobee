import React, { useState } from "react";

import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";

import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";

import Header from "../../../Common_Components/Header/Header";
import StudentSideMenu from "../../../Student-components/StudentSideMenu/StudentSideMenu";

import SchoolBanner from "../../../Student-components/StudentSchoolBanner/StudentSchoolBanner";
//import Banner from "../../../Student-components/StudentSchoolBanner/StudentSchoolBanner"
// import AttendanceOverview from "../../../Student-components/AttendanceOverview/AttendanceOverview";
// import Overview from "../../../Student-components/Overview/Overview";
 import QuickAccess from "../../../Student-components/StudentQuickAccess/StudentQuickAccess";
// import RecentTasks from "../../../Student-components/RecentTasks/RecentTasks";
// import QuickFeatures from "../../../Student-components/QuickFeaturesLast/QuickFeaturesLast";

import BelowSpace from "../../../Common_Components/BelowSpace";

export default function StudentDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentUser, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuOpen = () => setMenuVisible(true);
  const handleMenuClose = () => setMenuVisible(false);

  const handleMenuNavigation = (title) => {
    if (title === "Dashboard") return router.replace("/student/(tabs)");
    if (title === "Attendance") return router.push("/student/attendance");
    if (title === "Results") return router.push("/student/results");
    if (title === "Homework") return router.push("/student/homework");
    //if (title === "Online Classes") return router.push("/student/online-class");
    if (title === "Routine") return router.push("/student/(tabs)/routine");
    if (title === "Notices") return router.push("/student/notices");
    //if (title === "Academic Calendar") return router.push("/student/academic-calendar");
    if (title === "Fees") return router.push("/student/fees");
    //if (title === "Exam Routine") return router.push("/student/exam-routine");
  };

  const handleLogout = () => {
    logout();      
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-white">

      <StatusBar
        barStyle="light-content"
        backgroundColor="#5B3E7F"
        translucent={false}
      />

     {/* <Header
  currentUser={currentUser}
  insets={insets}
  onMenuPress={handleMenuOpen}
  role="Student"
  headerImage="https://i.ibb.co.com/5gnw0MNC/image.png"
  overlayColor=""
  curveColor="#F3F4F6"
  avatarIconColor="#3B82F6"
/> */}

<Header
  currentUser={currentUser}
  insets={insets}
  onMenuPress={handleMenuOpen}
  role="Student"
  headerImage="https://i.ibb.co.com/XfcPxcJ5/image.png"
  //headerImage="https://i.ibb.co.com/rGsJFj3S/image.png"
  overlayColor="rgba(59, 23, 78, 0.45)"
  curveColor="#F3EBF6"
  avatarIconColor="#F59E0B"
/>



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
          paddingBottom: Math.max(20, insets.bottom + 80),
        }}
      >

        <SchoolBanner />
        <QuickAccess />
       
        {/* <SchoolBanner />
        <QuickAccess />
        <Banner />
        <Overview />
        <AttendanceOverview />
        <RecentTasks />
        <QuickFeatures />
        <BelowSpace /> */}

  

      </ScrollView>

      <StudentSideMenu
        visible={menuVisible}
        onClose={handleMenuClose}
        onNavigate={handleMenuNavigation}
        onLogout={handleLogout}
        insets={insets}
      />
    </View>
  );
}