import React, { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import {
  CaretLeft,
  CaretRight,
  BookOpen,
  PencilSimpleLine,
  Sun,
  CalendarCheck,
} from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Navbar from "../../Common_Components/CommonNavbar/Navbar";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// JS Date.getDay(): Sun=0, Mon=1, ... Fri=5, Sat=6
const WEEKLY_HOLIDAY_WEEKDAY = 5; // Friday

// ---------------------------------------------------------------------------
// Single source of truth for how each event "type" looks.
// Add a new type here (color + icon) and every part of the UI — the day
// circles, the legend, and the event list — picks it up automatically.
// ---------------------------------------------------------------------------
const EVENT_THEME = {
  class: {
    label: "Class",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    dot: "bg-indigo-500",
    iconColor: "#4f46e5",
    Icon: BookOpen,
  },
  exam: {
    label: "Exam",
    bg: "bg-rose-50",
    text: "text-rose-600",
    dot: "bg-rose-500",
    iconColor: "#e11d48",
    Icon: PencilSimpleLine,
  },
  holiday: {
    label: "Holiday",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
    iconColor: "#d97706",
    Icon: Sun,
  },
};

const getTheme = (type) => EVENT_THEME[type];

// Replace this with your API/database data.
// One-off events only — the weekly Friday holiday is generated automatically
// below, so you don't need an entry for every Friday of the year.
const academicEvents = [
  {
    date: "2026-09-14",
    title: "Regular Class",
    subtitle: "Section A · Room 204",
    type: "class",
    status: "On track",
  },
  {
    date: "2026-09-22",
    title: "Mid Term Exam",
    subtitle: "Final Examination",
    type: "exam",
    status: "Scheduled",
  },
  {
    date: "2026-09-23",
    title: "Mid Term Exam",
    subtitle: "Final Examination",
    type: "exam",
    status: "Scheduled",
  },
  {
    date: "2026-10-01",
    title: "National Holiday",
    subtitle: "Campus Closed",
    type: "holiday",
    status: "Closed",
  },
];

function toDateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function formatLongDate(dateKey) {
  const date = new Date(dateKey + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Look up what's happening on a given date: an explicit event wins,
// otherwise every Friday automatically counts as the weekly holiday.
function getEventForDate(dateKey, eventsByDate) {
  if (eventsByDate[dateKey]) return eventsByDate[dateKey];

  const weekday = new Date(dateKey + "T00:00:00").getDay();
  if (weekday === WEEKLY_HOLIDAY_WEEKDAY) {
    return {
      date: dateKey,
      title: "Weekly Holiday",
      subtitle: "Every Friday",
      type: "holiday",
      status: "Closed",
      recurring: true,
    };
  }

  return null;
}

export default function AcademicCalendarScreen() {
  const router = useRouter();

  const today = new Date();
  const todayKey = toDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Calendar defaults to the current month of 2026.
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, today.getFullYear() === 2026 ? today.getMonth() : 0, 1)
  );

  // The date the user is picking a visit for — today, preselected.
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  // Fast lookup: date string -> explicit event.
  const eventsByDate = useMemo(() => {
    const map = {};
    academicEvents.forEach((event) => {
      map[event.date] = event;
    });
    return map;
  }, []);

  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstWeekday; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  }, [year, month]);

  const selectedEvent = getEventForDate(selectedDate, eventsByDate);

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["bottom", "left", "right"]}
    >

      {/* =====================================================
          STATIC COMMON NAVBAR — fixed at top
          ===================================================== */}

      <Navbar
        title="Academic Calendar"
        onBack={() => router.back()}
        onMenu={() => console.log("Menu opened")}
      />

      {/* =====================================================
          SCROLLABLE CONTENT
          ===================================================== */}

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-5">

          {/* Month navigator */}
          <View className="mb-5 flex-row items-center justify-between">
            <Pressable
              onPress={() => changeMonth(-1)}
              className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
              hitSlop={8}
            >
              <CaretLeft size={20} color="#374151" weight="bold" />
            </Pressable>

            <Text className="text-xl font-bold text-gray-900">
              {MONTH_NAMES[month]} {year}
            </Text>

            <Pressable
              onPress={() => changeMonth(1)}
              className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
              hitSlop={8}
            >
              <CaretRight size={20} color="#374151" weight="bold" />
            </Pressable>
          </View>

          {/* Calendar card */}
          <View className="rounded-3xl bg-white p-4 shadow-sm">

            {/* Legend */}
            <View className="mb-5 flex-row flex-wrap gap-x-4 gap-y-2">
              {Object.values(EVENT_THEME).map((theme) => (
                <View key={theme.label} className="flex-row items-center">
                  <View className={`mr-2 h-2.5 w-2.5 rounded-full ${theme.dot}`} />
                  <Text className="text-sm text-gray-500">{theme.label}</Text>
                </View>
              ))}
            </View>

            {/* Weekly schedule note */}
            <View className="mb-4 flex-row items-center rounded-xl bg-amber-50 px-3 py-2.5">
              <Sun size={16} weight="bold" color="#d97706" />
              <Text className="ml-2 text-xs font-medium text-amber-700">
                Weekly schedule — every Friday is a campus holiday
              </Text>
            </View>

            {/* Weekday header */}
            <View className="mb-2 flex-row">
              {WEEK_DAYS.map((day, i) => (
                <View key={day} className="flex-1 items-center py-1">
                  <Text
                    className={`text-xs font-semibold ${
                      i === WEEKLY_HOLIDAY_WEEKDAY
                        ? "text-amber-500"
                        : "text-gray-400"
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Day grid — tap a date to select it */}
            <View className="flex-row flex-wrap">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return (
                    <View key={`empty-${index}`} className="h-12 w-[14.28%]" />
                  );
                }

                const dateKey = toDateKey(year, month, day);
                const event = getEventForDate(dateKey, eventsByDate);
                const theme = event ? getTheme(event.type) : null;
                const isToday = dateKey === todayKey;
                const isSelected = dateKey === selectedDate;

                return (
                  <View key={dateKey} className="w-[14.28%] items-center py-1">
                    <Pressable
                      onPress={() => setSelectedDate(dateKey)}
                      className={`h-11 w-11 items-center justify-center rounded-full ${
                        theme ? theme.bg : "bg-transparent"
                      } ${isSelected ? "bg-gray-900" : ""} ${
                        isToday && !isSelected ? "border-2 border-gray-900" : ""
                      }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          isSelected
                            ? "text-white"
                            : theme
                            ? theme.text
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Selected date / visit picker summary */}
          <View className="mt-4 flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-gray-900">
              <CalendarCheck size={20} weight="bold" color="#ffffff" />
            </View>

            <View className="flex-1">
              <Text className="text-xs font-medium uppercase text-gray-400">
                Visit date
              </Text>

              <Text className="mt-0.5 text-base font-semibold text-gray-900">
                {formatLongDate(selectedDate)}
              </Text>

              {selectedEvent && (
                <Text
                  className={`mt-0.5 text-xs font-medium ${
                    getTheme(selectedEvent.type).text
                  }`}
                >
                  {selectedEvent.title} · {selectedEvent.status}
                </Text>
              )}
            </View>
          </View>

          {/* Events section */}
          <Text className="mb-3 mt-7 text-xl font-bold text-gray-900">
            Academic Events
          </Text>

          <View className="gap-3">
            {academicEvents.map((event) => {
              const theme = getTheme(event.type);
              const Icon = theme.Icon;

              return (
                <Pressable
                  key={event.date + event.title}
                  onPress={() => setSelectedDate(event.date)}
                  className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
                >
                  <View
                    className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${theme.bg}`}
                  >
                    <Icon size={20} weight="bold" color={theme.iconColor} />
                  </View>

                  <View className="flex-1 pr-2">
                    <Text className="text-base font-semibold text-gray-900">
                      {formatLongDate(event.date).replace(/^\w+,\s/, "")}
                    </Text>

                    <Text
                      className="mt-0.5 text-sm text-gray-500"
                      numberOfLines={1}
                    >
                      {event.subtitle || event.title}
                    </Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-sm font-bold text-gray-900">
                      {theme.label}
                    </Text>

                    {event.status && (
                      <Text
                        className={`mt-0.5 text-xs font-medium ${theme.text}`}
                      >
                        {event.status}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}


// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   Pressable,
// } from "react-native";
// import {
//   CaretLeft,
//   CaretRight,
//   BookOpen,
//   PencilSimpleLine,
//   Sun,
//   CalendarCheck,
// } from "phosphor-react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { useRouter } from "expo-router";

// import Navbar from "../../Common_Components/CommonNavbar/Navbar";

// const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// // JS Date.getDay(): Sun=0, Mon=1, ... Fri=5, Sat=6
// const WEEKLY_HOLIDAY_WEEKDAY = 5; // Friday

// // ---------------------------------------------------------------------------
// // Single source of truth for how each event "type" looks.
// // Add a new type here (color + icon) and every part of the UI — the day
// // circles, the legend, and the event list — picks it up automatically.
// // ---------------------------------------------------------------------------
// const EVENT_THEME = {
//   class: {
//     label: "Class",
//     bg: "bg-indigo-50",
//     text: "text-indigo-600",
//     dot: "bg-indigo-500",
//     iconColor: "#4f46e5",
//     Icon: BookOpen,
//   },
//   exam: {
//     label: "Exam",
//     bg: "bg-rose-50",
//     text: "text-rose-600",
//     dot: "bg-rose-500",
//     iconColor: "#e11d48",
//     Icon: PencilSimpleLine,
//   },
//   holiday: {
//     label: "Holiday",
//     bg: "bg-amber-50",
//     text: "text-amber-600",
//     dot: "bg-amber-500",
//     iconColor: "#d97706",
//     Icon: Sun,
//   },
// };

// const getTheme = (type) => EVENT_THEME[type];

// // Replace this with your API/database data.
// // One-off events only — the weekly Friday holiday is generated automatically
// // below, so you don't need an entry for every Friday of the year.
// const academicEvents = [
//   {
//     date: "2026-09-14",
//     title: "Regular Class",
//     subtitle: "Section A · Room 204",
//     type: "class",
//     status: "On track",
//   },
//   {
//     date: "2026-09-22",
//     title: "Mid Term Exam",
//     subtitle: "Final Examination",
//     type: "exam",
//     status: "Scheduled",
//   },
//   {
//     date: "2026-09-23",
//     title: "Mid Term Exam",
//     subtitle: "Final Examination",
//     type: "exam",
//     status: "Scheduled",
//   },
//   {
//     date: "2026-10-01",
//     title: "National Holiday",
//     subtitle: "Campus Closed",
//     type: "holiday",
//     status: "Closed",
//   },
// ];

// function toDateKey(year, month, day) {
//   const mm = String(month + 1).padStart(2, "0");
//   const dd = String(day).padStart(2, "0");
//   return `${year}-${mm}-${dd}`;
// }

// function formatLongDate(dateKey) {
//   const date = new Date(dateKey + "T00:00:00");
//   return date.toLocaleDateString("en-US", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// // Look up what's happening on a given date: an explicit event wins,
// // otherwise every Friday automatically counts as the weekly holiday.
// function getEventForDate(dateKey, eventsByDate) {
//   if (eventsByDate[dateKey]) return eventsByDate[dateKey];

//   const weekday = new Date(dateKey + "T00:00:00").getDay();
//   if (weekday === WEEKLY_HOLIDAY_WEEKDAY) {
//     return {
//       date: dateKey,
//       title: "Weekly Holiday",
//       subtitle: "Every Friday",
//       type: "holiday",
//       status: "Closed",
//       recurring: true,
//     };
//   }

//   return null;
// }

// export default function AcademicCalendarScreen() {

//   const router = useRouter(); 

//   const today = new Date();
//   const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

//   // Calendar defaults to the current month of 2026.
//   const [currentDate, setCurrentDate] = useState(
//     new Date(2026, today.getFullYear() === 2026 ? today.getMonth() : 0, 1)
//   );
//   // The date the user is picking a visit for — today, preselected.
//   const [selectedDate, setSelectedDate] = useState(todayKey);

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();

//   const changeMonth = (direction) => {
//     setCurrentDate(new Date(year, month + direction, 1));
//   };

//   // Fast lookup: date string -> explicit event.
//   const eventsByDate = useMemo(() => {
//     const map = {};
//     academicEvents.forEach((event) => {
//       map[event.date] = event;
//     });
//     return map;
//   }, []);

//   const calendarDays = useMemo(() => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstWeekday = new Date(year, month, 1).getDay();

//     const days = [];
//     for (let i = 0; i < firstWeekday; i++) days.push(null);
//     for (let day = 1; day <= daysInMonth; day++) days.push(day);
//     return days;
//   }, [year, month]);

//   const selectedEvent = getEventForDate(selectedDate, eventsByDate);

//   return (
//     <SafeAreaView
//       className="flex-1 bg-gray-50"
//       edges={["bottom", "left", "right"]}
//     >

//       {/* =====================================================
//           STATIC COMMON NAVBAR — fixed at top, outside ScrollView
//           ===================================================== */}

//       <Navbar
//         title="Academic Calendar"
//         onBack={() => router.back()}
//         onMenu={() => console.log("Menu opened")}
//       />

//       {/* =====================================================
//           SCROLLABLE CONTENT
//           ===================================================== */}

//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View className="px-4 pt-5">

//           {/* Month navigator */}
//           <View className="mb-5 flex-row items-center justify-between">
//             <Pressable
//               onPress={() => changeMonth(-1)}
//               className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
//               hitSlop={8}
//             >
//               <CaretLeft size={20} color="#374151" weight="bold" />
//             </Pressable>

//             <Text className="text-xl font-bold text-gray-900">
//               {MONTH_NAMES[month]} {year}
//             </Text>

//             <Pressable
//               onPress={() => changeMonth(1)}
//               className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
//               hitSlop={8}
//             >
//               <CaretRight size={20} color="#374151" weight="bold" />
//             </Pressable>
//           </View>

//           {/* Calendar card */}
//           <View className="rounded-3xl bg-white p-4 shadow-sm">

//             {/* Legend */}
//             <View className="mb-5 flex-row flex-wrap gap-x-4 gap-y-2">
//               {Object.values(EVENT_THEME).map((theme) => (
//                 <View key={theme.label} className="flex-row items-center">
//                   <View className={`mr-2 h-2.5 w-2.5 rounded-full ${theme.dot}`} />
//                   <Text className="text-sm text-gray-500">{theme.label}</Text>
//                 </View>
//               ))}
//             </View>

//             {/* Weekly schedule note */}
//             <View className="mb-4 flex-row items-center rounded-xl bg-amber-50 px-3 py-2.5">
//               <Sun size={16} weight="bold" color="#d97706" />
//               <Text className="ml-2 text-xs font-medium text-amber-700">
//                 Weekly schedule — every Friday is a campus holiday
//               </Text>
//             </View>

//             {/* Weekday header */}
//             <View className="mb-2 flex-row">
//               {WEEK_DAYS.map((day, i) => (
//                 <View key={day} className="flex-1 items-center py-1">
//                   <Text
//                     className={`text-xs font-semibold ${
//                       i === WEEKLY_HOLIDAY_WEEKDAY
//                         ? "text-amber-500"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {day}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* Day grid — tap a date to select it */}
//             <View className="flex-row flex-wrap">
//               {calendarDays.map((day, index) => {
//                 if (!day) {
//                   return (
//                     <View key={`empty-${index}`} className="h-12 w-[14.28%]" />
//                   );
//                 }

//                 const dateKey = toDateKey(year, month, day);
//                 const event = getEventForDate(dateKey, eventsByDate);
//                 const theme = event ? getTheme(event.type) : null;
//                 const isToday = dateKey === todayKey;
//                 const isSelected = dateKey === selectedDate;

//                 return (
//                   <View key={dateKey} className="w-[14.28%] items-center py-1">
//                     <Pressable
//                       onPress={() => setSelectedDate(dateKey)}
//                       className={`h-11 w-11 items-center justify-center rounded-full ${
//                         theme ? theme.bg : "bg-transparent"
//                       } ${isSelected ? "bg-gray-900" : ""} ${
//                         isToday && !isSelected ? "border-2 border-gray-900" : ""
//                       }`}
//                     >
//                       <Text
//                         className={`text-sm font-semibold ${
//                           isSelected
//                             ? "text-white"
//                             : theme
//                             ? theme.text
//                             : "text-gray-700"
//                         }`}
//                       >
//                         {day}
//                       </Text>
//                     </Pressable>
//                   </View>
//                 );
//               })}
//             </View>
//           </View>

//           {/* Selected date / visit picker summary */}
//           <View className="mt-4 flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
//             <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-gray-900">
//               <CalendarCheck size={20} weight="bold" color="#ffffff" />
//             </View>

//             <View className="flex-1">
//               <Text className="text-xs font-medium uppercase text-gray-400">
//                 Visit date
//               </Text>

//               <Text className="mt-0.5 text-base font-semibold text-gray-900">
//                 {formatLongDate(selectedDate)}
//               </Text>

//               {selectedEvent && (
//                 <Text
//                   className={`mt-0.5 text-xs font-medium ${
//                     getTheme(selectedEvent.type).text
//                   }`}
//                 >
//                   {selectedEvent.title} · {selectedEvent.status}
//                 </Text>
//               )}
//             </View>
//           </View>

//           {/* Events section */}
//           <Text className="mb-3 mt-7 text-xl font-bold text-gray-900">
//             Academic Events
//           </Text>

//           <View className="gap-3">
//             {academicEvents.map((event) => {
//               const theme = getTheme(event.type);
//               const Icon = theme.Icon;

//               return (
//                 <Pressable
//                   key={event.date + event.title}
//                   onPress={() => setSelectedDate(event.date)}
//                   className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
//                 >
//                   <View
//                     className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${theme.bg}`}
//                   >
//                     <Icon size={20} weight="bold" color={theme.iconColor} />
//                   </View>

//                   <View className="flex-1 pr-2">
//                     <Text className="text-base font-semibold text-gray-900">
//                       {formatLongDate(event.date).replace(/^\w+,\s/, "")}
//                     </Text>

//                     <Text
//                       className="mt-0.5 text-sm text-gray-500"
//                       numberOfLines={1}
//                     >
//                       {event.subtitle || event.title}
//                     </Text>
//                   </View>

//                   <View className="items-end">
//                     <Text className="text-sm font-bold text-gray-900">
//                       {theme.label}
//                     </Text>

//                     {event.status && (
//                       <Text
//                         className={`mt-0.5 text-xs font-medium ${theme.text}`}
//                       >
//                         {event.status}
//                       </Text>
//                     )}
//                   </View>
//                 </Pressable>
//               );
//             })}
//           </View>

//         </View>
//       </ScrollView>

//     </SafeAreaView>
//   );
// }


// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   Pressable,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import {
//   CaretLeft,
//   CaretRight,
//   BookOpen,
//   PencilSimpleLine,
//   Sun,
// } from "phosphor-react-native";

// import Navbar from "../../Common_Components/CommonNavbar/Navbar";

// const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// // ---------------------------------------------------------------------------
// // Single source of truth for how each event "type" looks.
// // Add a new type here (color + icon) and every part of the UI picks it up —
// // no need to touch the calendar grid or the list separately.
// // ---------------------------------------------------------------------------
// const EVENT_THEME = {
//   class: {
//     label: "Class",
//     bg: "bg-indigo-50",
//     text: "text-indigo-600",
//     dot: "bg-indigo-500",
//     Icon: BookOpen,
//   },
//   exam: {
//     label: "Exam",
//     bg: "bg-rose-50",
//     text: "text-rose-600",
//     dot: "bg-rose-500",
//     Icon: PencilSimpleLine,
//   },
//   holiday: {
//     label: "Holiday",
//     bg: "bg-amber-50",
//     text: "text-amber-600",
//     dot: "bg-amber-500",
//     Icon: Sun,
//   },
// };

// const DEFAULT_THEME = {
//   label: "Day",
//   bg: "bg-gray-50",
//   text: "text-gray-600",
//   dot: "bg-gray-300",
//   Icon: null,
// };

// const getTheme = (type) => EVENT_THEME[type] || DEFAULT_THEME;

// // Replace this with your API/database data.
// // `subtitle` and `status` are optional — the card still looks good without them.
// const academicEvents = [
//   {
//     date: "2024-11-01",
//     title: "Weekly Holiday",
//     subtitle: "Holy Weekend (Friday)",
//     type: "holiday",
//     status: "Closed",
//   },
//   {
//     date: "2024-11-05",
//     title: "Regular Class",
//     subtitle: "Section A · Room 204",
//     type: "class",
//     status: "On track",
//   },
//   {
//     date: "2024-11-12",
//     title: "Mid Term Exam",
//     subtitle: "Final Examination",
//     type: "exam",
//     status: "Scheduled",
//   },
//   {
//     date: "2024-11-20",
//     title: "Holiday",
//     subtitle: "Weekly Holiday",
//     type: "holiday",
//     status: "Closed",
//   },
//   {
//     date: "2024-11-25",
//     title: "Regular Class",
//     subtitle: "Section A · Room 204",
//     type: "class",
//     status: "On track",
//   },
// ];

// function toDateKey(year, month, day) {
//   const mm = String(month + 1).padStart(2, "0");
//   const dd = String(day).padStart(2, "0");
//   return `${year}-${mm}-${dd}`;
// }

// export default function AcademicCalendarScreen() {
//   const router = useRouter();

//   const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1));

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const today = new Date();

//   const changeMonth = (direction) => {
//     setCurrentDate(new Date(year, month + direction, 1));
//   };

//   // Fast lookup: date string -> event, built once per month/data change.
//   const eventsByDate = useMemo(() => {
//     const map = {};
//     academicEvents.forEach((event) => {
//       map[event.date] = event;
//     });
//     return map;
//   }, []);

//   const calendarDays = useMemo(() => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstWeekday = new Date(year, month, 1).getDay();

//     const days = [];
//     for (let i = 0; i < firstWeekday; i++) days.push(null);
//     for (let day = 1; day <= daysInMonth; day++) days.push(day);
//     return days;
//   }, [year, month]);

//   return (
//     <SafeAreaView
//       className="flex-1 bg-gray-50"
//       edges={["bottom", "left", "right"]}
//     >

//       {/* =====================================================
//           STATIC COMMON NAVBAR
//           ===================================================== */}

//       <Navbar
//         title="Academic Calendar"
//         onBack={() => router.back()}
//         onMenu={() => console.log("Menu opened")}
//       />

//       {/* =====================================================
//           SCROLLABLE CONTENT
//           ===================================================== */}

//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View className="px-4 pt-5">

//           {/* Month navigator */}
//           <View className="mb-5 flex-row items-center justify-between">
//             <Pressable
//               onPress={() => changeMonth(-1)}
//               className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
//               hitSlop={8}
//             >
//               <CaretLeft size={20} color="#374151" weight="bold" />
//             </Pressable>

//             <Text className="text-xl font-bold text-gray-900">
//               {MONTH_NAMES[month]} {year}
//             </Text>

//             <Pressable
//               onPress={() => changeMonth(1)}
//               className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
//               hitSlop={8}
//             >
//               <CaretRight size={20} color="#374151" weight="bold" />
//             </Pressable>
//           </View>

//           {/* Calendar card */}
//           <View className="rounded-3xl bg-white p-4 shadow-sm">

//             {/* Legend */}
//             <View className="mb-5 flex-row flex-wrap gap-x-4 gap-y-2">
//               {Object.values(EVENT_THEME).map((theme) => (
//                 <View key={theme.label} className="flex-row items-center">
//                   <View className={`mr-2 h-2.5 w-2.5 rounded-full ${theme.dot}`} />
//                   <Text className="text-sm text-gray-500">{theme.label}</Text>
//                 </View>
//               ))}
//             </View>

//             {/* Weekday header */}
//             <View className="mb-2 flex-row">
//               {WEEK_DAYS.map((day) => (
//                 <View key={day} className="flex-1 items-center py-1">
//                   <Text className="text-xs font-semibold text-gray-400">
//                     {day}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* Day grid */}
//             <View className="flex-row flex-wrap">
//               {calendarDays.map((day, index) => {
//                 if (!day) {
//                   return <View key={`empty-${index}`} className="h-12 w-[14.28%]" />;
//                 }

//                 const dateKey = toDateKey(year, month, day);
//                 const event = eventsByDate[dateKey];
//                 const theme = event ? getTheme(event.type) : null;
//                 const isToday =
//                   day === today.getDate() &&
//                   month === today.getMonth() &&
//                   year === today.getFullYear();

//                 return (
//                   <View key={dateKey} className="w-[14.28%] items-center py-1">
//                     <View
//                       className={`h-11 w-11 items-center justify-center rounded-full ${
//                         theme ? theme.bg : "bg-transparent"
//                       } ${isToday ? "border-2 border-gray-900" : ""}`}
//                     >
//                       <Text
//                         className={`text-sm font-semibold ${
//                           theme ? theme.text : "text-gray-700"
//                         }`}
//                       >
//                         {day}
//                       </Text>
//                     </View>
//                   </View>
//                 );
//               })}
//             </View>
//           </View>

//           {/* Events section */}
//           <Text className="mb-3 mt-7 text-xl font-bold text-gray-900">
//             Academic Events
//           </Text>

//           <View className="gap-3">
//             {academicEvents.map((event) => {
//               const theme = getTheme(event.type);
//               const Icon = theme.Icon;

//               return (
//                 <View
//                   key={event.date + event.title}
//                   className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
//                 >
//                   {/* Icon avatar */}
//                   <View
//                     className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${theme.bg}`}
//                   >
//                     {Icon && (
//                       <Icon
//                         size={20}
//                         weight="bold"
//                         color={themeIconColor(event.type)}
//                       />
//                     )}
//                   </View>

//                   {/* Title + date/subtitle */}
//                   <View className="flex-1 pr-2">
//                     <Text className="text-base font-semibold text-gray-900">
//                       {formatEventDate(event.date)}
//                     </Text>
//                     <Text className="mt-0.5 text-sm text-gray-500" numberOfLines={1}>
//                       {event.subtitle || event.title}
//                     </Text>
//                   </View>

//                   {/* Type + status */}
//                   <View className="items-end">
//                     <Text className="text-sm font-bold text-gray-900">
//                       {theme.label}
//                     </Text>
//                     {event.status && (
//                       <Text className={`mt-0.5 text-xs font-medium ${theme.text}`}>
//                         {event.status}
//                       </Text>
//                     )}
//                   </View>
//                 </View>
//               );
//             })}
//           </View>

//         </View>
//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// // Phosphor icons take a hex color prop, not a className, so we map it here
// // using the same palette as EVENT_THEME.
// function themeIconColor(type) {
//   switch (type) {
//     case "class":
//       return "#4f46e5"; // indigo-600
//     case "exam":
//       return "#e11d48"; // rose-600
//     case "holiday":
//       return "#d97706"; // amber-600
//     default:
//       return "#4b5563"; // gray-600
//   }
// }

// function formatEventDate(dateKey) {
//   const date = new Date(dateKey + "T00:00:00");
//   return date.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }


// import React, { useMemo, useState } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Pressable,
// } from "react-native";
// import { CaretLeft, CaretRight } from "phosphor-react-native";

// const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // Replace this with your API/database data
// const academicEvents = [
//   {
//     date: "2024-11-05",
//     title: "Regular Class",
//     type: "class",
//   },
//   {
//     date: "2024-11-12",
//     title: "Mid Term Exam",
//     type: "exam",
//   },
//   {
//     date: "2024-11-20",
//     title: "Holiday",
//     type: "holiday",
//   },
//   {
//     date: "2024-11-25",
//     title: "Regular Class",
//     type: "class",
//   },
// ];

// export default function AcademicCalendarScreen() {
//   const [currentDate, setCurrentDate] = useState(
//     new Date(2024, 10, 1)
//   );

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();

//   const changeAcadMonth = (direction) => {
//     setCurrentDate(
//       new Date(year, month + direction, 1)
//     );
//   };

//   const daysInMonth = new Date(
//     year,
//     month + 1,
//     0
//   ).getDate();

//   const firstDayOfMonth = new Date(
//     year,
//     month,
//     1
//   ).getDay();

//   const calendarDays = useMemo(() => {
//     const days = [];

//     // Empty cells before first day
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(null);
//     }

//     // Month days
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(day);
//     }

//     return days;
//   }, [year, month, daysInMonth, firstDayOfMonth]);

//   const getDateKey = (day) => {
//     const monthNumber = String(month + 1).padStart(2, "0");
//     const dayNumber = String(day).padStart(2, "0");

//     return `${year}-${monthNumber}-${dayNumber}`;
//   };

//   const getEvent = (day) => {
//     const dateKey = getDateKey(day);

//     return academicEvents.find(
//       (event) => event.date === dateKey
//     );
//   };

//   const getDayStyle = (event) => {
//     if (!event) {
//       return "bg-white";
//     }

//     if (event.type === "class") {
//       return "bg-blue-50";
//     }

//     if (event.type === "exam") {
//       return "bg-red-50";
//     }

//     if (event.type === "holiday") {
//       return "bg-green-50";
//     }

//     return "bg-white";
//   };

//   const getDotStyle = (event) => {
//     if (!event) return "";

//     if (event.type === "class") {
//       return "bg-blue-500";
//     }

//     if (event.type === "exam") {
//       return "bg-red-500";
//     }

//     if (event.type === "holiday") {
//       return "bg-green-500";
//     }

//     return "";
//   };

//   const getEventTextStyle = (type) => {
//     switch (type) {
//       case "class":
//         return "text-blue-600";

//       case "exam":
//         return "text-red-600";

//       case "holiday":
//         return "text-green-600";

//       default:
//         return "text-gray-700";
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{
//           paddingBottom: 40,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View className="px-4 pt-5">

//           {/* Calendar Container */}
//           <View className="w-full">

//             {/* Month Navigator */}
//             <View className="mb-5 flex-row items-center justify-between">
              
//               <Pressable
//                 onPress={() => changeAcadMonth(-1)}
//                 className="h-10 w-10 items-center justify-center rounded-full bg-white"
//               >
//                 <CaretLeft
//                   size={22}
//                   color="#374151"
//                   weight="bold"
//                 />
//               </Pressable>

//               <Text className="text-xl font-bold text-gray-900">
//                 {monthNames[month]} {year}
//               </Text>

//               <Pressable
//                 onPress={() => changeAcadMonth(1)}
//                 className="h-10 w-10 items-center justify-center rounded-full bg-white"
//               >
//                 <CaretRight
//                   size={22}
//                   color="#374151"
//                   weight="bold"
//                 />
//               </Pressable>

//             </View>

//             {/* Calendar Card */}
//             <View className="rounded-2xl bg-white p-4 shadow-sm">

//               {/* Legend */}
//               <View className="mb-5 flex-row flex-wrap items-center justify-between">

//                 {/* Class */}
//                 <View className="mb-2 flex-row items-center">
//                   <View className="mr-2 h-2.5 w-2.5 rounded-full bg-blue-500" />
//                   <Text className="text-sm text-gray-600">
//                     Class Day
//                   </Text>
//                 </View>

//                 {/* Exam */}
//                 <View className="mb-2 flex-row items-center">
//                   <View className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500" />
//                   <Text className="text-sm text-gray-600">
//                     Exam
//                   </Text>
//                 </View>

//                 {/* Holiday */}
//                 <View className="mb-2 flex-row items-center">
//                   <View className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500" />
//                   <Text className="text-sm text-gray-600">
//                     Holiday
//                   </Text>
//                 </View>

//               </View>

//               {/* Week Header */}
//               <View className="mb-2 flex-row">
//                 {weekDays.map((day) => (
//                   <View
//                     key={day}
//                     className="flex-1 items-center py-2"
//                   >
//                     <Text className="text-xs font-semibold text-gray-500">
//                       {day}
//                     </Text>
//                   </View>
//                 ))}
//               </View>

//               {/* Calendar Grid */}
//               <View className="flex-row flex-wrap">
//                 {calendarDays.map((day, index) => {
//                   const event = day
//                     ? getEvent(day)
//                     : null;

//                   return (
//                     <View
//                       key={index}
//                       className="w-[14.2857%] p-1"
//                     >
//                       {day ? (
//                         <View
//                           className={`h-12 items-center justify-center rounded-xl ${getDayStyle(
//                             event
//                           )}`}
//                         >
//                           <Text
//                             className={`text-sm font-semibold ${
//                               event
//                                 ? getEventTextStyle(
//                                     event.type
//                                   )
//                                 : "text-gray-700"
//                             }`}
//                           >
//                             {day}
//                           </Text>

//                           {event && (
//                             <View
//                               className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${getDotStyle(
//                                 event
//                               )}`}
//                             />
//                           )}
//                         </View>
//                       ) : (
//                         <View className="h-12" />
//                       )}
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>

//             {/* Academic Events Header */}
//             <View className="mb-3 mt-7">
//               <Text className="text-xl font-bold text-gray-900">
//                 Academic Events
//               </Text>
//             </View>

//             {/* Events List */}
//             <View className="gap-3">
//               {academicEvents.map((event, index) => (
//                 <View
//                   key={`${event.date}-${index}`}
//                   className="rounded-2xl bg-white p-4 shadow-sm"
//                 >
//                   <View className="flex-row items-center">

//                     {/* Event Dot */}
//                     <View
//                       className={`mr-3 h-3 w-3 rounded-full ${getDotStyle(
//                         event
//                       )}`}
//                     />

//                     {/* Event Information */}
//                     <View className="flex-1">
//                       <Text className="text-base font-semibold text-gray-900">
//                         {event.title}
//                       </Text>

//                       <Text
//                         className={`mt-1 text-sm ${getEventTextStyle(
//                           event.type
//                         )}`}
//                       >
//                         {event.date}
//                       </Text>
//                     </View>

//                     {/* Event Type */}
//                     <View className="rounded-full bg-gray-100 px-3 py-1">
//                       <Text className="text-xs font-medium capitalize text-gray-600">
//                         {event.type}
//                       </Text>
//                     </View>

//                   </View>
//                 </View>
//               ))}
//             </View>

//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }