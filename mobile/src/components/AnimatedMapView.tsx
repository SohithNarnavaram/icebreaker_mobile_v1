import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Platform } from 'react-native';

const AnimatedMapView = () => {
  // Animation values
  const radarRotation = useRef(new Animated.Value(0)).current;
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pulse3 = useRef(new Animated.Value(0)).current;
  const gridLine1 = useRef(new Animated.Value(0)).current;
  const gridLine2 = useRef(new Animated.Value(0)).current;
  const marker1Float = useRef(new Animated.Value(0)).current;
  const marker2Float = useRef(new Animated.Value(0)).current;
  const marker3Float = useRef(new Animated.Value(0)).current;
  const scanLine = useRef(new Animated.Value(0)).current;
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;
  const particle4 = useRef(new Animated.Value(0)).current;
  const particle5 = useRef(new Animated.Value(0)).current;
  const radarPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Radar rotation animation
    Animated.loop(
      Animated.timing(radarRotation, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animations with staggered delays
    const createPulseAnimation = (pulseValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createPulseAnimation(pulse1, 0).start();
    createPulseAnimation(pulse2, 600).start();
    createPulseAnimation(pulse3, 1200).start();

    // Grid line animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(gridLine1, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gridLine1, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(1500),
        Animated.timing(gridLine2, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gridLine2, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating marker animations
    const createFloatAnimation = (markerValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(markerValue, {
            toValue: 1,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(markerValue, {
            toValue: 0,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    createFloatAnimation(marker1Float, 0).start();
    createFloatAnimation(marker2Float, 800).start();
    createFloatAnimation(marker3Float, 1600).start();

    // Scan line animation
    Animated.loop(
      Animated.timing(scanLine, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Particle animations
    const createParticleAnimation = (particleValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(particleValue, {
            toValue: 1,
            duration: 8000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(particleValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createParticleAnimation(particle1, 0).start();
    createParticleAnimation(particle2, 1500).start();
    createParticleAnimation(particle3, 3000).start();
    createParticleAnimation(particle4, 4500).start();
    createParticleAnimation(particle5, 6000).start();

    // Radar center pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(radarPulse, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(radarPulse, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const radarRotate = radarRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scanLineTranslate = scanLine.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 400],
  });

  return (
    <View style={styles.container}>
      {/* Background Grid */}
      <View style={styles.gridContainer}>
        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.gridLineHorizontal,
              { top: `${(i + 1) * 12.5}%` }
            ]}
          />
        ))}
        {/* Vertical lines */}
        {[...Array(8)].map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.gridLineVertical,
              { left: `${(i + 1) * 12.5}%` }
            ]}
          />
        ))}
      </View>

      {/* Animated scan line */}
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [{ translateY: scanLineTranslate }],
          },
        ]}
      />

      {/* Center radar circle */}
      <View style={styles.radarContainer}>
        <Animated.View
          style={[
            styles.radarSweep,
            {
              transform: [{ rotate: radarRotate }],
            },
          ]}
        >
          <View style={styles.radarGradient} />
        </Animated.View>
        <Animated.View 
          style={[
            styles.radarCenter,
            {
              transform: [{ scale: radarPulse }],
              opacity: radarPulse.interpolate({
                inputRange: [1, 1.2],
                outputRange: [1, 0.7],
              }),
            },
          ]}
        />
      </View>

      {/* Animated pulse rings */}
      <View style={styles.pulseContainer}>
        <Animated.View
          style={[
            styles.pulseRing,
            {
              opacity: pulse1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 0],
              }),
              transform: [
                {
                  scale: pulse1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 2],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.pulseRing,
            {
              opacity: pulse2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 0],
              }),
              transform: [
                {
                  scale: pulse2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 2],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.pulseRing,
            {
              opacity: pulse3.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 0],
              }),
              transform: [
                {
                  scale: pulse3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 2],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      {/* Location markers with float animation */}
      <Animated.View
        style={[
          styles.markerContainer,
          { top: '25%', left: '30%' },
          {
            transform: [
              {
                translateY: marker1Float.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.marker}>
          <View style={styles.markerInner} />
        </View>
        <View style={styles.markerShadow} />
      </Animated.View>

      <Animated.View
        style={[
          styles.markerContainer,
          { top: '60%', left: '65%' },
          {
            transform: [
              {
                translateY: marker2Float.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.marker, styles.markerPurple]}>
          <View style={[styles.markerInner, styles.markerInnerPurple]} />
        </View>
        <View style={styles.markerShadow} />
      </Animated.View>

      <Animated.View
        style={[
          styles.markerContainer,
          { top: '45%', left: '75%' },
          {
            transform: [
              {
                translateY: marker3Float.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.marker, styles.markerBlue]}>
          <View style={[styles.markerInner, styles.markerInnerBlue]} />
        </View>
        <View style={styles.markerShadow} />
      </Animated.View>

      {/* Animated grid lines overlay */}
      <Animated.View
        style={[
          styles.animatedGridLine,
          {
            left: '30%',
            opacity: gridLine1.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.3, 0.8, 0.3],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.animatedGridLine,
          {
            left: '65%',
            opacity: gridLine2.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.3, 0.8, 0.3],
            }),
          },
        ]}
      />

      {/* Connection lines between markers */}
      <View style={styles.connectionLineContainer}>
        <View style={[styles.connectionLine, { top: '25%', left: '30%', width: 140, height: 150 }]} />
        <View style={[styles.connectionLine, { top: '45%', left: '65%', width: 50, height: 80 }]} />
      </View>

      {/* Decorative corner elements */}
      <View style={styles.cornerTopLeft}>
        <View style={styles.cornerLine1} />
        <View style={styles.cornerLine2} />
      </View>
      <View style={styles.cornerTopRight}>
        <View style={styles.cornerLine1} />
        <View style={styles.cornerLine2} />
      </View>
      <View style={styles.cornerBottomLeft}>
        <View style={styles.cornerLine1} />
        <View style={styles.cornerLine2} />
      </View>
      <View style={styles.cornerBottomRight}>
        <View style={styles.cornerLine1} />
        <View style={styles.cornerLine2} />
      </View>

      {/* Floating particles */}
      <Animated.View
        style={[
          styles.particle,
          { top: '20%', left: '15%' },
          {
            opacity: particle1.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 0.6, 0.6, 0],
            }),
            transform: [
              {
                translateY: particle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                scale: particle1.interpolate({
                  inputRange: [0, 0.1, 0.9, 1],
                  outputRange: [0, 1, 1, 0],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          { top: '70%', left: '40%' },
          {
            opacity: particle2.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 0.6, 0.6, 0],
            }),
            transform: [
              {
                translateY: particle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                scale: particle2.interpolate({
                  inputRange: [0, 0.1, 0.9, 1],
                  outputRange: [0, 1, 1, 0],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          { top: '35%', left: '80%' },
          {
            opacity: particle3.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 0.6, 0.6, 0],
            }),
            transform: [
              {
                translateY: particle3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                scale: particle3.interpolate({
                  inputRange: [0, 0.1, 0.9, 1],
                  outputRange: [0, 1, 1, 0],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          { top: '85%', left: '25%' },
          {
            opacity: particle4.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 0.6, 0.6, 0],
            }),
            transform: [
              {
                translateY: particle4.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                scale: particle4.interpolate({
                  inputRange: [0, 0.1, 0.9, 1],
                  outputRange: [0, 1, 1, 0],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          { top: '50%', left: '90%' },
          {
            opacity: particle5.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 0.6, 0.6, 0],
            }),
            transform: [
              {
                translateY: particle5.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                scale: particle5.interpolate({
                  inputRange: [0, 0.1, 0.9, 1],
                  outputRange: [0, 1, 1, 0],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
    backgroundColor: '#0F0F10',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    overflow: 'hidden',
    position: 'relative',
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#1a1a1a',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#1a1a1a',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#7856d4',
    opacity: 0.3,
    shadowColor: '#7856d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  radarContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 150,
    height: 150,
    marginTop: -75,
    marginLeft: -75,
  },
  radarSweep: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  radarGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: '#7856d4',
    opacity: 0.1,
    borderTopRightWidth: 2,
    borderTopRightColor: '#7856d4',
    borderRadius: 75,
  },
  radarCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 12,
    height: 12,
    marginTop: -6,
    marginLeft: -6,
    borderRadius: 6,
    backgroundColor: '#7856d4',
    shadowColor: '#7856d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  pulseContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 150,
    height: 150,
    marginTop: -75,
    marginLeft: -75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#7856d4',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff3f41',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff3f41',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#ff6b6d',
    elevation: 8,
  },
  markerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  markerPurple: {
    backgroundColor: '#7856d4',
    borderColor: '#9b7ee8',
    shadowColor: '#7856d4',
  },
  markerInnerPurple: {
    backgroundColor: '#fff',
  },
  markerBlue: {
    backgroundColor: '#3b82f6',
    borderColor: '#60a5fa',
    shadowColor: '#3b82f6',
  },
  markerInnerBlue: {
    backgroundColor: '#fff',
  },
  markerShadow: {
    marginTop: 4,
    width: 16,
    height: 6,
    borderRadius: 8,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  animatedGridLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#7856d4',
    shadowColor: '#7856d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  connectionLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  connectionLine: {
    position: 'absolute',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#7856d4',
    borderStyle: 'dashed',
    opacity: 0.3,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 16,
    right: 16,
    transform: [{ rotate: '90deg' }],
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    transform: [{ rotate: '270deg' }],
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    transform: [{ rotate: '180deg' }],
  },
  cornerLine1: {
    width: 20,
    height: 2,
    backgroundColor: '#7856d4',
    opacity: 0.6,
  },
  cornerLine2: {
    width: 2,
    height: 20,
    backgroundColor: '#7856d4',
    opacity: 0.6,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7856d4',
  },
});

export default AnimatedMapView;

