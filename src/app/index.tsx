import { ImgSplashLogo } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import { BaseColor, PrimaryColor } from "@/utils/utils";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // decideNavigation();
      router.replace("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BaseColor,
      }}
    >
      <Animated.Image
        style={tw`w-52 h-52 `}
        entering={FadeInUp.duration(800).delay(1000)}
        source={ImgSplashLogo}
      />
      <Animated.Text
        entering={FadeInUp.duration(500).delay(800)}
        style={tw`text-center font-semibold text-black text-2xl`}
      >
        Welcome
      </Animated.Text>
      <ActivityIndicator size="small" color={PrimaryColor} />
    </View>
  );
}
