import { Slot } from "expo-router";
import "../global.css";
import { ImageBackground, SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ImageBackground
        source={require("../assets/images/image.jpg")}
        style={{ flex: 1 }}
      >
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </ImageBackground>
    </QueryClientProvider>
  );
}
