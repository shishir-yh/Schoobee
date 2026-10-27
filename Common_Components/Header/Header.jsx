import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";


// =========================
// Default Header Image
// =========================

const DEFAULT_HEADER_IMAGE =
  "https://i.ibb.co.com/5WGFcCgf/image.png";


// =========================
// Time-based Greeting
// =========================

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}


// =========================
// Header Component
// =========================

export default function Header({
  currentUser,
  insets,
  onMenuPress,
  role = "Teacher",

  // ---------- Image ----------
  // URL string:        headerImage="https://example.com/bg.png"
  // Local file:        headerImage={require("../assets/bg.png")}
  // No image (solid):  headerImage={null}
  headerImage = DEFAULT_HEADER_IMAGE,
  backgroundColor = "#6D5BD0",          // used when headerImage is null

  // ---------- Colors ----------
  overlayColor = "rgba(0,0,0,0.20)",
  textColor = "#FFFFFF",
  curveColor = "#FFFFFF",
  menuButtonColor = "rgba(255,255,255,0.2)",
  menuIconColor = "#FFFFFF",
  avatarBgColor = "#FFFFFF",
  avatarIconColor = "#8E7CC3",
}) {

  // Works with both URL strings and require() images
  const imageSource =
    typeof headerImage === "string"
      ? { uri: headerImage }
      : headerImage;

  // Image background if provided, otherwise a plain colored View
  const Container = headerImage ? ImageBackground : View;

  const containerProps = headerImage
    ? { source: imageSource, resizeMode: "cover" }
    : {};


  return (
    <Container
      {...containerProps}
      className="px-5 pb-16 relative"
      style={{
        paddingTop: insets.top + 20,
        backgroundColor: headerImage ? undefined : backgroundColor,
      }}
    >

      {/* =========================
          COLOR OVERLAY
      ========================= */}

      {headerImage ? (
        <View
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        />
      ) : null}


      {/* =========================
          HEADER CONTENT
      ========================= */}

      <View className="flex-row items-center justify-between">

        {/* PROFILE + USER INFO */}

        <View className="flex-row items-center flex-1 mr-3">

          {/* Profile Picture */}

          <View
            className="w-16 h-16 rounded-full items-center justify-center overflow-hidden"
            style={{ backgroundColor: avatarBgColor }}
          >
            {currentUser?.img ? (
              <Image
                source={{ uri: currentUser.img }}
                className="w-16 h-16"
                resizeMode="cover"
              />
            ) : (
              <Ionicons
                name="person"
                size={32}
                color={avatarIconColor}
              />
            )}
          </View>


          {/* User Info */}

          <View className="ml-3 flex-1">

            <Text
              className="text-sm"
              style={{ color: textColor }}
            >
              {getGreeting()} 👋
            </Text>

            <Text
              className="text-2xl font-bold"
              style={{ color: textColor }}
              numberOfLines={1}
            >
              {currentUser?.name || "User"}
            </Text>

            <Text
              className="text-xs font-semibold tracking-wider uppercase opacity-90"
              style={{ color: textColor }}
            >
              {role}
            </Text>

          </View>

        </View>


        {/* MENU BUTTON */}

        <TouchableOpacity
          onPress={onMenuPress}
          activeOpacity={0.7}
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{ backgroundColor: menuButtonColor }}
        >
          <Ionicons
            name="menu-outline"
            size={28}
            color={menuIconColor}
          />
        </TouchableOpacity>

      </View>


      {/* =========================
          BOTTOM CURVE
      ========================= */}

      <View
        className="absolute left-0 right-0"
        style={{
          height: 20,
          bottom: 0,
          backgroundColor: curveColor,
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
      />

    </Container>
  );
}





// import React from "react";

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";


// // =========================
// // Default Header Image
// // =========================

// const DEFAULT_HEADER_IMAGE =
//   "https://i.ibb.co.com/5WGFcCgf/image.png";


// // =========================
// // Time-based Greeting
// // =========================

// function getGreeting() {
//   const hour = new Date().getHours();

//   if (hour < 12) {
//     return "Good Morning";
//   }

//   if (hour < 17) {
//     return "Good Afternoon";
//   }

//   return "Good Evening";
// }


// // =========================
// // Header Component
// // =========================

// export default function Header({
//   currentUser,
//   insets,
//   onMenuPress,
//   role = "Teacher",

//   // ---------- Customizable from parent ----------
//   headerImage = DEFAULT_HEADER_IMAGE,   // background image url
//   overlayColor = "rgba(0,0,0,0.20)",    // dark/color overlay on image
//   textColor = "#FFFFFF",                // greeting, name, role
//   curveColor = "#FFFFFF",               // bottom curve (match screen bg)
//   menuButtonColor = "rgba(255,255,255,0.2)", // menu button background
//   menuIconColor = "#FFFFFF",            // menu icon
//   avatarBgColor = "#FFFFFF",            // avatar circle background
//   avatarIconColor = "#8E7CC3",          // fallback person icon
// }) {

//   return (
//     <ImageBackground
//       source={{ uri: headerImage }}
//       resizeMode="cover"
//       className="px-5 pb-16 relative"
//       style={{
//         paddingTop: insets.top + 20,
//       }}
//     >

//       {/* =========================
//           COLOR OVERLAY
//       ========================= */}

//       <View
//         className="absolute inset-0"
//         style={{
//           backgroundColor: overlayColor,
//         }}
//       />


//       {/* =========================
//           HEADER CONTENT
//       ========================= */}

//       <View className="flex-row items-center justify-between">

//         {/* =========================
//             PROFILE + USER INFO
//         ========================= */}

//         <View className="flex-row items-center flex-1 mr-3">

//           {/* Profile Picture */}

//           <View
//             className="w-16 h-16 rounded-full items-center justify-center overflow-hidden"
//             style={{
//               backgroundColor: avatarBgColor,
//             }}
//           >

//             {currentUser?.img ? (

//               <Image
//                 source={{
//                   uri: currentUser.img,
//                 }}
//                 className="w-16 h-16"
//                 resizeMode="cover"
//               />

//             ) : (

//               <Ionicons
//                 name="person"
//                 size={32}
//                 color={avatarIconColor}
//               />

//             )}

//           </View>


//           {/* =========================
//               USER INFO
//           ========================= */}

//           <View className="ml-3 flex-1">

//             <Text
//               className="text-sm"
//               style={{ color: textColor }}
//             >
//               {getGreeting()} 👋
//             </Text>


//             <Text
//               className="text-2xl font-bold"
//               style={{ color: textColor }}
//               numberOfLines={1}
//             >
//               {currentUser?.name || "User"}
//             </Text>


//             <Text
//               className="text-xs font-semibold tracking-wider uppercase opacity-90"
//               style={{ color: textColor }}
//             >
//               {role}
//             </Text>

//           </View>

//         </View>


//         {/* =========================
//             MENU BUTTON
//         ========================= */}

//         <TouchableOpacity
//           onPress={onMenuPress}
//           activeOpacity={0.7}
//           className="w-11 h-11 rounded-full items-center justify-center"
//           style={{
//             backgroundColor: menuButtonColor,
//           }}
//         >

//           <Ionicons
//             name="menu-outline"
//             size={28}
//             color={menuIconColor}
//           />

//         </TouchableOpacity>

//       </View>


//       {/* =========================
//           BOTTOM CURVE
//       ========================= */}

//       <View
//         className="absolute left-0 right-0"
//         style={{
//           height: 20,
//           bottom: 0,
//           backgroundColor: curveColor,
//           borderTopLeftRadius: 45,
//           borderTopRightRadius: 45,
//         }}
//       />

//     </ImageBackground>
//   );
// }