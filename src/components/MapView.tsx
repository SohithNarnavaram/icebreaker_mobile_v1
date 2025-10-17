import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, MessageCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  age: number;
  distance: string;
  interests: string[];
  image: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  users: User[];
}

const MapView: React.FC<MapViewProps> = ({ users }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const { toast } = useToast();

  // Mock current location (HSR Layout, Bangalore)
  const currentLocation = [77.6412, 12.9716];

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: currentLocation as [number, number],
      zoom: 14,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user markers
    users.forEach(user => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${user.image})`;
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.style.border = '3px solid hsl(var(--primary))';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';

      el.addEventListener('click', () => {
        setSelectedUser(user);
      });

      new mapboxgl.Marker(el)
        .setLngLat([user.lng, user.lat])
        .addTo(map.current!);
    });

    // Add current location marker
    const currentMarker = document.createElement('div');
    currentMarker.style.width = '20px';
    currentMarker.style.height = '20px';
    currentMarker.style.backgroundColor = 'hsl(var(--primary))';
    currentMarker.style.borderRadius = '50%';
    currentMarker.style.border = '3px solid white';
    currentMarker.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';

    new mapboxgl.Marker(currentMarker)
      .setLngLat(currentLocation as [number, number])
      .addTo(map.current!);

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, users]);

  const handleSendRequest = (userName: string) => {
    toast({
      title: "Request sent!",
      description: `Your meetup request has been sent to ${userName}`,
    });
    setSelectedUser(null);
  };

  if (!mapboxToken) {
    return (
      <div className="p-4">
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
          <p className="text-muted-foreground mb-4">
            Please enter your Mapbox public token to view the map
          </p>
          <input
            type="text"
            placeholder="Enter Mapbox public token..."
            className="w-full p-2 border rounded mb-3"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your token from{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              mapbox.com
            </a>
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {selectedUser && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <Card className="p-4 bg-background/95 backdrop-blur">
            <div className="flex items-start space-x-3">
              <img
                src={selectedUser.image}
                alt={selectedUser.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{selectedUser.name}, {selectedUser.age}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUser(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center">
                  <MapPin size={12} className="mr-1" />
                  {selectedUser.distance}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedUser.interests.slice(0, 2).map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart size={14} className="mr-1" />
                    Like
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSendRequest(selectedUser.name)}
                  >
                    <MessageCircle size={14} className="mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapView;