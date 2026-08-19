import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Dimensions,
  Image,
  ScrollView,
  View,
} from "react-native";


// =====================================================
// SCREEN
// =====================================================

const { width: SCREEN_WIDTH } = Dimensions.get("window");


// =====================================================
// CAROUSEL SETTINGS
// =====================================================

const HORIZONTAL_PADDING = 20;

const BANNER_WIDTH =
  SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

const AUTO_PLAY_INTERVAL = 2000;


// =====================================================
// BANNER IMAGES
// =====================================================

const banners = [
  require("../../assets/images/banner1.jpg"),
  require("../../assets/images/banner2.jpg"),
  require("../../assets/images/banner3.jpg"),
  require("../../assets/images/banner4.jpg"),
  require("../../assets/images/banner5.jpg"),
  require("../../assets/images/banner6.jpg"),
  require("../../assets/images/banner7.jpg"),
];


// =====================================================
// BANNER COMPONENT
// =====================================================

export default function Banner() {

  const scrollRef = useRef(null);

  const currentIndexRef = useRef(0);

  const [currentIndex, setCurrentIndex] =
    useState(0);


  // ===================================================
  // UPDATE CURRENT INDEX
  // ===================================================

  const updateIndex = useCallback((index) => {

    currentIndexRef.current = index;

    setCurrentIndex(index);

  }, []);


  // ===================================================
  // GO TO SLIDE
  // ===================================================

  const goToSlide = useCallback(
    (index) => {

      if (!scrollRef.current) {
        return;
      }

      scrollRef.current.scrollTo({
        x: index * BANNER_WIDTH,
        animated: true,
      });

      updateIndex(index);

    },
    [updateIndex]
  );


  // ===================================================
  // AUTO PLAY
  // ===================================================

  useEffect(() => {

    const interval = setInterval(() => {

      const nextIndex =
        (currentIndexRef.current + 1) %
        banners.length;

      goToSlide(nextIndex);

    }, AUTO_PLAY_INTERVAL);


    return () => {
      clearInterval(interval);
    };

  }, [goToSlide]);


  // ===================================================
  // MANUAL SWIPE
  // ===================================================

  const handleScrollEnd = (event) => {

    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(
      offsetX / BANNER_WIDTH
    );


    if (
      index >= 0 &&
      index < banners.length
    ) {
      updateIndex(index);
    }

  };


  // ===================================================
  // UI
  // ===================================================

  return (

    <View className="w-full px-5">

      {/* =============================================
          BANNER CONTAINER
      ============================================= */}

      <View
        className="
          relative
          overflow-hidden
          rounded-[20px]
          bg-gray-200
        "
        style={{
          width: BANNER_WIDTH,

          aspectRatio: 600 / 250,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 4,
          },

          shadowOpacity: 0.12,

          shadowRadius: 8,

          elevation: 5,
        }}
      >

        {/* =========================================
            IMAGE CAROUSEL
        ========================================= */}

        <ScrollView
          ref={scrollRef}

          horizontal

          pagingEnabled

          showsHorizontalScrollIndicator={false}

          snapToInterval={BANNER_WIDTH}

          snapToAlignment="start"

          decelerationRate="fast"

          disableIntervalMomentum

          bounces={false}

          onMomentumScrollEnd={handleScrollEnd}
        >

          {banners.map((image, index) => (

            <View
              key={index}
              style={{
                width: BANNER_WIDTH,
                aspectRatio: 600 / 250,
              }}
            >

              <Image
                source={image}
                resizeMode="cover"
                className="w-full h-full"
              />

            </View>

          ))}

        </ScrollView>


        {/* =========================================
            PAGINATION DOTS
        ========================================= */}

        {/* <View
          className="
            absolute
            bottom-3
            left-0
            right-0
            items-center
          "
        >

          <View
            className="
              flex-row
              items-center
              rounded-full
              bg-black/40
              px-3
              py-1.5
            "
          >

            {banners.map((_, index) => {

              const active =
                index === currentIndex;


              return (

                <View
                  key={index}
                  className={`
                    mx-1
                    h-2
                    rounded-full
                    ${
                      active
                        ? "w-5 bg-white"
                        : "w-2 bg-white/50"
                    }
                  `}
                />

              );

            })}

          </View>

        </View> */}

      </View>

    </View>

  );
}





// import React, {

//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   View,
// } from "react-native";


// // =====================================================
// // SCREEN
// // =====================================================

// const { width: SCREEN_WIDTH } = Dimensions.get("window");


// // =====================================================
// // CAROUSEL SETTINGS
// // =====================================================

// const HORIZONTAL_PADDING = 20;

// const BANNER_WIDTH =
//   SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

// const AUTO_PLAY_INTERVAL = 3000;


// // =====================================================
// // BANNER IMAGES
// // =====================================================

// const banners = [
//   require("../../assets/images/banner1.jpg"),
//   require("../../assets/images/banner2.jpg"),
//   require("../../assets/images/banner3.jpg"),
//   require("../../assets/images/banner4.jpg"),
//   require("../../assets/images/banner5.jpg"),
//   require("../../assets/images/banner6.jpg"),
//   require("../../assets/images/banner7.jpg"),
// ];


// // =====================================================
// // BANNER COMPONENT
// // =====================================================

// export default function Banner() {

//   const scrollRef = useRef(null);

//   const currentIndexRef = useRef(0);

//   const [currentIndex, setCurrentIndex] =
//     useState(0);


//   // ===================================================
//   // UPDATE INDEX
//   // ===================================================

//   const updateIndex = useCallback((index) => {

//     currentIndexRef.current = index;

//     setCurrentIndex(index);

//   }, []);


//   // ===================================================
//   // GO TO SLIDE
//   // ===================================================

//   const goToSlide = useCallback(
//     (index) => {

//       if (!scrollRef.current) {
//         return;
//       }

//       scrollRef.current.scrollTo({
//         x: index * BANNER_WIDTH,
//         animated: true,
//       });

//       updateIndex(index);

//     },
//     [updateIndex]
//   );


//   // ===================================================
//   // AUTO PLAY
//   // ===================================================

//   useEffect(() => {

//     const interval = setInterval(() => {

//       const nextIndex =
//         (currentIndexRef.current + 1) %
//         banners.length;

//       goToSlide(nextIndex);

//     }, AUTO_PLAY_INTERVAL);


//     return () => {
//       clearInterval(interval);
//     };

//   }, [goToSlide]);


//   // ===================================================
//   // MANUAL SWIPE
//   // ===================================================

//   const handleScrollEnd = (event) => {

//     const offsetX =
//       event.nativeEvent.contentOffset.x;

//     const index = Math.round(
//       offsetX / BANNER_WIDTH
//     );


//     if (
//       index >= 0 &&
//       index < banners.length
//     ) {
//       updateIndex(index);
//     }

//   };


//   // ===================================================
//   // UI
//   // ===================================================

//   return (

//     <View className="w-full px-5">

//       {/* =============================================
//           BANNER
//       ============================================= */}

//       <View
//         className="relative overflow-hidden rounded-3xl bg-gray-200"
//         style={{
//           width: BANNER_WIDTH,

//           aspectRatio: 600 / 250,

//           shadowColor: "#000",

//           shadowOffset: {
//             width: 0,
//             height: 4,
//           },

//           shadowOpacity: 0.12,

//           shadowRadius: 8,

//           elevation: 5,
//         }}
//       >

//         {/* =========================================
//             IMAGES
//         ========================================= */}

//         <ScrollView
//           ref={scrollRef}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={BANNER_WIDTH}
//           decelerationRate="fast"
//           onMomentumScrollEnd={handleScrollEnd}
//           bounces={false}
//         >

//           {banners.map((image, index) => (

//             <View
//               key={index}
//               style={{
//                 width: BANNER_WIDTH,
//               }}
//             >

//               <Image
//                 source={image}
//                 resizeMode="cover"
//                 className="w-full h-full"
//               />

//             </View>

//           ))}

//         </ScrollView>


//         {/* =========================================
//             DOTS
//         ========================================= */}

//         <View className="absolute bottom-3 left-0 right-0 items-center">

//           <View className="flex-row items-center rounded-full bg-black/40 px-3 py-2">

//             {banners.map((_, index) => {

//               const active =
//                 index === currentIndex;


//               return (

//                 <View
//                   key={index}
//                   className={`mx-1 h-2 rounded-full ${
//                     active
//                       ? "w-5 bg-white"
//                       : "w-2 bg-white/50"
//                   }`}
//                 />

//               );

//             })}

//           </View>

//         </View>

//       </View>

//     </View>

//   );
// }