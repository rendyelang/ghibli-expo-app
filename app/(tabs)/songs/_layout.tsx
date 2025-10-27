import { Stack } from "expo-router";

export default function SongsLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: 'Songs' }} />
            {/* <Stack.Screen name="DetailPage" options={{ title: 'Detail Page' }} /> */}
        </Stack>
    )
}