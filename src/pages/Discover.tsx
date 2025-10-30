import { useState } from "react";
import { Search, Users, MapPin, Calendar, Heart, MessageCircle, Star } from "lucide-react";

const Discover = () => {
  const [likedMeetups, setLikedMeetups] = useState<Set<number>>(new Set());
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [
    "Nearby", "Tech", "Design", "Music", "Fitness", "Food", "Books", "Startup"
  ];

  const featuredPeople = [
    { 
      id: 1, 
      name: "Sarah Chen", 
      tag: "Designer • 0.5km away", 
      color: "from-pink-400 to-fuchsia-500",
      interests: ["Design", "Coffee"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face"
    },
    { 
      id: 2, 
      name: "Alex Kumar", 
      tag: "Developer • 1.2km away", 
      color: "from-blue-400 to-cyan-500",
      interests: ["Tech", "Gaming"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    { 
      id: 3, 
      name: "Maya Patel", 
      tag: "Musician • 2.1km away", 
      color: "from-purple-400 to-indigo-500",
      interests: ["Music", "Art"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    { 
      id: 4, 
      name: "David Kim", 
      tag: "Entrepreneur • 0.8km away", 
      color: "from-green-400 to-emerald-500",
      interests: ["Startup", "Networking"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    { 
      id: 5, 
      name: "Priya Singh", 
      tag: "Fitness Coach • 1.5km away", 
      color: "from-orange-400 to-red-500",
      interests: ["Fitness", "Health"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face"
    },
    { 
      id: 6, 
      name: "James Wilson", 
      tag: "Chef • 2.3km away", 
      color: "from-yellow-400 to-amber-500",
      interests: ["Food", "Cooking"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
  ];

  const trendingMeetups = [
    {
      id: 1,
      title: "Coffee & Code",
      location: "Thirdwave Coffee",
      time: "Today, 4:00 PM",
      attendees: 8,
      type: "Tech Meetup"
    },
    {
      id: 2,
      title: "Design Critique Session",
      location: "Creative Hub",
      time: "Tomorrow, 6:00 PM",
      attendees: 12,
      type: "Design Workshop"
    }
  ];

  const handleLikeMeetup = (meetupId: number) => {
    setLikedMeetups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(meetupId)) {
        newSet.delete(meetupId);
      } else {
        newSet.add(meetupId);
      }
      return newSet;
    });
  };

  const handleSearchToggle = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Discover</h1>
          <button 
            onClick={handleSearchToggle}
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center active:scale-95 transition-all duration-200"
          >
            <Search size={18} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Find amazing people around you</p>
        
        {/* Animated Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showSearchBar ? 'max-h-16 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search people, interests, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Featured Person Card */}
        <div className="px-5 pt-5">
          <div className="rounded-3xl p-4 bg-gradient-to-br text-white shadow-card from-primary to-secondary relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-[11px] font-medium bg-white/20 px-2 py-1 rounded-full w-max mb-2">
                Featured • Verified
              </div>
              <div className="text-2xl font-extrabold leading-snug mb-1">Sarah Chen</div>
              <div className="text-sm opacity-90">UI/UX Designer • 0.5km away</div>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Design</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Coffee</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Interest Categories */}
        <div className="px-5 mt-4">
          <h2 className="text-lg font-semibold mb-3">Explore by Interest</h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((category) => (
              <button key={category} className="px-4 py-2 rounded-full bg-card border border-border text-sm whitespace-nowrap active:scale-95">
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* People Grid */}
        <div className="px-5 mt-4">
          <h2 className="text-lg font-semibold mb-3">People Nearby</h2>
          <div className="grid grid-cols-2 gap-3">
            {featuredPeople.map((person) => (
              <div key={person.id} className={`rounded-2xl p-3 bg-gradient-to-br ${person.color} text-white shadow-card active:scale-[0.98] relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="text-[11px] font-medium opacity-80 mb-1">{person.tag}</div>
                  <div className="font-extrabold leading-tight mb-2">{person.name}</div>
                  <div className="flex gap-1">
                    {person.interests.map((interest) => (
                      <span key={interest} className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Meetups */}
        <div className="px-5 mt-6 pb-6">
          <h2 className="text-lg font-semibold mb-3">Trending Meetups</h2>
          <div className="space-y-3">
            {trendingMeetups.map((meetup) => (
              <div key={meetup.id} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{meetup.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin size={14} />
                      <span>{meetup.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Calendar size={14} />
                      <span>{meetup.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users size={14} />
                    <span>{meetup.attendees}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => handleLikeMeetup(meetup.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border font-medium text-sm active:scale-95 transition-all duration-200 ${
                      likedMeetups.has(meetup.id)
                        ? 'border-[#7856d4] bg-[#F3EEFF] text-[#7856d4]'
                        : 'border-border bg-background text-foreground'
                    }`}
                  >
                    <Heart 
                      size={16}
                      color={likedMeetups.has(meetup.id) ? '#7856d4' : 'currentColor'}
                      fill={likedMeetups.has(meetup.id) ? '#7856d4' : 'none'}
                      className="transition-colors duration-300 ease-in-out"
                    />
                    <span>Interested</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm active:scale-95">
                    <MessageCircle size={16} />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-5 pb-6">
          <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center">
                <Star size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Start Connecting</div>
                <div className="text-xs text-muted-foreground">Turn on Connect Mode</div>
              </div>
            </div>
            <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-95">
              <Users size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;


