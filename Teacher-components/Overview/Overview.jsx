import { View, Text } from 'react-native'
import React from 'react'
import teacherSummaryItems from "../../data/users"
import { Ionicons } from '@expo/vector-icons'

export default function Overview() {
  return (
   <View className="px-5 mt-4">
   
             <Text className="text-xl font-bold text-gray-800 mb-4">
               Overview
             </Text>
   
             <View className="flex-row flex-wrap justify-between">
   
               {teacherSummaryItems.map((item) => (
                 <View
                   key={item.label}
                   className="w-[48%] bg-white rounded-2xl p-4 mb-3"
                 >
                   <View className="flex-row items-center justify-between">
   
                     <View>
                       <Text className="text-2xl font-bold text-gray-800">
                         {item.value}
                       </Text>
   
                       <Text className="text-gray-500 text-xs mt-1">
                         {item.label}
                       </Text>
                     </View>
   
                     <View
                       className="w-10 h-10 rounded-xl items-center justify-center"
                       style={{
                         backgroundColor: `${item.color}20`,
                       }}
                     >
                       <Ionicons
                         name={item.icon}
                         size={20}
                         color={item.color}
                       />
                     </View>
   
                   </View>
                 </View>
               ))}
   
             </View>
           </View>
  )
}