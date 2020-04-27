import React, {useRef, useEffect} from 'react';
import { KeyboardAvoidingView, Animated, Text, TextInput, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from 'assets/images/logo.svg';
import globalStyles from 'styles';

export default function Login() {
  const slideAnim = useRef(new Animated.Value(100)).current  // Initial value for opacity: 0
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const animParams = {duration: 1000, delay: 2500, useNativeDriver: true}
  const navigation = useNavigation();

  React.useEffect(() => {
      Animated.timing(slideAnim, {
          toValue: -30,
          ...animParams,
      }).start();

      Animated.timing(fadeAnim, {
          toValue: 1,
          ...animParams
      }).start();
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Animated.View style={{transform: [{ translateY: slideAnim }]}}>
            <Logo/>
            <Animated.View style={{opacity: fadeAnim}}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder = 'Email'
                    placeholderTextColor = '#fff'
                    style = {[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
                    maxLength = {40}
                    keyboardType = 'email-address'
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    returnKeyType = 'next'
                />
                <TextInput
                    underlineColorAndroid="transparent"
                    secureTextEntry
                    placeholder = 'Password'
                    placeholderTextColor = '#fff'
                    style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
                    maxLength = {40}
                    returnKeyType = 'go'
                />
                <TouchableHighlight
                    style = {[styles.login, globalStyles.greenButton]}
                    underlayColor = {'hsl(56, 45%, 55%)'}
                >
                    <Text style={globalStyles.whiteText}>Login</Text>
                </TouchableHighlight>
                <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Create an account</Text>
                </TouchableOpacity>
            </Animated.View>
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
    },
    login: {
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    link: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginTop: 8
    },
});
