import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import Home from 'screens/Home';

export default function App() {
  // Set an initializing state whilst Firebase connects
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
   const Stack = createStackNavigator();

   useEffect(() => {
      const unsubOnUserChanged = auth().onUserChanged((user) => {
         setUser(user);
         if (initializing) setInitializing(false);
      });
      return unsubOnUserChanged;
   }, []);

   if (initializing) return null;

   function HomeScreen({ navigation, route }) {
      if (user && user.emailVerified)
         return <Home />
      else
         return <Login {...user && !user.emailVerified && {msg: "Please verify your email."}}/>
   }

   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Home" headerMode='none'>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signup" component={Signup} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
