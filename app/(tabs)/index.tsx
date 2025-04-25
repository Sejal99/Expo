import { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

export default function AboutScreen() {
  const scaleImage = useSharedValue(200);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);
  const isMoved = useSharedValue(false);
  const bounceY = useSharedValue(0);
  const isPulsing = useSharedValue(false);

  const imageStyle = useAnimatedStyle(() => {
    const pulseScale = isPulsing.value ? 1.1 : 1;

    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: pulseScale },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const handlePulse = () => {
    isPulsing.value = true;
    scaleImage.value = withRepeat(withTiming(220, { duration: 300 }), 6, true);

    setTimeout(() => {
      isPulsing.value = false;
      scaleImage.value = withTiming(200); // reset to default
    }, 2000);
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== 200 * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const handleMove = () => {
    if (isMoved.value) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(300);
    }
    isMoved.value = !isMoved.value;
  };

  const handleFade = () => {
    opacity.value = withTiming(opacity.value === 1 ? 0.3 : 1, {
      duration: 500,
    });
  };

  const handleRotate = () => {
    rotate.value = withTiming(rotate.value + 360, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={drag}>
        <Animated.View style={{ top: -50 }}>
          <GestureDetector gesture={doubleTap}>
            <Animated.Image
              source={{
                uri: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-path-by-a-pond-free-image.jpg?w=600&quality=80",
              }}
              resizeMode="contain"
              style={imageStyle}
            />
          </GestureDetector>
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMove}>
          <Text style={styles.buttonText}>Move</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFade}>
          <Text style={styles.buttonText}>Fade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRotate}>
          <Text style={styles.buttonText}>Rotate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePulse}>
          <Text style={styles.buttonText}>Pulse</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
