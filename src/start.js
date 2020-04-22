import React, {useRef, useEffect} from 'react';
import { KeyboardAvoidingView, Animated, Text, StyleSheet } from 'react-native';
import Logo from './assets/images/logo.svg';

export default function App() {
  const slideAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: -100,
        duration: 1000,
        delay: 2000
      }
    ).start();
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Animated.View
        style={{transform: [{ translateY: slideAnim }]}}
      >
        <Logo>
        </Logo>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A4267' //0B4D78
    },
    logo: {
        width: 300
    }
});
