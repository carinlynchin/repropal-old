import React from 'react';
import { View, TextInput, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Logo from 'assets/images/logo.svg';
import globalStyles from 'styles';

export default function Signup() {
   async function EmailPasswordSignin() {
      auth()
         .createUserWithEmailAndPassword('sarah.lane@gmail.com', 'SuperSecretPassword!')
         .then(() => {
            console.log('User account created & signed in!');
         })
         .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
               console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
               console.log('That email address is invalid!');
            }
          console.error(error);
       });
    }

    return (
      <View style={styles.container}>
         <Logo/>
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'First Name'
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Last Name'
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Email Address'
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Password'
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Confirm Password'
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
         />
         <TouchableHighlight
           style = {[styles.login, globalStyles.greenButton]}
           underlayColor = {'hsl(56, 45%, 55%)'}
         >
            <Text style={styles.whiteText}>Signup</Text>
         </TouchableHighlight>
         <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.link}>Already have an account ? <Text style={styles.linkText}>Login</Text></Text>
         </TouchableOpacity>
      </View>
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
