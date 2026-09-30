import React, { useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated ,Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

/* ============================================================
   MOCK SUBJECT DATA
   Replace with a real API call keyed by classId (and probably
   session / examTermId too, since totals likely change per term):
   const subjects = await fetchSubjectsForClass(classId, session, examTermId)
   ============================================================ */

const SUBJECTS_BY_CLASS = {
  c1: [
    { id: "s101", code: "101", name: "Bangla", totalStudent: 35, type: "main" },
  { id: "s102", code: "102", name: "English", totalStudent: 35, type: "optional" },
  { id: "s103", code: "103", name: "Math", totalStudent: 25, type: "main" },
  { id: "s104", code: "104", name: "GK", totalStudent: 30, type: "optional" },
  { id: "s105", code: "105", name: "Science", totalStudent: 35, type: "main" },
  { id: "s106", code: "106", name: "ICT", totalStudent: 32, type: "main" },
  { id: "s107", code: "107", name: "Religion", totalStudent: 30, type: "optional" },
  { id: "s108", code: "108", name: "Social Science", totalStudent: 34, type: "main" },
  { id: "s109", code: "109", name: "Bangladesh & Global Studies", totalStudent: 35, type: "main" },
  { id: "s110", code: "110", name: "Physical Education", totalStudent: 28, type: "optional" },
  ],
};

function getSubjectsForClass(classId) {
  // fallback to demo data so the screen always renders something during dev
  return SUBJECTS_BY_CLASS[classId] || SUBJECTS_BY_CLASS.c1;
}

/* ============================================================
   SUMMARY CHIP  (shows the selected Class / Session / Term)
   ============================================================ */

function SummaryChip({ icon, label, value }) {
  return (
    <View className="flex-row items-center bg-[#F3F0FA] rounded-xl px-3 py-2 mb-2">
      <Ionicons name={icon} size={16} color="#6B5CA5" />
      <Text className="text-xs text-gray-400 ml-2 mr-1">{label}:</Text>
      <Text
        numberOfLines={1}
        className="text-xs text-[#4B3F82] font-bold flex-1"
      >
        {value}
      </Text>
    </View>
  );
}

/* ============================================================
   SUB TYPE BADGE  (main = solid, optional = outlined)
   Now rendered under the subject name, so it's small + compact
   ============================================================ */

function TypeBadge({ type }) {
  const isMain = type === "main";
  return (
    <View
      className={`self-start mt-1 px-2 py-0.5 rounded-full ${
        isMain ? "bg-[#8E7CC3]" : "bg-white border border-[#8E7CC3]"
      }`}
    >
      <Text
        className={`text-[8px] font-bold uppercase ${
          isMain ? "text-white" : "text-[#8E7CC3]"
        }`}
      >
        {type}
      </Text>
    </View>
  );
}

/* ============================================================
   MARK ENTRY BUTTON  (animated press — compact, sits at row end)
   ============================================================ */

function MarkEntryButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, friction: 6 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
        activeOpacity={0.85}
        className="bg-[#2A3063] rounded-md px-2.5 py-1.5"
      >
        <Text className="text-white text-[9px] font-bold">Mark Entry</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ============================================================
   SUBJECT TABLE
   Columns: SL | Subject (name + type badge underneath) | Total Student | Mark Entry
   Subject column is widest; Mark Entry sits last with a compact button.
   Same header/zebra-row treatment as ClassTable in index.jsx
   ============================================================ */

function SubjectTable({ data, onMarkEntry }) {
  const columns = [
    { key: "sl", label: "SL", flex: 0.4 },
    { key: "subject", label: "Subject", flex: 2.6 },
    { key: "total", label: "Total Student", flex: 1.1 },
    { key: "markEntry", label: "Mark Entry", flex: 1 },
  ];

  return (
    <View className="bg-white rounded-2xl overflow-hidden border border-gray-200">
      {/* HEADER */}
      <View className="flex-row bg-[#6B5CA5]">
        {columns.map((col, idx) => (
          <View
            key={col.key}
            style={{ flex: col.flex }}
            className={`py-3.5 px-2 justify-center ${
              idx !== columns.length - 1 ? "border-r border-[#7E6FB8]" : ""
            }`}
          >
            <Text className="text-white text-[8px] font-bold uppercase">{col.label}</Text>
          </View>
        ))}
      </View>

      {/* ROWS */}
      {data.map((row, index) => {
        const isEven = index % 2 === 0;
        const isLast = index === data.length - 1;
        const rowBg = isEven ? "bg-white" : "bg-[#F7F7FA]";

        return (
          <View
            key={row.id}
            className={`flex-row items-center ${rowBg} ${
              !isLast ? "border-b border-gray-100" : ""
            }`}
          >
            {/* SL */}
            <View
              style={{ flex: columns[0].flex }}
              className="py-3 px-2 justify-center border-r border-gray-100"
            >
              <Text className="text-xs text-gray-700">{index + 1}</Text>
            </View>

            {/* SUBJECT NAME + TYPE BADGE UNDERNEATH */}
            <View
              style={{ flex: columns[1].flex }}
              className="py-3 px-2 justify-center border-r border-gray-100"
            >
              <Text numberOfLines={1} className="text-xs text-gray-800 font-semibold">
                {row.name} ({row.code})
              </Text>
              <TypeBadge type={row.type} />
            </View>

            {/* TOTAL STUDENT */}
            <View
              style={{ flex: columns[2].flex }}
              className="py-3 px-2 justify-center border-r border-gray-100"
            >
              <Text className="text-xs text-gray-700">{row.totalStudent}</Text>
            </View>

            {/* MARK ENTRY (LAST, COMPACT BUTTON) */}
            <View
              style={{ flex: columns[3].flex }}
              className="py-2 px-2 justify-center items-center"
            >
              <MarkEntryButton onPress={() => onMarkEntry(row)} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* ============================================================
   MAIN SCREEN — app/teacher/marks/subjects.jsx
   Route: /teacher/marks/subjects
   Receives classId / className / session / examTermName from
   index.jsx's "Go" button.
   ============================================================ */

export default function SubjectMarkList() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { classId, className, session, examTermName } = params;

  const subjects = getSubjectsForClass(classId);

  const handleMarkEntry = (subject) => {
    router.push({
      pathname: "/teacher/marks/entry",
      params: {
        classId,
        subjectId: subject.id,
        subjectName: subject.name,
        totalStudent: subject.totalStudent,
        session,
        examTermName,
      },
    });
  };

// const handleMarkEntry = (subject) => {
//   Alert.alert(
//     "Success",
//     `Marks are successfully entered for ${subject.name}.`,
//     [
//       {
//         text: "OK",
//         style: "default",
//       },
//     ]
//   );
// };

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar
        title="Subject List"
        onBack={() => router.back()}
        onMenu={() => console.log("Menu opened")}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      >
        <Text className="text-2xl font-bold text-gray-800">Mark Entry</Text>
        <Text className="text-gray-500 mt-1 mb-4">
          Select a subject to enter marks
        </Text>

        {/* SELECTION SUMMARY */}
        <View className="bg-white rounded-2xl p-4 mb-5">
          <SummaryChip icon="school-outline" label="Class" value={className || classId || "N/A"} />
          <SummaryChip icon="calendar-outline" label="Session" value={session || "N/A"} />
          <SummaryChip icon="document-text-outline" label="Exam Term" value={examTermName || "N/A"} />
        </View>

        {/* SUBJECT TABLE */}
        <SubjectTable data={subjects} onMarkEntry={handleMarkEntry} />
      </ScrollView>
    </View>
  );
}
