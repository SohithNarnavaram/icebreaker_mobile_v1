import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Calendar, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to proximity page after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/proximity");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-br from-black via-primary/20 to-secondary/20 text-foreground">
      {/* Logo & Branding */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8 animate-bounce-in">
          <div className="w-28 h-28 bg-gradient-to-br from-primary to-secondary backdrop-blur-md rounded-[32px] flex items-center justify-center shadow-glow mb-6 animate-pulse">
            <Sparkles className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce shadow-brand">
            <MessageCircle size={16} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black mb-3 tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Icebreaker
        </h1>
        <p className="text-muted-foreground text-lg font-medium mb-12 max-w-xs">
          Connect with amazing people around you
        </p>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-4 bg-card backdrop-blur-sm rounded-2xl p-4 border border-border shadow-card animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary" strokeWidth={2.5} />
            </div>
            <span className="text-foreground font-medium text-left">Meet nearby people instantly</span>
          </div>
          
          <div className="flex items-center gap-4 bg-card backdrop-blur-sm rounded-2xl p-4 border border-border shadow-card animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-secondary" strokeWidth={2.5} />
            </div>
            <span className="text-foreground font-medium text-left">Schedule meetups in advance</span>
          </div>
          
          <div className="flex items-center gap-4 bg-card backdrop-blur-sm rounded-2xl p-4 border border-border shadow-card animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-primary" strokeWidth={2.5} />
            </div>
            <span className="text-foreground font-medium text-left">Chat and build connections</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/proximity")}
          className="w-full max-w-xs py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-lg shadow-brand active:scale-95 animate-fast mb-4"
        >
          Get Started
        </button>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm animate-pulse">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-75"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-muted-foreground text-xs pb-4">
        <p>Icebreaker © 2025</p>
      </div>
    </div>
  );
};

export default Index;
