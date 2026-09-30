import React, { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

/* ============================================================
   STUDENT PHOTO (passport-size) — single shared PNG
   Swap this URL when real per-student photos are wired up.
   ============================================================ */
const STUDENT_PHOTO_URI = "https://i.ibb.co.com/tP8Sjspx/image.png";

/* ============================================================
   MARK BREAKDOWN  (Subjective/60 + Objective/20 + Viva/10 + Practical/10 = 100)
   Change here if your real breakdown differs.
   ============================================================ */
const MARK_FIELDS = [
  { key: "subjective", label: "Subjective", max: 60 },
  { key: "objective", label: "Objective", max: 20 },
  { key: "viva", label: "Viva", max: 10 },
  { key: "practical", label: "Practical", max: 10 },
];
const TOTAL_MAX = MARK_FIELDS.reduce((sum, f) => sum + f.max, 0); // 100

/* ============================================================
   GRADE SCALE — adjust to your school's actual scale
   ============================================================ */
function getGrade(total) {
  if (total >= 80) return { letter: "A+", gpa: "5.00" };
  if (total >= 70) return { letter: "A", gpa: "4.00" };
  if (total >= 60) return { letter: "A-", gpa: "3.50" };
  if (total >= 50) return { letter: "B", gpa: "3.00" };
  if (total >= 40) return { letter: "C", gpa: "2.00" };
  if (total >= 33) return { letter: "D", gpa: "1.00" };
  return { letter: "F", gpa: "0.00" };
}

/* ============================================================
   MOCK STUDENT DATA — 30 students by default
   Replace with: const students = await fetchStudents(classId, subjectId)
   ============================================================ */
const MOCK_NAMES = [
  "Rahim Uddin",
  "Karim Ahmed",
  "Fatema Begum",
  "Sabbir Hossain",
  "Nusrat Jahan",
  "Tanvir Islam",
  "Ayesha Siddika",
  "Mehedi Hasan",
  "Sumaiya Akter",
  "Arif Chowdhury",
  "Jannatul Ferdous",
  "Shakib Al Hasan",
  "Rumana Islam",
  "Imran Khan",
  "Tasnim Rahman",
  "Nayeem Ahmed",
  "Farzana Yasmin",
  "Rashed Mia",
  "Sharmin Sultana",
  "Hasan Mahmud",
  "Mim Akter",
  "Sajid Karim",
  "Tania Islam",
  "Fahim Rahman",
  "Lamia Sultana",
  "Rakib Hasan",
  "Nadia Akter",
  "Sohan Ahmed",
  "Priya Das",
  "Anik Roy",
  "Munia Islam",
  "Tahmid Hasan",
  "Sadia Afrin",
  "Jubayer Ahmed",
  "Rifat Hossain",
];

function buildMockStudents(totalStudent) {
  const count = Number(totalStudent) || 35;
  return Array.from({ length: count }, (_, i) => ({
    id: `stu_${i + 1}`,
    roll: i + 1,
    name: MOCK_NAMES[i] || `Student ${i + 1}`,
    status: "regular",
    subjective: "",
    objective: "",
    viva: "",
    practical: "",
    saved: false,
   photoUrl: STUDENT_PHOTO_URI, // shared PNG for now
  }));
}

   // function buildMockStudents(totalStudent) {
//   const count = Number(totalStudent) || 30;
//   return Array.from({ length: count }, (_, i) => ({
//     id: `stu_${i + 1}`,
//     roll: i + 1,
//     name: `Student ${i + 1}`,
//     photoUrl: STUDENT_PHOTO_URI, // shared PNG for now
//     status: "regular", // "regular" | "non-regular"
//     subjective: "",
//     objective: "",
//     viva: "",
//     practical: "",
//   }));
// }

/* ============================================================
   REGULAR / NON-REGULAR TOGGLE (compact)
   ============================================================ */
function StatusToggle({ value, onChange }) {
  const options = [
    { key: "regular", label: "Regular" },
    { key: "non-regular", label: "Non Regular" },
  ];

  return (
    <View className="flex-row gap-2">
      {options.map((opt) => {
        const selected = value === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            activeOpacity={0.85}
            onPress={() => onChange(opt.key)}
            className={`flex-1 py-1.5 rounded-lg items-center border ${
              selected ? "bg-[#8E7CC3] border-[#8E7CC3]" : "bg-white border-gray-300"
            }`}
          >
            <Text className={`text-xs font-bold ${selected ? "text-white" : "text-gray-600"}`}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ============================================================
   MARK INPUT ROW — bigger font, low padding for fast entry
   ============================================================ */
function MarkField({
  label,
  max,
  value,
  onChange,
  disabled,
  inputRef,
  returnKeyType,
  onSubmitEditing,
}) {
  const numeric = Number(value);
  const isInvalid = value !== "" && (Number.isNaN(numeric) || numeric > max);

  return (
    <View className="flex-row items-center justify-between mb-2">
      <Text className="text-base text-gray-700 font-semibold w-28">{label}</Text>
      <View className="flex-1 flex-row items-center">
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChange}
          editable={!disabled}
          keyboardType="numeric"
          maxLength={3}
          placeholder="0"
          placeholderTextColor="#C4BEDD"
          returnKeyType={returnKeyType}
          blurOnSubmit={returnKeyType === "done"}
          onSubmitEditing={onSubmitEditing}
          className={`flex-1 h-11 rounded-lg px-2 py-1 text-lg font-bold text-center ${
            disabled
              ? "bg-gray-100 text-gray-400 border border-gray-200"
              : isInvalid
              ? "bg-red-50 text-red-500 border border-red-400"
              : "bg-white text-[#2A3063] border border-gray-300"
          }`}
        />
        <Text className="text-sm text-gray-400 ml-2 w-12">/ {max}</Text>
      </View>
    </View>
  );
}

/* ============================================================
   READ-ONLY COMPUTED BOX  (Total mark / Total grade)
   ============================================================ */
function ComputedBox({ label, value, suffix }) {
  return (
    <View className="flex-row items-center justify-between mb-2">
      <Text className="text-base text-gray-700 font-semibold w-28">{label}</Text>
      <View className="flex-1 h-11 rounded-lg bg-[#E7E3F5] border border-[#8E7CC3] items-center justify-center">
        <Text className="text-base font-bold text-[#4B3F82]">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </Text>
      </View>
    </View>
  );
}

/* ============================================================
   STUDENT PHOTO — square passport-size box, right side of the card
   Uses the shared PNG; falls back to an icon if the URI is empty.
   ============================================================ */
function StudentPhoto({ uri }) {
  return (
    <View className="w-[72px] h-[72px] rounded-xl bg-[#F3F0FA] border border-[#8E7CC3] items-center justify-center overflow-hidden ml-3">
      {uri ? (
        <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <Ionicons name="person" size={34} color="#8E7CC3" />
      )}
    </View>
  );
}

/* ============================================================
   MAIN SCREEN — app/teacher/marks/entry.jsx
   Route: /teacher/marks/entry
   One student fills the whole screen, no scrolling. Previous /
   Save & Next page through all students. Non Regular students
   have marks locked — only Previous / Save & Next stay usable.
   ============================================================ */

export default function StudentMarkEntry() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { classId, className, subjectId, subjectName, totalStudent, session, examTermName } = params;

  const [studentsData, setStudentsData] = useState(() => buildMockStudents(totalStudent));
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef({}); // { subjective: TextInput, objective: TextInput, ... }

  const current = studentsData[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === studentsData.length - 1;
  const isNonRegular = current.status === "non-regular";

  const total = useMemo(
    () => MARK_FIELDS.reduce((sum, f) => sum + (Number(current[f.key]) || 0), 0),
    [current]
  );
  const grade = useMemo(() => getGrade(total), [total]);

  const updateCurrentField = (key, value) => {
    setStudentsData((prev) =>
      prev.map((s, i) => (i === currentIndex ? { ...s, [key]: value } : s))
    );
  };

  const handleMarkChange = (key, rawValue) => {
    const cleaned = rawValue.replace(/[^0-9]/g, "");
    updateCurrentField(key, cleaned);
  };

  const handlePrevious = () => {
    if (isFirst) {
      Alert.alert("First student", "This is already the first student.");
      return;
    }
    setCurrentIndex((i) => i - 1);
  };

  const handleSaveAndNext = () => {
    if (!isNonRegular) {
      const invalidField = MARK_FIELDS.find((f) => {
        const v = current[f.key];
        if (v === "") return true; // require every field filled before moving on
        const n = Number(v);
        return Number.isNaN(n) || n < 0 || n > f.max;
      });

      if (invalidField) {
        Alert.alert(
          "Incomplete or invalid marks",
          `Check "${invalidField.label}" for ${current.name} (Roll ${current.roll}).`
        );
        return;
      }
    }

    if (isLast) {
      Alert.alert(
        "All students done",
        `Marks saved for ${current.name}. This was the last student.`,
        [
          { text: "Back to Subjects", onPress: () => router.back() },
          { text: "Stay Here", style: "cancel" },
        ]
      );
      return;
    }

    // TODO: replace with real API call to persist current student's marks
    setCurrentIndex((i) => i + 1);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Navbar
        title={subjectName || "Mark Entry"}
        onBack={() => router.back()}
        onMenu={() => console.log("Menu opened")}
      />

      <View className="flex-1 justify-between px-4 pt-3 pb-4">
        {/* TOP: student card + marks card */}
        <View>
          <Text className="text-sm font-bold text-gray-500 mb-2">
            Student {currentIndex + 1} of {studentsData.length}
          </Text>

          {/* STUDENT INFO + PHOTO + STATUS */}
          <View className="bg-white rounded-2xl px-4 py-3 mb-3">
            <View className="flex-row items-start justify-between">
              {/* LEFT: all text info */}
              <View className="flex-1 pr-2">
                <Text className="text-[10px] text-gray-400">STUDENT NAME</Text>
                <Text className="text-lg font-bold text-gray-800 mb-1.5">{current.name}</Text>

                <Text className="text-xs text-gray-500">
                  Roll: <Text className="text-gray-800 font-semibold">{current.roll}</Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  Class:{" "}
                  <Text className="text-gray-800 font-semibold">{className || classId || "N/A"}</Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  Session: <Text className="text-gray-800 font-semibold">{session || "N/A"}</Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  Exam Term:{" "}
                  <Text className="text-gray-800 font-semibold">{examTermName || "N/A"}</Text>
                </Text>
              </View>

              {/* RIGHT: square passport-size photo */}
              <StudentPhoto uri={current.photoUrl} />
            </View>

            <View className="mt-3">
              <StatusToggle
                value={current.status}
                onChange={(status) => updateCurrentField("status", status)}
              />
            </View>

            {isNonRegular && (
              <View className="flex-row items-center bg-[#FFF4E5] border border-[#F5C177] rounded-lg px-2 py-1.5 mt-2">
                <Ionicons name="information-circle-outline" size={14} color="#B8752E" />
                <Text className="text-[11px] text-[#B8752E] ml-1.5 flex-1">
                  Non Regular — marks locked, use Previous / Save & Next.
                </Text>
              </View>
            )}
          </View>

          {/* MARKS ENTERED */}
          <View className="bg-white rounded-2xl px-4 py-3">
            <Text className="text-[10px] text-gray-400 mb-2">MARKS ENTERED</Text>

            {MARK_FIELDS.map((f, idx) => {
              const isLastField = idx === MARK_FIELDS.length - 1;
              return (
                <MarkField
                  key={f.key}
                  label={f.label}
                  max={f.max}
                  value={current[f.key]}
                  disabled={isNonRegular}
                  onChange={(v) => handleMarkChange(f.key, v)}
                  inputRef={(el) => (inputRefs.current[f.key] = el)}
                  returnKeyType={isLastField ? "done" : "next"}
                  onSubmitEditing={() => {
                    if (isLastField) {
                      Keyboard.dismiss();
                    } else {
                      inputRefs.current[MARK_FIELDS[idx + 1].key]?.focus();
                    }
                  }}
                />
              );
            })}

            <View className="h-px bg-gray-100 my-1" />

            {isNonRegular ? (
              <>
                <ComputedBox label="Total Mark" value="N/A" />
                <ComputedBox label="Total Grade" value="N/A" />
              </>
            ) : (
              <>
                <ComputedBox label="Total Mark" value={`${total}`} suffix={`/ ${TOTAL_MAX}`} />
                <ComputedBox label="Total Grade" value={grade.letter} suffix={`(${grade.gpa})`} />
              </>
            )}
          </View>
        </View>

        {/* BOTTOM ACTION AREA — Previous | Save & Next */}
        <View className="flex-row gap-3 mt-3">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={isFirst}
            className={`flex-1 flex-row items-center justify-center rounded-xl py-4 ${
              isFirst ? "bg-gray-200" : "bg-[#2A3063]"
            }`}
          >
            <Ionicons name="chevron-back" size={16} color={isFirst ? "#9CA3AF" : "#FFFFFF"} />
            <Text className={`font-bold ml-1 ${isFirst ? "text-gray-400" : "text-white"}`}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSaveAndNext}
            className="flex-[1.4] bg-[#8E7CC3] rounded-xl py-4 items-center"
          >
            <Text className="text-white font-bold">
              {isLast ? "Save & Finish" : "Save & Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// import React, { useState, useMemo, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Keyboard,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

// /* ============================================================
//    MARK BREAKDOWN  (Subjective/60 + Objective/20 + Viva/10 + Practical/10 = 100)
//    Change here if your real breakdown differs.
//    ============================================================ */
// const MARK_FIELDS = [
//   { key: "subjective", label: "Subjective", max: 60 },
//   { key: "objective", label: "Objective", max: 20 },
//   { key: "viva", label: "Viva", max: 10 },
//   { key: "practical", label: "Practical", max: 10 },
// ];
// const TOTAL_MAX = MARK_FIELDS.reduce((sum, f) => sum + f.max, 0); // 100

// /* ============================================================
//    GRADE SCALE — adjust to your school's actual scale
//    ============================================================ */
// function getGrade(total) {
//   if (total >= 80) return { letter: "A+", gpa: "5.00" };
//   if (total >= 70) return { letter: "A", gpa: "4.00" };
//   if (total >= 60) return { letter: "A-", gpa: "3.50" };
//   if (total >= 50) return { letter: "B", gpa: "3.00" };
//   if (total >= 40) return { letter: "C", gpa: "2.00" };
//   if (total >= 33) return { letter: "D", gpa: "1.00" };
//   return { letter: "F", gpa: "0.00" };
// }

// /* ============================================================
//    MOCK STUDENT DATA — 30 students by default
//    Replace with: const students = await fetchStudents(classId, subjectId)
//    ============================================================ */
// function buildMockStudents(totalStudent) {
//   const count = Number(totalStudent) || 30;
//   return Array.from({ length: count }, (_, i) => ({
//     id: `stu_${i + 1}`,
//     roll: i + 1,
//     name: `Student ${i + 1}`,
//     photoUrl: null, // TODO: plug in the real passport-size photo URL here
//     status: "regular", // "regular" | "non-regular"
//     subjective: "",
//     objective: "",
//     viva: "",
//     practical: "",
//   }));
// }

// /* ============================================================
//    REGULAR / NON-REGULAR TOGGLE (compact)
//    ============================================================ */
// function StatusToggle({ value, onChange }) {
//   const options = [
//     { key: "regular", label: "Regular" },
//     { key: "non-regular", label: "Non Regular" },
//   ];

//   return (
//     <View className="flex-row gap-2">
//       {options.map((opt) => {
//         const selected = value === opt.key;
//         return (
//           <TouchableOpacity
//             key={opt.key}
//             activeOpacity={0.85}
//             onPress={() => onChange(opt.key)}
//             className={`flex-1 py-1.5 rounded-lg items-center border ${
//               selected ? "bg-[#8E7CC3] border-[#8E7CC3]" : "bg-white border-gray-300"
//             }`}
//           >
//             <Text className={`text-xs font-bold ${selected ? "text-white" : "text-gray-600"}`}>
//               {opt.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// /* ============================================================
//    MARK INPUT ROW — bigger font, low padding for fast entry
//    ============================================================ */
// function MarkField({
//   label,
//   max,
//   value,
//   onChange,
//   disabled,
//   inputRef,
//   returnKeyType,
//   onSubmitEditing,
// }) {
//   const numeric = Number(value);
//   const isInvalid = value !== "" && (Number.isNaN(numeric) || numeric > max);

//   return (
//     <View className="flex-row items-center justify-between mb-2">
//       <Text className="text-base text-gray-700 font-semibold w-28">{label}</Text>
//       <View className="flex-1 flex-row items-center">
//         <TextInput
//           ref={inputRef}
//           value={value}
//           onChangeText={onChange}
//           editable={!disabled}
//           keyboardType="numeric"
//           maxLength={3}
//           placeholder="0"
//           placeholderTextColor="#C4BEDD"
//           returnKeyType={returnKeyType}
//           blurOnSubmit={returnKeyType === "done"}
//           onSubmitEditing={onSubmitEditing}
//           className={`flex-1 h-11 rounded-lg px-2 py-1 text-lg font-bold text-center ${
//             disabled
//               ? "bg-gray-100 text-gray-400 border border-gray-200"
//               : isInvalid
//               ? "bg-red-50 text-red-500 border border-red-400"
//               : "bg-white text-[#2A3063] border border-gray-300"
//           }`}
//         />
//         <Text className="text-sm text-gray-400 ml-2 w-12">/ {max}</Text>
//       </View>
//     </View>
//   );
// }

// /* ============================================================
//    READ-ONLY COMPUTED BOX  (Total mark / Total grade)
//    ============================================================ */
// function ComputedBox({ label, value, suffix }) {
//   return (
//     <View className="flex-row items-center justify-between mb-2">
//       <Text className="text-base text-gray-700 font-semibold w-28">{label}</Text>
//       <View className="flex-1 h-11 rounded-lg bg-[#E7E3F5] border border-[#8E7CC3] items-center justify-center">
//         <Text className="text-base font-bold text-[#4B3F82]">
//           {value}
//           {suffix ? ` ${suffix}` : ""}
//         </Text>
//       </View>
//     </View>
//   );
// }

// /* ============================================================
//    STUDENT PHOTO — square passport-size box, right side of the card
//    Shows the real photo once photoUrl is wired up; falls back to
//    a placeholder icon until then.
//    ============================================================ */
// function StudentPhoto({ uri }) {
//   return (
//     <View className="w-[72px] h-[72px] rounded-xl bg-[#F3F0FA] border border-[#8E7CC3] items-center justify-center overflow-hidden ml-3">
//       {uri ? (
//         <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
//       ) : (
//         <Ionicons name="person" size={34} color="#8E7CC3" />
//       )}
//     </View>
//   );
// }

// /* ============================================================
//    MAIN SCREEN — app/teacher/marks/entry.jsx
//    Route: /teacher/marks/entry
//    One student fills the whole screen, no scrolling. Previous /
//    Save & Next page through all students. Non Regular students
//    have marks locked — only Previous / Save & Next stay usable.
//    ============================================================ */

// export default function StudentMarkEntry() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { classId, className, subjectId, subjectName, totalStudent, session, examTermName } = params;

//   const [studentsData, setStudentsData] = useState(() => buildMockStudents(totalStudent));
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const inputRefs = useRef({}); // { subjective: TextInput, objective: TextInput, ... }

//   const current = studentsData[currentIndex];
//   const isFirst = currentIndex === 0;
//   const isLast = currentIndex === studentsData.length - 1;
//   const isNonRegular = current.status === "non-regular";

//   const total = useMemo(
//     () => MARK_FIELDS.reduce((sum, f) => sum + (Number(current[f.key]) || 0), 0),
//     [current]
//   );
//   const grade = useMemo(() => getGrade(total), [total]);

//   const updateCurrentField = (key, value) => {
//     setStudentsData((prev) =>
//       prev.map((s, i) => (i === currentIndex ? { ...s, [key]: value } : s))
//     );
//   };

//   const handleMarkChange = (key, rawValue) => {
//     const cleaned = rawValue.replace(/[^0-9]/g, "");
//     updateCurrentField(key, cleaned);
//   };

//   const handlePrevious = () => {
//     if (isFirst) {
//       Alert.alert("First student", "This is already the first student.");
//       return;
//     }
//     setCurrentIndex((i) => i - 1);
//   };

//   const handleSaveAndNext = () => {
//     if (!isNonRegular) {
//       const invalidField = MARK_FIELDS.find((f) => {
//         const v = current[f.key];
//         if (v === "") return true; // require every field filled before moving on
//         const n = Number(v);
//         return Number.isNaN(n) || n < 0 || n > f.max;
//       });

//       if (invalidField) {
//         Alert.alert(
//           "Incomplete or invalid marks",
//           `Check "${invalidField.label}" for ${current.name} (Roll ${current.roll}).`
//         );
//         return;
//       }
//     }

//     if (isLast) {
//       Alert.alert(
//         "All students done",
//         `Marks saved for ${current.name}. This was the last student.`,
//         [
//           { text: "Back to Subjects", onPress: () => router.back() },
//           { text: "Stay Here", style: "cancel" },
//         ]
//       );
//       return;
//     }

//     // TODO: replace with real API call to persist current student's marks
//     setCurrentIndex((i) => i + 1);
//   };

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-gray-50"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Navbar
//         title={subjectName || "Mark Entry"}
//         onBack={() => router.back()}
//         onMenu={() => console.log("Menu opened")}
//       />

//       <View className="flex-1 justify-between px-4 pt-3 pb-4">
//         {/* TOP: student card + marks card */}
//         <View>
//           <Text className="text-sm font-bold text-gray-500 mb-2">
//             Student {currentIndex + 1} of {studentsData.length}
//           </Text>

//           {/* STUDENT INFO + PHOTO + STATUS */}
//           <View className="bg-white rounded-2xl px-4 py-3 mb-3">
//             <View className="flex-row items-start justify-between">
//               {/* LEFT: all text info */}
//               <View className="flex-1 pr-2">
//                 <Text className="text-[10px] text-gray-400">STUDENT NAME</Text>
//                 <Text className="text-lg font-bold text-gray-800 mb-1.5">{current.name}</Text>

//                 <Text className="text-xs text-gray-500">
//                   Roll: <Text className="text-gray-800 font-semibold">{current.roll}</Text>
//                 </Text>
//                 <Text className="text-xs text-gray-500">
//                   Class:{" "}
//                   <Text className="text-gray-800 font-semibold">{className || classId || "N/A"}</Text>
//                 </Text>
//                 <Text className="text-xs text-gray-500">
//                   Session: <Text className="text-gray-800 font-semibold">{session || "N/A"}</Text>
//                 </Text>
//                 <Text className="text-xs text-gray-500">
//                   Exam Term:{" "}
//                   <Text className="text-gray-800 font-semibold">{examTermName || "N/A"}</Text>
//                 </Text>
//               </View>

//               {/* RIGHT: square passport-size photo */}
//               <StudentPhoto uri={current.photoUrl} />
//             </View>

//             <View className="mt-3">
//               <StatusToggle
//                 value={current.status}
//                 onChange={(status) => updateCurrentField("status", status)}
//               />
//             </View>

//             {isNonRegular && (
//               <View className="flex-row items-center bg-[#FFF4E5] border border-[#F5C177] rounded-lg px-2 py-1.5 mt-2">
//                 <Ionicons name="information-circle-outline" size={14} color="#B8752E" />
//                 <Text className="text-[11px] text-[#B8752E] ml-1.5 flex-1">
//                   Non Regular — marks locked, use Previous / Save & Next.
//                 </Text>
//               </View>
//             )}
//           </View>

//           {/* MARKS ENTERED */}
//           <View className="bg-white rounded-2xl px-4 py-3">
//             <Text className="text-[10px] text-gray-400 mb-2">MARKS ENTERED</Text>

//             {MARK_FIELDS.map((f, idx) => {
//               const isLastField = idx === MARK_FIELDS.length - 1;
//               return (
//                 <MarkField
//                   key={f.key}
//                   label={f.label}
//                   max={f.max}
//                   value={current[f.key]}
//                   disabled={isNonRegular}
//                   onChange={(v) => handleMarkChange(f.key, v)}
//                   inputRef={(el) => (inputRefs.current[f.key] = el)}
//                   returnKeyType={isLastField ? "done" : "next"}
//                   onSubmitEditing={() => {
//                     if (isLastField) {
//                       Keyboard.dismiss();
//                     } else {
//                       inputRefs.current[MARK_FIELDS[idx + 1].key]?.focus();
//                     }
//                   }}
//                 />
//               );
//             })}

//             <View className="h-px bg-gray-100 my-1" />

//             {isNonRegular ? (
//               <>
//                 <ComputedBox label="Total Mark" value="N/A" />
//                 <ComputedBox label="Total Grade" value="N/A" />
//               </>
//             ) : (
//               <>
//                 <ComputedBox label="Total Mark" value={`${total}`} suffix={`/ ${TOTAL_MAX}`} />
//                 <ComputedBox label="Total Grade" value={grade.letter} suffix={`(${grade.gpa})`} />
//               </>
//             )}
//           </View>
//         </View>

//         {/* BOTTOM ACTION AREA — Previous | Save & Next */}
//         <View className="flex-row gap-3 mt-3">
//           <TouchableOpacity
//             onPress={handlePrevious}
//             disabled={isFirst}
//             className={`flex-1 flex-row items-center justify-center rounded-xl py-4 ${
//               isFirst ? "bg-gray-200" : "bg-[#2A3063]"
//             }`}
//           >
//             <Ionicons name="chevron-back" size={16} color={isFirst ? "#9CA3AF" : "#FFFFFF"} />
//             <Text className={`font-bold ml-1 ${isFirst ? "text-gray-400" : "text-white"}`}>
//               Previous
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleSaveAndNext}
//             className="flex-[1.4] bg-[#8E7CC3] rounded-xl py-4 items-center"
//           >
//             <Text className="text-white font-bold">
//               {isLast ? "Save & Finish" : "Save & Next"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// import React, { useState, useMemo, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Keyboard,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

// /* ============================================================
//    MARK BREAKDOWN  (Subjective/60 + Objective/20 + Viva/10 + Practical/10 = 100)
//    Change here if your real breakdown differs.
//    ============================================================ */
// const MARK_FIELDS = [
//   { key: "subjective", label: "Subjective", max: 60 },
//   { key: "objective", label: "Objective", max: 20 },
//   { key: "viva", label: "Viva", max: 10 },
//   { key: "practical", label: "Practical", max: 10 },
// ];
// const TOTAL_MAX = MARK_FIELDS.reduce((sum, f) => sum + f.max, 0); // 100

// /* ============================================================
//    GRADE SCALE — adjust to your school's actual scale
//    ============================================================ */
// function getGrade(total) {
//   if (total >= 80) return { letter: "A+", gpa: "5.00" };
//   if (total >= 70) return { letter: "A", gpa: "4.00" };
//   if (total >= 60) return { letter: "A-", gpa: "3.50" };
//   if (total >= 50) return { letter: "B", gpa: "3.00" };
//   if (total >= 40) return { letter: "C", gpa: "2.00" };
//   if (total >= 33) return { letter: "D", gpa: "1.00" };
//   return { letter: "F", gpa: "0.00" };
// }

// /* ============================================================
//    MOCK STUDENT DATA — 30 students by default
//    Replace with: const students = await fetchStudents(classId, subjectId)
//    ============================================================ */
// function buildMockStudents(totalStudent) {
//   const count = Number(totalStudent) || 30;
//   return Array.from({ length: count }, (_, i) => ({
//     id: `stu_${i + 1}`,
//     roll: i + 1,
//     name: `Student ${i + 1}`,
//     status: "regular", // "regular" | "non-regular"
//     subjective: "",
//     objective: "",
//     viva: "",
//     practical: "",
//   }));
// }

// /* ============================================================
//    REGULAR / NON-REGULAR TOGGLE (compact)
//    ============================================================ */
// function StatusToggle({ value, onChange }) {
//   const options = [
//     { key: "regular", label: "Regular" },
//     { key: "non-regular", label: "Non Regular" },
//   ];

//   return (
//     <View className="flex-row gap-2">
//       {options.map((opt) => {
//         const selected = value === opt.key;
//         return (
//           <TouchableOpacity
//             key={opt.key}
//             activeOpacity={0.85}
//             onPress={() => onChange(opt.key)}
//             className={`flex-1 py-1.5 rounded-lg items-center border ${
//               selected ? "bg-[#8E7CC3] border-[#8E7CC3]" : "bg-white border-gray-300"
//             }`}
//           >
//             <Text className={`text-xs font-bold ${selected ? "text-white" : "text-gray-600"}`}>
//               {opt.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// /* ============================================================
//    MARK INPUT ROW — bigger font, low padding for fast entry
//    ============================================================ */
// function MarkField({
//   label,
//   max,
//   value,
//   onChange,
//   disabled,
//   inputRef,
//   returnKeyType,
//   onSubmitEditing,
// }) {
//   const numeric = Number(value);
//   const isInvalid = value !== "" && (Number.isNaN(numeric) || numeric > max);

//   return (
//     <View className="flex-row items-center justify-between mb-2">
//       <Text className="text-base text-gray-700 font-semibold w-28">{label}</Text>
//       <View className="flex-1 flex-row items-center">
//         <TextInput
//           ref={inputRef}
//           value={value}
//           onChangeText={onChange}
//           editable={!disabled}
//           keyboardType="numeric"
//           maxLength={3}
//           placeholder="0"
//           placeholderTextColor="#C4BEDD"
//           returnKeyType={returnKeyType}
//           blurOnSubmit={returnKeyType === "done"}
//           onSubmitEditing={onSubmitEditing}
//           className={`flex-1 h-11 rounded-lg px-2 py-1 text-lg font-bold text-center ${
//             disabled
//               ? "bg-gray-100 text-gray-400 border border-gray-200"
//               : isInvalid
//               ? "bg-red-50 text-red-500 border border-red-400"
//               : "bg-white text-[#2A3063] border border-gray-300"
//           }`}
//         />
//         <Text className="text-sm text-gray-400 ml-2 w-12">/ {max}</Text>
//       </View>
//     </View>
//   );
// }

// /* ============================================================
//    READ-ONLY COMPUTED BOX  (Total mark / Total grade)
//    ============================================================ */
// function ComputedBox({ label, value, suffix }) {
//   return (
//     <View className="flex-row items-center justify-between mb-2">
//       <Text className="text-base text-gray-700 font-semibold w-28">{label}</Text>
//       <View className="flex-1 h-11 rounded-lg bg-[#E7E3F5] border border-[#8E7CC3] items-center justify-center">
//         <Text className="text-base font-bold text-[#4B3F82]">
//           {value}
//           {suffix ? ` ${suffix}` : ""}
//         </Text>
//       </View>
//     </View>
//   );
// }

// /* ============================================================
//    MAIN SCREEN — app/teacher/marks/entry.jsx
//    Route: /teacher/marks/entry
//    One student fills the whole screen, no scrolling. Previous /
//    Save & Next page through all students. Non Regular students
//    have marks locked — only Previous / Save & Next stay usable.
//    ============================================================ */

// export default function StudentMarkEntry() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { classId, subjectId, subjectName, totalStudent, session, examTermName } = params;

//   const [studentsData, setStudentsData] = useState(() => buildMockStudents(totalStudent));
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const inputRefs = useRef({}); // { subjective: TextInput, objective: TextInput, ... }

//   const current = studentsData[currentIndex];
//   const isFirst = currentIndex === 0;
//   const isLast = currentIndex === studentsData.length - 1;
//   const isNonRegular = current.status === "non-regular";

//   const total = useMemo(
//     () => MARK_FIELDS.reduce((sum, f) => sum + (Number(current[f.key]) || 0), 0),
//     [current]
//   );
//   const grade = useMemo(() => getGrade(total), [total]);

//   const updateCurrentField = (key, value) => {
//     setStudentsData((prev) =>
//       prev.map((s, i) => (i === currentIndex ? { ...s, [key]: value } : s))
//     );
//   };

//   const handleMarkChange = (key, rawValue) => {
//     const cleaned = rawValue.replace(/[^0-9]/g, "");
//     updateCurrentField(key, cleaned);
//   };

//   const handlePrevious = () => {
//     if (isFirst) {
//       Alert.alert("First student", "This is already the first student.");
//       return;
//     }
//     setCurrentIndex((i) => i - 1);
//   };

//   const handleSaveAndNext = () => {
//     if (!isNonRegular) {
//       const invalidField = MARK_FIELDS.find((f) => {
//         const v = current[f.key];
//         if (v === "") return true; // require every field filled before moving on
//         const n = Number(v);
//         return Number.isNaN(n) || n < 0 || n > f.max;
//       });

//       if (invalidField) {
//         Alert.alert(
//           "Incomplete or invalid marks",
//           `Check "${invalidField.label}" for ${current.name} (Roll ${current.roll}).`
//         );
//         return;
//       }
//     }

//     if (isLast) {
//       Alert.alert(
//         "All students done",
//         `Marks saved for ${current.name}. This was the last student.`,
//         [
//           { text: "Back to Subjects", onPress: () => router.back() },
//           { text: "Stay Here", style: "cancel" },
//         ]
//       );
//       return;
//     }

//     // TODO: replace with real API call to persist current student's marks
//     setCurrentIndex((i) => i + 1);
//   };

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-gray-50"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Navbar
//         title={subjectName || "Mark Entry"}
//         onBack={() => router.back()}
//         onMenu={() => console.log("Menu opened")}
//       />

//       <View className="flex-1 justify-between px-4 pt-3 pb-4">
//         {/* TOP: student card + marks card */}
//         <View>
//           <Text className="text-sm font-bold text-gray-500 mb-2">
//             Student {currentIndex + 1} of {studentsData.length}
//           </Text>

//           {/* STUDENT INFO + SESSION/TERM + STATUS */}
//           <View className="bg-white rounded-2xl px-4 py-3 mb-3">
//             <Text className="text-[10px] text-gray-400">STUDENT NAME</Text>
//             <Text className="text-lg font-bold text-gray-800">{current.name}</Text>

//             <View className="flex-row items-center justify-between mt-1 mb-2">
//               <Text className="text-xs text-gray-500">
//                 Roll: <Text className="text-gray-800 font-semibold">{current.roll}</Text>
//               </Text>
//               <Text className="text-xs text-gray-500">
//                 Session: <Text className="text-gray-800 font-semibold">{session || "N/A"}</Text>
//               </Text>
//             </View>
//             <Text className="text-xs text-gray-500 mb-3">
//               Exam Term:{" "}
//               <Text className="text-gray-800 font-semibold">{examTermName || "N/A"}</Text>
//             </Text>

//             <StatusToggle
//               value={current.status}
//               onChange={(status) => updateCurrentField("status", status)}
//             />

//             {isNonRegular && (
//               <View className="flex-row items-center bg-[#FFF4E5] border border-[#F5C177] rounded-lg px-2 py-1.5 mt-2">
//                 <Ionicons name="information-circle-outline" size={14} color="#B8752E" />
//                 <Text className="text-[11px] text-[#B8752E] ml-1.5 flex-1">
//                   Non Regular — marks locked, use Previous / Save & Next.
//                 </Text>
//               </View>
//             )}
//           </View>

//           {/* MARKS ENTERED */}
//           <View className="bg-white rounded-2xl px-4 py-3">
//             <Text className="text-[10px] text-gray-400 mb-2">MARKS ENTERED</Text>

//             {MARK_FIELDS.map((f, idx) => {
//               const isLastField = idx === MARK_FIELDS.length - 1;
//               return (
//                 <MarkField
//                   key={f.key}
//                   label={f.label}
//                   max={f.max}
//                   value={current[f.key]}
//                   disabled={isNonRegular}
//                   onChange={(v) => handleMarkChange(f.key, v)}
//                   inputRef={(el) => (inputRefs.current[f.key] = el)}
//                   returnKeyType={isLastField ? "done" : "next"}
//                   onSubmitEditing={() => {
//                     if (isLastField) {
//                       Keyboard.dismiss();
//                     } else {
//                       inputRefs.current[MARK_FIELDS[idx + 1].key]?.focus();
//                     }
//                   }}
//                 />
//               );
//             })}

//             <View className="h-px bg-gray-100 my-1" />

//             {isNonRegular ? (
//               <>
//                 <ComputedBox label="Total Mark" value="N/A" />
//                 <ComputedBox label="Total Grade" value="N/A" />
//               </>
//             ) : (
//               <>
//                 <ComputedBox label="Total Mark" value={`${total}`} suffix={`/ ${TOTAL_MAX}`} />
//                 <ComputedBox label="Total Grade" value={grade.letter} suffix={`(${grade.gpa})`} />
//               </>
//             )}
//           </View>
//         </View>

//         {/* BOTTOM ACTION AREA — Previous | Save & Next */}
//         {/* BOTTOM ACTION AREA — Previous | Save & Next */}
//       <View className="flex-row gap-3 mt-1">
//         <TouchableOpacity
//           onPress={handlePrevious}
//           disabled={isFirst}
//           className={`flex-1 flex-row items-center justify-center rounded-xl py-4 ${
//             isFirst ? "bg-gray-200" : "bg-[#2A3063]"
//           }`}
//         >
//           <Ionicons name="chevron-back" size={16} color={isFirst ? "#9CA3AF" : "#FFFFFF"} />
//           <Text className={`font-bold ml-1 ${isFirst ? "text-gray-400" : "text-white"}`}>
//             Previous
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSaveAndNext}
//           className="flex-1 bg-[#8E7CC3] rounded-xl py-4 items-center justify-center"
//         >
//           <Text className="text-white font-bold">
//             {isLast ? "Save & Finish" : "Save & Next"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// import React, { useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

// /* ============================================================
//    MARK BREAKDOWN  (Subjective/60 + Objective/20 + Viva/10 + Practical/10 = 100)
//    Change here if your real breakdown differs.
//    ============================================================ */
// const MARK_FIELDS = [
//   { key: "subjective", label: "Subjective", max: 60 },
//   { key: "objective", label: "Objective", max: 20 },
//   { key: "viva", label: "Viva", max: 10 },
//   { key: "practical", label: "Practical", max: 10 },
// ];
// const TOTAL_MAX = MARK_FIELDS.reduce((sum, f) => sum + f.max, 0); // 100

// /* ============================================================
//    GRADE SCALE — adjust to your school's actual scale
//    ============================================================ */
// function getGrade(total) {
//   if (total >= 80) return { letter: "A+", gpa: "5.00" };
//   if (total >= 70) return { letter: "A", gpa: "4.00" };
//   if (total >= 60) return { letter: "A-", gpa: "3.50" };
//   if (total >= 50) return { letter: "B", gpa: "3.00" };
//   if (total >= 40) return { letter: "C", gpa: "2.00" };
//   if (total >= 33) return { letter: "D", gpa: "1.00" };
//   return { letter: "F", gpa: "0.00" };
// }

// /* ============================================================
//    MOCK STUDENT DATA
//    Replace with: const students = await fetchStudents(classId, subjectId)
//    ============================================================ */
// const MOCK_NAMES = [
//   "Rahim Uddin",
//   "Karim Ahmed",
//   "Fatema Begum",
//   "Sabbir Hossain",
//   "Nusrat Jahan",
//   "Tanvir Islam",
//   "Ayesha Siddika",
//   "Mehedi Hasan",
//   "Sumaiya Akter",
//   "Arif Chowdhury",
//   "Jannatul Ferdous",
//   "Shakib Al Hasan",
//   "Rumana Islam",
//   "Imran Khan",
//   "Tasnim Rahman",
//   "Nayeem Ahmed",
//   "Farzana Yasmin",
//   "Rashed Mia",
//   "Sharmin Sultana",
//   "Hasan Mahmud",
//   "Mim Akter",
//   "Sajid Karim",
//   "Tania Islam",
//   "Fahim Rahman",
//   "Lamia Sultana",
//   "Rakib Hasan",
//   "Nadia Akter",
//   "Sohan Ahmed",
//   "Priya Das",
//   "Anik Roy",
//   "Munia Islam",
//   "Tahmid Hasan",
//   "Sadia Afrin",
//   "Jubayer Ahmed",
//   "Rifat Hossain",
// ];

// function buildMockStudents(totalStudent) {
//   const count = Number(totalStudent) || 35;
//   return Array.from({ length: count }, (_, i) => ({
//     id: `stu_${i + 1}`,
//     roll: i + 1,
//     name: MOCK_NAMES[i] || `Student ${i + 1}`,
//     status: "regular",
//     subjective: "",
//     objective: "",
//     viva: "",
//     practical: "",
//     saved: false,
//   }));
// }

// /* ============================================================
//    REGULAR / NON-REGULAR TOGGLE  (compact)
//    ============================================================ */
// function StatusToggle({ value, onChange, disabled }) {
//   const options = [
//     { key: "regular", label: "Regular" },
//     { key: "non-regular", label: "Non Regular" },
//   ];

//   return (
//     <View className="flex-row gap-2">
//       {options.map((opt) => {
//         const selected = value === opt.key;
//         return (
//           <TouchableOpacity
//             key={opt.key}
//             disabled={disabled}
//             activeOpacity={0.85}
//             onPress={() => onChange(opt.key)}
//             className={`flex-1 py-1.5 rounded-lg items-center border ${
//               selected ? "bg-[#8E7CC3] border-[#8E7CC3]" : "bg-white border-gray-300"
//             } ${disabled ? "opacity-50" : ""}`}
//           >
//             <Text
//               className={`text-xs font-bold ${
//                 selected ? "text-white" : "text-gray-500"
//               }`}
//             >
//               {opt.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// /* ============================================================
//    MARK INPUT ROW  (bigger, easier input)
//    ============================================================ */
// // function MarkField({ label, max, value, onChange, disabled }) {
// //   const numeric = Number(value);
// //   const isInvalid = value !== "" && (Number.isNaN(numeric) || numeric > max);

// //   return (
// //     <View className="flex-row items-center justify-between py-1">
// //       <Text className="text-sm font-semibold text-gray-600 w-24">{label}</Text>

// //       <TextInput
// //         value={value}
// //         onChangeText={onChange}
// //         editable={!disabled}
// //         keyboardType="numeric"
// //         maxLength={1}
// //         placeholder="0"
// //         placeholderTextColor="#C4BEDD"
// //         className={`flex-1 h-12 rounded-xl px-3 text-2xl font-bold text-center ${
// //           disabled
// //             ? "bg-gray-100 text-gray-400 border border-gray-200"
// //             : isInvalid
// //             ? "bg-red-50 text-red-500 border border-red-400"
// //             : "bg-white text-[#2A3063] border border-gray-300"
// //         }`}
// //       />

// //       <Text className="text-xs text-gray-400 ml-2 w-10">/ {max}</Text>
// //     </View>
// //   );
// // }

// function MarkField({ label, max, value, onChange, disabled }) {
//   const numeric = Number(value);
//   const isInvalid = value !== "" && (Number.isNaN(numeric) || numeric > max);

//   return (
//     <View className="flex-row items-center justify-between">
//       <Text className="text-sm font-semibold text-gray-600 w-24">{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChange}
//         editable={!disabled}
//         keyboardType="numeric"
//         maxLength={3}
//         placeholder="0"
//         placeholderTextColor="#C4BEDD"
//         className={`flex-1 h-10 rounded-lg px-2 text-xl font-bold text-center ${
//           disabled
//             ? "bg-gray-100 text-gray-400 border border-gray-200"
//             : isInvalid
//             ? "bg-red-50 text-red-500 border border-red-400"
//             : "bg-white text-[#2A3063] border border-gray-300"
//         }`}
//       />

//       <Text className="text-xs text-gray-400 ml-2 w-10">/ {max}</Text>
//     </View>
//   );
// }
// /* ============================================================
//    COMPACT COMPUTED BOX  (Total / Grade side-by-side)
//    ============================================================ */
// function ComputedBox({ label, value }) {
//   return (
//     <View className="flex-1 bg-[#E7E3F5] border border-[#8E7CC3] rounded-xl py-2 items-center justify-center">
//       <Text className="text-[10px] font-semibold text-[#6B5CA5] uppercase">
//         {label}
//       </Text>
//       <Text className="text-base font-bold text-[#4B3F82]">{value}</Text>
//     </View>
//   );
// }

// /* ============================================================
//    MAIN SCREEN — app/teacher/marks/entry.jsx
//    Route: /teacher/marks/entry
//    Everything fits on ONE screen — no scrolling required.
//    ============================================================ */
// export default function StudentMarkEntry() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const {
//     classId,
//     subjectId,
//     subjectName,
//     totalStudent,
//     session,
//     examTermName,
//   } = params;

//   const [studentsData, setStudentsData] = useState(() =>
//     buildMockStudents(totalStudent)
//   );
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const current = studentsData[currentIndex];
//   const isFirst = currentIndex === 0;
//   const isLast = currentIndex === studentsData.length - 1;
//   const isNonRegular = current.status === "non-regular";

//   // Non-regular students skip mark entry; saved students stay locked (no Edit)
//   const fieldsDisabled = current.saved || isNonRegular;

//   const total = useMemo(
//     () =>
//       MARK_FIELDS.reduce(
//         (sum, f) => sum + (Number(current[f.key]) || 0),
//         0
//       ),
//     [current]
//   );
//   const grade = useMemo(() => getGrade(total), [total]);

//   const updateCurrentField = (key, value) => {
//     setStudentsData((prev) =>
//       prev.map((s, i) => (i === currentIndex ? { ...s, [key]: value } : s))
//     );
//   };

//   const handleMarkChange = (key, rawValue) => {
//     const cleaned = rawValue.replace(/[^0-9]/g, "");
//     updateCurrentField(key, cleaned);
//   };

//   /* ---------- SAVE & NEXT (single combined action) ---------- */
//   const handleSaveAndNext = () => {
//     // Non-regular → nothing to save, just move on
//     if (isNonRegular) {
//       if (isLast) {
//         Alert.alert("Completed", "This is the last student.");
//         return;
//       }
//       setCurrentIndex((i) => i + 1);
//       return;
//     }

//     // Validate + save only if not already saved
//     if (!current.saved) {
//       const invalidField = MARK_FIELDS.find((f) => {
//         const v = current[f.key];
//         if (v === "") return true;
//         const n = Number(v);
//         return Number.isNaN(n) || n < 0 || n > f.max;
//       });

//       if (invalidField) {
//         Alert.alert(
//           "Incomplete or invalid marks",
//           `Check "${invalidField.label}" for ${current.name} (Roll ${current.roll}).`
//         );
//         return;
//       }

//       updateCurrentField("saved", true);
//     }

//     if (isLast) {
//       Alert.alert("Completed", "All students have been processed.");
//       return;
//     }

//     setCurrentIndex((i) => i + 1);
//   };

//   const handlePrevious = () => {
//     if (isFirst) {
//       Alert.alert("First student", "This is already the first student.");
//       return;
//     }
//     setCurrentIndex((i) => i - 1);
//   };

//   const savedCount = studentsData.filter((s) => s.saved).length;

//   /* ---------- Primary button label ---------- */
//   const alreadyDone = current.saved || isNonRegular;
//   const primaryLabel = alreadyDone
//     ? isLast
//       ? "Finish"
//       : "Next"
//     : isLast
//     ? "Save"
//     : "Save & Next";

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-gray-50"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Navbar
//         title={subjectName || "Mark Entry"}
//         onBack={() => router.back()}
//         onMenu={() => console.log("Menu opened")}
//       />

//       <View className="flex-1 px-4 pt-3 pb-4">
//         {/* ---------- PROGRESS ---------- */}
//         <View className="flex-row items-center justify-between mb-2">
//           <Text className="text-base font-bold text-gray-800">
//             Student {currentIndex + 1} of {studentsData.length}
//           </Text>
//           <Text className="text-xs text-[#6B5CA5] font-bold">
//             {savedCount}/{studentsData.length} saved
//           </Text>
//         </View>

//         {/* ---------- STUDENT CARD (name + session + term + status) ---------- */}
//         <View className="bg-white rounded-2xl px-4 py-3 mb-2">
//           {/* Name + Roll in one row */}
//           <View className="flex-row items-center justify-between">
//             <Text
//               numberOfLines={1}
//               className="flex-1 text-base font-bold text-gray-800 mr-2"
//             >
//               {current.name}
//             </Text>
//             <View className="bg-[#F3F0FA] rounded-lg px-2 py-1">
//               <Text className="text-xs font-bold text-[#4B3F82]">
//                 Roll {current.roll}
//               </Text>
//             </View>
//           </View>

//           {/* Session + Exam Term UNDER the student name */}
//           <View className="flex-row gap-2 mt-2">
//             <View className="flex-1 flex-row items-center bg-[#F3F0FA] rounded-lg px-2 py-1">
//               <Ionicons name="calendar-outline" size={12} color="#6B5CA5" />
//               <Text
//                 numberOfLines={1}
//                 className="text-[11px] text-[#4B3F82] ml-1 flex-1"
//               >
//                 Session: {session || "N/A"}
//               </Text>
//             </View>
//             <View className="flex-1 flex-row items-center bg-[#F3F0FA] rounded-lg px-2 py-1">
//               <Ionicons
//                 name="document-text-outline"
//                 size={12}
//                 color="#6B5CA5"
//               />
//               <Text
//                 numberOfLines={1}
//                 className="text-[11px] text-[#4B3F82] ml-1 flex-1"
//               >
//                 Term: {examTermName || "N/A"}
//               </Text>
//             </View>
//           </View>

//           {/* Compact Regular / Non Regular toggle */}
//           <View className="mt-2">
//             <StatusToggle
//               value={current.status}
//               disabled={current.saved}
//               onChange={(status) => updateCurrentField("status", status)}
//             />
//           </View>

//           {isNonRegular && (
//             <Text className="text-[11px] text-[#B8752E] mt-1.5">
//               Non Regular — marks are locked. Use Save & Next to continue.
//             </Text>
//           )}
//         </View>

//         {/* ---------- MARKS CARD (fills remaining space) ---------- */}
//         <View className="bg-white rounded-2xl px-4 py-1 flex-1 mb-2">
//           <View className="flex-1 justify-evenly">
//             {MARK_FIELDS.map((f) => (
//               <MarkField
//                 key={f.key}
//                 label={f.label}
//                 max={f.max}
//                 value={current[f.key]}
//                 disabled={fieldsDisabled}
//                 onChange={(v) => handleMarkChange(f.key, v)}
//               />
//             ))}
//           </View>

//           <View className="h-px bg-gray-100 my-2" />

//           {/* Total + Grade side-by-side to save vertical space */}
//           <View className="flex-row gap-2">
//             {isNonRegular ? (
//               <>
//                 <ComputedBox label="Total Mark" value="N/A" />
//                 <ComputedBox label="Total Grade" value="N/A" />
//               </>
//             ) : (
//               <>
//                 <ComputedBox
//                   label="Total Mark"
//                   value={`${total} / ${TOTAL_MAX}`}
//                 />
//                 <ComputedBox
//                   label="Total Grade"
//                   value={`${grade.letter} (${grade.gpa})`}
//                 />
//               </>
//             )}
//           </View>
//         </View>

//         {/* ---------- BOTTOM ACTIONS ---------- */}
//         <View className="flex-row gap-3">
//           <TouchableOpacity
//             onPress={handlePrevious}
//             disabled={isFirst}
//             className={`flex-row items-center justify-center rounded-xl px-5 py-3.5 ${
//               isFirst ? "bg-gray-200" : "bg-[#2A3063]"
//             }`}
//           >
//             <Ionicons
//               name="chevron-back"
//               size={16}
//               color={isFirst ? "#9CA3AF" : "#FFFFFF"}
//             />
//             <Text
//               className={`font-bold ml-1 ${
//                 isFirst ? "text-gray-400" : "text-white"
//               }`}
//             >
//               Prev
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleSaveAndNext}
//             activeOpacity={0.85}
//             className={`flex-1 flex-row items-center justify-center rounded-xl py-3.5 ${
//               alreadyDone ? "bg-[#2A3063]" : "bg-[#8E7CC3]"
//             }`}
//           >
//             <Text className="text-white font-bold text-base mr-1">
//               {primaryLabel}
//             </Text>
//             <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }



// // import React, { useState, useMemo } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ScrollView,
// //   TextInput,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { useRouter, useLocalSearchParams } from "expo-router";
// // import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

// // /* ============================================================
// //    MARK BREAKDOWN  (Subjective/60 + Objective/20 + Viva/10 + Practical/10 = 100)
// //    Change here if your real breakdown differs.
// //    ============================================================ */
// // const MARK_FIELDS = [
// //   { key: "subjective", label: "Subjective", max: 60 },
// //   { key: "objective", label: "Objective", max: 20 },
// //   { key: "viva", label: "Viva", max: 10 },
// //   { key: "practical", label: "Practical", max: 10 },
// // ];
// // const TOTAL_MAX = MARK_FIELDS.reduce((sum, f) => sum + f.max, 0); // 100

// // /* ============================================================
// //    GRADE SCALE — adjust to your school's actual scale
// //    ============================================================ */
// // function getGrade(total) {
// //   if (total >= 80) return { letter: "A+", gpa: "5.00" };
// //   if (total >= 70) return { letter: "A", gpa: "4.00" };
// //   if (total >= 60) return { letter: "A-", gpa: "3.50" };
// //   if (total >= 50) return { letter: "B", gpa: "3.00" };
// //   if (total >= 40) return { letter: "C", gpa: "2.00" };
// //   if (total >= 33) return { letter: "D", gpa: "1.00" };
// //   return { letter: "F", gpa: "0.00" };
// // }

// // /* ============================================================
// //    MOCK STUDENT DATA — 30 students by default
// //    Replace with: const students = await fetchStudents(classId, subjectId)
// //    Each student carries its own marks + status + saved state so
// //    switching between students never loses what's been entered.
// //    ============================================================ */
// //   const MOCK_NAMES = [
// //   "Rahim Uddin",
// //   "Karim Ahmed",
// //   "Fatema Begum",
// //   "Sabbir Hossain",
// //   "Nusrat Jahan",
// //   "Tanvir Islam",
// //   "Ayesha Siddika",
// //   "Mehedi Hasan",
// //   "Sumaiya Akter",
// //   "Arif Chowdhury",
// //   "Jannatul Ferdous",
// //   "Shakib Al Hasan",
// //   "Rumana Islam",
// //   "Imran Khan",
// //   "Tasnim Rahman",
// //   "Nayeem Ahmed",
// //   "Farzana Yasmin",
// //   "Rashed Mia",
// //   "Sharmin Sultana",
// //   "Hasan Mahmud",
// //   "Mim Akter",
// //   "Sajid Karim",
// //   "Tania Islam",
// //   "Fahim Rahman",
// //   "Lamia Sultana",
// //   "Rakib Hasan",
// //   "Nadia Akter",
// //   "Sohan Ahmed",
// //   "Priya Das",
// //   "Anik Roy",
// //   "Munia Islam",
// //   "Tahmid Hasan",
// //   "Sadia Afrin",
// //   "Jubayer Ahmed",
// //   "Rifat Hossain",
// // ];


// //   function buildMockStudents(totalStudent) {
// //   const count = Number(totalStudent) || 35;
// //   return Array.from({ length: count }, (_, i) => ({
// //     id: `stu_${i + 1}`,
// //     roll: i + 1,
// //     name: MOCK_NAMES[i] || `Student ${i + 1}`, // fallback: নাম না থাকলে পুরনো স্টাইল
// //     status: "regular",
// //     subjective: "",
// //     objective: "",
// //     viva: "",
// //     practical: "",
// //     saved: false,
// //   }));
// // }
// // /* ============================================================
// //    SUMMARY CHIP
// //    ============================================================ */
// // function SummaryChip({ icon, label, value }) {
// //   return (
// //     <View className="flex-row items-center bg-[#F3F0FA] rounded-xl px-3 py-2 mb-2">
// //       <Ionicons name={icon} size={16} color="#6B5CA5" />
// //       <Text className="text-xs text-gray-400 ml-2 mr-1">{label}:</Text>
// //       <Text numberOfLines={1} className="text-xs text-[#4B3F82] font-bold flex-1">
// //         {value}
// //       </Text>
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    REGULAR / NON-REGULAR TOGGLE
// //    ============================================================ */
// // function StatusToggle({ value, onChange, disabled }) {
// //   const options = [
// //     { key: "regular", label: "Regular" },
// //     { key: "non-regular", label: "Non Regular" },
// //   ];

// //   return (
// //     <View className="flex-row gap-3">
// //       {options.map((opt) => {
// //         const selected = value === opt.key;
// //         return (
// //           <TouchableOpacity
// //             key={opt.key}
// //             disabled={disabled}
// //             activeOpacity={0.85}
// //             onPress={() => onChange(opt.key)}
// //             className={`flex-1 py-3 rounded-xl items-center border ${
// //               selected ? "bg-[#8E7CC3] border-[#8E7CC3]" : "bg-white border-gray-300"
// //             } ${disabled ? "opacity-50" : ""}`}
// //           >
// //             <Text className={`text-sm font-bold ${selected ? "text-white" : "text-gray-600"}`}>
// //               {opt.label}
// //             </Text>
// //           </TouchableOpacity>
// //         );
// //       })}
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    MARK INPUT ROW  (label + input + "/ max")
// //    ============================================================ */
// // function MarkField({ label, max, value, onChange, disabled }) {
// //   const numeric = Number(value);
// //   const isInvalid = value !== "" && (Number.isNaN(numeric) || numeric > max);

// //   return (
// //     <View className="flex-row items-center justify-between mb-3">
// //       <Text className="text-sm text-gray-600 w-24">{label}</Text>
// //       <View className="flex-1 flex-row items-center">
// //         <TextInput
// //           value={value}
// //           onChangeText={onChange}
// //           editable={!disabled}
// //           keyboardType="numeric"
// //           maxLength={3}
// //           placeholder="0"
// //           placeholderTextColor="#C4BEDD"
// //           className={`flex-1 h-11 rounded-lg px-3 text-sm font-bold text-center ${
// //             disabled
// //               ? "bg-gray-100 text-gray-400 border border-gray-200"
// //               : isInvalid
// //               ? "bg-red-50 text-red-500 border border-red-400"
// //               : "bg-white text-[#2A3063] border border-gray-300"
// //           }`}
// //         />
// //         <Text className="text-xs text-gray-400 ml-2 w-10">/ {max}</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    READ-ONLY COMPUTED BOX  (Total mark / Total grade)
// //    ============================================================ */
// // function ComputedBox({ label, value, suffix }) {
// //   return (
// //     <View className="flex-row items-center justify-between mb-3">
// //       <Text className="text-sm text-gray-700 font-semibold w-24">{label}</Text>
// //       <View className="flex-1 h-11 rounded-lg bg-[#E7E3F5] border border-[#8E7CC3] items-center justify-center">
// //         <Text className="text-sm font-bold text-[#4B3F82]">
// //           {value}
// //           {suffix ? ` ${suffix}` : ""}
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    MAIN SCREEN — app/teacher/marks/entry.jsx
// //    Route: /teacher/marks/entry
// //    One student fills the whole screen; Previous/Next page through
// //    all students; Save locks the fields, Edit unlocks them again.
// //    ============================================================ */

// // export default function StudentMarkEntry() {
// //   const router = useRouter();
// //   const params = useLocalSearchParams();
// //   const { classId, subjectId, subjectName, totalStudent, session, examTermName } = params;

// //   const [studentsData, setStudentsData] = useState(() => buildMockStudents(totalStudent));
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const current = studentsData[currentIndex];
// //   const isFirst = currentIndex === 0;
// //   const isLast = currentIndex === studentsData.length - 1;
// //   const isNonRegular = current.status === "non-regular";
// //   // Non-regular students skip mark entry entirely — only Previous/Next stay usable
// //   const fieldsDisabled = current.saved || isNonRegular;

// //   const total = useMemo(
// //     () => MARK_FIELDS.reduce((sum, f) => sum + (Number(current[f.key]) || 0), 0),
// //     [current]
// //   );
// //   const grade = useMemo(() => getGrade(total), [total]);

// //   const updateCurrentField = (key, value) => {
// //     setStudentsData((prev) =>
// //       prev.map((s, i) => (i === currentIndex ? { ...s, [key]: value } : s))
// //     );
// //   };

// //   const handleMarkChange = (key, max, rawValue) => {
// //     const cleaned = rawValue.replace(/[^0-9]/g, "");
// //     updateCurrentField(key, cleaned);
// //   };

// //   const handleSave = () => {
// //     const invalidField = MARK_FIELDS.find((f) => {
// //       const v = current[f.key];
// //       if (v === "") return true; // require every field filled to save
// //       const n = Number(v);
// //       return Number.isNaN(n) || n < 0 || n > f.max;
// //     });

// //     if (invalidField) {
// //       Alert.alert(
// //         "Incomplete or invalid marks",
// //         `Check "${invalidField.label}" for ${current.name} (Roll ${current.roll}).`
// //       );
// //       return;
// //     }

// //     updateCurrentField("saved", true);
// //   };

// //   const handleEdit = () => {
// //     updateCurrentField("saved", false);
// //   };

// //   const handlePrevious = () => {
// //     if (isFirst) {
// //       Alert.alert("First student", "This is already the first student.");
// //       return;
// //     }
// //     setCurrentIndex((i) => i - 1);
// //   };

// //   const handleNext = () => {
// //     if (isLast) {
// //       Alert.alert("Last student", "This is the last student in the list.");
// //       return;
// //     }
// //     setCurrentIndex((i) => i + 1);
// //   };

// //   const savedCount = studentsData.filter((s) => s.saved).length;

// //   return (
// //     <KeyboardAvoidingView
// //       className="flex-1 bg-gray-50"
// //       behavior={Platform.OS === "ios" ? "padding" : undefined}
// //     >
// //       <Navbar
// //         title={subjectName || "Mark Entry"}
// //         onBack={() => router.back()}
// //         onMenu={() => console.log("Menu opened")}
// //       />

// //       <ScrollView
// //         className="flex-1"
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={{
// //           flexGrow: 1,
// //           justifyContent: "space-between",
// //           paddingHorizontal: 20,
// //           paddingTop: 16,
// //           paddingBottom: 20,
// //         }}
// //       >
// //         {/* TOP: progress + context */}
// //         <View>
// //           <View className="flex-row items-center justify-between mb-3">
// //             <Text className="text-lg font-bold text-gray-800">
// //               Student {currentIndex + 1} of {studentsData.length}
// //             </Text>
// //             <Text className="text-xs text-[#6B5CA5] font-bold">
// //               {savedCount}/{studentsData.length} saved
// //             </Text>
// //           </View>

// //           <View className="bg-white rounded-2xl p-4 mb-4">
// //             <SummaryChip icon="calendar-outline" label="Session" value={session || "N/A"} />
// //             <SummaryChip icon="document-text-outline" label="Exam Term" value={examTermName || "N/A"} />
// //           </View>

// //           {/* STUDENT INFO + STATUS */}
// //           <View className="bg-white rounded-2xl p-5 mb-4">
// //             <Text className="text-xs text-gray-400 mb-1">STUDENT NAME</Text>
// //             <Text className="text-lg font-bold text-gray-800 mb-3">{current.name}</Text>

// //             <Text className="text-xs text-gray-400 mb-1">ROLL</Text>
// //             <Text className="text-base font-semibold text-gray-700 mb-4">{current.roll}</Text>

// //             <StatusToggle
// //               value={current.status}
// //               disabled={current.saved}
// //               onChange={(status) => updateCurrentField("status", status)}
// //             />

// //             {isNonRegular && (
// //               <View className="flex-row items-center bg-[#FFF4E5] border border-[#F5C177] rounded-xl px-3 py-2 mt-3">
// //                 <Ionicons name="information-circle-outline" size={16} color="#B8752E" />
// //                 <Text className="text-xs text-[#B8752E] ml-2 flex-1">
// //                   Non Regular — marks are locked. Use Previous / Next to continue.
// //                 </Text>
// //               </View>
// //             )}
// //           </View>

// //           {/* MARKS ENTERED */}
// //           <View className="bg-white rounded-2xl p-5 mb-4">
// //             <Text className="text-xs text-gray-400 mb-3">MARKS ENTERED</Text>

// //             {MARK_FIELDS.map((f) => (
// //               <MarkField
// //                 key={f.key}
// //                 label={f.label}
// //                 max={f.max}
// //                 value={current[f.key]}
// //                 disabled={fieldsDisabled}
// //                 onChange={(v) => handleMarkChange(f.key, f.max, v)}
// //               />
// //             ))}

// //             <View className="h-px bg-gray-100 my-2" />

// //             {isNonRegular ? (
// //               <>
// //                 <ComputedBox label="Total Mark" value="N/A" />
// //                 <ComputedBox label="Total Grade" value="N/A" />
// //               </>
// //             ) : (
// //               <>
// //                 <ComputedBox label="Total Mark" value={`${total}`} suffix={`/ ${TOTAL_MAX}`} />
// //                 <ComputedBox label="Total Grade" value={grade.letter} suffix={`(${grade.gpa})`} />
// //               </>
// //             )}
// //           </View>
// //         </View>

// //         {/* BOTTOM ACTION AREA */}
// //         <View>
// //           {!isNonRegular &&
// //             (current.saved ? (
// //               <TouchableOpacity
// //                 onPress={handleEdit}
// //                 className="border-2 border-[#8E7CC3] rounded-xl py-4 items-center mb-3"
// //               >
// //                 <Text className="text-[#8E7CC3] font-bold">Edit</Text>
// //               </TouchableOpacity>
// //             ) : (
// //               <TouchableOpacity
// //                 onPress={handleSave}
// //                 className="bg-[#8E7CC3] rounded-xl py-4 items-center mb-3"
// //               >
// //                 <Text className="text-white font-bold">Save</Text>
// //               </TouchableOpacity>
// //             ))}

// //           <View className="flex-row gap-3">
// //             <TouchableOpacity
// //               onPress={handlePrevious}
// //               disabled={isFirst}
// //               className={`flex-1 flex-row items-center justify-center rounded-xl py-4 ${
// //                 isFirst ? "bg-gray-200" : "bg-[#2A3063]"
// //               }`}
// //             >
// //               <Ionicons
// //                 name="chevron-back"
// //                 size={16}
// //                 color={isFirst ? "#9CA3AF" : "#FFFFFF"}
// //               />
// //               <Text className={`font-bold ml-1 ${isFirst ? "text-gray-400" : "text-white"}`}>
// //                 Previous
// //               </Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               onPress={handleNext}
// //               disabled={isLast}
// //               className={`flex-1 flex-row items-center justify-center rounded-xl py-4 ${
// //                 isLast ? "bg-gray-200" : "bg-[#2A3063]"
// //               }`}
// //             >
// //               <Text className={`font-bold mr-1 ${isLast ? "text-gray-400" : "text-white"}`}>
// //                 Next
// //               </Text>
// //               <Ionicons
// //                 name="chevron-forward"
// //                 size={16}
// //                 color={isLast ? "#9CA3AF" : "#FFFFFF"}
// //               />
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // }
