// src/screens/notices.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Navbar from '../../Common_Components/CommonNavbar/Navbar';
import { noticesList, noticesContentDb } from '../../data/Teacher_information/noticesData';

// ==============================================
// Notice Card Component (একটি নোটিসের ছোট কার্ড)
// ==============================================
const NoticeCard = ({ notice, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-white border border-border rounded-xl p-6 mb-2.5"
      onPress={() => onPress(notice.fileName)}
      activeOpacity={0.7}
    >
      {/* Top Row: Icon + Title + Meta info */}
      <View className="flex-row items-center">
        <View
          className="w-16 h-10 rounded-lg items-center justify-center mr-2.5"
          style={{ backgroundColor: `${notice.iconColor}15` }}
        >
          <Ionicons name="megaphone" size={20} color={notice.iconColor} />
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-text-main text-xs mb-1" numberOfLines={1}>
            {notice.title}
          </Text>

          <View className="flex-row items-center gap-1 flex-wrap">
            <Text className="text-text-light text-[10px]">{notice.date}</Text>
            <Text className="text-text-light text-[10px]">•</Text>
            <Text className="text-text-light text-[10px]">{notice.fileSize}</Text>
            <Text className="text-text-light text-[10px]">•</Text>
            <Text className="text-brand text-[10px] font-medium">{notice.department}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Row: View Button (মাঝখানে)
      <View className="flex-row justify-center mt-0">
        <View className="flex-row items-center bg-brand rounded-full px-5 py-2">
          <Ionicons name="document-text" size={14} color="white" />
          <Text className="text-[11px] text-red ml-1.5 font-semibold">View Notice</Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

// ==============================================
// Empty State (কোনো নোটিস না থাকলে দেখাবে)
// ==============================================
const EmptyNoticeState = () => (
  <View className="items-center justify-center py-10">
    <Ionicons name="document-text-outline" size={48} color="#D0D0D8" />
    <Text className="text-text-light text-sm mt-3">No notices found</Text>
  </View>
);

// ==============================================
// Notice Detail Modal (নোটিসের বিস্তারিত দেখানোর মডাল)
// ==============================================
const NoticeDetailModal = ({ visible, notice, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {/* Modal খোলা অবস্থায়ও status bar ঠিক রাখার জন্য */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl h-[85%]">

          {/* Modal Header */}
          <View className="bg-brand flex-row justify-between items-center px-5 py-4 rounded-t-3xl">
            <Text className="text-white font-bold text-base flex-1" numberOfLines={1}>
              {notice?.title || 'Notice Viewer'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Toolbar (file name + download) */}
          <View className="flex-row justify-between items-center px-5 py-3 border-b border-border">
            <Text className="text-text-light text-xs">
              File: <Text className="font-bold text-text-main">{notice?.fileName}</Text>
            </Text>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity onPress={() => alert('Downloading...')}>
                <Ionicons name="download-outline" size={18} color="#6B6B7B" />
              </TouchableOpacity>
              <Text className="text-text-light text-xs">Page 1 of 1</Text>
            </View>
          </View>

          {/* Notice Content (like a printed document) */}
          <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
            {notice && (
              <View className="bg-white border border-border rounded-xl p-5 relative">

                {/* School Header */}
                <View className="items-center border-b border-border pb-4 mb-4">
                  <Text className="font-bold text-text-main text-base">
                    {notice.schoolName}
                  </Text>
                  <Text className="text-text-light text-xs">
                    {notice.schoolSub}
                  </Text>
                </View>

                {/* Reference + Date */}
                <View className="flex-row justify-between mb-4">
                  <Text className="text-text-light text-xs">{notice.ref}</Text>
                  <Text className="text-text-light text-xs">Date: {notice.date}</Text>
                </View>

                {/* Title */}
                <Text className="font-bold text-text-main text-base text-center mb-4">
                  {notice.title}
                </Text>

                {/* Body */}
                <Text className="text-text-main text-xs leading-6 whitespace-pre-wrap mb-4">
                  {notice.body}
                </Text>

                {/* Signature */}
                <View className="border-t border-border pt-4 mt-2">
                  <Text className="text-text-main text-sm font-bold text-center">
                    {notice.signee}
                  </Text>
                  <Text className="text-text-light text-xs text-center mt-1">
                    Authorized Signature
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
};

// ==============================================
// Search + Upload Bar
// ==============================================
const SearchAndUploadBar = ({ searchQuery, onSearchChange }) => (
  <View className="flex-row px-4 py-3">
    {/* Search Box (পুরো জায়গা জুড়ে) */}
    <View className="flex-1 flex-row items-center bg-[#F7F7F7] border border-brand/15 rounded-xl px-3 py-2.5">
      <Ionicons name="search-outline" size={18} color="#8E7CC3" />
      <TextInput
        className="flex-1 ml-2 text-sm text-text-main"
        placeholder="Search notices..."
        placeholderTextColor="#6B6B7B"
        value={searchQuery}
        onChangeText={onSearchChange}
      />
    </View>
  </View>
);

// ==============================================
// Main Screen: Notices
// ==============================================
const Notices = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Filter notices based on search text (title বা department দিয়ে খুঁজবে)
  const filteredNotices = noticesList.filter((notice) => {
    const query = searchQuery.toLowerCase();
    return (
      notice.title.toLowerCase().includes(query) ||
      notice.department.toLowerCase().includes(query)
    );
  });

  // নোটিসে ক্লিক করলে তার ডিটেইল খুলবে
  const handleViewNotice = (fileName) => {
    const noticeData = noticesContentDb[fileName];
    if (!noticeData) return;

    setSelectedNotice({ ...noticeData, fileName });
    setIsModalVisible(true);
  };

  // মডাল বন্ধ করার ফাংশন
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedNotice(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#625373" />

      {/* Common Navbar (static, already made) */}
      <Navbar
        title="Notices"
        onBack={() => router.back()}
        onMenu={() => console.log('Notices menu pressed')}
      />

      {/* Search */}
      <SearchAndUploadBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Notices List */}
      <ScrollView
        className="flex-1 px-4 pt-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} onPress={handleViewNotice} />
          ))
        ) : (
          <EmptyNoticeState />
        )}
      </ScrollView>

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        visible={isModalVisible}
        notice={selectedNotice}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export default Notices;