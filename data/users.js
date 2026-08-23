export const users = [
  {
    id: 1,
    schoolCode: "DHAKA100",
    userId: "EDU-STU-001",
    password: "EDU-STU-001",
    role: "student",
    name: "Demo Student",
  },
  {
    id: 2,
    schoolCode: "DHAKA100",
    userId: "EDU-TEA-001",
    password: "EDU-TEA-001",
    role: "teacher",
    name: "Demo Teacher",
  },
];

//Teacher Dashboard:-------->

// Teacher Dashboard Data
export const teacherDashboardItems = [
  {
    title: "Profile",
    icon: "person-outline",
    color: "#14B8A6",
  },
  {
    title: "Online Class",
    icon: "videocam-outline",
    color: "#8E7CC3",
    badge: 1,
  },
  {
    title: "Mark Entry",
    icon: "clipboard-outline",
    color: "#E74C3C",
  },
  {
    title: "Take Attend",
    icon: "calendar-outline",
    color: "#2ECC71",
  },
  {
    title: "Student List",
    icon: "list-outline",
    color: "#3498DB",
  },
  {
    title: "Routine",
    icon: "time-outline",
    color: "#F39C12",
  },
  {
    title: "My Attendance",
    icon: "calendar-clear-outline",
    color: "#14B8A6",
  },
  {
    title: "Academic Cal",
    icon: "calendar-outline",
    color: "#F39C12",
  },
  {
    title: "Notices",
    icon: "megaphone-outline",
    color: "#E74C3C",
  }
];

// Teacher Summary Items

export const teacherSummaryItems = [
  {
    value: "57",
    label: "number of Students",
    icon: "account-group-outline",
    color: "#8E7CC3",
  },
  {
    value: "95%",
    label: "Avg Attendance",
    icon: "chart-line",
    color: "#2ECC71",
  },
  {
    value: "5",
    label: "To Grade",
    icon: "file-document-edit-outline",
    color: "#E74C3C",
  },
  {
    value: "Dec 1",
    label: "Next Pay",
    icon: "calendar-outline",
    color: "#3498DB",
  },
];



// Teacher Recent Tasks
export const teacherRecentTasks = [
  {
    title: "CS101 Midterms",
    subtitle: "Grading Published",
    value: "45/45",
    status: "Done",
    icon: "check-circle-outline",
    color: "#2ECC71",
  },
  {
    title: "Leave Request",
    subtitle: "For Nov 25",
    value: "Pending",
    status: "HR Review",
    icon: "clock-outline",
    color: "#F39C12",
  },
];

// Teacher Quick Features 
export const teacherQuickFeatures = [
  {
    title: "Staff Meet",
    icon: "account-group-outline",
    color: "#F39C12",
  },
  {
    title: "Training",
    icon: "presentation",
    color: "#3498DB",
  },
  {
    title: "Research",
    icon: "flask-outline",
    color: "#9B59B6",
  },
];

// Teacher Menu Items

export const teacherMenuItems = [
  {
    title: "Profile",
    icon: "person-outline",
  },
  {
    title: "Online Class",
    icon: "videocam-outline",
    badge: 1,
  },
  {
    title: "Mark Entry",
    icon: "clipboard-outline",
  },
  {
    title: "Student Attendance",
    icon: "calendar-outline",
  },
  {
    title: "Student List",
    icon: "list-outline",
  },
  {
    title: "Routine",
    icon: "time-outline",
  },
  {
    title: "Personal Attendance",
    icon: "calendar-clear-outline",
  },
  {
    title: "Academic Calendar",
    icon: "calendar-number-outline",
  },
  {
    title: "Notices",
    icon: "megaphone-outline",
  },
  {
    title: "Inbox",
    icon: "mail-outline",
    badge: 2,
  },
];

// Teacher Online Classes

export const teacherOnlineClasses = [
  {
    id: "class-1",
    subject: "Computer Science",
    code: "CS101",
    time: "10:00 AM - 11:00 AM",
    room: "Room 301",
    status: "Live",
  },
  {
    id: "class-2",
    subject: "Mathematics",
    code: "MATH201",
    time: "12:00 PM - 01:00 PM",
    room: "Room 204",
    status: "Upcoming",
  },
  {
    id: "class-3",
    subject: "Physics",
    code: "PHY101",
    time: "03:00 PM - 04:00 PM",
    room: "Room 105",
    status: "Upcoming",
  },
];

// Teacher Mark Entry Students

export const teacherMarkEntryStudents = [
  {
    id: "STU-001",
    name: "Rahim Ahmed",
    roll: "101",
    subject: "Computer Science",
    marks: "",
  },
  {
    id: "STU-002",
    name: "Karim Hasan",
    roll: "102",
    subject: "Computer Science",
    marks: "",
  },
  {
    id: "STU-003",
    name: "Nusrat Jahan",
    roll: "103",
    subject: "Computer Science",
    marks: "",
  },
  {
    id: "STU-004",
    name: "Sakib Khan",
    roll: "104",
    subject: "Computer Science",
    marks: "",
  },
];

// Teacher Attendance Students
export const teacherAttendanceStudents = [
  {
    id: "STU-001",
    name: "Rahim Ahmed",
    roll: "101",
    present: true,
  },
  {
    id: "STU-002",
    name: "Karim Hasan",
    roll: "102",
    present: true,
  },
  {
    id: "STU-003",
    name: "Nusrat Jahan",
    roll: "103",
    present: false,
  },
  {
    id: "STU-004",
    name: "Sakib Khan",
    roll: "104",
    present: true,
  },
  {
    id: "STU-005",
    name: "Fahim Rahman",
    roll: "105",
    present: false,
  },
];

// Teacher Attendance Data for Chart
export const teacherAttendanceData = [
  {
    label: "CS101",
    value: 65,
  },
  {
    label: "CS102",
    value: 92,
  },
  {
    label: "MATH201",
    value: 78,
  },
  {
    label: "PHY101",
    value: 88,
  },
];
