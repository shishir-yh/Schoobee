// data/routineData.js

export const routineData = {
    Saturday: [
        {
            id: 1,
            title: "Class 8 - Bangla 1st Paper",
            time: "8:40 AM - 9:20 AM",
            room: "Room 8A",
            type: "Regular Class",
            icon: "easel-outline",
            iconColor: "#8E7CC3",
            bgColor: "rgba(142,124,195,0.1)",
        },
        {
            id: 2,
            title: "Class 9 - Bangla Literature",
            time: "10:10 AM - 10:50 AM",
            room: "Room 10B",
            type: "Regular Class",
            icon: "easel-outline",
            iconColor: "#8E7CC3",
            bgColor: "rgba(142,124,195,0.1)",
        },
         
       
    ],
    Sunday: [
        {
            id: 3,
            title: "Class 7 - Bangla Grammar",
            time: "9:15 AM - 9:55 AM",
            room: "Room 7B",
            type: "Regular Class",
            icon: "book-outline",
            iconColor: "#2ecc71",
            bgColor: "rgba(46, 204, 113, 0.1)",
        },
        {
            id: 4,
            title: "Exam Guard Duty",
            time: "11:00 AM - 1:00 PM",
            room: "Exam Hall 2",
            type: "Guard Duty",
            icon: "shield-checkmark-outline",
            iconColor: "#e74c3c",
            bgColor: "rgba(231,76,60,0.1)",
        },
    ],
    Monday: [
        {
            id: 5,
            title: "Class 8 - Bangla 2nd Paper",
            time: "9:15 AM - 9:55 AM",
            room: "Room 8A",
            type: "Regular Class",
            icon: "easel-outline",
            iconColor: "#8E7CC3",
            bgColor: "rgba(142,124,195,0.1)",
        },
        {
            id: 6,
            title: "Class 9 - Bangla Composition",
            time: "11:30 AM - 12:10 PM",
            room: "Room 9A",
            type: "Regular Class",
            icon: "easel-outline",
            iconColor: "#8E7CC3",
            bgColor: "rgba(142,124,195,0.1)",
        },
    ],
    Tuesday: [
        {
            id: 7,
            title: "Class 6 - Bangla Literature",
            time: "10:10 AM - 10:50 AM",
            room: "Room 6A",
            type: "Regular Class",
            icon: "book-outline",
            iconColor: "#f39c12",
            bgColor: "rgba(243, 156, 18, 0.10)",
        },
        {
            id: 8,
            title: "Academic Council Meeting",
            time: "1:00 PM - 2:00 PM",
            room: "Conference Room",
            type: "Staff Meeting",
            icon: "people-outline",
            iconColor: "#3498db",
            bgColor: "rgba(52, 152, 219, 0.10)",
        },
    ],
    Wednesday: [
        {
            id: 9,
            title: "Class 8 - Bangla Grammar",
            time: "10:10 AM - 10:50 AM",
            room: "Room 8A",
            type: "Regular Class",
            icon: "easel-outline",
            iconColor: "#8E7CC3",
            bgColor: "rgba(142,124,195,0.1)",
        },
        {
            id: 10,
            title: "Exam Guard Duty",
            time: "11:00 AM - 1:00 PM",
            room: "Exam Hall 1",
            type: "Guard Duty",
            icon: "shield-checkmark-outline",
            iconColor: "#e74c3c",
            bgColor: "rgba(231,76,60,0.1)",
        },
    ],
    Thursday: [
        {
            id: 11,
            title: "General Staff Meeting",
            time: "1:00 PM - 2:00 PM",
            room: "Staff Room",
            type: "All Faculty",
            icon: "people-outline",
            iconColor: "#3498db",
            bgColor: "rgba(52, 152, 219, 0.10)",
        },
    ],
    Friday: [
        {
            id: 12,
            title: "Weekend (Friday)",
            time: "Full Day",
            room: "Holiday",
            type: "Weekend",
            icon: "sparkles-outline",
            iconColor: "#2ecc71",
            bgColor: "rgba(46, 204, 113, 0.1)",
        },
    ],
};

// ডে লিস্ট কনস্ট্যান্ট
export const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// ডে শর্ট নেম ম্যাপিং
export const DAY_SHORT = {
    Saturday: "Sat",
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
};

// আজকের ডে পাওয়ার ফাংশন 
export const getTodayName = () => {
    const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayMap[new Date().getDay()];
};