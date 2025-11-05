import { createContext, useContext, useState, useEffect } from 'react';

interface NotificationContextType {
  unreadConversations: number;
  pendingRequests: number;
  profileNotifications: number;
  updateUnreadConversations: (count: number) => void;
  updatePendingRequests: (count: number) => void;
  updateProfileNotifications: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadConversations, setUnreadConversations] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [profileNotifications, setProfileNotifications] = useState(0);

  // Mock data - in a real app, this would come from APIs
  useEffect(() => {
    // Chat data - initial unread count for app load
    // This gets updated dynamically by ChatsScreen when chats are opened
    const chatList = [
      {
        id: 1,
        name: "Sarah Chen",
        unread: 2,
      },
      {
        id: 2,
        name: "Alex Kumar",
        unread: 0,
      },
      {
        id: 3,
        name: "Priya Singh",
        unread: 1,
      },
    ];

    // Requests data
    const proximityRequests = [
      { id: 1, name: "Maya Patel" },
      { id: 2, name: "Rohit Sharma" },
    ];

    const availabilityRequests = [
      { id: 1, name: "Kavya Reddy" },
    ];

    // Calculate counts
    const totalUnreadMessages = chatList.reduce((sum, chat) => sum + chat.unread, 0);
    const totalRequests = proximityRequests.length + availabilityRequests.length;
    
    // Profile notifications (example: verification pending, settings updates, etc.)
    const profilePendingItems = 0; // Example: verification status pending

    setUnreadConversations(totalUnreadMessages);
    setPendingRequests(totalRequests);
    setProfileNotifications(profilePendingItems);
  }, []);

  const updateUnreadConversations = (count: number) => {
    setUnreadConversations(count);
  };

  const updatePendingRequests = (count: number) => {
    setPendingRequests(count);
  };

  const updateProfileNotifications = (count: number) => {
    setProfileNotifications(count);
  };

  return (
    <NotificationContext.Provider value={{ 
      unreadConversations, 
      pendingRequests, 
      profileNotifications,
      updateUnreadConversations,
      updatePendingRequests,
      updateProfileNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};








