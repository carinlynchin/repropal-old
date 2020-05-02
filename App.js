import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login';
import Signup from 'screens/Signup';

export default function App() {
  // Set an initializing state whilst Firebase connects
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
   const Stack = createStackNavigator();

   function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
   }

   useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
   }, []);

   if (initializing) return null;

   // if (!user) {
   //   return (
   //     <View>
   //       <Text>Login</Text>
   //     </View>
   //   );
   // }

   function HomeScreen() {
      if (!user)
         return <Login/>
      else
         return <View>
                  <Text>Welcome {user.displayName}</Text>
                </View>
   }

   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Home" headerMode='none'>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signup" component={Signup} initialParams={{ onAuthStateChanged: onAuthStateChanged }}/>
         </Stack.Navigator>
      </NavigationContainer>
   );
}
