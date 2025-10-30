import { useState } from "react";
import { Edit, Instagram, Linkedin, MapPin, Star, Calendar, LogOut, Heart, MessageCircle, CheckCircle, Clock, Users, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'interested' | 'scheduled' | 'requested' | 'accepted' | 'past'>('all');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const userProfile = {
    name: "Aditi Sharma",
    age: 25,
    gender: "Female",
    locality: "HSR Layout, Bangalore",
    interests: ["Books", "Coffee", "Startup", "Travel", "Photography"],
    preferences: ["Tech", "Books", "Female", "Male"],
    socialLinks: {
      instagram: "https://instagram.com/aditi_sharma",
      linkedin: "https://linkedin.com/in/aditi-sharma"
    },
    trustScore: 4.7,
    totalRatings: 23,
    // High-quality profile image from the internet (face-focused, mobile optimized)
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
  };

  const upcomingMeetups = [
    {
      id: 1,
      name: "Sarah Chen",
      time: "Today, 4:00 PM",
      location: "Thirdwave Coffee",
      type: "Proximity"
    },
    {
      id: 2,
      name: "Priya Singh", 
      time: "Saturday, 6:00 PM",
      location: "Forum Mall",
      type: "Availability"
    }
  ];

  // User Activity Data
  const userActivity = {
    interested: [
      {
        id: 1,
        title: "Coffee & Code",
        location: "Thirdwave Coffee",
        date: "2024-01-15",
        type: "meetup"
      },
      {
        id: 2,
        title: "Design Critique Session",
        location: "Creative Hub",
        date: "2024-01-16",
        type: "meetup"
      }
    ],
    scheduled: [
      {
        id: 1,
        name: "Sarah Chen",
        time: "Today, 4:00 PM",
        location: "Thirdwave Coffee",
        type: "Proximity",
        status: "confirmed"
      },
      {
        id: 2,
        name: "Priya Singh",
        time: "Saturday, 6:00 PM", 
        location: "Forum Mall",
        type: "Availability",
        status: "confirmed"
      }
    ],
    requested: [
      {
        id: 1,
        name: "Alex Kumar",
        time: "Yesterday, 2:00 PM",
        location: "Tech Park",
        type: "Proximity",
        status: "pending"
      },
      {
        id: 2,
        name: "Maya Patel",
        time: "Jan 10, 3:00 PM",
        location: "Art Gallery",
        type: "Availability", 
        status: "pending"
      }
    ],
    accepted: [
      {
        id: 1,
        name: "David Kim",
        time: "Jan 8, 5:00 PM",
        location: "Startup Hub",
        type: "Proximity",
        status: "accepted"
      }
    ],
    past: [
      {
        id: 1,
        name: "James Wilson",
        time: "Jan 5, 7:00 PM",
        location: "Restaurant",
        type: "Availability",
        status: "completed",
        rating: 5
      },
      {
        id: 2,
        name: "Lisa Chen",
        time: "Jan 3, 6:00 PM",
        location: "Coffee Shop",
        type: "Proximity", 
        status: "completed",
        rating: 4
      }
    ]
  };

  const getActivityCount = () => {
    return {
      interested: userActivity.interested.length,
      scheduled: userActivity.scheduled.length,
      requested: userActivity.requested.length,
      accepted: userActivity.accepted.length,
      past: userActivity.past.length,
      total: userActivity.interested.length + userActivity.scheduled.length + userActivity.requested.length + userActivity.accepted.length + userActivity.past.length
    };
  };

  const getFilteredActivities = () => {
    if (activeTab === 'all') {
      return [
        ...userActivity.interested.map(item => ({ ...item, category: 'interested' })),
        ...userActivity.scheduled.map(item => ({ ...item, category: 'scheduled' })),
        ...userActivity.requested.map(item => ({ ...item, category: 'requested' })),
        ...userActivity.accepted.map(item => ({ ...item, category: 'accepted' })),
        ...userActivity.past.map(item => ({ ...item, category: 'past' }))
      ];
    }
    return userActivity[activeTab].map(item => ({ ...item, category: activeTab }));
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Profile Header with Cover */}
      <div className="relative bg-gradient-to-br from-primary/20 via-secondary/20 to-card pb-20 flex-shrink-0">
        <div className="px-5 pt-6 pb-4 z-10 relative">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <button 
              type="button"
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 font-medium text-sm active:scale-95 animate-fast shadow-sm pointer-events-auto cursor-pointer z-20 min-w-[96px] h-10 items-center justify-center hidden sm:flex"
              style={{ touchAction: 'manipulation' }}
            >
              <Edit size={16} className="inline mr-2" />
              Edit
            </button>
          </div>
        </div>
        
        {/* Profile Image - Overlapping */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="relative">
            <img
              src={userProfile.image}
              alt={userProfile.name}
              className="w-32 h-32 rounded-3xl object-cover ring-4 ring-background shadow-float"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-brand">
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info - Fixed Height Scroll */}
      <div className="flex-1 overflow-y-auto px-5 pt-20 pb-6 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-1 px-4">
            <h2 className="text-2xl font-bold truncate max-w-[60%]">
              {userProfile.name}
            </h2>
            <button 
              type="button"
              onClick={() => navigate('/settings')}
              className="px-3 py-1.5 bg-secondary/20 rounded-full border border-border/50 font-medium text-sm active:scale-95 animate-fast shadow-sm pointer-events-auto cursor-pointer inline-flex items-center gap-2 sm:hidden"
              style={{ touchAction: 'manipulation' }}
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
            <span className="text-lg font-semibold text-primary">{userProfile.age} years old</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm">{userProfile.gender}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <MapPin size={16} />
            <span className="text-sm">{userProfile.locality}</span>
          </div>

          {/* Trust Score */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-lg">{userProfile.trustScore}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({userProfile.totalRatings} ratings)
            </span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary/50 rounded-full border border-border/50 font-medium text-sm active:scale-95 animate-fast">
              <Instagram size={16} />
              <span>Instagram</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary/50 rounded-full border border-border/50 font-medium text-sm active:scale-95 animate-fast">
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </button>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm">
          <h2 className="font-bold text-base mb-3">My Interests</h2>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest) => (
              <span key={interest} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm">
          <h2 className="font-bold text-base mb-3">Connection Preferences</h2>
          <div className="flex flex-wrap gap-2">
            {userProfile.preferences.map((pref) => (
              <span key={pref} className="px-3 py-1.5 bg-secondary border border-border/50 text-foreground text-sm font-medium rounded-full">
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Your Activity Section */}
        <div 
          className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => setShowActivityModal(true)}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <span>Your Activity</span>
            </h2>
            <ArrowRight size={16} className="text-muted-foreground" />
          </div>
          
          {/* Activity Summary */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-secondary/40 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Heart size={14} className="text-purple-600" />
                <span className="text-xs font-medium text-muted-foreground">Interested</span>
              </div>
              <span className="text-lg font-bold">{getActivityCount().interested}</span>
            </div>
            <div className="bg-secondary/40 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-muted-foreground">Scheduled</span>
              </div>
              <span className="text-lg font-bold">{getActivityCount().scheduled}</span>
            </div>
            <div className="bg-secondary/40 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-yellow-600" />
                <span className="text-xs font-medium text-muted-foreground">Requested</span>
              </div>
              <span className="text-lg font-bold">{getActivityCount().requested}</span>
            </div>
            <div className="bg-secondary/40 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-gray-600" />
                <span className="text-xs font-medium text-muted-foreground">Past Events</span>
              </div>
              <span className="text-lg font-bold">{getActivityCount().past}</span>
            </div>
          </div>
        </div>

        {/* Upcoming Meetups */}
        <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm">
          <h2 className="font-bold text-base mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span>Upcoming Meetups</span>
          </h2>
          {upcomingMeetups.length === 0 ? (
            <p className="text-muted-foreground text-center py-6 text-sm">No upcoming meetups</p>
          ) : (
            <div className="space-y-3">
              {upcomingMeetups.map((meetup) => (
                <div key={meetup.id} className="flex items-center justify-between p-4 bg-secondary/40 rounded-2xl">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{meetup.name}</h3>
                    <p className="text-xs text-muted-foreground mb-0.5">{meetup.time}</p>
                    <p className="text-xs text-muted-foreground">{meetup.location}</p>
                  </div>
                  <span 
                    className={meetup.type === "Proximity" ? "badge-proximity" : "badge-availability"}
                  >
                    {meetup.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Actions */}
        <div className="space-y-3">
          <button className="w-full py-3.5 bg-secondary/50 border border-border/50 rounded-2xl font-medium text-sm active:scale-[0.98] animate-fast">
            Edit Availability Slots
          </button>
          <button className="w-full py-3.5 bg-secondary/50 border border-border/50 rounded-2xl font-medium text-sm active:scale-[0.98] animate-fast">
            Verification Status
          </button>
          <button 
            onClick={() => {
              // Handle sign out logic here
              console.log("Sign out clicked");
              navigate("/");
            }}
            className="w-full py-3.5 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl font-medium text-sm active:scale-[0.98] animate-fast flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="bg-background rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-lg"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))', marginBottom: '0.25rem' }}
          >
            {/* Modal Header - Fixed */}
            <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
              <h2 className="text-xl font-bold">Your Activity</h2>
              <button 
                onClick={() => setShowActivityModal(false)}
                className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Activity Tabs - Fixed */}
            <div className="p-5 border-b border-border flex-shrink-0">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {[
                  { key: 'all', label: 'All', count: getActivityCount().total },
                  { key: 'interested', label: 'Interested', count: getActivityCount().interested },
                  { key: 'scheduled', label: 'Scheduled', count: getActivityCount().scheduled },
                  { key: 'requested', label: 'Requested', count: getActivityCount().requested },
                  { key: 'accepted', label: 'Accepted', count: getActivityCount().accepted },
                  { key: 'past', label: 'Past Events', count: getActivityCount().past }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Activity List - Scrollable with Fixed Height */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-5 space-y-3">
                {getFilteredActivities().length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No activities found</p>
                  </div>
                ) : (
                  getFilteredActivities().map((activity) => (
                    <div key={`${activity.category}-${activity.id}`} className="flex items-center justify-between p-4 bg-secondary/40 rounded-2xl">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Activity Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.category === 'interested' ? 'bg-purple-100 text-purple-600' :
                          activity.category === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                          activity.category === 'requested' ? 'bg-yellow-100 text-yellow-600' :
                          activity.category === 'accepted' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.category === 'interested' ? <Heart size={16} /> :
                           activity.category === 'scheduled' ? <Calendar size={16} /> :
                           activity.category === 'requested' ? <Clock size={16} /> :
                           activity.category === 'accepted' ? <CheckCircle size={16} /> :
                           <Users size={16} />}
                        </div>
                        
                        {/* Activity Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">
                            {activity.title || activity.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-0.5">
                            {activity.time || activity.date}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.location}
                          </p>
                          {activity.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={12} className="text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{activity.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Navigation Arrow */}
                      <button 
                        onClick={() => {
                          // Navigate to respective section based on activity type
                          if (activity.category === 'interested') {
                            setShowActivityModal(false);
                            navigate('/discover');
                          } else if (activity.category === 'scheduled') {
                            setShowActivityModal(false);
                            navigate('/availability');
                          } else if (activity.category === 'requested') {
                            setShowActivityModal(false);
                            navigate('/requests');
                          } else if (activity.category === 'accepted') {
                            setShowActivityModal(false);
                            navigate('/requests');
                          } else if (activity.category === 'past') {
                            setShowActivityModal(false);
                            navigate('/availability');
                          }
                        }}
                        className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                      >
                        <ArrowRight size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;