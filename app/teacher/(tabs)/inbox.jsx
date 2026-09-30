// import React, { useMemo, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import { useRouter } from 'expo-router';

// import Navbar from "../../../Common_Components/CommonNavbar/Navbar";


// /*
// =========================================================
// DATA
// =========================================================
// */

// const inboxData = [
//   {
//     id: 'msg_tch_1',
//     sender: 'Head Teacher',
//     senderInitials: 'HT',
//     subject: 'Important: Staff Meeting',
//     time: '10:32 AM',
//     body: `Dear Faculty,

// There will be a staff meeting tomorrow at 10:00 AM in the conference room.

// Agenda:
// - Monthly performance review
// - Upcoming exams
// - Other matters

// Regards,
// Head Teacher`,
//     unread: true,
//   },

//   {
//     id: 'msg_tch_2',
//     sender: 'Accounts Department',
//     senderInitials: 'AD',
//     subject: 'Salary Slip - August 2025',
//     time: 'Yesterday',
//     body: `Your salary slip for August 2025 is now available.

// Please check your account for the detailed salary statement.

// Regards,
// Accounts Department`,
//     unread: true,
//   },

//   {
//     id: 'msg_tch_3',
//     sender: 'Academic Coordinator',
//     senderInitials: 'AC',
//     subject: 'Updated Class Routine',
//     time: 'Aug 28',
//     body: `Dear Teachers,

// The class routine has been updated.

// Please check the latest routine before your next class.

// Regards,
// Academic Coordinator`,
//     unread: false,
//   },

//   {
//     id: 'msg_tch_4',
//     sender: 'Exam Committee',
//     senderInitials: 'EC',
//     subject: 'Exam Duty Schedule',
//     time: 'Aug 27',
//     body: `Dear Faculty,

// The examination duty schedule has been published.

// Please review your assigned duty time and room.

// Regards,
// Exam Committee`,
//     unread: true,
//   },

//   {
//     id: 'msg_tch_5',
//     sender: 'Principal Office',
//     senderInitials: 'PO',
//     subject: 'School Holiday Notice',
//     time: 'Aug 25',
//     body: `Dear Faculty,

// Please be informed that the school will remain closed on the upcoming holiday.

// Regular classes will resume according to the academic calendar.

// Regards,
// Principal Office`,
//     unread: false,
//   },
// ];


// export default function Index() {

//   // "router" lets us go back to the previous screen when the back
//   // button in the navbar is pressed.
//   const router = useRouter();

//   const [messages, setMessages] = useState(inboxData);

//   const [search, setSearch] = useState('');

//   const [selectedMessage, setSelectedMessage] = useState(null);


//   /*
//   =========================================================
//   UNREAD COUNT
//   =========================================================
//   */

//   const unreadCount = messages.filter(
//     (message) => message.unread
//   ).length;


//   /*
//   =========================================================
//   SEARCH
//   =========================================================
//   */

//   const filteredMessages = useMemo(() => {

//     const searchText = search.toLowerCase().trim();

//     if (!searchText) {
//       return messages;
//     }

//     return messages.filter((message) =>
//       message.sender.toLowerCase().includes(searchText) ||
//       message.subject.toLowerCase().includes(searchText) ||
//       message.body.toLowerCase().includes(searchText)
//     );

//   }, [search, messages]);


//   /*
//   =========================================================
//   OPEN MESSAGE
//   =========================================================
//   */

//   const openMessage = (message) => {

//     setMessages((oldMessages) =>
//       oldMessages.map((item) =>
//         item.id === message.id
//           ? {
//               ...item,
//               unread: false,
//             }
//           : item
//       )
//     );

//     setSelectedMessage({
//       ...message,
//       unread: false,
//     });
//   };


//   /*
//   =========================================================
//   CLOSE MESSAGE
//   =========================================================
//   */

//   const closeMessage = () => {
//     setSelectedMessage(null);
//   };


//   return (
//     <SafeAreaView className="flex-1 bg-slate-50">

//       {/* =====================================================
//           STATIC COMMON NAVBAR
//           ===================================================== */}

//       <Navbar
//         title="Inbox"
//         onBack={() => router.back()}
//         onMenu={() => console.log('Menu opened')}
//       />


//       {/* =====================================================
//           ONLY THIS PART WILL SCROLL
//           ===================================================== */}

//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{
//           paddingHorizontal: 20,
//           paddingTop: 24,
//           paddingBottom: 200,
//         }}
//       >

//         {/* ===================================================
//             INBOX TITLE
//             =================================================== */}

//         <View className="mb-6 flex-row items-center justify-between">

//           <View>

//             <Text className="text-2xl font-bold text-slate-900">
//               Inbox
//             </Text>

//             <Text className="mt-1 text-xs text-slate-500">
//               {unreadCount} unread message
//               {unreadCount !== 1 ? 's' : ''}
//             </Text>

//           </View>


//           {/* Small badge showing how many are unread */}
//           <View className="h-10 min-w-10 items-center justify-center rounded-full bg-brand px-3">

//             <Text className="text-sm font-bold text-white">
//               {unreadCount}
//             </Text>

//           </View>

//         </View>


//         {/* ===================================================
//             SEARCH BAR
//             =================================================== */}

//         <View className="mb-6 flex-row items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">

//           <Text className="mr-2 text-base text-slate-400">
//             🔍
//           </Text>

//           <TextInput
//             value={search}
//             onChangeText={setSearch}
//             placeholder="Search inbox..."
//             placeholderTextColor="#9CA3AF"
//             className="flex-1 py-3.5 text-sm text-slate-800"
//           />

//           {search.length > 0 && (

//             <Pressable onPress={() => setSearch('')}>

//               <Text className="px-2 text-xl text-slate-400">
//                 ×
//               </Text>

//             </Pressable>

//           )}

//         </View>


//         {/* ===================================================
//             MESSAGE LIST
//             =================================================== */}

//         {filteredMessages.map((message) => (

//           <Pressable
//             key={message.id}
//             onPress={() => openMessage(message)}
//             className={`mb-3 flex-row rounded-2xl border bg-white p-4 shadow-sm ${
//               message.unread
//                 ? 'border-brand/40'
//                 : 'border-slate-100'
//             }`}
//           >

//             {/* Avatar */}

//             <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-brandSoft">

//               <Text className="text-xs font-bold text-brand">
//                 {message.senderInitials}
//               </Text>

//             </View>


//             {/* Message content */}

//             <View className="flex-1">

//               <View className="flex-row items-center justify-between">

//                 <Text
//                   numberOfLines={1}
//                   className={`flex-1 text-sm ${
//                     message.unread
//                       ? 'font-bold text-slate-900'
//                       : 'font-semibold text-slate-700'
//                   }`}
//                 >
//                   {message.sender}
//                 </Text>

//                 <Text className="ml-2 text-[11px] text-slate-400">
//                   {message.time}
//                 </Text>

//               </View>


//               <Text
//                 numberOfLines={1}
//                 className={`mt-1 text-xs ${
//                   message.unread
//                     ? 'font-semibold text-slate-900'
//                     : 'text-slate-500'
//                 }`}
//               >
//                 {message.subject}
//               </Text>


//               <Text
//                 numberOfLines={1}
//                 className="mt-1 text-[11px] text-slate-400"
//               >
//                 {message.body.replace(/\n/g, ' ')}
//               </Text>

//             </View>


//             {/* Unread dot */}

//             {message.unread && (

//               <View className="ml-2 justify-center">

//                 <View className="h-2.5 w-2.5 rounded-full bg-brand" />

//               </View>

//             )}

//           </Pressable>

//         ))}


//         {/* No result state */}

//         {filteredMessages.length === 0 && (

//           <View className="items-center rounded-2xl bg-white p-10 shadow-sm">

//             <Text className="mb-2 text-3xl">
//               📭
//             </Text>

//             <Text className="text-center text-sm text-slate-500">
//               No messages found.
//             </Text>

//           </View>

//         )}

//       </ScrollView>


//       {/* =====================================================
//           MESSAGE DETAILS MODAL
//           ===================================================== */}

//       <Modal
//         visible={selectedMessage !== null}
//         transparent
//         animationType="slide"
//         onRequestClose={closeMessage}
//       >

//         <View className="flex-1 justify-end bg-black/50">

//           <Pressable
//             className="flex-1"
//             onPress={closeMessage}
//           />

//           <View className="max-h-[75%] rounded-t-3xl bg-white">

//             {/* Modal header */}
//             <View className="flex-row items-center justify-between rounded-t-3xl bg-brand px-5 py-4">

//               <Text className="text-base font-bold text-white">
//                 Message Details
//               </Text>

//               <Pressable
//                 onPress={closeMessage}
//                 className="h-8 w-8 items-center justify-center rounded-full bg-white/20"
//               >

//                 <Text className="text-xl text-white">
//                   ×
//                 </Text>

//               </Pressable>

//             </View>


//             {selectedMessage && (

//               <ScrollView
//                 contentContainerStyle={{
//                   padding: 20,
//                 }}
//               >

//                 <View className="mb-5 flex-row items-center border-b border-slate-100 pb-4">

//                   <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-brandSoft">

//                     <Text className="font-bold text-brand">
//                       {selectedMessage.senderInitials}
//                     </Text>

//                   </View>


//                   <View className="flex-1">

//                     <Text className="text-sm font-bold text-slate-900">
//                       {selectedMessage.sender}
//                     </Text>

//                     <Text className="mt-1 text-[11px] text-slate-400">
//                       {selectedMessage.time}
//                     </Text>

//                   </View>

//                 </View>


//                 <Text className="mb-3 text-lg font-bold text-slate-900">
//                   {selectedMessage.subject}
//                 </Text>


//                 <Text className="text-sm leading-6 text-slate-700">
//                   {selectedMessage.body}
//                 </Text>

//               </ScrollView>

//             )}

//           </View>

//         </View>

//       </Modal>

//     </SafeAreaView>
//   );
// }

// import React, { useMemo, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import { useRouter } from 'expo-router';

// import Navbar from "../../../Common_Components/CommonNavbar/Navbar";


// /*
// =========================================================
// DATA
// =========================================================
// */

// const inboxData = [
//   {
//     id: 'msg_tch_1',
//     sender: 'Head Teacher',
//     senderInitials: 'HT',
//     subject: 'Important: Staff Meeting',
//     time: '10:32 AM',
//     body: `Dear Faculty,

// There will be a staff meeting tomorrow at 10:00 AM in the conference room.

// Agenda:
// - Monthly performance review
// - Upcoming exams
// - Other matters

// Regards,
// Head Teacher`,
//     unread: true,
//   },

//   {
//     id: 'msg_tch_2',
//     sender: 'Accounts Department',
//     senderInitials: 'AD',
//     subject: 'Salary Slip - August 2025',
//     time: 'Yesterday',
//     body: `Your salary slip for August 2025 is now available.

// Please check your account for the detailed salary statement.

// Regards,
// Accounts Department`,
//     unread: true,
//   },

//   {
//     id: 'msg_tch_3',
//     sender: 'Academic Coordinator',
//     senderInitials: 'AC',
//     subject: 'Updated Class Routine',
//     time: 'Aug 28',
//     body: `Dear Teachers,

// The class routine has been updated.

// Please check the latest routine before your next class.

// Regards,
// Academic Coordinator`,
//     unread: false,
//   },

//   {
//     id: 'msg_tch_4',
//     sender: 'Exam Committee',
//     senderInitials: 'EC',
//     subject: 'Exam Duty Schedule',
//     time: 'Aug 27',
//     body: `Dear Faculty,

// The examination duty schedule has been published.

// Please review your assigned duty time and room.

// Regards,
// Exam Committee`,
//     unread: true,
//   },

//   {
//     id: 'msg_tch_5',
//     sender: 'Principal Office',
//     senderInitials: 'PO',
//     subject: 'School Holiday Notice',
//     time: 'Aug 25',
//     body: `Dear Faculty,

// Please be informed that the school will remain closed on the upcoming holiday.

// Regular classes will resume according to the academic calendar.

// Regards,
// Principal Office`,
//     unread: false,
//   },
// ];


// export default function Index() {

//   // "router" lets us go back to the previous screen when the back
//   // button in the navbar is pressed.
//   const router = useRouter();

//   const [messages, setMessages] = useState(inboxData);

//   const [search, setSearch] = useState('');

//   const [selectedMessage, setSelectedMessage] = useState(null);

//   const [isSearchFocused, setIsSearchFocused] = useState(false);


//   /*
//   =========================================================
//   UNREAD COUNT
//   =========================================================
//   */

//   const unreadCount = messages.filter(
//     (message) => message.unread
//   ).length;


//   /*
//   =========================================================
//   SEARCH
//   =========================================================
//   */

//   const filteredMessages = useMemo(() => {

//     const searchText = search.toLowerCase().trim();

//     if (!searchText) {
//       return messages;
//     }

//     return messages.filter((message) =>
//       message.sender.toLowerCase().includes(searchText) ||
//       message.subject.toLowerCase().includes(searchText) ||
//       message.body.toLowerCase().includes(searchText)
//     );

//   }, [search, messages]);


//   /*
//   =========================================================
//   OPEN MESSAGE
//   =========================================================
//   */

//   const openMessage = (message) => {

//     setMessages((oldMessages) =>
//       oldMessages.map((item) =>
//         item.id === message.id
//           ? {
//               ...item,
//               unread: false,
//             }
//           : item
//       )
//     );

//     setSelectedMessage({
//       ...message,
//       unread: false,
//     });
//   };


//   /*
//   =========================================================
//   CLOSE MESSAGE
//   =========================================================
//   */

//   const closeMessage = () => {
//     setSelectedMessage(null);
//   };


//   return (
//     <SafeAreaView className="flex-1 bg-slate-50">

//       {/* =====================================================
//           STATIC COMMON NAVBAR
//           ===================================================== */}

//       <Navbar
//         title="Inbox"
//         onBack={() => router.back()}
//         onMenu={() => console.log('Menu opened')}
//       />


//       {/* =====================================================
//           ONLY THIS PART WILL SCROLL
//           ===================================================== */}

//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{
//           paddingHorizontal: 20,
//           paddingTop: 24,
//           paddingBottom: 200,
//         }}
//       >

//         {/* ===================================================
//             INBOX TITLE
//             =================================================== */}

//         <View className="mb-6 flex-row items-center justify-between">

//           <View>

//             <Text className="text-2xl font-bold text-slate-900">
//               Inbox
//             </Text>

//             <Text className="mt-1 text-xs text-slate-500">
//               {unreadCount === 0
//                 ? 'All caught up'
//                 : `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`}
//             </Text>

//           </View>


//           {unreadCount > 0 && (

//             <View className="h-10 min-w-10 flex-row items-center justify-center rounded-full bg-brand px-3">

//               <View className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white" />

//               <Text className="text-sm font-bold text-white">
//                 {unreadCount}
//               </Text>

//             </View>

//           )}

//         </View>


//         {/* ===================================================
//             SEARCH BAR
//             =================================================== */}

//         <View
//           className={`mb-6 flex-row items-center rounded-2xl border bg-white px-4 shadow-sm ${
//             isSearchFocused ? 'border-brand' : 'border-slate-200'
//           }`}
//         >

//           <Text className={`mr-2 text-base ${isSearchFocused ? 'text-brand' : 'text-slate-400'}`}>
//             🔍
//           </Text>

//           <TextInput
//             value={search}
//             onChangeText={setSearch}
//             onFocus={() => setIsSearchFocused(true)}
//             onBlur={() => setIsSearchFocused(false)}
//             placeholder="Search inbox..."
//             placeholderTextColor="#9CA3AF"
//             className="flex-1 py-3.5 text-sm text-slate-800"
//           />

//           {search.length > 0 && (

//             <Pressable onPress={() => setSearch('')}>

//               <Text className="px-2 text-xl text-slate-400">
//                 ×
//               </Text>

//             </Pressable>

//           )}

//         </View>


//         {/* ===================================================
//             MESSAGE LIST
//             =================================================== */}

//         {filteredMessages.map((message) => (

//           <Pressable
//             key={message.id}
//             onPress={() => openMessage(message)}
//             className={`mb-3 flex-row overflow-hidden rounded-2xl border shadow-sm ${
//               message.unread
//                 ? 'border-brand/30 bg-brandSoft/40'
//                 : 'border-slate-100 bg-white'
//             }`}
//           >

//             {/* Unread accent bar */}
//             <View className={`w-1 ${message.unread ? 'bg-brand' : 'bg-transparent'}`} />

//             <View className="flex-1 flex-row p-4">

//               {/* Avatar */}

//               <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-brandSoft">

//                 <Text className="text-xs font-bold text-brand">
//                   {message.senderInitials}
//                 </Text>

//               </View>


//               {/* Message content */}

//               <View className="flex-1">

//                 <View className="flex-row items-center justify-between">

//                   <Text
//                     numberOfLines={1}
//                     className={`flex-1 text-sm ${
//                       message.unread
//                         ? 'font-bold text-slate-900'
//                         : 'font-semibold text-slate-700'
//                     }`}
//                   >
//                     {message.sender}
//                   </Text>

//                   <Text className="ml-2 text-[11px] text-slate-400">
//                     {message.time}
//                   </Text>

//                 </View>


//                 <Text
//                   numberOfLines={1}
//                   className={`mt-1 text-xs ${
//                     message.unread
//                       ? 'font-semibold text-slate-900'
//                       : 'text-slate-500'
//                   }`}
//                 >
//                   {message.subject}
//                 </Text>


//                 <Text
//                   numberOfLines={1}
//                   className="mt-1 text-[11px] text-slate-400"
//                 >
//                   {message.body.replace(/\n/g, ' ')}
//                 </Text>

//               </View>

//             </View>

//           </Pressable>

//         ))}


//         {/* No result state */}

//         {filteredMessages.length === 0 && (

//           <View className="items-center rounded-2xl bg-white p-10 shadow-sm">

//             <Text className="mb-2 text-3xl">
//               📭
//             </Text>

//             <Text className="text-center text-sm font-semibold text-slate-700">
//               No messages found
//             </Text>

//             <Text className="mt-1 text-center text-xs text-slate-400">
//               Try a different search term
//             </Text>

//           </View>

//         )}

//       </ScrollView>


//       {/* =====================================================
//           MESSAGE DETAILS MODAL
//           ===================================================== */}

//       <Modal
//         visible={selectedMessage !== null}
//         transparent
//         animationType="slide"
//         onRequestClose={closeMessage}
//       >

//         <View className="flex-1 justify-end bg-black/50">

//           <Pressable
//             className="flex-1"
//             onPress={closeMessage}
//           />

//           <View className="max-h-[75%] rounded-t-3xl bg-white">

//             {/* Modal header */}
//             <View className="flex-row items-center justify-between rounded-t-3xl bg-brand px-5 py-4">

//               <Text className="text-base font-bold text-white">
//                 Message Details
//               </Text>

//               <Pressable
//                 onPress={closeMessage}
//                 className="h-8 w-8 items-center justify-center rounded-full bg-white/20"
//               >

//                 <Text className="text-xl text-white">
//                   ×
//                 </Text>

//               </Pressable>

//             </View>


//             {selectedMessage && (

//               <ScrollView
//                 contentContainerStyle={{
//                   padding: 20,
//                 }}
//               >

//                 <View className="mb-5 flex-row items-center border-b border-slate-100 pb-4">

//                   <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-brandSoft">

//                     <Text className="font-bold text-brand">
//                       {selectedMessage.senderInitials}
//                     </Text>

//                   </View>


//                   <View className="flex-1">

//                     <Text className="text-sm font-bold text-slate-900">
//                       {selectedMessage.sender}
//                     </Text>

//                     <Text className="mt-1 text-[11px] text-slate-400">
//                       {selectedMessage.time}
//                     </Text>

//                   </View>

//                 </View>


//                 <Text className="mb-3 text-lg font-bold text-slate-900">
//                   {selectedMessage.subject}
//                 </Text>


//                 <Text className="text-sm leading-6 text-slate-700">
//                   {selectedMessage.body}
//                 </Text>

//               </ScrollView>

//             )}

//           </View>

//         </View>

//       </Modal>

//     </SafeAreaView>
//   );
// }

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import Navbar from "../../../Common_Components/CommonNavbar/Navbar";


/*
=========================================================
DATA
=========================================================
*/

const inboxData = [
  {
    id: 'msg_tch_1',
    sender: 'Head Teacher',
    senderInitials: 'HT',
    subject: 'Important: Staff Meeting',
    time: '10:32 AM',
    body: `Dear Faculty,

There will be a staff meeting tomorrow at 10:00 AM in the conference room.

Agenda:
- Monthly performance review
- Upcoming exams
- Other matters

Regards,
Head Teacher`,
    unread: true,
  },

  {
    id: 'msg_tch_2',
    sender: 'Accounts Department',
    senderInitials: 'AD',
    subject: 'Salary Slip - August 2025',
    time: 'Yesterday',
    body: `Your salary slip for August 2025 is now available.

Please check your account for the detailed salary statement.

Regards,
Accounts Department`,
    unread: true,
  },

  {
    id: 'msg_tch_3',
    sender: 'Academic Coordinator',
    senderInitials: 'AC',
    subject: 'Updated Class Routine',
    time: 'Aug 28',
    body: `Dear Teachers,

The class routine has been updated.

Please check the latest routine before your next class.

Regards,
Academic Coordinator`,
    unread: false,
  },

  {
    id: 'msg_tch_4',
    sender: 'Exam Committee',
    senderInitials: 'EC',
    subject: 'Exam Duty Schedule',
    time: 'Aug 27',
    body: `Dear Faculty,

The examination duty schedule has been published.

Please review your assigned duty time and room.

Regards,
Exam Committee`,
    unread: true,
  },

  {
    id: 'msg_tch_5',
    sender: 'Principal Office',
    senderInitials: 'PO',
    subject: 'School Holiday Notice',
    time: 'Aug 25',
    body: `Dear Faculty,

Please be informed that the school will remain closed on the upcoming holiday.

Regular classes will resume according to the academic calendar.

Regards,
Principal Office`,
    unread: false,
  },
];


// Avatar color palette — cycles per message so each sender feels distinct,
// same idea as the purple/green/blue circles in the reference design.
const AVATAR_COLORS = [
  { bg: '#EDE9FE', text: '#7C3AED' }, // purple
  { bg: '#D1FAE5', text: '#059669' }, // green
  { bg: '#DBEAFE', text: '#2563EB' }, // blue
  { bg: '#FEF3C7', text: '#D97706' }, // amber
  { bg: '#FCE7F3', text: '#DB2777' }, // pink
];

const getAvatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];


export default function Index() {

  // "router" lets us go back to the previous screen when the back
  // button in the navbar is pressed.
  const router = useRouter();

  const [messages, setMessages] = useState(inboxData);

  const [search, setSearch] = useState('');

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);


  /*
  =========================================================
  UNREAD COUNT
  =========================================================
  */

  const unreadCount = messages.filter(
    (message) => message.unread
  ).length;


  /*
  =========================================================
  SEARCH
  =========================================================
  */

  const filteredMessages = useMemo(() => {

    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return messages;
    }

    return messages.filter((message) =>
      message.sender.toLowerCase().includes(searchText) ||
      message.subject.toLowerCase().includes(searchText) ||
      message.body.toLowerCase().includes(searchText)
    );

  }, [search, messages]);


  /*
  =========================================================
  OPEN MESSAGE
  =========================================================
  */

  const openMessage = (message) => {

    setMessages((oldMessages) =>
      oldMessages.map((item) =>
        item.id === message.id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );

    setSelectedMessage({
      ...message,
      unread: false,
    });
  };


  /*
  =========================================================
  CLOSE MESSAGE
  =========================================================
  */

  const closeMessage = () => {
    setSelectedMessage(null);
  };


  return (
    <SafeAreaView className="flex-1 bg-slate-50">

      {/* =====================================================
          STATIC COMMON NAVBAR
          ===================================================== */}

      <Navbar
        title="Inbox"
        onBack={() => router.back()}
        onMenu={() => console.log('Menu opened')}
      />


      {/* =====================================================
          ONLY THIS PART WILL SCROLL
          ===================================================== */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 200,
        }}
      >

        {/* ===================================================
            INBOX TITLE
            =================================================== */}

        <View className="mb-6 flex-row items-center justify-between">

          <View>

            <Text className="text-2xl font-bold text-slate-900">
              Inbox
            </Text>

            <Text className="mt-1 text-xs text-slate-500">
              {unreadCount === 0
                ? 'All caught up'
                : `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`}
            </Text>

          </View>


          {unreadCount > 0 && (

            <View className="h-10 min-w-10 flex-row items-center justify-center rounded-full bg-brand px-3">

              <View className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white" />

              <Text className="text-sm font-bold text-white">
                {unreadCount}
              </Text>

            </View>

          )}

        </View>


        {/* ===================================================
            SEARCH BAR
            =================================================== */}

        <View
          className={`mb-6 flex-row items-center rounded-2xl border bg-white px-4 shadow-sm ${
            isSearchFocused ? 'border-brand' : 'border-slate-200'
          }`}
        >

          <Ionicons
            name="search"
            size={18}
            color={isSearchFocused ? '#7C3AED' : '#9CA3AF'}
            style={{ marginRight: 8 }}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search inbox..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 py-3.5 text-sm text-slate-800"
          />

          {search.length > 0 && (

            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </Pressable>

          )}

        </View>


        {/* ===================================================
            MESSAGE LIST
            =================================================== */}

        {filteredMessages.map((message, index) => {

          const avatarColor = getAvatarColor(index);

          return (

            <Pressable
              key={message.id}
              onPress={() => openMessage(message)}
              className={`mb-3 flex-row overflow-hidden   border shadow-sm ${
                message.unread
                  ? 'border-brand/30 bg-brandSoft/40'
                  : 'border-slate-100 bg-white'
              }`}
            >

              {/* Unread accent bar */}
              <View className={`w-1 ${message.unread ? 'bg-brand' : 'bg-transparent'}`} />

              <View className="flex-1 flex-row items-center p-4">

                {/* Avatar */}

                <View
                  style={{ backgroundColor: avatarColor.bg }}
                  className="mr-3 h-12 w-12 items-center justify-center rounded-full"
                >

                  <Text style={{ color: avatarColor.text }} className="text-xs font-bold">
                    {message.senderInitials}
                  </Text>

                </View>


                {/* Message content */}

                <View className="flex-1">

                  <View className="flex-row items-center justify-between">

                    <Text
                      numberOfLines={1}
                      className={`flex-1 text-sm ${
                        message.unread
                          ? 'font-bold text-slate-900'
                          : 'font-semibold text-slate-700'
                      }`}
                    >
                      {message.sender}
                    </Text>

                    <Text className="ml-2 text-[11px] text-slate-400">
                      {message.time}
                    </Text>

                  </View>


                  <Text
                    numberOfLines={1}
                    className={`mt-1 text-xs ${
                      message.unread
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-500'
                    }`}
                  >
                    {message.subject}
                  </Text>


                  <Text
                    numberOfLines={1}
                    className="mt-1 text-[11px] text-slate-400"
                  >
                    {message.body.replace(/\n/g, ' ')}
                  </Text>

                </View>


                {/* Unread dot on the right, like the reference design */}

                {message.unread && (
                  <View className="ml-2 h-2.5 w-2.5 rounded-full bg-brand" />
                )}

              </View>

            </Pressable>
          );
        })}


        {/* No result state */}

        {filteredMessages.length === 0 && (

          <View className="items-center rounded-2xl bg-white p-10 shadow-sm">

            <Ionicons name="mail-open-outline" size={40} color="#c7c7c7" />

            <Text className="mt-3 text-center text-sm font-semibold text-slate-700">
              No messages found
            </Text>

            <Text className="mt-1 text-center text-xs text-slate-400">
              Try a different search term
            </Text>

          </View>

        )}

      </ScrollView>


      {/* =====================================================
          MESSAGE DETAILS MODAL
          ===================================================== */}

      <Modal
        visible={selectedMessage !== null}
        transparent
        animationType="slide"
        onRequestClose={closeMessage}
      >

        <View className="flex-1 justify-end bg-black/50">

          <Pressable
            className="flex-1"
            onPress={closeMessage}
          />

          <View className="max-h-[75%] rounded-t-3xl bg-white">

            {/* Modal header */}
            <View className="flex-row items-center justify-between rounded-t-3xl bg-brand px-5 py-4">

              <Text className="text-base font-bold text-white">
                Message Details
              </Text>

              <Pressable
                onPress={closeMessage}
                className="h-8 w-8 items-center justify-center rounded-full bg-white/20"
              >
                <Ionicons name="close" size={20} color="#fff" />
              </Pressable>

            </View>


            {selectedMessage && (

              <ScrollView
                contentContainerStyle={{
                  padding: 20,
                }}
              >

                <View className="mb-5 flex-row items-center border-b border-slate-100 pb-4">

                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-brandSoft">

                    <Text className="font-bold text-brand">
                      {selectedMessage.senderInitials}
                    </Text>

                  </View>


                  <View className="flex-1">

                    <Text className="text-sm font-bold text-slate-900">
                      {selectedMessage.sender}
                    </Text>

                    <Text className="mt-1 text-[11px] text-slate-400">
                      {selectedMessage.time}
                    </Text>

                  </View>

                </View>


                <Text className="mb-3 text-lg font-bold text-slate-900">
                  {selectedMessage.subject}
                </Text>


                <Text className="text-sm leading-6 text-slate-700">
                  {selectedMessage.body}
                </Text>

              </ScrollView>

            )}

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}