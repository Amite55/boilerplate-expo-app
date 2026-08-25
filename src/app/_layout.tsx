import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ToastContextProvider } from "../context/ToastContextProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayoutRender() {
  // ============ render fonts and hide splash screen ==============
  const [fontsLoaded] = useFonts({
    // Inter: require("../assets/fonts/Inter-Regular.ttf"),
  });
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView
            edges={["bottom"]}
            style={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <StatusBar style="dark" />
            <ToastContextProvider>
              <RootLayout />
            </ToastContextProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
