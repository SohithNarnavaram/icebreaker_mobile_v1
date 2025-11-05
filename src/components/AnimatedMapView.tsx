import React, { useEffect, useRef } from 'react';
import './AnimatedMapView.css';

const AnimatedMapView = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Component is mounted
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="animated-map-container" ref={containerRef}>
      {/* Background Grid */}
      <div className="grid-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line-horizontal"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line-vertical"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Animated scan line */}
      <div className="scan-line" />

      {/* Center radar circle */}
      <div className="radar-container">
        <div className="radar-sweep">
          <div className="radar-gradient" />
        </div>
        <div className="radar-center" />
      </div>

      {/* Animated pulse rings */}
      <div className="pulse-container">
        <div className="pulse-ring pulse-ring-1" />
        <div className="pulse-ring pulse-ring-2" />
        <div className="pulse-ring pulse-ring-3" />
      </div>

      {/* Location markers with float animation */}
      <div className="marker-wrapper marker-wrapper-1">
        <div className="marker marker-red">
          <div className="marker-inner" />
        </div>
        <div className="marker-shadow" />
      </div>

      <div className="marker-wrapper marker-wrapper-2">
        <div className="marker marker-purple">
          <div className="marker-inner" />
        </div>
        <div className="marker-shadow" />
      </div>

      <div className="marker-wrapper marker-wrapper-3">
        <div className="marker marker-blue">
          <div className="marker-inner" />
        </div>
        <div className="marker-shadow" />
      </div>

      {/* Animated grid lines overlay */}
      <div className="animated-grid-line animated-grid-line-1" />
      <div className="animated-grid-line animated-grid-line-2" />

      {/* Connection lines between markers */}
      <div className="connection-line connection-line-1" />
      <div className="connection-line connection-line-2" />

      {/* Decorative corner elements */}
      <div className="corner corner-top-left">
        <div className="corner-line-h" />
        <div className="corner-line-v" />
      </div>
      <div className="corner corner-top-right">
        <div className="corner-line-h" />
        <div className="corner-line-v" />
      </div>
      <div className="corner corner-bottom-left">
        <div className="corner-line-h" />
        <div className="corner-line-v" />
      </div>
      <div className="corner corner-bottom-right">
        <div className="corner-line-h" />
        <div className="corner-line-v" />
      </div>

      {/* Floating particles */}
      <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" />
      <div className="particle particle-4" />
      <div className="particle particle-5" />
    </div>
  );
};

export default AnimatedMapView;

