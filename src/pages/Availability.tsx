import { useState } from "react";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Availability = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const availableUsers = [
    {
      id: 1,
      name: "Priya Singh",
      age: 26,
      time: "Today, 4:00 PM",
      location: "Thirdwave Coffee, Koramangala",
      interests: ["Startup", "Tech"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Rahul Verma", 
      age: 28,
      time: "Tomorrow, 11:00 AM",
      location: "HSR Layout Park",
      interests: ["Fitness", "Health"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Anita Das",
      age: 23,
      time: "Saturday, 6:00 PM",
      location: "Forum Mall Food Court",
      interests: ["Movies", "Food"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const myAvailability = [
    {
      id: 1,
      time: "Today, 7:00 PM",
      location: "Cafe Coffee Day, Indiranagar",
      status: "Active",
    },
    {
      id: 2,
      time: "Sunday, 2:00 PM", 
      location: "Central Mall",
      status: "Active",
    },
  ];

  const handleRequestMeetup = (userName: string) => {
    toast({
      title: "Meetup requested!",
      description: `Your request has been sent to ${userName}`,
    });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Mobile Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Availability</h1>
            <p className="text-sm text-muted-foreground">Schedule meetups</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm shadow-brand active:scale-95 animate-fast touch-feedback"
          >
            <Plus size={18} />
            <span>Create</span>
          </button>
        </div>
      </div>
      
      {/* Content Container - Fixed Height Scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-6 space-y-6">

        {/* My Availability */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">My Availability</h2>
          {myAvailability.map((slot) => (
            <div
              key={slot.id}
              className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                    <Clock size={16} className="text-secondary" />
                    {slot.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-secondary/70" />
                    {slot.location}
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-success/10 text-success text-xs font-medium rounded-full">
                  {slot.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Available People */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">People Available</h2>
          {availableUsers.map((user) => (
            <div
              key={user.id}
              className="bg-card rounded-3xl p-4 border border-border/50 shadow-card active:scale-[0.98] animate-smooth touch-feedback"
            >
              <div className="flex gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-background flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-2">
                    {user.name}<span className="text-muted-foreground font-normal">, {user.age}</span>
                  </h3>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span className="truncate">{user.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      <span className="truncate">{user.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {user.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleRequestMeetup(user.name)}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl font-medium text-sm active:scale-95 animate-fast touch-feedback whitespace-nowrap hover:bg-secondary/90 transition-colors"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Availability Form - Mobile Optimized Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-float animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Create Availability</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 animate-fast"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Starbucks, Brigade Road"
                  className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 py-3 rounded-xl border-2 border-border bg-background text-foreground font-medium active:scale-95 animate-fast"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  toast({
                    title: "Availability created!",
                    description: "Your time slot is now live",
                  });
                }}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium active:scale-95 animate-fast shadow-brand"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availability;