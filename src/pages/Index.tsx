import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to proximity page after 2 seconds (or implement proper auth check)
    const timer = setTimeout(() => {
      navigate("/proximity");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-brand">
      <Card className="w-full max-w-md p-8 text-center shadow-float">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Icebreaker</h1>
          <p className="text-muted-foreground">Connect with amazing people around you</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 text-left">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm">Meet nearby people instantly</span>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm">Schedule meetups in advance</span>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-sm">Build meaningful connections</span>
          </div>
        </div>

        <Button
          className="w-full mb-3"
          onClick={() => navigate("/proximity")}
        >
          Get Started
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Redirecting you to the app...
        </p>
      </Card>
    </div>
  );
};

export default Index;
