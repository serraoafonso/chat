import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Chat from '../Pages/Chat'
import Profile from '../Pages/Profile'
import People from '../Pages/People';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
      <Tab.Screen name="People" component={People} options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({color, size})=>(
            <Ionicons name="chatbox" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size})=>(
            <FontAwesome name="user" size={size} color={color} />
        )
      }}/>
    </Tab.Navigator>
  )
}