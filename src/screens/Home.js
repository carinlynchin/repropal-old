import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Animals from 'screens/Animals';

const Tab = createBottomTabNavigator();

export default function Home() {
   const [user, setUser] = useState(auth().currentUser);

   function HomeScreen() {
      return (
         <View>
            <Text>Welcome {user.displayName}</Text>
         </View>
      );
   }

   return (
      <Tab.Navigator>
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Animals" component={Animals} />
      </Tab.Navigator>
   );
}
