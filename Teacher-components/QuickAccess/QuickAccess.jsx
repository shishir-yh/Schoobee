import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { quickAccessData } from "../../data/Teacher_information/quickAccess.js";

export default function QuickAccess() {
  const [showMore, setShowMore] = useState(false);

  const visibleItems = showMore
    ? quickAccessData
    : quickAccessData.slice(0, 9);

  const previewItems = quickAccessData.slice(9, 12);

  // Handle navigation for Quick Access items
  const handleNavigation = (title) => {
    switch (title) {
      case "Profile":
        router.push("/teacher/profile");
        break;

      case "Online Class":
        router.push("/teacher/online-class");
        break;

      case "Mark Entry":
        router.push("/teacher/marks");
        break;

      case "Take Attend":
        router.push("/teacher/attendance");
        break;

      case "Student List":
        router.push("/teacher/students");
        break;

      case "Routine":
        router.push("/teacher/(tabs)/routine");
        break;

      case "My Attendance":
        router.push("/teacher/my-attendance");
        break;

      case "Academic Cal":
        router.push("/teacher/academic-calendar");
        break;

      case "Notices":
        router.push("/teacher/notices");
        break;

      default:
        console.warn(`No route found for: ${title}`);
        break;
    }
  };

  return (
    <View className="px-5 pt-3">
      <Text className="text-xl font-bold text-gray-800 mb-2">
        Quick Access
      </Text>

      {/* QUICK ACCESS */}
      <View className="flex-row flex-wrap justify-between">
        {visibleItems.map((item) => (
          <TouchableOpacity
            key={item.title}
            className="w-[31%] mb-5 items-center"
            onPress={() => handleNavigation(item.title)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={item.title}
          >
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

       <Text
  className="text-sm font-semibold text-gray-800 text-center mt-2"
  numberOfLines={2}
>
  {item.title}
</Text>
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

      {/* FADED PREVIEW */}
      {!showMore && previewItems.length > 0 && (
        <View
          className="flex-row flex-wrap justify-between"
          style={{
            opacity: 0.12,
            marginTop: -2,
          }}
        >
          {previewItems.map((item) => (
            <View
              key={item.title}
              className="w-[31%] mb-5 items-center"
            >
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

              <Text
                className="text-xs text-gray-700 text-center mt-2"
                numberOfLines={2}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* SHOW MORE */}
      {quickAccessData.length > 9 && (
        <View
          className="items-center"
          style={{
            marginTop: showMore ? 0 : -65,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowMore((prev) => !prev)}
            activeOpacity={0.8}
            className="flex-row items-center bg-white rounded-2xl px-6 py-3"
            style={{
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.12,
              shadowRadius: 5,
            }}
          >
            <Text className="text-[#8E7CC3] text-base font-semibold">
              {showMore ? "Show Less" : "Show More"}
            </Text>

            <Ionicons
              name={showMore ? "chevron-up" : "chevron-down"}
              size={10}
              color="#8E7CC3"
              style={{
                marginLeft: 7,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


// import { useState,router } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { quickAccessData } from "../../data/Teacher_information/quickAccess.js";

// export default function QuickAccess({ onPress }) {
//   const [showMore, setShowMore] = useState(false);

//   // First 9 items
//   const visibleItems = showMore
//     ? quickAccessData
//     : quickAccessData.slice(0, 9);

//   // Next 3 items for faded preview
//   const previewItems = quickAccessData.slice(9, 12);

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

//   return (
//     <View className="px-5 pt-6">

//       {/* Title */}
//       <Text className="text-xl font-bold text-gray-800 mb-4">
//         Quick Access
//       </Text>

//       {/* =========================
//           QUICK ACCESS
//       ========================= */}

//       <View className="flex-row flex-wrap justify-between">

//         {visibleItems.map((item) => (
//           <TouchableOpacity
//             key={item.title}
//             className="w-[31%] mb-5 items-center"
//             onPress={() => onPress(item.title)}
//             activeOpacity={0.7}
//             accessibilityRole="button"
//             accessibilityLabel={item.title}
//           >
//             {/* Icon */}
//             <View
//               className="w-16 h-16 rounded-2xl items-center justify-center"
//               style={{
//                 backgroundColor: `${item.color}20`,
//               }}
//             >
//               <Ionicons
//                 name={item.icon}
//                 size={28}
//                 color={item.color}
//               />
//             </View>

//             {/* Title */}
//             <Text
//               className="text-xs text-gray-700 text-center mt-2"
//               numberOfLines={2}
//             >
//               {item.title}
//             </Text>

//             {/* Badge */}
//             {item.badge && (
//               <View className="absolute top-0 right-3 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
//                 <Text className="text-white text-[10px] font-bold">
//                   {item.badge}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         ))}

//       </View>

//       {/* =========================
//           FADED PREVIEW
//       ========================= */}

//       {!showMore && previewItems.length > 0 && (
//         <View
//           className="flex-row flex-wrap justify-between"
//           style={{
//             opacity: 0.12,
//             marginTop: -2,
//           }}
//         >
//           {previewItems.map((item) => (
//             <View
//               key={item.title}
//               className="w-[31%] mb-5 items-center"
//             >
//               {/* Icon */}
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

//               {/* Title */}
//               <Text
//                 className="text-xs text-gray-700 text-center mt-2"
//                 numberOfLines={2}
//               >
//                 {item.title}
//               </Text>
//             </View>
//           ))}
//         </View>
//       )}

//       {/* =========================
//           SHOW MORE BUTTON
//       ========================= */}

//       {quickAccessData.length > 9 && (
//         <View
//           className="items-center"
//           style={{
//             marginTop: showMore ? 0 : -8,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => setShowMore(!showMore)}
//             activeOpacity={0.8}
//             className="flex-row items-center bg-white rounded-2xl px-6 py-3"
//             style={{
//               elevation: 4,
//               shadowColor: "#000",
//               shadowOffset: {
//                 width: 0,
//                 height: 2,
//               },
//               shadowOpacity: 0.12,
//               shadowRadius: 5,
//             }}
//           >
//             <Text className="text-[#8E7CC3] text-base font-semibold">
//               {showMore ? "Show Less" : "Show More"}
//             </Text>

//             <Ionicons
//               name={showMore ? "chevron-up" : "chevron-down"}
//               size={20}
//               color="#8E7CC3"
//               style={{
//                 marginLeft: 7,
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//       )}

//     </View>
//   );
// }


// // import { useState } from "react";
// // import { View, Text, TouchableOpacity } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { quickAccessData } from "../../data/Teacher_information/quickAccess.js";

// // export default function QuickAccess({ onPress }) {
// //   const [showMore, setShowMore] = useState(false);

// //   // First 8 items will be fully visible
// //   const visibleItems = showMore
// //     ? quickAccessData
// //     : quickAccessData.slice(0, 8);

// //   // Preview of next 4 items
// //   const previewItems = quickAccessData.slice(8, 12);

// //   return (
// //     <View className="px-5 pt-6">
// //       {/* Title */}
// //       <Text className="text-xl font-bold text-gray-800 mb-4">
// //         Quick Access
// //       </Text>

// //       {/* =========================
// //           QUICK ACCESS GRID
// //       ========================= */}

// //       <View className="flex-row flex-wrap justify-between">
// //         {visibleItems.map((item) => (
// //           <TouchableOpacity
// //             key={item.title}
// //             className="w-[23%] mb-6 items-center"
// //             onPress={() => onPress(item.title)}
// //             activeOpacity={0.7}
// //             accessibilityRole="button"
// //             accessibilityLabel={item.title}
// //           >
// //             {/* Icon */}
// //             <View
// //               className="w-16 h-16 rounded-full items-center justify-center"
// //               style={{
// //                 backgroundColor: `${item.color}15`,
// //               }}
// //             >
// //               <Ionicons
// //                 name={item.icon}
// //                 size={28}
// //                 color={item.color}
// //               />
// //             </View>

// //             {/* Title */}
// //             <Text
// //               className="text-xs text-gray-700 text-center mt-2"
// //               numberOfLines={2}
// //             >
// //               {item.title}
// //             </Text>

// //             {/* Badge */}
// //             {item.badge && (
// //               <View className="absolute top-0 right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
// //                 <Text className="text-white text-[10px] font-bold">
// //                   {item.badge}
// //                 </Text>
// //               </View>
// //             )}
// //           </TouchableOpacity>
// //         ))}
// //       </View>

// //       {/* =========================
// //           FADED PREVIEW
// //       ========================= */}

// //       {!showMore && previewItems.length > 0 && (
// //         <View
// //           className="flex-row justify-between"
// //           style={{
// //             opacity: 0.12,
// //             marginTop: -2,
// //           }}
// //         >
// //           {previewItems.map((item) => (
// //             <View
// //               key={item.title}
// //               className="w-[23%] items-center"
// //             >
// //               <View
// //                 className="w-16 h-16 rounded-full items-center justify-center"
// //                 style={{
// //                   backgroundColor: `${item.color}15`,
// //                 }}
// //               >
// //                 <Ionicons
// //                   name={item.icon}
// //                   size={28}
// //                   color={item.color}
// //                 />
// //               </View>

// //               <Text
// //                 className="text-xs text-gray-700 text-center mt-2"
// //                 numberOfLines={2}
// //               >
// //                 {item.title}
// //               </Text>
// //             </View>
// //           ))}
// //         </View>
// //       )}

// //       {/* =========================
// //           SHOW MORE BUTTON
// //       ========================= */}

// //       {quickAccessData.length > 8 && (
// //         <View
// //           className="items-center"
// //           style={{
// //             marginTop: showMore ? 0 : -8,
// //           }}
// //         >
// //           <TouchableOpacity
// //             onPress={() => setShowMore(!showMore)}
// //             activeOpacity={0.8}
// //             className="flex-row items-center bg-white rounded-2xl px-6 py-3"
// //             style={{
// //               elevation: 4,
// //               shadowColor: "#000",
// //               shadowOffset: {
// //                 width: 0,
// //                 height: 2,
// //               },
// //               shadowOpacity: 0.12,
// //               shadowRadius: 5,
// //             }}
// //           >
// //             <Text className="text-[#8E7CC3] text-base font-semibold">
// //               {showMore ? "Show Less" : "Show More"}
// //             </Text>

// //             <Ionicons
// //               name={showMore ? "chevron-up" : "chevron-down"}
// //               size={20}
// //               color="#8E7CC3"
// //               style={{
// //                 marginLeft: 7,
// //               }}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //     </View>
// //   );
// // }


// // import { useState } from "react";
// // import { View, Text, TouchableOpacity } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { quickAccessData } from "../../data/Teacher_information/quickAccess.js";

// // export default function QuickAccess({ onPress }) {
// //   const [showMore, setShowMore] = useState(false);

// //   const visibleItems = showMore
// //     ? quickAccessData
// //     : quickAccessData.slice(0, 9);

// //   return (
// //     <View className="px-5 pt-6">
// //       {/* Title */}
// //       <Text className="text-xl font-bold text-gray-800 mb-4">
// //         Quick Access
// //       </Text>

// //       {/* Quick Access Items */}
// //       <View className="flex-row flex-wrap justify-between">
// //         {visibleItems.map((item) => (
// //           <TouchableOpacity
// //             key={item.title}
// //             className="w-[31%] mb-5 items-center"
// //             onPress={() => onPress(item.title)}
// //             activeOpacity={0.7}
// //             accessibilityRole="button"
// //             accessibilityLabel={item.title}
// //           >
// //             {/* Icon */}
// //             <View
// //               className="w-16 h-16 rounded-2xl items-center justify-center"
// //               style={{
// //                 backgroundColor: `${item.color}20`,
// //               }}
// //             >
// //               <Ionicons
// //                 name={item.icon}
// //                 size={28}
// //                 color={item.color}
// //               />
// //             </View>

// //             {/* Title */}
// //             <Text
// //               className="text-xs text-gray-700 text-center mt-2"
// //               numberOfLines={2}
// //             >
// //               {item.title}
// //             </Text>

// //             {/* Badge */}
// //             {item.badge && (
// //               <View className="absolute top-0 right-3 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
// //                 <Text className="text-white text-[10px] font-bold">
// //                   {item.badge}
// //                 </Text>
// //               </View>
// //             )}
// //           </TouchableOpacity>
// //         ))}
// //       </View>

// //       {/* More / Less Button */}
// //       {quickAccessData.length > 9 && (
// //         <TouchableOpacity
// //           onPress={() => setShowMore(!showMore)}
// //           activeOpacity={0.7}
// //           className="self-center mt-1 mb-2 flex-row items-center px-5 py-2.5 rounded-full bg-[#F2EEF7]"
// //         >
// //           <Text className="text-[#8E7CC3] font-semibold text-sm">
// //             {showMore ? "Show Less" : "More"}
// //           </Text>

// //           <Ionicons
// //             name={showMore ? "chevron-up" : "chevron-down"}
// //             size={17}
// //             color="#8E7CC3"
// //             style={{ marginLeft: 5 }}
// //           />
// //         </TouchableOpacity>
// //       )}
// //     </View>
// //   );
// // }