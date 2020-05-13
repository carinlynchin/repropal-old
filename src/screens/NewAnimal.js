import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableHighlight } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from 'assets/constants';
import Cow from 'images/cow-solid.svg';
import Cat from 'images/cat-solid.svg';
import Horse from 'images/horse-solid.svg';
import Dog from 'images/dog-solid.svg';

export default function NewAnimal () {
   return(
      <Cow />
   );
}
