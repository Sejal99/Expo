// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

// const about = () => {
//     const translateX = useSharedValue(0);
//     const translateY = useSharedValue(0);
//     const drag = Gesture.Pan().onChange(event => {
//         translateX.value += event.changeX;
//         translateY.value += event.changeY;
//       });
    
//       const containerStyle = useAnimatedStyle(() => {
//         return {
//           transform: [
//             {
//               translateX: translateX.value,
//             },
//             {
//               translateY: translateY.value,
//             },
//           ],
//         };
//       });
    
//   return (
//     <GestureDetector gesture={drag}>
//     <Animated.View style={[containerStyle, { top: -350 }]}>
//       <GestureDetector gesture={doubleTap}>
//         <Animated.Image
//           source={stickerSource}
//           resizeMode="contain"
//           style={[imageStyle, { width: imageSize, height: imageSize }]}
//         />
//       </GestureDetector>
//     </Animated.View>
//   </GestureDetector>
//   );
// };

// export default about;

// const styles = StyleSheet.create({});
