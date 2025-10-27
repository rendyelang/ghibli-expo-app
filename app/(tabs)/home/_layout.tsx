import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: 'Home Page' }} />
            {/* <Stack.Screen name="DetailPage" options={{ title: 'Detail Page' }} /> */}
        </Stack>
    )
}