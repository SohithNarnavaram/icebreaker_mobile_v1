import { useState } from "react";
import { Clock, MapPin, Check, X, Bell, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";

const Requests = () => {
  const { updatePendingRequests } = useNotifications();
  const [proximityRequests, setProximityRequests] = useState([
    {
      id: 1,
      name: "Maya Patel",
      age: 25,
      time: "5 minutes ago",
      message: "Hi! I noticed we're both into art and music. Want to grab coffee?",
      interests: ["Art", "Music"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Rohit Sharma",
      age: 29,
      time: "1 hour ago", 
      message: "Hey there! Love your book collection. Coffee sometime?",
      interests: ["Books", "Travel"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  const [availabilityRequests, setAvailabilityRequests] = useState([
    {
      id: 1,
      name: "Kavya Reddy",
      age: 26,
      time: "2 hours ago",
      slot: {
        time: "Today, 7:00 PM",
        location: "Cafe Coffee Day, Indiranagar",
      },
      interests: ["Startup", "Networking"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Arjun Singh",
      age: 24,
      time: "3 hours ago",
      slot: {
        time: "Sunday, 2:00 PM",
        location: "Central Mall",
      },
      interests: ["Movies", "Gaming"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  const { toast } = useToast();

  const handleProximityResponse = (requestId: number, accepted: boolean, userName: string) => {
    setProximityRequests(prev => prev.filter(req => req.id !== requestId));
    
    // Update notification count
    const newCount = proximityRequests.length - 1 + availabilityRequests.length;
    updatePendingRequests(newCount);
    
    toast({
      title: accepted ? "Request accepted!" : "Request declined",
      description: accepted 
        ? `You can now chat with ${userName}` 
        : "Request has been declined",
    });
  };

  const handleAvailabilityResponse = (requestId: number, accepted: boolean, userName: string) => {
    setAvailabilityRequests(prev => prev.filter(req => req.id !== requestId));
    
    // Update notification count
    const newCount = proximityRequests.length + availabilityRequests.length - 1;
    updatePendingRequests(newCount);
    
    toast({
      title: accepted ? "Meetup confirmed!" : "Request declined", 
      description: accepted 
        ? `Your meetup with ${userName} is confirmed`
        : "Request has been declined",
    });
  };

  const [activeTab, setActiveTab] = useState("proximity");

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Mobile Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border flex-shrink-0">
        <h1 className="text-3xl font-bold mb-1">Requests</h1>
        <p className="text-sm text-muted-foreground">Manage connections</p>
      </div>

      {/* Custom Tab Navigation */}
      <div className="px-4 mt-4 mb-5 flex-shrink-0">
        <div className="grid w-full grid-cols-2 h-11 bg-secondary/50 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("proximity")}
            className={`rounded-xl font-medium transition-all duration-200 ${
              activeTab === "proximity"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Nearby ({proximityRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`rounded-xl font-medium transition-all duration-200 ${
              activeTab === "availability"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Scheduled ({availabilityRequests.length})
          </button>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {activeTab === "proximity" ? (
          proximityRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 pb-16">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Bell size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No proximity requests</p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {proximityRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card rounded-3xl p-4 border border-border/50 shadow-card"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={request.image}
                      alt={request.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-background flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base">
                          {request.name}<span className="text-muted-foreground font-normal">, {request.age}</span>
                        </h3>
                        <span className="badge-proximity flex-shrink-0">
                          Nearby
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{request.time}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3 leading-relaxed">{request.message}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {request.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleProximityResponse(request.id, false, request.name)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-border bg-background text-foreground font-medium text-sm active:scale-95 animate-fast hover:bg-[#ff3f41] hover:text-white hover:border-[#ff3f41] active:bg-[#ff3f41] active:text-white active:border-[#ff3f41] transition-colors duration-200"
                    >
                      <X size={16} />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => handleProximityResponse(request.id, true, request.name)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm active:scale-95 animate-fast hover:bg-[#7856d4] hover:text-white active:bg-[#7856d4] active:text-white transition-colors duration-200"
                    >
                      <Check size={16} />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          availabilityRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 pb-16">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No availability requests</p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {availabilityRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card rounded-3xl p-4 border border-border/50 shadow-card"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={request.image}
                      alt={request.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-background flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base">
                          {request.name}<span className="text-muted-foreground font-normal">, {request.age}</span>
                        </h3>
                        <span className="badge-availability flex-shrink-0">
                          Scheduled
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{request.time}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3 bg-secondary/30 rounded-2xl p-3">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Clock size={15} className="text-secondary" />
                      <span className="font-medium">{request.slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={15} className="text-secondary/70" />
                      <span>{request.slot.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {request.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAvailabilityResponse(request.id, false, request.name)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-border bg-background text-foreground font-medium text-sm active:scale-95 animate-fast hover:bg-[#ff3f41] hover:text-white hover:border-[#ff3f41] active:bg-[#ff3f41] active:text-white active:border-[#ff3f41] transition-colors duration-200"
                    >
                      <X size={16} />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => handleAvailabilityResponse(request.id, true, request.name)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm active:scale-95 animate-fast hover:bg-[#7856d4] hover:text-white active:bg-[#7856d4] active:text-white transition-colors duration-200"
                    >
                      <Check size={16} />
                      <span>Confirm</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Requests;