import { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  MapPin, 
  Moon, 
  Sun,
  Smartphone,
  Wifi,
  Volume2,
  Eye,
  Lock,
  Trash2,
  Download,
  Upload,
  HelpCircle,
  MessageSquare,
  Edit3,
  Save,
  X,
  Camera,
  Image as ImageIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Personal Information
    name: "Aditi Sharma",
    bio: "Coffee lover, startup enthusiast, and always up for a good conversation! ☕️",
    gender: "Female",
    profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    isEditingProfile: false,
    
    // Account Settings
    profileVisibility: true,
    showAge: true,
    showLocation: true,
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: false,
    meetupReminders: true,
    newMessageAlerts: true,
    availabilityUpdates: false,
    
    // Privacy Settings
    locationSharing: true,
    showOnlineStatus: true,
    allowFriendRequests: true,
    dataCollection: false,
    
    // App Settings
    darkMode: true,
    autoLocation: true,
    soundEffects: true,
    hapticFeedback: true,
    language: "English",
    
    // Connection Settings
    proximityRadius: 5, // km
    ageRange: [18, 35],
    maxConnections: 50,
  });

  const handleSettingChange = (key: string, value: boolean | string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveProfile = () => {
    setSettings(prev => ({
      ...prev,
      isEditingProfile: false
    }));
    // Here you would typically save to backend
    console.log("Profile saved:", { name: settings.name, bio: settings.bio, gender: settings.gender });
  };

  const handleCancelEdit = () => {
    setSettings(prev => ({
      ...prev,
      isEditingProfile: false
    }));
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleSettingChange("profilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const settingSections = [
    {
      title: "Account",
      icon: User,
      items: [
        {
          title: "Public Profile",
          description: "Make your profile visible to other users",
          type: "switch",
          key: "profileVisibility",
          value: settings.profileVisibility
        },
        {
          title: "Show Age",
          description: "Display your age on your profile",
          type: "switch",
          key: "showAge",
          value: settings.showAge
        },
        {
          title: "Show Location",
          description: "Display your current location",
          type: "switch",
          key: "showLocation",
          value: settings.showLocation
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          title: "Push Notifications",
          description: "Receive notifications on your device",
          type: "switch",
          key: "pushNotifications",
          value: settings.pushNotifications
        },
        {
          title: "Email Notifications",
          description: "Receive updates via email",
          type: "switch",
          key: "emailNotifications",
          value: settings.emailNotifications
        },
        {
          title: "Meetup Reminders",
          description: "Get reminded about upcoming meetups",
          type: "switch",
          key: "meetupReminders",
          value: settings.meetupReminders
        },
        {
          title: "New Message Alerts",
          description: "Notify when you receive new messages",
          type: "switch",
          key: "newMessageAlerts",
          value: settings.newMessageAlerts
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        {
          title: "Location Sharing",
          description: "Share your location for proximity features",
          type: "switch",
          key: "locationSharing",
          value: settings.locationSharing
        },
        {
          title: "Show Online Status",
          description: "Let others see when you're online",
          type: "switch",
          key: "showOnlineStatus",
          value: settings.showOnlineStatus
        },
        {
          title: "Allow Friend Requests",
          description: "Allow others to send you connection requests",
          type: "switch",
          key: "allowFriendRequests",
          value: settings.allowFriendRequests
        },
        {
          title: "Data Collection",
          description: "Help improve the app by sharing usage data",
          type: "switch",
          key: "dataCollection",
          value: settings.dataCollection
        }
      ]
    },
    {
      title: "App Preferences",
      icon: Palette,
      items: [
        {
          title: "Dark Mode",
          description: "Use dark theme throughout the app",
          type: "switch",
          key: "darkMode",
          value: settings.darkMode
        },
        {
          title: "Auto Location",
          description: "Automatically detect your location",
          type: "switch",
          key: "autoLocation",
          value: settings.autoLocation
        },
        {
          title: "Sound Effects",
          description: "Play sounds for interactions",
          type: "switch",
          key: "soundEffects",
          value: settings.soundEffects
        },
        {
          title: "Haptic Feedback",
          description: "Vibrate on touch interactions",
          type: "switch",
          key: "hapticFeedback",
          value: settings.hapticFeedback
        }
      ]
    }
  ];

  const actionItems = [
    {
      title: "Export Data",
      description: "Download your profile and meetup data",
      icon: Download,
      action: () => console.log("Export data"),
      variant: "default" as const
    },
    {
      title: "Import Data",
      description: "Import profile data from another app",
      icon: Upload,
      action: () => console.log("Import data"),
      variant: "default" as const
    },
    {
      title: "Help & Support",
      description: "Get help or contact support",
      icon: HelpCircle,
      action: () => console.log("Help & Support"),
      variant: "default" as const
    },
    {
      title: "Delete Account",
      description: "Permanently delete your account",
      icon: Trash2,
      action: () => console.log("Delete account"),
      variant: "destructive" as const
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center active:scale-95 animate-fast"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your app preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Personal Information Section */}
        <Card className="p-5 bg-card border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>
            {!settings.isEditingProfile && (
              <button
                onClick={() => handleSettingChange("isEditingProfile", true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium active:scale-95 animate-fast"
              >
                <Edit3 size={14} />
                Edit
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Profile Picture */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Profile Picture</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={settings.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold border-2 border-background">
                    ✓
                  </div>
                </div>
                
                {settings.isEditingProfile && (
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium cursor-pointer active:scale-95 animate-fast">
                      <Camera size={16} />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => handleSettingChange("profilePicture", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces")}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium active:scale-95 animate-fast"
                    >
                      <ImageIcon size={16} />
                      <span>Use Default</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
              {settings.isEditingProfile ? (
                <Input
                  value={settings.name}
                  onChange={(e) => handleSettingChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="bg-background border-border"
                />
              ) : (
                <div className="p-3 bg-background border border-border rounded-lg text-foreground">
                  {settings.name}
                </div>
              )}
            </div>

            {/* Bio Field */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
              {settings.isEditingProfile ? (
                <Textarea
                  value={settings.bio}
                  onChange={(e) => handleSettingChange("bio", e.target.value)}
                  placeholder="Tell others about yourself..."
                  className="bg-background border-border min-h-[80px]"
                  rows={3}
                />
              ) : (
                <div className="p-3 bg-background border border-border rounded-lg text-foreground min-h-[80px] whitespace-pre-wrap">
                  {settings.bio}
                </div>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
              {settings.isEditingProfile ? (
                <Select value={settings.gender} onValueChange={(value) => handleSettingChange("gender", value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-3 bg-background border border-border rounded-lg text-foreground">
                  {settings.gender}
                </div>
              )}
            </div>

            {/* Save/Cancel Buttons */}
            {settings.isEditingProfile && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-4 py-2 border border-border bg-background text-foreground rounded-lg font-medium active:scale-95 animate-fast"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium active:scale-95 animate-fast"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="p-5 bg-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <section.icon size={18} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  {item.type === "switch" && (
                    <Switch
                      checked={item.value as boolean}
                      onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Connection Settings */}
        <Card className="p-5 bg-card border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
              <MapPin size={18} className="text-secondary" />
            </div>
            <h2 className="text-lg font-semibold">Connection Settings</h2>
          </div>
          
          <div className="space-y-4">
             <div>
               <label className="text-sm font-medium">Proximity Radius</label>
               <p className="text-xs text-muted-foreground mb-2">How far to search for nearby people</p>
               <div className="flex items-center gap-3">
                 <div className="flex-1 relative">
                   <div className="relative h-6 flex items-center">
                     {/* Track background */}
                     <div className="absolute w-full h-2 bg-gray-600 rounded-full"></div>
                     
                     {/* Progress line */}
                     <div 
                       className="absolute h-2 rounded-full"
                       style={{
                         width: `${((settings.proximityRadius - 1) / 19) * 100}%`,
                         backgroundColor: '#ff3f41'
                       }}
                     ></div>
                     
                     {/* Hidden input for functionality */}
                     <input
                       type="range"
                       min="1"
                       max="20"
                       value={settings.proximityRadius}
                       onChange={(e) => handleSettingChange("proximityRadius", parseInt(e.target.value))}
                       className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
                     />
                     
                     {/* Visual thumb */}
                     <div 
                       className="absolute w-3 h-4 rounded-sm border border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"
                       style={{ 
                         left: `${((settings.proximityRadius - 1) / 19) * 100}%`,
                         backgroundColor: '#ff3f41'
                       }}
                     ></div>
                   </div>
                 </div>
                 <span className="text-sm font-medium w-12 text-center">
                   {settings.proximityRadius} km
                 </span>
               </div>
             </div>

            <div>
              <label className="text-sm font-medium">Age Range</label>
              <p className="text-xs text-muted-foreground mb-2">Age range for potential connections</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  {/* Custom dual range slider */}
                  <div className="relative h-6 flex items-center">
                     {/* Track background */}
                     <div className="absolute w-full h-2 bg-gray-600 rounded-full"></div>
                     
                     {/* Selected range line */}
                     <div 
                       className="absolute h-2 rounded-full"
                       style={{
                         left: `${((settings.ageRange[0] - 18) / 47) * 100}%`,
                         width: `${((settings.ageRange[1] - settings.ageRange[0]) / 47) * 100}%`,
                         backgroundColor: '#745ec9'
                       }}
                     ></div>
                    
                    {/* Min thumb */}
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={settings.ageRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin < settings.ageRange[1]) {
                          handleSettingChange("ageRange", [newMin, settings.ageRange[1]]);
                        }
                      }}
                      className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
                    />
                    
                    {/* Max thumb */}
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={settings.ageRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax > settings.ageRange[0]) {
                          handleSettingChange("ageRange", [settings.ageRange[0], newMax]);
                        }
                      }}
                      className="absolute w-full h-6 opacity-0 cursor-pointer z-20"
                    />
                    
                     {/* Visual thumbs */}
                     <div 
                       className="absolute w-3 h-4 rounded-sm border border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-30"
                       style={{ 
                         left: `${((settings.ageRange[0] - 18) / 47) * 100}%`,
                         backgroundColor: '#6b7280'
                       }}
                     ></div>
                     <div 
                       className="absolute w-3 h-4 rounded-sm border border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-30"
                       style={{ 
                         left: `${((settings.ageRange[1] - 18) / 47) * 100}%`,
                         backgroundColor: '#6b7280'
                       }}
                     ></div>
                  </div>
                </div>
                <span className="text-sm font-medium w-12 text-center">
                  {settings.ageRange[0]}-{settings.ageRange[1]}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Items */}
        <Card className="p-5 bg-card border-border/50">
          <h2 className="text-lg font-semibold mb-4">Data & Support</h2>
          
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-95 animate-fast ${
                  item.variant === "destructive"
                    ? "border-destructive/20 bg-destructive/5 hover:bg-destructive/10"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.variant === "destructive"
                    ? "bg-destructive/10"
                    : "bg-primary/10"
                }`}>
                  <item.icon 
                    size={18} 
                    className={item.variant === "destructive" ? "text-destructive" : "text-primary"} 
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-medium text-sm ${
                    item.variant === "destructive" ? "text-destructive" : "text-foreground"
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* App Info */}
        <div className="text-center py-6">
          <p className="text-xs text-muted-foreground">
            Icebreaker App v1.0.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
