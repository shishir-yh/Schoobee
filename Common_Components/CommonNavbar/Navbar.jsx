// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";

// import { ArrowLeft, MoreVertical } from "lucide-react-native";

// const Navbar = ({
//   title = "Online Class",
//   onBack,
//   onMenu,
//   bgImage = "https://i.ibb.co.com/5WGFcCgf/image.png",
// }) => {
//   return (
//     <ImageBackground
//       source={{ uri: bgImage }}
//       resizeMode="cover"
//       style={{
//         width: "100%",
//         height: 60,
//       }}
//     >
//       {/* Purple overlay */}
//       <View
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(88, 55, 140, 0.60)",
//         }}
//       />

//       {/* Navbar content */}
//       <View className="flex-1 flex-row items-center justify-between px-4">

//         {/* Left side */}
//         <View className="flex-row items-center">

//           <TouchableOpacity
//             onPress={onBack}
//             activeOpacity={0.7}
//             className="mr-4 p-1"
//           >
//             <ArrowLeft
//               size={26}
//               color="#ffffff"
//               strokeWidth={2}
//             />
//           </TouchableOpacity>

//           <Text className="text-xl font-bold text-white">
//             {title}
//           </Text>

//         </View>


//         {/* Right side */}
//         <TouchableOpacity
//           onPress={onMenu}
//           activeOpacity={0.7}
//           className="p-1"
//         >
//           <MoreVertical
//             size={26}
//             color="#ffffff"
//             strokeWidth={2}
//           />
//         </TouchableOpacity>

//       </View>
//     </ImageBackground>
//   );
// };

// export default Navbar;


import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, MoreVertical } from "lucide-react-native";

const Navbar = ({
  title = "Online Class",
  subtitle,
  onBack,
  onMenu,
  bgImage = "https://i.ibb.co.com/5WGFcCgf/image.png",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={{ uri: bgImage }}
      resizeMode="cover"
      style={{
        width: "100%",
        paddingTop: insets.top,
        // Bigger, breathing-room height
        height: 60 + insets.top + 20,
        // Soft shadow so it lifts off the content below
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
          },
          android: { elevation: 6 },
        }),
      }}
    >
      {/* Purple overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(88, 55, 140, 0.65)",
        }}
      />

      {/* Navbar content */}
      <View className="flex-1 flex-row items-center justify-between px-5">
        {/* Left side */}
        <View className="flex-row items-center flex-1 mr-3">
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.6}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: 8,
              marginRight: 14,
            }}
          >
            <ArrowLeft size={24} color="#ffffff" strokeWidth={2.2} />
          </TouchableOpacity>

          <View className="flex-1">
            <Text
              className="text-xl font-bold text-white"
              numberOfLines={1}
              style={{ letterSpacing: 0.2 }}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                className="text-xs text-white/80 mt-0.5"
                numberOfLines={1}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Right side */}
        <TouchableOpacity
          onPress={onMenu}
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 20,
            padding: 8,
          }}
        >
          <MoreVertical size={24} color="#ffffff" strokeWidth={2.2} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Navbar;
