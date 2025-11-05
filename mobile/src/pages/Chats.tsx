import React, { useRef, useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, Image, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Animated, BackHandler } from "react-native";
import { Search, Send, ArrowLeft, Smile, Paperclip, Mic, MessageSquare } from "lucide-react-native";
import { useNotifications } from "../contexts/NotificationContext";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);
  const sendAnim = useRef(new Animated.Value(1)).current;
  const { updateUnreadConversations, pendingRequests } = useNotifications();
  const navigation = useNavigation();

  const chatList = [
    {
      id: 1,
      name: "Sarah Chen",
      lastMessage: "Hey! Are we still on for coffee at 4?",
      time: "2m ago",
      type: "Proximity",
      unread: 2,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Alex Kumar",
      lastMessage: "Thanks for the book recommendation!",
      time: "1h ago",
      type: "Availability",
      unread: 0,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Priya Singh",
      lastMessage: "The startup event was amazing, let's catch up soon",
      time: "3h ago",
      type: "Proximity",
      unread: 1,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    },
  ];

  type ChatMessage = { id: number; text: string; sent: boolean; time: string };
  const [chatMessages, setChatMessages] = useState<Record<number, ChatMessage[]>>({
    1: [
      { id: 1, text: "Hey! Are we still on for coffee at 4?", sent: false, time: "2:35 PM" },
      { id: 2, text: "Yes! I'll be there. Which place did we decide on?", sent: true, time: "2:36 PM" },
      { id: 3, text: "Thirdwave Coffee in Koramangala. See you there! ☕", sent: false, time: "2:37 PM" },
      { id: 4, text: "Perfect! Looking forward to it 😊", sent: true, time: "2:38 PM" },
    ],
    2: [],
    3: [],
  });

  const currentChatMessages: ChatMessage[] = selectedChat ? (chatMessages[selectedChat] ?? []) : [];

  // Handle hardware back button when in a chat
  useEffect(() => {
    if (!selectedChat) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setSelectedChat(null);
      return true; // Prevent default behavior (navigating away from screen)
    });

    return () => backHandler.remove();
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;

    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setTimeout(() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        }, Platform.OS === 'ios' ? 250 : 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!selectedChat) return;
    const trimmed = message.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newMsg: ChatMessage = { id: now.getTime(), text: trimmed, sent: true, time };

    setChatMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] ?? []), newMsg],
    }));
    setMessage("");

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  useEffect(() => {
    const hasText = message.trim().length > 0;
    if (hasText) {
      Animated.sequence([
        Animated.timing(sendAnim, { toValue: 1.1, duration: 120, useNativeDriver: true }),
        Animated.spring(sendAnim, { toValue: 1, friction: 5, useNativeDriver: true })
      ]).start();
    }
  }, [message, sendAnim]);

  if (selectedChat) {
    const chat = chatList.find(c => c.id === selectedChat);
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <Pressable onPress={() => setSelectedChat(null)} style={styles.backButton}>
            <ArrowLeft size={22} color="#E5E7EB" />
          </Pressable>
          <Image source={{ uri: chat?.image }} style={styles.chatAvatar} />
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>{chat?.name}</Text>
            <View style={[styles.badge, chat?.type === 'Availability' ? styles.badgeAvailability : styles.badgeProximity]}>
              <Text style={styles.badgeText}>{chat?.type}</Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={styles.gradientWrap}>
            <View style={styles.redTopOverlay} />
            <View style={styles.redMidOverlay} />
            <View style={styles.redBottomOverlay} />
            <ScrollView
              ref={scrollRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => {
                setTimeout(() => {
                  scrollRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
            >
              {currentChatMessages.map((msg) => {
                const isProximity = chat?.type === 'Proximity';
                const isAvailability = chat?.type === 'Availability';
                return (
                  <View key={msg.id} style={[styles.messageRow, msg.sent && styles.messageRowSent]}>
                    <View style={[
                      styles.messageBubble, 
                      msg.sent && styles.messageBubbleSent,
                      msg.sent && isProximity && styles.messageBubbleProximity,
                      msg.sent && isAvailability && styles.messageBubbleAvailability
                    ]}>
                      <Text style={[styles.messageText, msg.sent && styles.messageTextSent]}>{msg.text}</Text>
                      <Text style={[styles.messageTime, msg.sent && styles.messageTimeSent]}>{msg.time}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputPill}>
              <Pressable style={styles.inlineIconBtn}>
                <Smile size={20} color="#9ca3af" />
              </Pressable>
              <TextInput
                style={styles.messageInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Message"
                placeholderTextColor="#9ca3af"
                multiline
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd({ animated: true });
                  }, Platform.OS === 'ios' ? 300 : 200);
                }}
                blurOnSubmit={false}
              />
              <Pressable style={styles.inlineIconBtn}>
                <Paperclip size={20} color="#9ca3af" />
              </Pressable>
            </View>
            <Animated.View style={[
              styles.sendButton, 
              !message.trim() && styles.sendButtonIdle,
              message.trim() && chat?.type === 'Proximity' && styles.sendButtonProximity,
              message.trim() && chat?.type === 'Availability' && styles.sendButtonAvailability,
              { transform: [{ scale: sendAnim }] }
            ]}>
              <Pressable onPress={() => { message.trim() ? handleSendMessage() : null; }} disabled={!message.trim()} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {message.trim() ? (
                  <Send size={18} color="#fff" />
                ) : (
                  <Mic size={18} color="#fff" />
                )}
              </Pressable>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Messages</Text>
            <Text style={styles.subtitle}>Your conversations</Text>
          </View>
          {pendingRequests > 0 && (
            <Pressable 
              onPress={() => navigation.navigate('Requests' as never)}
              style={({ pressed }) => [
                styles.requestsButton,
                pressed && styles.requestsButtonPressed
              ]}
            >
              <MessageSquare size={18} color="#7856d4" />
              <Text style={styles.requestsText}>
                Requests ({pendingRequests})
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={18} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor="#9ca3af"
        />
      </View>

      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {chatList.map((chat) => (
          <Pressable 
            key={chat.id} 
            onPress={() => setSelectedChat(chat.id)} 
            style={({ pressed }) => [
              styles.chatItem,
              pressed && styles.chatItemPressed
            ]}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: chat.image }} style={styles.avatar} />
              </View>
              {chat.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{chat.unread}</Text>
                </View>
              )}
            </View>
            <View style={styles.chatDetails}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatItemName}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              <View style={styles.lastMessageRow}>
                <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
                  {chat.lastMessage}
                </Text>
                <View style={[styles.typeBadge, chat.type === 'Proximity' ? styles.badgeProx : styles.badgeAvail]}>
                  <Text style={styles.typeBadgeText}>{chat.type}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 18, backgroundColor: '#000000' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 32, fontWeight: '700', color: '#FFFFFF', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#9CA3AF', fontWeight: '500' },
  requestsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  requestsButtonPressed: {
    backgroundColor: '#141414',
    transform: [{ scale: 0.97 }],
  },
  requestsText: { fontSize: 14, color: '#7856d4', fontWeight: '600' },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginTop: 16, 
    marginBottom: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#0F0F0F', 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#1F1F1F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: { flex: 1, paddingVertical: 2, paddingHorizontal: 12, backgroundColor: 'transparent', borderRadius: 20, fontSize: 15, color: '#E5E7EB', marginLeft: 8, fontWeight: '400' },
  chatList: { flex: 1, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  chatItem: { 
    flexDirection: 'row', 
    padding: 18, 
    backgroundColor: '#0F0F0F', 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#1A1A1A', 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  chatItemPressed: {
    backgroundColor: '#141414',
    borderColor: '#252525',
    transform: [{ scale: 0.98 }],
  },
  avatarContainer: { marginRight: 14, position: 'relative' },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 30 },
  unreadBadge: { 
    position: 'absolute', 
    top: -2, 
    right: -2, 
    backgroundColor: '#ff3f41', 
    borderRadius: 12, 
    minWidth: 24, 
    paddingHorizontal: 6, 
    height: 24, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
    shadowColor: '#ff3f41',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  unreadText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  chatDetails: { flex: 1, justifyContent: 'center', minWidth: 0 },
  chatHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  chatItemName: { fontSize: 17, fontWeight: '600', color: '#FFFFFF', letterSpacing: -0.3 },
  chatTime: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  lastMessageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  lastMessage: { flex: 1, fontSize: 15, color: '#9CA3AF', fontWeight: '400', minWidth: 0 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14, marginLeft: 8, flexShrink: 0 },
  badgeProx: { backgroundColor: '#ff3f41' },
  badgeAvail: { backgroundColor: '#7856d4' },
  typeBadgeText: { fontSize: 11, color: '#fff', fontWeight: '700', letterSpacing: 0.3 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 46, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#2E2E2E', backgroundColor: '#0D0D0D' },
  backButton: { marginRight: 12, padding: 4 },
  chatAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: '600', color: '#E5E7EB' },
  badge: { marginTop: 4, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeAvailability: { backgroundColor: '#7856d4' },
  badgeProximity: { backgroundColor: '#ff3f41' },
  badgeText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  messagesContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 16, gap: 8, backgroundColor: '#000000' },
  messagesContent: { paddingBottom: 8 },
  gradientWrap: { flex: 1, position: 'relative', backgroundColor: '#000000' },
  redTopOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 220, backgroundColor: 'rgba(255,63,65,0.10)' },
  redMidOverlay: { position: 'absolute', top: 140, left: 0, right: 0, height: 220, backgroundColor: 'rgba(255,63,65,0.06)' },
  redBottomOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, backgroundColor: 'rgba(255,63,65,0.08)' },
  messageRow: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8 },
  messageRowSent: { justifyContent: 'flex-end' },
  messageBubble: { maxWidth: '75%', backgroundColor: '#1A1A1A', padding: 12, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: '#2E2E2E' },
  messageBubbleSent: { borderTopRightRadius: 4, borderTopLeftRadius: 16 },
  messageBubbleProximity: { backgroundColor: '#ff3f41', borderColor: '#ff3f41' },
  messageBubbleAvailability: { backgroundColor: '#7856d4', borderColor: '#7856d4' },
  messageText: { fontSize: 15, color: '#E5E7EB', lineHeight: 20 },
  messageTextSent: { color: '#fff' },
  messageTime: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  messageTimeSent: { color: 'rgba(255,255,255,0.7)', textAlign: 'right' },
  inputContainer: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#2E2E2E', backgroundColor: '#0D0D0D', alignItems: 'center', gap: 8 },
  inputPill: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 24, paddingHorizontal: 8, paddingVertical: 6, borderWidth: 1, borderColor: '#2E2E2E' },
  inlineIconBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  messageInput: { flex: 1, paddingVertical: 8, paddingHorizontal: 8, color: '#E5E7EB', fontSize: 15, maxHeight: 100 },
  sendButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sendButtonIdle: { backgroundColor: '#3a3a3a' },
  sendButtonProximity: { backgroundColor: '#ff3f41' },
  sendButtonAvailability: { backgroundColor: '#7856d4' },
});

export default ChatsScreen;
