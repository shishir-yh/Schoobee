// components/TeacherRoutine.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// কালার থিম কনস্ট্যান্ট
const COLORS = {
  brand: "#8E7CC3",
  brandLight: "rgba(142,124,195,0.1)",
  primary: "#2ecc71",
  danger: "#e74c3c",
  warning: "#f39c12",
  info: "#3498db",
};

// ডেটা ইমপোর্ট
import { routineData, DAYS, DAY_SHORT, getTodayName } from '../../data/Teacher_information/routineData';

// Navbar কম্পোনেন্ট
import Navbar from '../../Common_Components/CommonNavbar/Navbar';

const TeacherRoutine = () => {
  const router = useRouter();

  // ===== স্টেট =====
  const [selectedDay, setSelectedDay] = useState('');
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== আজকের ডে সেট করা =====
  useEffect(() => {
    const todayName = getTodayName();
    setSelectedDay(todayName);
    setRoutines(routineData[todayName] || []);
  }, []);

  // ===== ডে সিলেক্ট হ্যান্ডলার =====
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setRoutines(routineData[day] || []);
    
    // অ্যানিমেশন ইফেক্টের জন্য (অপশনাল)
    // আপনি এখানে হ্যাপটিক ফিডব্যাক বা অ্যানিমেশন দিতে পারেন
  };

  // ===== টোস্ট শো (আপনার টোস্ট সিস্টেম অনুযায়ী পরিবর্তন করুন) =====
  const showToast = (message) => {
    console.log('📢 Toast:', message);
    // এখানে আপনার Toast notification বসান
    // Toast.show({ type: 'info', text1: 'Info', text2: message });
  };

  // ===== ডে বাটন রেন্ডার =====
  const renderDayButtons = () => {
    return DAYS.map((day) => {
      const isActive = selectedDay === day;
      const shortName = DAY_SHORT[day] || day.slice(0, 3);

      return (
        <TouchableOpacity
          key={day}
          onPress={() => handleDaySelect(day)}
          activeOpacity={0.7}
          className={`px-4 py-2 rounded-full mx-1 mb-2 ${
            isActive ? 'bg-[#8E7CC3]' : 'bg-white border border-gray-200'
          }`}
          style={isActive ? {
            shadowColor: "#8E7CC3",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          } : {}}
        >
          <Text
            className={`font-semibold text-sm ${
              isActive ? 'text-white' : 'text-gray-600'
            }`}
          >
            {shortName}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  // ===== রুটিন আইটেম রেন্ডার =====
  const renderRoutineItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => showToast(`${item.title} Details`)}
        activeOpacity={0.7}
        className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
      >
        {/* Icon */}
        <View
          style={{ backgroundColor: item.bgColor }}
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
        >
          <Ionicons name={item.icon} size={22} color={item.iconColor} />
        </View>

        {/* Content */}
        <View className="flex-1 mr-2">
          <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="time-outline" size={13} color="#9ca3af" />
            <Text className="text-xs text-gray-500 ml-1">{item.time}</Text>
          </View>
        </View>

        {/* Right Side */}
        <View className="items-end">
          <Text className="text-sm font-medium text-gray-700">{item.room}</Text>
          <View
            style={{ backgroundColor: item.bgColor }}
            className="px-2 py-0.5 rounded-full mt-1"
          >
            <Text className="text-xs font-semibold" style={{ color: item.iconColor }}>
              {item.type}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ===== এম্পটি স্টেট =====
  const renderEmptyState = () => {
    return (
      <View className="items-center justify-center py-14 bg-white rounded-2xl border border-gray-100">
        <Ionicons name="calendar-outline" size={48} color="#c7c7c7" />
        <Text className="text-gray-400 mt-2 font-medium">No classes scheduled</Text>
        <Text className="text-gray-300 text-xs mt-1">for {selectedDay}</Text>
      </View>
    );
  };

  // ===== লোডিং স্টেট =====
  const renderLoading = () => {
    return (
      <View className="items-center justify-center py-14 bg-white rounded-2xl border border-gray-100">
        <Ionicons name="reload-outline" size={48} color="#8E7CC3" className="animate-spin" />
        <Text className="text-gray-400 mt-2 font-medium">Loading schedule...</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">

      {/* ===== NAVBAR ===== */}
      <Navbar
        title="My Routine"
        onBack={() => router.back()}
        onMenu={() => showToast('Menu opened')}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 }}
      >
        {/* ===== ডে সিলেক্টর ===== */}
        <View className="flex-row flex-wrap justify-center mb-3">
          {renderDayButtons()}
        </View>

        {/* ===== টাইটেল ও নোট ===== */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-800">
              {selectedDay}'s Schedule
            </Text>
            <View className="bg-[#8E7CC3]/10 px-2 py-1 rounded-full">
              <Text className="text-xs font-medium text-[#8E7CC3]">
                {routines.length} classes
              </Text>
            </View>
          </View>
          <Text className="text-sm text-gray-500 mt-0.5">
            7-day schedule including classes, staff meetings, and exam duties.
          </Text>
        </View>

        {/* ===== রুটিন লিস্ট ===== */}
        {loading ? (
          renderLoading()
        ) : routines.length > 0 ? (
          routines.map((item) => renderRoutineItem(item))
        ) : (
          renderEmptyState()
        )}

        {/* ===== ফুটার স্পেস ===== */}
        <View className="h-4" />
      </ScrollView>
    </View>
  );
};

export default TeacherRoutine;





// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// import Navbar from '../../Common_Components/CommonNavbar/Navbar';

// // ---------- ডামি ডেটা (পরে API থেকে আনবেন) ----------
// const routineData = {
//   Saturday: [
//     {
//       id: 1,
//       title: "Class 8 - Bangla 1st Paper",
//       time: "8:40 AM - 9:20 AM",
//       room: "Room 8A",
//       type: "Regular Class",
//       icon: "easel-outline",
//       iconColor: "#8E7CC3",
//       bgColor: "rgba(142,124,195,0.1)",
//     },
//     {
//       id: 2,
//       title: "Class 10 - Bangla Literature",
//       time: "10:10 AM - 10:50 AM",
//       room: "Room 10B",
//       type: "Regular Class",
//       icon: "easel-outline",
//       iconColor: "#8E7CC3",
//       bgColor: "rgba(142,124,195,0.1)",
//     },
//   ],
//   Sunday: [
//     {
//       id: 3,
//       title: "Class 7 - Bangla Grammar",
//       time: "9:15 AM - 9:55 AM",
//       room: "Room 7B",
//       type: "Regular Class",
//       icon: "book-outline",
//       iconColor: "#2ecc71",
//       bgColor: "rgba(46, 204, 113, 0.1)",
//     },
//     {
//       id: 4,
//       title: "Exam Guard Duty",
//       time: "11:00 AM - 1:00 PM",
//       room: "Exam Hall 2",
//       type: "Guard Duty",
//       icon: "shield-checkmark-outline",
//       iconColor: "#e74c3c",
//       bgColor: "rgba(231,76,60,0.1)",
//     },
//   ],
//   Monday: [
//     {
//       id: 5,
//       title: "Class 8 - Bangla 2nd Paper",
//       time: "9:15 AM - 9:55 AM",
//       room: "Room 8A",
//       type: "Regular Class",
//       icon: "easel-outline",
//       iconColor: "#8E7CC3",
//       bgColor: "rgba(142,124,195,0.1)",
//     },
//     {
//       id: 6,
//       title: "Class 9 - Bangla Composition",
//       time: "11:30 AM - 12:10 PM",
//       room: "Room 9A",
//       type: "Regular Class",
//       icon: "easel-outline",
//       iconColor: "#8E7CC3",
//       bgColor: "rgba(142,124,195,0.1)",
//     },
//   ],
//   Tuesday: [
//     {
//       id: 7,
//       title: "Class 6 - Bangla Literature",
//       time: "10:10 AM - 10:50 AM",
//       room: "Room 6A",
//       type: "Regular Class",
//       icon: "book-outline",
//       iconColor: "#f39c12",
//       bgColor: "rgba(243, 156, 18, 0.10)",
//     },
//     {
//       id: 8,
//       title: "Academic Council Meeting",
//       time: "1:00 PM - 2:00 PM",
//       room: "Conference Room",
//       type: "Staff Meeting",
//       icon: "people-outline",
//       iconColor: "#3498db",
//       bgColor: "rgba(52, 152, 219, 0.10)",
//     },
//   ],
//   Wednesday: [
//     {
//       id: 9,
//       title: "Class 8 - Bangla Grammar",
//       time: "10:10 AM - 10:50 AM",
//       room: "Room 8A",
//       type: "Regular Class",
//       icon: "easel-outline",
//       iconColor: "#8E7CC3",
//       bgColor: "rgba(142,124,195,0.1)",
//     },
//     {
//       id: 10,
//       title: "Exam Guard Duty",
//       time: "11:00 AM - 1:00 PM",
//       room: "Exam Hall 1",
//       type: "Guard Duty",
//       icon: "shield-checkmark-outline",
//       iconColor: "#e74c3c",
//       bgColor: "rgba(231,76,60,0.1)",
//     },
//   ],
//   Thursday: [
//     {
//       id: 11,
//       title: "General Staff Meeting",
//       time: "1:00 PM - 2:00 PM",
//       room: "Staff Room",
//       type: "All Faculty",
//       icon: "people-outline",
//       iconColor: "#3498db",
//       bgColor: "rgba(52, 152, 219, 0.10)",
//     },
//   ],
//   Friday: [
//     {
//       id: 12,
//       title: "Weekend (Friday)",
//       time: "Full Day",
//       room: "Holiday",
//       type: "Weekend",
//       icon: "sparkles-outline",
//       iconColor: "#2ecc71",
//       bgColor: "rgba(46, 204, 113, 0.1)",
//     },
//   ],
// };

// const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// const TeacherRoutine = () => {
//   const router = useRouter();

//   // স্টেট
//   const [selectedDay, setSelectedDay] = useState('');
//   const [routines, setRoutines] = useState([]);

//   // আজকের ডে সেট করা
//   useEffect(() => {
//     const today = new Date().getDay(); // 0 = Sunday, 1 = Monday...
//     const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const todayName = dayMap[today];
//     setSelectedDay(todayName);
//     setRoutines(routineData[todayName] || []);
//   }, []);

//   // ডে সিলেক্ট হ্যান্ডলার
//   const handleDaySelect = (day) => {
//     setSelectedDay(day);
//     setRoutines(routineData[day] || []);
//   };

//   // টোস্ট শো (আপনার টোস্ট সিস্টেম অনুযায়ী পরিবর্তন করুন)
//   const showToast = (message) => {
//     console.log('Toast:', message);
//     // এখানে আপনার Toast notification বসান
//     // Alert.alert('Info', message);
//   };

//   // ডে বাটন রেন্ডার
//   const renderDayButtons = () => {
//     return DAYS.map((day) => {
//       const isActive = selectedDay === day;
//       const shortName = day.slice(0, 3); // Sat, Sun, Mon...

//       return (
//         <TouchableOpacity
//           key={day}
//           onPress={() => handleDaySelect(day)}
//           activeOpacity={0.7}
//           className={`px-4 py-2 rounded-full mx-1 mb-2 ${
//             isActive ? 'bg-[#8E7CC3]' : 'bg-white border border-gray-200'
//           }`}
//           style={isActive ? {
//             shadowColor: "#8E7CC3",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4,
//             elevation: 3,
//           } : {}}
//         >
//           <Text
//             className={`font-semibold text-sm ${
//               isActive ? 'text-white' : 'text-gray-600'
//             }`}
//           >
//             {shortName}
//           </Text>
//         </TouchableOpacity>
//       );
//     });
//   };

//   // রুটিন আইটেম রেন্ডার
//   const renderRoutineItem = (item) => {
//     return (
//       <TouchableOpacity
//         key={item.id}
//         onPress={() => showToast(`${item.title} Details`)}
//         activeOpacity={0.7}
//         className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
//       >
//         {/* Icon */}
//         <View
//           style={{ backgroundColor: item.bgColor }}
//           className="w-12 h-12 rounded-full items-center justify-center mr-3"
//         >
//           <Ionicons name={item.icon} size={22} color={item.iconColor} />
//         </View>

//         {/* Content */}
//         <View className="flex-1 mr-2">
//           <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
//             {item.title}
//           </Text>
//           <View className="flex-row items-center mt-1">
//             <Ionicons name="time-outline" size={13} color="#9ca3af" />
//             <Text className="text-xs text-gray-500 ml-1">{item.time}</Text>
//           </View>
//         </View>

//         {/* Right Side */}
//         <View className="items-end">
//           <Text className="text-sm font-medium text-gray-700">{item.room}</Text>
//           <View
//             style={{ backgroundColor: item.bgColor }}
//             className="px-2 py-0.5 rounded-full mt-1"
//           >
//             <Text className="text-xs font-semibold" style={{ color: item.iconColor }}>
//               {item.type}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50">

//       {/* ===== NAVBAR ===== */}
//       <Navbar
//         title="My Routine"
//         onBack={() => router.back()}
//         onMenu={() => console.log("Routine menu pressed")}
//       />

//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
//       >
//         {/* ডে সিলেক্টর */}
//         <View className="flex-row flex-wrap justify-center mb-3">
//           {renderDayButtons()}
//         </View>

//         {/* টাইটেল ও নোট */}
//         <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
//           <Text className="text-lg font-bold text-gray-800">
//             {selectedDay}'s Schedule
//           </Text>
//           <Text className="text-sm text-gray-500 mt-0.5">
//             7-day schedule including classes, staff meetings, and exam duties.
//           </Text>
//         </View>

//         {/* রুটিন লিস্ট */}
//         {routines.length > 0 ? (
//           routines.map((item) => renderRoutineItem(item))
//         ) : (
//           <View className="items-center justify-center py-14 bg-white rounded-2xl border border-gray-100">
//             <Ionicons name="calendar-outline" size={48} color="#c7c7c7" />
//             <Text className="text-gray-400 mt-2 font-medium">No classes scheduled</Text>
//           </View>
//         )}

//         {/* নিচে স্পেস */}
//         <View className="h-20" />
//       </ScrollView>
//     </View>
//   );
// };

// export default TeacherRoutine;
