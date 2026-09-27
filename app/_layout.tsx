import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/services/queryClient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
// import { Slot } from 'expo-router';
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import styles from "./businessSetup/BusinessStyle";
const RootLayout = () => {
    const [fontsLoaded, fontError] = useFonts({
        // Inter_400Regular,
        // Inter_500Medium,
        // Inter_600SemiBold,
        // Inter_700Bold,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        
        
        <GestureHandlerRootView style={{flex:1}}>
            <QueryClientProvider client={queryClient}>
            {/* <Slot /> */}
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    //animationDuration: 20,
                }}
            />

            <StatusBar style="light" />
        </QueryClientProvider>
        </GestureHandlerRootView>
    )


}
export default RootLayout