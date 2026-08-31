// import { View, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { overviewData } from "../../data/Teacher_information/overview.js";

// export default function Overview() {

//   return (
//     <View className="px-5 mt-4">
//       <Text className="text-xl font-bold text-gray-800 mb-4">
//         Overview
//       </Text>

//       <View className="flex-row flex-wrap justify-between">
//         {overviewData.map((item) => (
//           <View
//             key={item.label}
//             className="w-[48%] bg-white rounded-2xl p-4 mb-3"
//           >
//             <View className="flex-row items-center justify-between">
              
//               {/* Text */}
//               <View>
//                 <Text className="text-2xl font-bold text-gray-800">
//                   {item.value}
//                 </Text>

//                 <Text className="text-gray-500 text-xs mt-1">
//                   {item.label}
//                 </Text>
//               </View>

//               {/* Icon */}
//               <View
//                 className="w-10 h-10 rounded-xl items-center justify-center"
//                 style={{
//                   backgroundColor: `${item.color}20`,
//                 }}
//               >
//                 <Ionicons
//                   name={item.icon}
//                   size={20}
//                   color={item.color}
//                 />
//               </View>

//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { overviewData } from "../../data/Teacher_information/overview.js";

export default function Overview() {
  return (
    <View className="px-5 mt-5">
      {/* Section Title */}
      <View className="mb-4">
        <Text className="text-xl font-bold text-gray-800">
          Overview
        </Text>

        <Text className="text-xs text-gray-400 mt-1">
          Your teaching summary at a glance
        </Text>
      </View>

      {/* Overview Cards */}
      <View className="flex-row flex-wrap justify-between">
        {overviewData.map((item) => (
          <View
            key={item.label}
            className="w-[48%] bg-white rounded-2xl p-4 mb-3"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            {/* Top Row */}
            <View className="flex-row items-start justify-between">
              
              {/* Value & Label */}
              <View className="flex-1 pr-2">
                <Text className="text-2xl font-bold text-gray-800">
                  {item.value}
                </Text>

                <Text
                  className="text-gray-500 text-xs mt-1"
                  numberOfLines={2}
                >
                  {item.label}
                </Text>
              </View>

              {/* Icon */}
              <View
                className="w-11 h-11 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: `${item.color}18`,
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.color}
                />
              </View>
            </View>

            {/* Bottom Accent */}
            <View
              className="h-1 rounded-full mt-4"
              style={{
                backgroundColor: `${item.color}30`,
              }}
            />

            <View
              className="absolute bottom-0 left-4 right-4 h-1 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}