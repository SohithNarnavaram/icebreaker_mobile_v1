import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(true); // Default to mobile for React Native

  useEffect(() => {
    const { width } = Dimensions.get('window');
    setIsMobile(width < MOBILE_BREAKPOINT);
    
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsMobile(window.width < MOBILE_BREAKPOINT);
    });

    return () => subscription?.remove();
  }, []);

  return isMobile;
}







