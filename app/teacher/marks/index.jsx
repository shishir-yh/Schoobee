import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

/* ============================================================
   MOCK DATA
   ============================================================ */

const CLASS_LIST = [
  { id: "c1", name: "One", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c2", name: "Two", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c3", name: "Three", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c4", name: "Four", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c5", name: "Five", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c6", name: "Six", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c7", name: "Seven", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c8", name: "Eight", department: "N/A", studentType: "Combined", section: "N/A" },
  { id: "c9", name: "Nine", department: "Science", studentType: "Combined", section: "N/A" },
  { id: "c10", name: "Nine", department: "Arts", studentType: "Combined", section: "N/A" },
  { id: "c11", name: "Nine", department: "Commerce", studentType: "Combined", section: "N/A" },
];

const SESSION_LIST = [
  { id: "2026", name: "2026" },
  { id: "2025", name: "2025" },
  { id: "2024", name: "2024" },
  { id: "2023", name: "2023" },
  { id: "2022", name: "2022" },
];

/* ============================================================
   EXAM TERM TREE (dynamic, any depth)
   ============================================================ */

const EXAM_TERM_TREE = [
  {
    id: "terminal",
    name: "Terminal",
    children: [
      { id: "terminal_term1", name: "Term-1" },
      { id: "terminal_term2", name: "Term-2" },
    ],
  },
  {
    id: "class_test",
    name: "Class Test",
    children: [
      {
        id: "ct_term1",
        name: "Term-1 CT",
        children: [
          { id: "ct_term1_ct1", name: "CT-1" },
          { id: "ct_term1_ct2", name: "CT-2" },
          { id: "ct_term1_ct3", name: "CT-3" },
        ],
      },
      {
        id: "ct_term2",
        name: "Term-2 CT",
        children: [
          { id: "ct_term2_ct1", name: "CT-1" },
          { id: "ct_term2_ct2", name: "CT-2" },
          { id: "ct_term2_ct3", name: "CT-3" },
        ],
      },
      {
        id: "ct_term3",
        name: "Term-3 CT",
        children: [
          { id: "ct_term3_ct1", name: "CT-1" },
          { id: "ct_term3_ct2", name: "CT-2" },
          { id: "ct_term3_ct3", name: "CT-3" },
        ],
      },
    ],
  },
  {
    id: "model_test",
    name: "Model Test",
    children: [
      { id: "model_1", name: "Model 1" },
      { id: "model_2", name: "Model 2" },
      { id: "model_3", name: "Model 3" },
      { id: "model_4", name: "Model 4" },
    ],
  },
];

/* ============================================================
   CLASS TABLE
   ============================================================ */

function ClassTable({ data, selectedId, onSelect }) {
  const columns = [
    { key: "name", label: "Class", flex: 1 },
    { key: "department", label: "Department", flex: 1.3 },
    { key: "studentType", label: "Student Type", flex: 1.3 },
    { key: "section", label: "Section", flex: 1 },
  ];

  return (
    <View className="bg-white rounded-2xl overflow-hidden border border-gray-200">
      {/* ================= HEADER ================= */}
      <View className="flex-row bg-[#6B5CA5]">
        {columns.map((col, idx) => (
          <View
            key={col.key}
            style={{ flex: col.flex }}
            className={`py-3.5 px-3 justify-center ${
              idx !== columns.length - 1 ? "border-r border-[#7E6FB8]" : ""
            }`}
          >
            <Text className="text-white text-[8px] font-bold  uppercase">
              {col.label}
            </Text>
          </View>
        ))}
      </View>

      {/* ================= DATA ROWS ================= */}
      {data.map((row, index) => {
        const isSelected = row.id === selectedId;
        const isEven = index % 2 === 0;
        const isLast = index === data.length - 1;

        const rowBg = isSelected
          ? "bg-[#E7E3F5]"
          : isEven
          ? "bg-white"
          : "bg-[#F7F7FA]";

        return (
          <TouchableOpacity
            key={row.id}
            activeOpacity={0.7}
            onPress={() => onSelect(row.id)}
            className={`flex-row ${rowBg} ${
              !isLast ? "border-b border-gray-100" : ""
            } ${isSelected ? "border-l-4 border-l-[#6B5CA5]" : "border-l-4 border-l-transparent"}`}
          >
            {columns.map((col, colIdx) => (
              <View
                key={col.key}
                style={{ flex: col.flex }}
                className={`py-3.5 px-3 justify-center ${
                  colIdx !== columns.length - 1 ? "border-r border-gray-100" : ""
                }`}
              >
                <Text
                  numberOfLines={1}
                  className={`text-xs ${
                    isSelected
                      ? "text-[#4B3F82] font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {row[col.key]}
                </Text>
              </View>
            ))}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ============================================================
   CLASS PICKER FIELD
   ============================================================ */

function ClassPickerField({ label, placeholder, data, selectedId, onSelect }) {
  const [visible, setVisible] = useState(false);
  const selected = data.find((c) => c.id === selectedId);

  const handleSelect = (id) => {
    onSelect(id);
    setVisible(false);
  };

  return (
    <View className="mb-4">
      <Text className="text-xs text-gray-400 mb-1">{label}</Text>

      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
      >
        <Text numberOfLines={1} className={`flex-1 mr-2 ${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected
            ? `${selected.name} - ${selected.department} - ${selected.studentType} - ${selected.section}`
            : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", paddingHorizontal: 16 }}>
          <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill} onPress={() => setVisible(false)} />

          <View style={{ maxHeight: "80%" }} className="bg-white rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-gray-800">Select Class</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <ClassTable data={data} selectedId={selectedId} onSelect={handleSelect} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ============================================================
   TREE ROW  (animated press + selected highlight)
   ============================================================ */

function TreeRow({ node, index, isSelected, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1.03, useNativeDriver: true, friction: 6 }),
      Animated.spring(translateX, { toValue: 6, useNativeDriver: true, friction: 6 }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true, friction: 6 }),
    ]).start();
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <Pressable onPressIn={animateIn} onPressOut={animateOut} onPress={() => onPress(node)}>
      <Animated.View
        style={{
          transform: [{ scale }, { translateX }],
          backgroundColor: isSelected ? "#2A3063" : "#8E7CC3",
        }}
        className="flex-row items-center justify-between px-4 py-3.5 rounded-xl mb-1.5"
      >
        <Text className="text-sm text-white font-semibold">{node.name}</Text>

        {hasChildren ? (
          <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
        ) : isSelected ? (
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

/* ============================================================
   TREE DROPDOWN FIELD  (fully dynamic — any depth, any shape)
   ============================================================ */

function TreeDropdownField({ label, placeholder, tree, selectedPath, onSelect }) {
  const [visible, setVisible] = useState(false);
  const [navStack, setNavStack] = useState([{ id: "root", title: label, nodes: tree }]);
  const [selectedIdPath, setSelectedIdPath] = useState([]);

  const currentLevel = navStack[navStack.length - 1];
  const isRoot = navStack.length === 1;
  const currentDepth = navStack.length - 1;

  const openModal = () => {
    setNavStack([{ id: "root", title: label, nodes: tree }]);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setNavStack([{ id: "root", title: label, nodes: tree }]);
  };

  const goBack = () => {
    setNavStack((prev) => prev.slice(0, -1));
  };

  const handlePressNode = (node) => {
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      setNavStack((prev) => [...prev, { id: node.id, title: node.name, nodes: node.children }]);
      return;
    }

    const idPath = navStack.slice(1).map((level) => level.id).concat(node.id);
    const namePath = navStack.slice(1).map((level) => level.title).concat(node.name);

    setSelectedIdPath(idPath);
    onSelect({ id: node.id, name: node.name, path: namePath });
    closeModal();
  };

  const displayText =
    selectedPath && selectedPath.length ? selectedPath.join(" - ") : placeholder;

  return (
    <View className="mb-4">
      <Text className="text-xs text-gray-400 mb-1">{label}</Text>

      <TouchableOpacity
        onPress={openModal}
        className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
      >
        <Text
          numberOfLines={1}
          className={`flex-1 mr-2 ${
            selectedPath && selectedPath.length ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {displayText}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", paddingHorizontal: 16 }}>
          <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill} onPress={closeModal} />

          <View style={{ maxHeight: "80%" }} className="bg-white rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              {!isRoot && (
                <TouchableOpacity onPress={goBack} className="mr-2 -ml-1 p-1">
                  <Ionicons name="chevron-back" size={22} color="#6B7280" />
                </TouchableOpacity>
              )}
              <Text className="text-lg font-bold text-gray-800 flex-1" numberOfLines={1}>
                {currentLevel.title}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {currentLevel.nodes.map((node, index) => (
                <TreeRow
                  key={node.id}
                  node={node}
                  index={index}
                  isSelected={selectedIdPath[currentDepth] === node.id}
                  onPress={handlePressNode}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ============================================================
   SIMPLE DROPDOWN FIELD (flat list — used for Session)
   ============================================================ */

function DropdownField({ label, placeholder, options, selectedId, onSelect }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === selectedId);

  return (
    <View className="mb-4">
      <Text className="text-xs text-gray-400 mb-1">{label}</Text>

      <TouchableOpacity
        onPress={() => setOpen((prev) => !prev)}
        className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
      >
        <Text className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#9CA3AF" />
      </TouchableOpacity>

      {open && (
        <View className="border border-gray-200 rounded-xl mt-2 bg-white overflow-hidden">
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => {
                onSelect(option.id);
                setOpen(false);
              }}
              className={`px-4 py-3 ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              } ${selectedId === option.id ? "bg-[#F3F0FA]" : ""}`}
            >
              <Text className={selectedId === option.id ? "text-[#8E7CC3] font-semibold" : "text-gray-700"}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

/* ============================================================
   MAIN SCREEN — app/teacher/marks/index.jsx
   Route: /teacher/marks
   ============================================================ */

export default function TeacherMarks() {
  const router = useRouter();

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [examTerm, setExamTerm] = useState(null); // { id, name, path }
  const [examSession, setExamSession] = useState("2026");

  const sessionOptions = SESSION_LIST.map((s) => ({ id: s.id, label: s.name }));

  const handleGo = () => {
    if (!selectedClassId || !examTerm || !examSession) {
      Alert.alert("Missing info", "Please select class, exam term and session.");
      return;
    }

    const selectedClass = CLASS_LIST.find((c) => c.id === selectedClassId);

    router.push({
      pathname: "/teacher/marks/subjects",
      params: {
        classId: selectedClassId,
        className: selectedClass
          ? `${selectedClass.name} - ${selectedClass.department}`
          : "",
        session: examSession,
        examTermId: examTerm.id,
        examTermName: examTerm.path.join(" - "),
      },
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar title="Mark Entry" onBack={() => router.back()} onMenu={() => console.log("Menu opened")} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      >
        <Text className="text-2xl font-bold text-gray-800">Mark Entry</Text>
        <Text className="text-gray-500 mt-1 mb-5">
          Select class, exam term and session to continue
        </Text>

        <View className="bg-white rounded-2xl p-5 mb-5">
          <ClassPickerField
            label="SELECT CLASS"
            placeholder="Select Class"
            data={CLASS_LIST}
            selectedId={selectedClassId}
            onSelect={setSelectedClassId}
          />

          <DropdownField
            label="SELECT EXAM SESSION"
            placeholder="Select Exam Session"
            options={sessionOptions}
            selectedId={examSession}
            onSelect={setExamSession}
          />

          <TreeDropdownField
            label="SELECT EXAM TERM"
            placeholder="Select Exam Term"
            tree={EXAM_TERM_TREE}
            selectedPath={examTerm?.path}
            onSelect={setExamTerm}
          />
        </View>

        <TouchableOpacity onPress={handleGo} className="bg-[#8E7CC3] rounded-xl py-4 items-center">
          <Text className="text-white font-bold">Go</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Modal,
//   StyleSheet,
//   Animated,
//   Pressable,
// } from "react-native";
// import {  useRef } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import Navbar from "../../../Common_Components/CommonNavbar/Navbar";

// /* ============================================================
//    MOCK DATA
//    ============================================================ */

// const CLASS_LIST = [
//   { id: "c1", name: "One", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c2", name: "Two", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c3", name: "Three", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c4", name: "Four", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c5", name: "Five", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c6", name: "Six", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c7", name: "Seven", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c8", name: "Eight", department: "N/A", studentType: "Combined", section: "N/A" },
//   { id: "c9", name: "Nine", department: "Science", studentType: "Combined", section: "N/A" },
//   { id: "c10", name: "Nine", department: "Arts", studentType: "Combined", section: "N/A" },
//   { id: "c11", name: "Nine", department: "Commerce", studentType: "Combined", section: "N/A" },
// ];

// const SESSION_LIST = [
//   { id: "2026", name: "2026" },
//   { id: "2025", name: "2025" },
//   { id: "2024", name: "2024" },
//   { id: "2023", name: "2023" },
//   { id: "2022", name: "2022" },
// ];

// /* ============================================================
//    EXAM TERM TREE (dynamic, any depth)
//    node = { id, name, children? }
//    - if a node has "children" -> tapping it drills one level deeper
//    - if a node has NO "children" -> tapping it is the final selection
//    Add/remove/rename nodes here and the dropdown adapts automatically.
//    ============================================================ */

// const EXAM_TERM_TREE = [
//   {
//     id: "terminal",
//     name: "Terminal",
//     children: [
//       { id: "terminal_term1", name: "Term-1" },
//       { id: "terminal_term2", name: "Term-2" },
//     ],
//   },
//   {
//     id: "class_test",
//     name: "Class Test",
//     children: [
//       {
//         id: "ct_term1",
//         name: "Term-1 CT",
//         children: [
//           { id: "ct_term1_ct1", name: "CT-1" },
//           { id: "ct_term1_ct2", name: "CT-2" },
//           { id: "ct_term1_ct3", name: "CT-3" },
//         ],
//       },
//       {
//         id: "ct_term2",
//         name: "Term-2 CT",
//         children: [
//           { id: "ct_term2_ct1", name: "CT-1" },
//           { id: "ct_term2_ct2", name: "CT-2" },
//           { id: "ct_term2_ct3", name: "CT-3" },
//         ],
//       },
//       {
//         id: "ct_term3",
//         name: "Term-3 CT",
//         children: [
//           { id: "ct_term3_ct1", name: "CT-1" },
//           { id: "ct_term3_ct2", name: "CT-2" },
//           { id: "ct_term3_ct3", name: "CT-3" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "model_test",
//     name: "Model Test",
//     children: [
//       { id: "model_1", name: "Model 1" },
//       { id: "model_2", name: "Model 2" },
//       { id: "model_3", name: "Model 3" },
//       { id: "model_4", name: "Model 4" },
//     ],
//   },
// ];

// /* ============================================================
//    CLASS TABLE
//    ============================================================ */

// // function ClassTable({ data, selectedId, onSelect }) {
// //   const columns = [
// //     { key: "name", label: "Class", flex: 1 },
// //     { key: "department", label: "Department", flex: 1.3 },
// //     { key: "studentType", label: "Student Type", flex: 1.3 },
// //     { key: "section", label: "Section", flex: 1 },
// //   ];

// //   return (
// //     <View className="bg-white rounded-2xl overflow-hidden border border-gray-200">
// //       <View className="flex-row bg-[#8E7CC3]">
// //         {columns.map((col) => (
// //           <View key={col.key} style={{ flex: col.flex }} className="py-3 px-2 justify-center">
// //             <Text className="text-white text-xs font-bold">{col.label}</Text>
// //           </View>
// //         ))}
// //       </View>

// //       {data.map((row, index) => {
// //         const isSelected = row.id === selectedId;
// //         return (
// //           <TouchableOpacity
// //             key={row.id}
// //             onPress={() => onSelect(row.id)}
// //             className={`flex-row ${
// //               index !== data.length - 1 ? "border-b border-gray-100" : ""
// //             } ${isSelected ? "bg-[#2A3063]" : "bg-white"}`}
// //           >
// //             {columns.map((col) => (
// //               <View key={col.key} style={{ flex: col.flex }} className="py-3 px-2 justify-center">
// //                 <Text className={`text-xs ${isSelected ? "text-[#8E7CC3] font-bold" : "text-gray-700"}`}>
// //                   {row[col.key]}
// //                 </Text>
// //               </View>
// //             ))}
// //           </TouchableOpacity>
// //         );
// //       })}
// //     </View>
// //   );
// // }

// function ClassTable({ data, selectedId, onSelect }) {
//   const columns = [
//     { key: "name", label: "Class", flex: 1 },
//     { key: "department", label: "Department", flex: 1.3 },
//     { key: "studentType", label: "Student Type", flex: 1.3 },
//     { key: "section", label: "Section", flex: 1 },
//   ];

//   return (
//     <View className="bg-white rounded-2xl overflow-hidden border border-gray-200">
//       {/* ================= HEADER ================= */}
//       <View className="flex-row bg-[#6B5CA5]">
//         {columns.map((col, idx) => (
//           <View
//             key={col.key}
//             style={{ flex: col.flex }}
//             className={`py-3.5 px-3 justify-center ${
//               idx !== columns.length - 1 ? "border-r border-[#7E6FB8]" : ""
//             }`}
//           >
//             <Text className="text-white text-[8px] font-bold  uppercase">
//               {col.label}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* ================= DATA ROWS ================= */}
//       {data.map((row, index) => {
//         const isSelected = row.id === selectedId;
//         const isEven = index % 2 === 0;
//         const isLast = index === data.length - 1;

//         // ব্যাকগ্রাউন্ড প্রায়োরিটি: Selected > Zebra > White
//         const rowBg = isSelected
//           ? "bg-[#E7E3F5]"          // সিলেক্টেড হলে হালকা বেগুনি
//           : isEven
//           ? "bg-white"              // জোড় রো → সাদা
//           : "bg-[#F7F7FA]";         // বিজোড় রো → খুব হালকা ধূসর (zebra)

//         return (
//           <TouchableOpacity
//             key={row.id}
//             activeOpacity={0.7}
//             onPress={() => onSelect(row.id)}
//             className={`flex-row ${rowBg} ${
//               !isLast ? "border-b border-gray-100" : ""
//             } ${isSelected ? "border-l-4 border-l-[#6B5CA5]" : "border-l-4 border-l-transparent"}`}
//           >
//             {columns.map((col, colIdx) => (
//               <View
//                 key={col.key}
//                 style={{ flex: col.flex }}
//                 className={`py-3.5 px-3 justify-center ${
//                   colIdx !== columns.length - 1 ? "border-r border-gray-100" : ""
//                 }`}
//               >
//                 <Text
//                   numberOfLines={1}
//                   className={`text-xs ${
//                     isSelected
//                       ? "text-[#4B3F82] font-bold"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {row[col.key]}
//                 </Text>
//               </View>
//             ))}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// /* ============================================================
//    CLASS PICKER FIELD
//    ============================================================ */

// function ClassPickerField({ label, placeholder, data, selectedId, onSelect }) {
//   const [visible, setVisible] = useState(false);
//   const selected = data.find((c) => c.id === selectedId);

//   const handleSelect = (id) => {
//     onSelect(id);
//     setVisible(false);
//   };

//   return (
//     <View className="mb-4">
//       <Text className="text-xs text-gray-400 mb-1">{label}</Text>

//       <TouchableOpacity
//         onPress={() => setVisible(true)}
//         className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
//       >
//         <Text numberOfLines={1} className={`flex-1 mr-2 ${selected ? "text-gray-800" : "text-gray-400"}`}>
//           {selected
//             ? `${selected.name} - ${selected.department} - ${selected.studentType} - ${selected.section}`
//             : placeholder}
//         </Text>
//         <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
//       </TouchableOpacity>

//       <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
//         <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", paddingHorizontal: 16 }}>
//           <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill} onPress={() => setVisible(false)} />

//           <View style={{ maxHeight: "80%" }} className="bg-white rounded-2xl p-4">
//             <View className="flex-row items-center justify-between mb-3">
//               <Text className="text-lg font-bold text-gray-800">Select Class</Text>
//               <TouchableOpacity onPress={() => setVisible(false)}>
//                 <Ionicons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false}>
//               <ClassTable data={data} selectedId={selectedId} onSelect={handleSelect} />
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// /* ============================================================
//    TREE DROPDOWN FIELD  (fully dynamic — any depth, any shape)
//    Pass a "tree" of nodes: { id, name, children? }
//    - node WITH children  -> tapping drills one level deeper
//    - node WITHOUT children -> tapping selects it (final value)
//    onSelect receives: { id, name, path } where path is the full
//    breadcrumb array e.g. ["Class Test", "Term-1 CT", "CT-1"]
//    ============================================================ */

// /* ============================================================
//    TREE ROW  (animated press + selected highlight + zebra stripe)
//    ============================================================ */



// function TreeRow({ node, index, isSelected, onPress }) {
//   const scale = useRef(new Animated.Value(1)).current;
//   const translateX = useRef(new Animated.Value(0)).current;

//   const animateIn = () => {
//     Animated.parallel([
//       Animated.spring(scale, { toValue: 1.03, useNativeDriver: true, friction: 6 }),
//       Animated.spring(translateX, { toValue: 6, useNativeDriver: true, friction: 6 }),
//     ]).start();
//   };

//   const animateOut = () => {
//     Animated.parallel([
//       Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
//       Animated.spring(translateX, { toValue: 0, useNativeDriver: true, friction: 6 }),
//     ]).start();
//   };

//   const hasChildren = node.children && node.children.length > 0;

//   return (
//     <Pressable onPressIn={animateIn} onPressOut={animateOut} onPress={() => onPress(node)}>
//       <Animated.View
//         style={{
//           transform: [{ scale }, { translateX }],
//           backgroundColor: isSelected ? "#2A3063" : "#8E7CC3",
//         }}
//         className="flex-row items-center justify-between px-4 py-3.5 rounded-xl mb-1.5"
//       >
//         <Text className="text-sm text-white font-semibold">{node.name}</Text>

//         {hasChildren ? (
//           <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
//         ) : isSelected ? (
//           <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
//         ) : null}
//       </Animated.View>
//     </Pressable>
//   );
// }

// /* ============================================================
//    TREE DROPDOWN FIELD  (fully dynamic — any depth, any shape)
//    ============================================================ */

// function TreeDropdownField({ label, placeholder, tree, selectedPath, onSelect }) {
//   const [visible, setVisible] = useState(false);
//   const [navStack, setNavStack] = useState([{ id: "root", title: label, nodes: tree }]);
//   const [selectedIdPath, setSelectedIdPath] = useState([]);

//   const currentLevel = navStack[navStack.length - 1];
//   const isRoot = navStack.length === 1;
//   const currentDepth = navStack.length - 1; // index into selectedIdPath for this level

//   const openModal = () => {
//     setNavStack([{ id: "root", title: label, nodes: tree }]);
//     setVisible(true);
//   };

//   const closeModal = () => {
//     setVisible(false);
//     setNavStack([{ id: "root", title: label, nodes: tree }]);
//   };

//   const goBack = () => {
//     setNavStack((prev) => prev.slice(0, -1));
//   };

//   const handlePressNode = (node) => {
//     const hasChildren = node.children && node.children.length > 0;

//     if (hasChildren) {
//       setNavStack((prev) => [...prev, { id: node.id, title: node.name, nodes: node.children }]);
//       return;
//     }

//     const idPath = navStack.slice(1).map((level) => level.id).concat(node.id);
//     const namePath = navStack.slice(1).map((level) => level.title).concat(node.name);

//     setSelectedIdPath(idPath);
//     onSelect({ id: node.id, name: node.name, path: namePath });
//     closeModal();
//   };

//   const displayText =
//     selectedPath && selectedPath.length ? selectedPath.join(" - ") : placeholder;

//   return (
//     <View className="mb-4">
//       <Text className="text-xs text-gray-400 mb-1">{label}</Text>

//       <TouchableOpacity
//         onPress={openModal}
//         className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
//       >
//         <Text
//           numberOfLines={1}
//           className={`flex-1 mr-2 ${
//             selectedPath && selectedPath.length ? "text-gray-800" : "text-gray-400"
//           }`}
//         >
//           {displayText}
//         </Text>
//         <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
//       </TouchableOpacity>

//       <Modal visible={visible} transparent animationType="fade" onRequestClose={closeModal}>
//         <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", paddingHorizontal: 16 }}>
//           <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill} onPress={closeModal} />

//           <View style={{ maxHeight: "80%" }} className="bg-white rounded-2xl p-4">
//             <View className="flex-row items-center mb-3">
//               {!isRoot && (
//                 <TouchableOpacity onPress={goBack} className="mr-2 -ml-1 p-1">
//                   <Ionicons name="chevron-back" size={22} color="#6B7280" />
//                 </TouchableOpacity>
//               )}
//               <Text className="text-lg font-bold text-gray-800 flex-1" numberOfLines={1}>
//                 {currentLevel.title}
//               </Text>
//               <TouchableOpacity onPress={closeModal}>
//                 <Ionicons name="close" size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false}>
//               {currentLevel.nodes.map((node, index) => (
//                 <TreeRow
//                   key={node.id}
//                   node={node}
//                   index={index}
//                   isSelected={selectedIdPath[currentDepth] === node.id}
//                   onPress={handlePressNode}
//                 />
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// /* ============================================================
//    SIMPLE DROPDOWN FIELD (flat list — used for Session)
//    ============================================================ */

// function DropdownField({ label, placeholder, options, selectedId, onSelect }) {
//   const [open, setOpen] = useState(false);
//   const selected = options.find((o) => o.id === selectedId);

//   return (
//     <View className="mb-4">
//       <Text className="text-xs text-gray-400 mb-1">{label}</Text>

//       <TouchableOpacity
//         onPress={() => setOpen((prev) => !prev)}
//         className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
//       >
//         <Text className={selected ? "text-gray-800" : "text-gray-400"}>
//           {selected ? selected.label : placeholder}
//         </Text>
//         <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#9CA3AF" />
//       </TouchableOpacity>

//       {open && (
//         <View className="border border-gray-200 rounded-xl mt-2 bg-white overflow-hidden">
//           {options.map((option, index) => (
//             <TouchableOpacity
//               key={option.id}
//               onPress={() => {
//                 onSelect(option.id);
//                 setOpen(false);
//               }}
//               className={`px-4 py-3 ${
//                 index !== options.length - 1 ? "border-b border-gray-100" : ""
//               } ${selectedId === option.id ? "bg-[#F3F0FA]" : ""}`}
//             >
//               <Text className={selectedId === option.id ? "text-[#8E7CC3] font-semibold" : "text-gray-700"}>
//                 {option.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// // function DropdownField({ label, placeholder, options, selectedId, onSelect }) {
// //   const [open, setOpen] = useState(false);
// //   const selected = options.find((o) => o.id === selectedId);

// //   return (
// //     <View className="mb-4">
// //       <Text className="text-xs text-gray-400 mb-1">{label}</Text>

// //       {/* ================= TRIGGER FIELD ================= */}
// //       <TouchableOpacity
// //         activeOpacity={0.7}
// //         onPress={() => setOpen((prev) => !prev)}
// //         className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
// //       >
// //         <Text className={selected ? "text-gray-800" : "text-gray-400"}>
// //           {selected ? selected.label : placeholder}
// //         </Text>
// //         <Ionicons
// //           name={open ? "chevron-up" : "chevron-down"}
// //           size={18}
// //           color="#9CA3AF"
// //         />
// //       </TouchableOpacity>

// //       {/* ================= OPTIONS LIST ================= */}
// //       {open && (
// //         <View className="border border-gray-200 rounded-2xl mt-2 bg-white overflow-hidden">
// //           {options.map((option, index) => {
// //             const isSelected = selectedId === option.id;
// //             const isEven = index % 2 === 0;
// //             const isLast = index === options.length - 1;

// //             // ব্যাকগ্রাউন্ড প্রায়োরিটি: Selected > Zebra > White
// //             const rowBg = isSelected
// //               ? "bg-[#E7E3F5]"            // সিলেক্টেড → হালকা বেগুনি
// //               : isEven
// //               ? "bg-white"                // জোড় → সাদা
// //               : "bg-[#F7F7FA]";           // বিজোড় → হালকা ধূসর (zebra)

// //             return (
// //               <TouchableOpacity
// //                 key={option.id}
// //                 activeOpacity={0.7}
// //                 onPress={() => {
// //                   onSelect(option.id);
// //                   setOpen(false);
// //                 }}
// //                 className={`flex-row items-center justify-between px-4 py-3.5 ${rowBg} ${
// //                   !isLast ? "border-b border-gray-100" : ""
// //                 } ${
// //                   isSelected
// //                     ? "border-l-4 border-l-[#6B5CA5]"
// //                     : "border-l-4 border-l-transparent"
// //                 }`}
// //               >
// //                 <Text
// //                   numberOfLines={1}
// //                   className={`text-xs ${
// //                     isSelected ? "text-[#4B3F82] font-bold" : "text-gray-700"
// //                   }`}
// //                 >
// //                   {option.label}
// //                 </Text>

// //                 {isSelected && (
// //                   <Ionicons name="checkmark-circle" size={18} color="#6B5CA5" />
// //                 )}
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// /* ============================================================
//    MAIN SCREEN
//    ============================================================ */

// export default function TeacherMarks() {
//   const router = useRouter();

//   const [selectedClassId, setSelectedClassId] = useState(null);
//   const [examTerm, setExamTerm] = useState(null); // { id, name, path }
//   const [examSession, setExamSession] = useState("2026");

//   const sessionOptions = SESSION_LIST.map((s) => ({ id: s.id, label: s.name }));

// const handleGo = () => {
//   if (!selectedClassId || !examTerm || !examSession) {
//     Alert.alert("Missing info", "Please select class, exam term and session.");
//     return;
//   }

//   const selectedClass = CLASS_LIST.find((c) => c.id === selectedClassId);

//   router.push({
//     pathname: "/teacher/SubjectMarkList", // TODO: update to your actual route path
//     params: {
//       classId: selectedClassId,
//       className: selectedClass
//         ? `${selectedClass.name} - ${selectedClass.department}`
//         : "",
//       session: examSession,
//       examTermId: examTerm.id,
//       examTermName: examTerm.path.join(" - "),
//     },
//   });
// };

//   return (
//     <View className="flex-1 bg-gray-50">
//       <Navbar title="Mark Entry" onBack={() => router.back()} onMenu={() => console.log("Menu opened")} />

//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
//       >
//         <Text className="text-2xl font-bold text-gray-800">Mark Entry</Text>
//         <Text className="text-gray-500 mt-1 mb-5">
//           Select class, exam term and session to continue
//         </Text>

//         <View className="bg-white rounded-2xl p-5 mb-5">
//           <ClassPickerField
//             label="SELECT CLASS"
//             placeholder="Select Class"
//             data={CLASS_LIST}
//             selectedId={selectedClassId}
//             onSelect={setSelectedClassId}
//           />
 
//         <DropdownField
//             label="SELECT EXAM SESSION"
//             placeholder="Select Exam Session"
//             options={sessionOptions}
//             selectedId={examSession}
//             onSelect={setExamSession}
//           />

//           <TreeDropdownField
//             label="SELECT EXAM TERM"
//             placeholder="Select Exam Term"
//             tree={EXAM_TERM_TREE}
//             selectedPath={examTerm?.path}
//             onSelect={setExamTerm}
//           />

          
//         </View>

//         <TouchableOpacity onPress={handleGo} className="bg-[#8E7CC3] rounded-xl py-4 items-center">
//           <Text className="text-white font-bold">Go</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }





// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   Alert,
// //   Modal,
// //   StyleSheet,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { useRouter } from "expo-router";
// // import Navbar from "../../Common_Components/CommonNavbar/Navbar";

// // /* ============================================================
// //    MOCK DATA (JSON-style) — swap these for real API calls later
// //    ============================================================ */

// // const CLASS_LIST = [
// //   { id: "c1", name: "One", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c2", name: "Two", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c3", name: "Three", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c4", name: "Four", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c5", name: "Five", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c6", name: "Six", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c7", name: "Seven", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c8", name: "Eight", department: "N/A", studentType: "Combined", section: "N/A" },
// //   { id: "c9", name: "Nine", department: "Science", studentType: "Combined", section: "N/A" },
// //   { id: "c10", name: "Nine", department: "Arts", studentType: "Combined", section: "N/A" },
// //   { id: "c11", name: "Nine", department: "Commerce", studentType: "Combined", section: "N/A" },
  
// // ];

// // const EXAM_TERM_LIST = [
// //   { id: "t1", name: "1st Terminal Exam" },
// //   { id: "t2", name: "2nd Terminal Exam" },
// //   { id: "t3", name: "Final Exam" },
// // ];

// // const SESSION_LIST = [
// //   { id: "2026", name: "2026" },
// //   { id: "2025", name: "2025" },
// //   { id: "2024", name: "2024" },
// // ];

// // const SUBJECTS_BY_CLASS = {
// //   Eight: [
// //     { id: "s1", name: "Bangla 1st Paper", code: "101", type: "Main", category: "", status: 96 },
// //     { id: "s2", name: "Bangla 2nd Paper", code: "102", type: "Main", category: "", status: 98 },
// //     { id: "s3", name: "English 1st Paper", code: "107", type: "Main", category: "", status: 98 },
// //     { id: "s4", name: "English 2nd Paper", code: "108", type: "Main", category: "", status: 96 },
// //     { id: "s5", name: "Mathematics", code: "109", type: "Main", category: "Single", status: 96 },
// //     { id: "s6", name: "Science", code: "127", type: "Main", category: "Single", status: 98 },
// //     { id: "s7", name: "Bangladesh And Global Studies", code: "150", type: "Main", category: "Single", status: 96 },
// //     { id: "s8", name: "Religion", code: "111", type: "Main", category: "Single", status: 94 },
// //     { id: "s9", name: "ICT", code: "154", type: "Main", category: "Single", status: 94 },
// //   ],
// //   // fallback used for any class without a dedicated list above
// //   DEFAULT: [
// //     { id: "d1", name: "Bangla 1st Paper", code: "101", type: "Main", category: "", status: 80 },
// //     { id: "d2", name: "English 1st Paper", code: "107", type: "Main", category: "", status: 72 },
// //     { id: "d3", name: "Mathematics", code: "109", type: "Main", category: "Single", status: 88 },
// //     { id: "d4", name: "Science", code: "127", type: "Main", category: "Single", status: 65 },
// //   ],
// // };

// // const STUDENTS_BY_SUBJECT = {
// //   s1: [
// //     { id: 1, name: "Rahim Ahmed", roll: "01", marks: "" },
// //     { id: 2, name: "Karim Hasan", roll: "02", marks: "" },
// //     { id: 3, name: "Fatema Begum", roll: "03", marks: "" },
// //     { id: 4, name: "Ayesha Siddika", roll: "04", marks: "" },
// //   ],
// //   // fallback used for any subject without a dedicated roster above
// //   DEFAULT: [
// //     { id: 1, name: "Rahim Ahmed", roll: "01", marks: "" },
// //     { id: 2, name: "Karim Hasan", roll: "02", marks: "" },
// //     { id: 3, name: "Fatema Begum", roll: "03", marks: "" },
// //     { id: 4, name: "Ayesha Siddika", roll: "04", marks: "" },
// //   ],
// // };

// // /* ============================================================
// //    CLASS TABLE
// //    Full table: Class | Department | Student Type | Section
// //    (now shown inside the modal)
// //    ============================================================ */

// // function ClassTable({ data, selectedId, onSelect }) {
// //   const columns = [
// //     { key: "name", label: "Class", flex: 1 },
// //     { key: "department", label: "Department", flex: 1.3 },
// //     { key: "studentType", label: "Student Type", flex: 1.3 },
// //     { key: "section", label: "Section", flex: 1 },
// //   ];

// //   return (
// //     <View className="bg-white rounded-2xl overflow-hidden border border-gray-200">
// //       {/* ---------- Table Header ---------- */}
// //       <View className="flex-row bg-[#8E7CC3]">
// //         {columns.map((col) => (
// //           <View
// //             key={col.key}
// //             style={{ flex: col.flex }}
// //             className="py-3 px-2 justify-center"
// //           >
// //             <Text className="text-white text-xs font-bold">{col.label}</Text>
// //           </View>
// //         ))}
// //       </View>

// //       {/* ---------- Table Rows ---------- */}
// //       {data.map((row, index) => {
// //         const isSelected = row.id === selectedId;
// //         return (
// //           <TouchableOpacity
// //             key={row.id}
// //             onPress={() => onSelect(row.id)}
// //             className={`flex-row ${
// //               index !== data.length - 1 ? "border-b border-gray-100" : ""
// //             } ${isSelected ? "bg-[#F3F0FA]" : "bg-white"}`}
// //           >
// //             {columns.map((col) => (
// //               <View
// //                 key={col.key}
// //                 style={{ flex: col.flex }}
// //                 className="py-3 px-2 justify-center"
// //               >
// //                 <Text
// //                   className={`text-xs ${
// //                     isSelected ? "text-[#8E7CC3] font-bold" : "text-gray-700"
// //                   }`}
// //                 >
// //                   {row[col.key]}
// //                 </Text>
// //               </View>
// //             ))}
// //           </TouchableOpacity>
// //         );
// //       })}
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    CLASS PICKER FIELD
// //    Looks like a dropdown. On tap -> a modal opens with the FULL
// //    class table. Tap a row -> it gets selected and modal closes.
// //    ============================================================ */

// // function ClassPickerField({ label, placeholder, data, selectedId, onSelect }) {
// //   const [visible, setVisible] = useState(false);
// //   const selected = data.find((c) => c.id === selectedId);

// //   const handleSelect = (id) => {
// //     onSelect(id);
// //     setVisible(false);
// //   };

// //   return (
// //     <View className="mb-4">
// //       <Text className="text-xs text-gray-400 mb-1">{label}</Text>

// //       {/* ---------- Dropdown-looking button ---------- */}
// //       <TouchableOpacity
// //         onPress={() => setVisible(true)}
// //         className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
// //       >
// //      <Text
// //         numberOfLines={1}
// //         className={`flex-1 mr-2 ${selected ? "text-gray-800" : "text-gray-400"}`}
// //       >
// //         {selected
// //           ? `${selected.name} - ${selected.department} - ${selected.studentType} - ${selected.section}`
// //           : placeholder}
// //       </Text>
// //         <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
// //       </TouchableOpacity>

// //       {/* ---------- Modal with the full table ---------- */}
// //       <Modal
// //         visible={visible}
// //         transparent
// //         animationType="fade"
// //         onRequestClose={() => setVisible(false)}
// //       >
// //         <View
// //           style={{
// //             flex: 1,
// //             backgroundColor: "rgba(0,0,0,0.5)",
// //             justifyContent: "center",
// //             paddingHorizontal: 16,
// //           }}
// //         >
// //           {/* Tap outside the card to close */}
// //           <TouchableOpacity
// //             activeOpacity={1}
// //             style={StyleSheet.absoluteFill}
// //             onPress={() => setVisible(false)}
// //           />

// //           <View
// //             style={{ maxHeight: "80%" }}
// //             className="bg-white rounded-2xl p-4"
// //           >
// //             {/* Modal header */}
// //             <View className="flex-row items-center justify-between mb-3">
// //               <Text className="text-lg font-bold text-gray-800">Select Class</Text>
// //               <TouchableOpacity onPress={() => setVisible(false)}>
// //                 <Ionicons name="close" size={24} color="#6B7280" />
// //               </TouchableOpacity>
// //             </View>

// //             {/* Full table */}
// //             <ScrollView showsVerticalScrollIndicator={false}>
// //               <ClassTable
// //                 data={data}
// //                 selectedId={selectedId}
// //                 onSelect={handleSelect}
// //               />
// //             </ScrollView>
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    REUSABLE DROPDOWN FIELD
// //    Used for "Select Exam Term / Select Exam Session"
// //    ============================================================ */

// // function DropdownField({ label, placeholder, options, selectedId, onSelect }) {
// //   const [open, setOpen] = useState(false);
// //   const selected = options.find((o) => o.id === selectedId);

// //   return (
// //     <View className="mb-4">
// //       <Text className="text-xs text-gray-400 mb-1">{label}</Text>

// //       <TouchableOpacity
// //         onPress={() => setOpen((prev) => !prev)}
// //         className="h-12 border border-gray-300 rounded-xl px-4 flex-row items-center justify-between bg-white"
// //       >
// //         <Text className={selected ? "text-gray-800" : "text-gray-400"}>
// //           {selected ? selected.label : placeholder}
// //         </Text>
// //         <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#9CA3AF" />
// //       </TouchableOpacity>

// //       {open && (
// //         <View className="border border-gray-200 rounded-xl mt-2 bg-white overflow-hidden">
// //           {options.map((option, index) => (
// //             <TouchableOpacity
// //               key={option.id}
// //               onPress={() => {
// //                 onSelect(option.id);
// //                 setOpen(false);
// //               }}
// //               className={`px-4 py-3 ${
// //                 index !== options.length - 1 ? "border-b border-gray-100" : ""
// //               } ${selectedId === option.id ? "bg-[#F3F0FA]" : ""}`}
// //             >
// //               <Text
// //                 className={
// //                   selectedId === option.id
// //                     ? "text-[#8E7CC3] font-semibold"
// //                     : "text-gray-700"
// //                 }
// //               >
// //                 {option.label}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// // /* ============================================================
// //    MAIN SCREEN
// //    step 1 = Class / Term / Session filters
// //    step 2 = Subject list with mark-entry %
// //    step 3 = Student marks entry
// //    ============================================================ */

// // export default function TeacherMarks() {
// //   const router = useRouter();

// //   const [step, setStep] = useState(1);

// //   const [selectedClassId, setSelectedClassId] = useState(null);
// //   const [selectedTermId, setSelectedTermId] = useState(null);
// //   const [examSession, setExamSession] = useState("2026");

// //   const [selectedSubject, setSelectedSubject] = useState(null);
// //   const [students, setStudents] = useState([]);

// //   const selectedClass = CLASS_LIST.find((c) => c.id === selectedClassId);
// //   const selectedTerm = EXAM_TERM_LIST.find((t) => t.id === selectedTermId);

// //   const termOptions = EXAM_TERM_LIST.map((t) => ({ id: t.id, label: t.name }));
// //   const sessionOptions = SESSION_LIST.map((s) => ({ id: s.id, label: s.name }));

// //   const subjectList = selectedClass
// //     ? SUBJECTS_BY_CLASS[selectedClass.name] || SUBJECTS_BY_CLASS.DEFAULT
// //     : [];

// //   const statusColor = (status) => {
// //     if (status >= 90) return { bg: "bg-green-500", text: "text-white" };
// //     if (status >= 75) return { bg: "bg-amber-500", text: "text-white" };
// //     return { bg: "bg-red-500", text: "text-white" };
// //   };

// //   const handleGo = () => {
// //     if (!selectedClassId || !selectedTermId || !examSession) {
// //       Alert.alert("Missing info", "Please select class, exam term and session.");
// //       return;
// //     }
// //     setStep(2);
// //   };

// //   const handleSelectSubject = (subject) => {
// //     setSelectedSubject(subject);
// //     setStudents(STUDENTS_BY_SUBJECT[subject.id] || STUDENTS_BY_SUBJECT.DEFAULT);
// //     setStep(3);
// //   };

// //   const handleMarksChange = (id, value) => {
// //     setStudents((current) =>
// //       current.map((student) =>
// //         student.id === id ? { ...student, marks: value } : student
// //       )
// //     );
// //   };

// //   const handleSave = () => {
// //     Alert.alert("Success", "Student marks saved successfully!");
// //     console.log({
// //       selectedClass,
// //       selectedTerm,
// //       examSession,
// //       selectedSubject,
// //       students,
// //     });
// //   };

// //   const handleBack = () => {
// //     if (step === 3) setStep(2);
// //     else if (step === 2) setStep(1);
// //     else router.back();
// //   };

// //   return (
// //     <View className="flex-1 bg-gray-50">
// //       {/* =====================================================
// //           STATIC COMMON NAVBAR
// //           ===================================================== */}

// //       <Navbar
// //         title={
// //           step === 1
// //             ? "Mark Entry"
// //             : step === 2
// //             ? "Select Subject"
// //             : selectedSubject?.name || "Mark Entry"
// //         }
// //         onBack={handleBack}
// //         onMenu={() => console.log("Menu opened")}
// //       />

// //       {/* =====================================================
// //           SCROLLABLE CONTENT
// //           ===================================================== */}

// //       <ScrollView
// //         className="flex-1"
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={{
// //           paddingHorizontal: 20,
// //           paddingTop: 20,
// //           paddingBottom: 40,
// //         }}
// //       >
// //         {/* ---------- STEP 1: Class / Exam Term / Session ---------- */}
// //         {step === 1 && (
// //           <>
// //             <Text className="text-2xl font-bold text-gray-800">Mark Entry</Text>
// //             <Text className="text-gray-500 mt-1 mb-5">
// //               Select class, exam term and session to continue
// //             </Text>

// //             <View className="bg-white rounded-2xl p-5 mb-5">
// //               {/* Class -> opens modal with full table */}
// //               <ClassPickerField
// //                 label="SELECT CLASS"
// //                 placeholder="Select Class"
// //                 data={CLASS_LIST}
// //                 selectedId={selectedClassId}
// //                 onSelect={setSelectedClassId}
// //               />

// //               {/* Exam Term Dropdown */}
// //               <DropdownField
// //                 label="SELECT EXAM TERM"
// //                 placeholder="Select Exam Term"
// //                 options={termOptions}
// //                 selectedId={selectedTermId}
// //                 onSelect={setSelectedTermId}
// //               />

// //               {/* Exam Session Dropdown */}
// //               <DropdownField
// //                 label="SELECT EXAM SESSION"
// //                 placeholder="Select Exam Session"
// //                 options={sessionOptions}
// //                 selectedId={examSession}
// //                 onSelect={setExamSession}
// //               />
// //             </View>

// //             {/* Go button -> step 2 */}
// //             <TouchableOpacity
// //               onPress={handleGo}
// //               className="bg-[#8E7CC3] rounded-xl py-4 items-center"
// //             >
// //               <Text className="text-white font-bold">Go</Text>
// //             </TouchableOpacity>
// //           </>
// //         )}

// //         {/* ---------- STEP 2: Subject list ---------- */}
// //         {step === 2 && (
// //           <>
// //             <View className="flex-row flex-wrap mb-4">
// //               {[
// //                 { label: "Class", value: selectedClass?.name },
// //                 { label: "Department", value: selectedClass?.department },
// //                 { label: "Student Type", value: selectedClass?.studentType },
// //                 { label: "Section", value: selectedClass?.section },
// //                 { label: "Exam Term", value: selectedTerm?.name },
// //                 { label: "Session", value: examSession },
// //               ].map((chip, index) => (
// //                 <View
// //                   key={index}
// //                   className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row"
// //                 >
// //                   <Text className="text-gray-500 text-xs">{chip.label}: </Text>
// //                   <Text className="text-gray-800 text-xs font-semibold">
// //                     {chip.value}
// //                   </Text>
// //                 </View>
// //               ))}
// //             </View>

// //             <Text className="text-gray-500 mb-3">Tap a subject to enter marks</Text>

// //             {subjectList.map((subject) => {
// //               const colors = statusColor(subject.status);
// //               return (
// //                 <TouchableOpacity
// //                   key={subject.id}
// //                   onPress={() => handleSelectSubject(subject)}
// //                   className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between"
// //                 >
// //                   <View className="flex-row items-center flex-1">
// //                     <View className="w-10 h-10 rounded-full bg-[#F3F0FA] items-center justify-center mr-3">
// //                       <Ionicons name="book-outline" size={18} color="#8E7CC3" />
// //                     </View>

// //                     <View className="flex-1">
// //                       <Text className="text-base font-bold text-gray-800">
// //                         {subject.name}
// //                       </Text>
// //                       <Text className="text-gray-500 text-xs mt-0.5">
// //                         Code: {subject.code} · {subject.type}
// //                         {subject.category ? ` · ${subject.category}` : ""}
// //                       </Text>
// //                     </View>
// //                   </View>

// //                   <View className={`rounded-full px-3 py-1 ${colors.bg}`}>
// //                     <Text className={`text-xs font-bold ${colors.text}`}>
// //                       {subject.status}%
// //                     </Text>
// //                   </View>
// //                 </TouchableOpacity>
// //               );
// //             })}
// //           </>
// //         )}

// //         {/* ---------- STEP 3: Student marks entry ---------- */}
// //         {step === 3 && (
// //           <>
// //             <View className="bg-white rounded-2xl p-5 mb-4">
// //               <Text className="text-xs text-gray-400">SUBJECT</Text>

// //               <Text className="text-lg font-bold text-gray-800 mt-1">
// //                 {selectedSubject?.name}
// //               </Text>

// //               <Text className="text-gray-500 text-xs mt-1">{selectedSubject?.code}</Text>
// //             </View>

// //             {students.map((student) => (
// //               <View key={student.id} className="bg-white rounded-2xl p-4 mb-3">
// //                 <View className="flex-row items-center justify-between">
// //                   <View className="flex-1">
// //                     <Text className="text-base font-bold text-gray-800">
// //                       {student.name}
// //                     </Text>

// //                     <Text className="text-gray-500 text-xs mt-1">
// //                       Roll: {student.roll}
// //                     </Text>
// //                   </View>

// //                   <View className="w-20">
// //                     <TextInput
// //                       value={student.marks}
// //                       onChangeText={(value) =>
// //                         handleMarksChange(student.id, value)
// //                       }
// //                       placeholder="Marks"
// //                       keyboardType="numeric"
// //                       className="h-11 border border-gray-300 rounded-lg text-center text-gray-800"
// //                     />
// //                   </View>
// //                 </View>
// //               </View>
// //             ))}

// //             <TouchableOpacity
// //               onPress={handleSave}
// //               className="bg-[#8E7CC3] rounded-xl py-4 items-center mt-3 mb-8"
// //             >
// //               <View className="flex-row items-center">
// //                 <Ionicons name="save-outline" size={20} color="white" />
// //                 <Text className="text-white font-bold ml-2">Save Marks</Text>
// //               </View>
// //             </TouchableOpacity>
// //           </>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // }