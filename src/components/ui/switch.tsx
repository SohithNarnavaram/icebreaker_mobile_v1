import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    showMessage?: boolean;
    message?: string;
  }
>(({ className, showMessage = false, message = "Discovering people nearby", ...props }, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (props.checked && showMessage) {
      setShowToast(true);
      
      // Hide message after 3 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Hide message immediately when toggle is turned off
      setShowToast(false);
    }
  }, [props.checked, showMessage]);

  return (
    <div className="relative">
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-primary transition-all duration-300 ease-in-out data-[state=checked]:bg-primary data-[state=unchecked]:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          )}
        />
      </SwitchPrimitives.Root>

      {/* Toast Message */}
      {showToast && (
        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200 z-50 max-w-[200px]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
            <span className="truncate">{message}</span>
          </div>
          {/* Arrow pointing up */}
          <div className="absolute -top-1 right-4 w-2 h-2 bg-primary rotate-45"></div>
        </div>
      )}
    </div>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
