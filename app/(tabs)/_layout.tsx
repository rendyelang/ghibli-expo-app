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
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome name="film" size={24} color="black" style={{ opacity: focused ? 1 : 0.4 }} />
            )
          },
          tabBarLabelStyle: {
            color: "black",
            opacity: 1
          }
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{ 
          tabBarLabel: "Songs",
          tabBarIcon: ({focused}) => {
            return (
              <Entypo name="beamed-note" size={24} color="black" style={{ opacity: focused ? 1 : 0.4 }} />
            )
          },
          tabBarLabelStyle: {
            color: "black",
            opacity: 1
          }
        }}
      />

    </Tabs>
  )
}
