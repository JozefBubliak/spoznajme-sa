import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "@/store/game-store";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="language-select" options={{ headerShown: false }} />
      <Stack.Screen name="moderator" options={{ headerShown: false }} />
      <Stack.Screen name="player" options={{ headerShown: false }} />
      <Stack.Screen name="game" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </GameProvider>
    </QueryClientProvider>
  );
}