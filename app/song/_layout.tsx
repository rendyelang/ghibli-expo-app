import { Stack } from "expo-router";

export default function DetailSongLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen name="[id]" />
        </Stack>
    )
}