import { View, Text } from "react-native";
import { teacherAttendanceData } from "../../data/Teacher_information/attendanceOverview";

export default function AttendanceOverview() {
  

  return (
    <View className="px-5 mt-4 mb-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Attendance Overview
      </Text>

      <View className="rounded-2xl border border-[#EEEAF2] bg-white p-4">
        <Text className="mb-4 text-[14px] font-medium text-[#33303A]">
          Class Attendance Average
        </Text>

        <View className="h-[210px] flex-row items-end justify-between px-2">
          {teacherAttendanceData.map((item) => (
            <View
              key={item.label}
              className="h-full flex-1 items-center justify-end"
            >
              {/* Percentage */}
              <Text className="mb-1 text-[10px] font-medium text-[#77727F]">
                {item.value}%
              </Text>

              {/* Bar */}
              <View className="h-[155px] w-9 justify-end">
                <View
                  className="w-full rounded-t-md bg-[#8E7CC3]"
                  style={{
                    height: `${item.value}%`,
                  }}
                />
              </View>

              {/* Label */}
              <Text
                className="mt-2 text-[9px] text-[#77727F]"
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}