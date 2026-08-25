import { IconModalCross } from "@/assets/icons";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onHide: () => void;
}

const SWIPE_THRESHOLD = 40;

const Toast: React.FC<ToastProps> = ({ message, type, onHide }) => {
  const displayMessage =
    typeof message === "string" ? message : JSON.stringify(message);

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const getColors = () => {
    switch (type) {
      case "success":
        return { bg: "bg-gray-700", text: "text-white" };
      case "error":
        return { bg: "bg-gray-700", text: "text-white" };
      default:
        return { bg: "bg-gray-700", text: "text-white" };
    }
  };

  const colors = getColors();

  const dismiss = () => {
    translateY.value = withTiming(200, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(onHide)();
      }
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > SWIPE_THRESHOLD) {
        runOnJS(dismiss)();
      } else {
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[tw`absolute bottom-20 left-4 right-4 z-50`, animatedStyle]}
      >
        <Animated.View
          style={[
            tw`${colors.bg} p-4 rounded-xl shadow flex-row items-center`,
            { elevation: 10 },
          ]}
        >
          <Animated.Text
            style={tw`${colors.text} flex-1 font-medium text-base`}
          >
            {displayMessage}
          </Animated.Text>
          <Pressable onPress={dismiss} hitSlop={10} style={tw`ml-3`}>
            <SvgXml xml={IconModalCross} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Toast;
