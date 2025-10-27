import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        }
       }}
    >
      <Tabs.Screen
        name="home"
        options={{ 
          tabBarLabel: "Movies",
          tabBarIcon: ({color, size}) => {
            return (
              <FontAwesome name="film" size={24} color={color} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{ 
          tabBarLabel: "Songs",
          tabBarIcon: ({color, size}) => {
            return (
              <Entypo name="beamed-note" size={24} color={color} />
            )
          }
        }}
      />

    </Tabs>
  )
}
