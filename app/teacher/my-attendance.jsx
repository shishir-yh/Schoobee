import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Navbar from "../../Common_Components/CommonNavbar/Navbar";

/*
=========================================================
DATA — attendance history
=========================================================
*/

const attendanceRecords = [
  { id: "a1", date: "2026-09-16", status: "present", subject: "Computer Science", time: "09:00 AM" },
  { id: "a2", date: "2026-09-15", status: "present", subject: "Mathematics", time: "10:30 AM" },
  { id: "a3", date: "2026-09-14", status: "late",    subject: "Physics",       time: "11:15 AM" },
  { id: "a4", date: "2026-09-13", status: "present", subject: "Chemistry",     time: "09:00 AM" },
  { id: "a5", date: "2026-09-12", status: "absent",  subject: "English",       time: "—" },
  { id: "a6", date: "2026-09-11", status: "present", subject: "Computer Science", time: "09:00 AM" },
  { id: "a7", date: "2026-09-10", status: "present", subject: "Biology",       time: "10:00 AM" },
  { id: "a8", date: "2026-09-09", status: "late",    subject: "Mathematics",   time: "10:45 AM" },
];

/*
=========================================================
STATUS THEME — single source of truth
=========================================================
*/

const STATUS_THEME = {
  present: {
    label: "Present",
    bg: "bg-green-50",
    text: "text-green-600",
    badgeBg: "bg-green-100",
    icon: "checkmark-circle",
    iconColor: "#16A34A",
  },
  absent: {
    label: "Absent",
    bg: "bg-red-50",
    text: "text-red-600",
    badgeBg: "bg-red-100",
    icon: "close-circle",
    iconColor: "#DC2626",
  },
  late: {
    label: "Late",
    bg: "bg-amber-50",
    text: "text-amber-600",
    badgeBg: "bg-amber-100",
    icon: "time",
    iconColor: "#D97706",
  },
};

/*
=========================================================
HELPERS
=========================================================
*/

function formatDate(dateKey) {
  const date = new Date(dateKey + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatShortDate(dateKey) {
  const date = new Date(dateKey + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
}

/*
=========================================================
SCREEN
=========================================================
*/

export default function MyAttendance() {
  const router = useRouter();

  const [filter, setFilter] = useState("all"); // all | present | absent | late

  /*
  =========================================================
  SUMMARY COUNTS
  =========================================================
  */

  const counts = useMemo(() => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter((r) => r.status === "present").length;
    const absent = attendanceRecords.filter((r) => r.status === "absent").length;
    const late = attendanceRecords.filter((r) => r.status === "late").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, late, percentage };
  }, []);

  /*
  =========================================================
  FILTERED LIST
  =========================================================
  */

  const filteredRecords = useMemo(() => {
    if (filter === "all") return attendanceRecords;
    return attendanceRecords.filter((r) => r.status === filter);
  }, [filter]);

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50"
      edges={["bottom", "left", "right"]}
    >

      {/* =====================================================
          STATIC COMMON NAVBAR
          ===================================================== */}

      <Navbar
        title="My Attendance"
        onBack={() => router.back()}
        onMenu={() => console.log("Menu opened")}
      />

      {/* =====================================================
          SCROLLABLE CONTENT
          ===================================================== */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      >

        {/* ===================================================
            HEADER
            =================================================== */}

        <View className="mb-5">
          <Text className="text-2xl font-bold text-slate-900">
            My Attendance
          </Text>

          <Text className="mt-1 text-xs text-slate-500">
            Track your class attendance record
          </Text>
        </View>

        {/* ===================================================
            BIG PERCENTAGE CARD
            =================================================== */}
<View className="mb-5 overflow-hidden rounded-3xl bg-[#E8E3D8] p-5 shadow-sm">

  <View className="flex-row items-center justify-between">
    <View>
      <Text className="text-xs font-medium uppercase text-black/50">
        Overall Attendance
      </Text>

      <View className="mt-2 flex-row items-end">
        <Text className="text-4xl font-bold text-black">
          {counts.percentage}
        </Text>

        <Text className="mb-1 ml-1 text-lg font-semibold text-black/60">
          %
        </Text>
      </View>

      <Text className="mt-1 text-xs text-black/60">
        {counts.present} of {counts.total} classes attended
      </Text>
    </View>

    <View className="h-16 w-16 items-center justify-center rounded-full bg-black/10">
      <Ionicons name="stats-chart" size={28} color="#111111" />
    </View>
  </View>

  {/* Progress bar */}
  <View className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
    <View
      style={{ width: `${counts.percentage}%` }}
      className="h-full rounded-full bg-black"
    />
  </View>

</View>
       

        {/* ===================================================
            SUMMARY CARDS
            =================================================== */}

        <View className="mb-6 flex-row justify-between">

          <View className="w-[31%] rounded-2xl bg-white p-3 shadow-sm">
            <View className="mb-2 h-9 w-9 items-center justify-center rounded-full bg-green-50">
              <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
            </View>
            <Text className="text-xl font-bold text-slate-900">
              {counts.present}
            </Text>
            <Text className="mt-0.5 text-[11px] text-slate-500">Present</Text>
          </View>

          <View className="w-[31%] rounded-2xl bg-white p-3 shadow-sm">
            <View className="mb-2 h-9 w-9 items-center justify-center rounded-full bg-red-50">
              <Ionicons name="close-circle" size={20} color="#DC2626" />
            </View>
            <Text className="text-xl font-bold text-slate-900">
              {counts.absent}
            </Text>
            <Text className="mt-0.5 text-[11px] text-slate-500">Absent</Text>
          </View>

          <View className="w-[31%] rounded-2xl bg-white p-3 shadow-sm">
            <View className="mb-2 h-9 w-9 items-center justify-center rounded-full bg-amber-50">
              <Ionicons name="time" size={20} color="#D97706" />
            </View>
            <Text className="text-xl font-bold text-slate-900">
              {counts.late}
            </Text>
            <Text className="mt-0.5 text-[11px] text-slate-500">Late</Text>
          </View>

        </View>

        {/* ===================================================
            FILTER CHIPS
            =================================================== */}

        <View className="mb-4 flex-row">

          {["all", "present", "absent", "late"].map((key) => {
            const isActive = filter === key;
            const label =
              key === "all"
                ? "All"
                : STATUS_THEME[key].label;

            return (
              <Pressable
                key={key}
                onPress={() => setFilter(key)}
                className={`mr-2 rounded-full px-4 py-2 ${
                  isActive
                    ? "bg-slate-900"
                    : "border border-slate-200 bg-white"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isActive ? "text-white" : "text-slate-600"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}

        </View>

        {/* ===================================================
            RECORDS LIST
            =================================================== */}

        <View className="gap-3">

          {filteredRecords.map((record) => {
            const theme = STATUS_THEME[record.status];

            return (
              <View
                key={record.id}
                className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
              >

                {/* Date block */}
                <View className={`mr-3 h-14 w-14 items-center justify-center rounded-2xl ${theme.bg}`}>
                  <Text className={`text-base font-bold ${theme.text}`}>
                    {new Date(record.date + "T00:00:00").getDate()}
                  </Text>
                  <Text className={`text-[10px] font-semibold uppercase ${theme.text}`}>
                    {new Date(record.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
                  </Text>
                </View>

                {/* Info */}
                <View className="flex-1 pr-2">
                  <Text className="text-sm font-bold text-slate-900">
                    {record.subject}
                  </Text>

                  <Text className="mt-0.5 text-[11px] text-slate-400">
                    {formatDate(record.date)}
                  </Text>

                  {record.time !== "—" && (
                    <View className="mt-1 flex-row items-center">
                      <Ionicons name="time-outline" size={12} color="#94A3B8" />
                      <Text className="ml-1 text-[11px] text-slate-400">
                        {record.time}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Status badge */}
                <View className={`flex-row items-center rounded-full px-3 py-1.5 ${theme.badgeBg}`}>
                  <Ionicons name={theme.icon} size={14} color={theme.iconColor} />
                  <Text className={`ml-1 text-[11px] font-bold ${theme.text}`}>
                    {theme.label}
                  </Text>
                </View>

              </View>
            );
          })}

        </View>

        {/* ===================================================
            EMPTY STATE
            =================================================== */}

        {filteredRecords.length === 0 && (
          <View className="items-center rounded-2xl bg-white p-10 shadow-sm">
            <Ionicons name="calendar-outline" size={40} color="#c7c7c7" />

            <Text className="mt-3 text-center text-sm font-semibold text-slate-700">
              No records found
            </Text>

            <Text className="mt-1 text-center text-xs text-slate-400">
              Try a different filter
            </Text>
          </View>
        )}

      </ScrollView>

    </SafeAreaView>
  );
}