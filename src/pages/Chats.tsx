import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Send, ArrowLeft } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const { updateUnreadConversations } = useNotifications();

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

  const currentChatMessages = [
    {
      id: 1,
      text: "Hey! Are we still on for coffee at 4?",
      sent: false,
      time: "2:35 PM",
    },
    {
      id: 2,
      text: "Yes! I'll be there. Which place did we decide on?",
      sent: true,
      time: "2:36 PM",
    },
    {
      id: 3,
      text: "Thirdwave Coffee in Koramangala. See you there! ☕",
      sent: false,
      time: "2:37 PM",
    },
    {
      id: 4,
      text: "Perfect! Looking forward to it 😊",
      sent: true,
      time: "2:38 PM",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    // Update unread count when chat is opened
    const unreadCount = chatList.filter(chat => chat.unread > 0 && chat.id !== chatId).length;
    updateUnreadConversations(unreadCount);
  };

  if (selectedChat) {
    const chat = chatList.find(c => c.id === selectedChat);
    
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-lg flex-shrink-0">
          <button
            onClick={() => setSelectedChat(null)}
            className="mr-3 p-2 -ml-2 rounded-full active:scale-90 animate-fast touch-feedback"
          >
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <img
            src={chat?.image}
            alt={chat?.name}
            className="w-11 h-11 rounded-full mr-3 ring-2 ring-background"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-base">{chat?.name}</h2>
            <span 
              className={chat?.type === "Proximity" ? "badge-proximity" : "badge-availability"}
            >
              {chat?.type}
            </span>
          </div>
        </div>

        {/* Messages - Fixed Height Scroll */}
        <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto bg-gradient-to-b from-background to-secondary/20 pb-6">
          {currentChatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
              <div className={`chat-bubble ${msg.sent ? 'sent' : 'received'}`}>
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <p className={`text-[11px] mt-1.5 ${msg.sent ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-4 py-3 bg-background/95 backdrop-blur-lg border-t border-border/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-11 rounded-full bg-secondary/50 border-0 px-5 focus-visible:ring-1 text-[15px]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 animate-fast disabled:opacity-50 disabled:active:scale-100 touch-feedback shadow-brand"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Mobile Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border/50 flex-shrink-0">
        <h1 className="text-3xl font-bold mb-1">Messages</h1>
        <p className="text-sm text-muted-foreground">Your conversations</p>
      </div>

      {/* Search */}
      <div className="px-5 py-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search conversations..." 
            className="pl-12 h-11 rounded-2xl bg-secondary/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Chat List - Fixed Height Scroll */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="space-y-2 pb-6">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className="flex items-center p-4 rounded-2xl active:scale-[0.98] animate-fast bg-card border border-border/30 touch-feedback"
            >
              <div className="relative mr-3">
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-background"
                />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1.5 bg-primary rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[11px] text-primary-foreground font-bold">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-semibold text-base truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground ml-2">{chat.time}</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  <span 
                    className={chat.type === "Proximity" ? "badge-proximity" : "badge-availability"}
                  >
                    {chat.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;