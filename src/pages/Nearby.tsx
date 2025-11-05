import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MapPin, Heart, MessageCircle, Map, List, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedMapView from "@/components/AnimatedMapView";

const Nearby = () => {
  const [connectMode, setConnectMode] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('HSR Layout, Bangalore');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const { toast } = useToast();

  // Popular locations for suggestions
  const locationSuggestions = [
    'HSR Layout, Bangalore',
    'Koramangala, Bangalore',
    'Indiranagar, Bangalore',
    'Whitefield, Bangalore',
    'Electronic City, Bangalore',
    'Marathahalli, Bangalore',
    'BTM Layout, Bangalore',
    'JP Nagar, Bangalore',
    'Bannerghatta Road, Bangalore',
    'Malleshwaram, Bangalore',
    'Rajajinagar, Bangalore',
    'Vijaynagar, Bangalore',
    'Hebbal, Bangalore',
    'Yelahanka, Bangalore',
    'Silk Board, Bangalore'
  ];

  const filteredLocations = locationSuggestions.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const nearbyUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 24,
      distance: "0.5km away",
      interests: ["Coffee", "Books"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      lat: 12.9726,
      lng: 77.6426,
    },
    {
      id: 2,
      name: "Alex Kumar",
      age: 27,
      distance: "1.2km away", 
      interests: ["Fitness", "Travel"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      lat: 12.9706,
      lng: 77.6400,
    },
    {
      id: 3,
      name: "Maya Patel",
      age: 25,
      distance: "2.1km away",
      interests: ["Art", "Music"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      lat: 12.9736,
      lng: 77.6440,
    },
  ];

  const handleSendRequest = (userName: string) => {
    toast({
      title: "Request sent!",
      description: `Your meetup request has been sent to ${userName}`,
    });
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationSearch(location);
    setShowLocationSuggestions(false);
    toast({
      title: "Location updated!",
      description: `Now searching in ${location}`,
    });
  };

  const handleLocationSearchChange = (value: string) => {
    setLocationSearch(value);
    setShowLocationSuggestions(value.length > 0);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Nearby People</h1>
            <p className="text-sm text-muted-foreground">Connect with people around you</p>
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <span className="text-sm font-medium">Connect Mode</span>
            <Switch 
              checked={connectMode} 
              onCheckedChange={setConnectMode}
              showMessage={true}
              message="Discovering people nearby"
            />
          </div>
        </div>
      </div>
      
      {/* Content Container - Fixed Height Scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-6 space-y-6">

        {/* View Toggle */}
        {connectMode && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Button
              size="sm"
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1 ${
                viewMode === 'list' 
                  ? 'text-white' 
                  : 'text-white border-white'
              }`}
              style={{
                backgroundColor: viewMode === 'list' ? '#ff3f41' : 'transparent',
                borderColor: viewMode === 'list' ? '#ff3f41' : '#ffffff',
                borderWidth: '1px'
              }}
            >
              <List size={16} />
              <span>List</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-1 ${
                viewMode === 'map' 
                  ? 'text-white' 
                  : 'text-white border-white'
              }`}
              style={{
                backgroundColor: viewMode === 'map' ? '#7856d4' : 'transparent',
                borderColor: viewMode === 'map' ? '#7856d4' : '#ffffff',
                borderWidth: '1px'
              }}
            >
              <Map size={16} />
              <span>Map</span>
            </Button>
          </div>
        )}

        {/* Location Search - Only show in Map view */}
        {viewMode === 'map' && (
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search location..."
              value={locationSearch}
              onChange={(e) => handleLocationSearchChange(e.target.value)}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              className="pl-10 bg-card border-border h-9 py-1.5"
              style={{ borderRadius: '10px' }}
            />
            
            {/* Location Suggestions Dropdown */}
            {showLocationSuggestions && filteredLocations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-lg z-50 max-h-60 overflow-y-auto" style={{ borderRadius: '10px' }}>
                {filteredLocations.slice(0, 8).map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0 flex items-center space-x-2"
                  >
                    <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">{location}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Location Status */}
        <Card className="p-4 bg-primary/10 border-primary/20">
          <div className="flex items-center space-x-2 text-primary">
            <MapPin size={16} />
            <span className="text-sm font-medium">{selectedLocation}</span>
          </div>
        </Card>

        {/* Connect Mode Toggle Message */}
        {!connectMode && (
          <Card 
            className="p-6 rounded-xl border-0 shadow-lg"
            style={{
              backgroundColor: '#745ec9',
              background: 'linear-gradient(135deg, #745ec9 0%, #8b6ceb 100%)'
            }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium text-base leading-relaxed">
                Turn on Connect Mode to discover people nearby
              </p>
              <Button
                onClick={() => setConnectMode(true)}
                className="bg-white text-purple-600 hover:bg-white/90 font-medium px-6 py-2"
              >
                Enable Connect Mode
              </Button>
            </div>
          </Card>
        )}

        {/* Content */}
        {connectMode && viewMode === 'map' && (
          <AnimatedMapView />
        )}

        {/* User Cards */}
        {connectMode && viewMode === 'list' && (
          <div className="space-y-4">
            {nearbyUsers.map((user) => (
              <Card key={user.id} className="user-card">
                <div className="flex space-x-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{user.name}, {user.age}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {user.distance}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {user.interests.slice(0, 2).map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Heart size={14} className="mr-1" />
                        Like
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleSendRequest(user.name)}
                      >
                        <MessageCircle size={14} className="mr-1" />
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nearby;