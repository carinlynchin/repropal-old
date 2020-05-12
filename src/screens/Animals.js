import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableHighlight } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from 'assets/constants';
import AnimalsIcon from 'images/comboanimals.svg';
import globalStyles from 'styles';

export default function Animals () {
   const [myAnimals, setMyAnimals] = useState([]);

   const AnimalsStack = createStackNavigator();

   function AnimalsList() {
      return (
         <View>
            <StatusBar backgroundColor={COLORS.BASEGREEN} />
            { myAnimals.length == 0 &&
               <View style={{flex: 1, alignItems: 'center', paddingVertical: 50}}>
                  <AnimalsIcon style={{marginBottom: 20}}/>
                  <Text style={{color: COLORS.BASEGRAY}}>You have no animals listed. Add some now: </Text>
                  <TouchableHighlight
                      style={[globalStyles.greenButton, {marginTop: 20, width: 100}]}
                      underlayColor={'hsl(56, 45%, 55%)'}
                      onPress={() => auth().signInWithEmailAndPassword(email, pword)}
                  >
                      <Text style={[globalStyles.whiteText, globalStyles.fs20]}>Add</Text>
                  </TouchableHighlight>
               </View>
            }
         </View>
      )
   }

   function AddAnimal() {
      return (
         <View>
            <Text>Welcome to the ADDING an animal page!!!</Text>
         </View>
      )
   }

   return(
      <AnimalsStack.Navigator>
         <AnimalsStack.Screen
            name="MyAnimals"
            component={AnimalsList}
            options={{
               title: 'My Animals',
               headerStyle: {
                  backgroundColor: COLORS.BASEGREEN,
                  height: 40,
               },
               headerTitleContainerStyle: {
                  paddingBottom: 5,
               },
               headerTitleStyle: {
                  color: 'white',
               }
            }}
         />
         <AnimalsStack.Screen name="AddAnimal" component={AddAnimal} />
      </AnimalsStack.Navigator>
   )
}
