import React, {useRef, useEffect, useState} from 'react';
import { KeyboardAvoidingView, View, Animated, Text, TextInput, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import Logo from 'assets/images/logo.svg';
import GoogleIcon from 'assets/images/google.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import globalStyles from 'styles';

export default function Login() {
   GoogleSignin.configure({
     webClientId: '446696784601-mjsfh7q4c5su56op12qouvqcerooodof.apps.googleusercontent.com', // From Firebase Console Settings
   });
   const [email, setEmail]=useState('');
   const [pword, setPword]=useState('');
   const slideAnim=useRef(new Animated.Value(200)).current  // Initial value for opacity: 0
   const fadeAnim=useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
   const animParams={duration: 1000, delay: 1500, useNativeDriver: true}
   const navigation=useNavigation();

   React.useEffect(() => {
      Animated.timing(slideAnim, {
         toValue: 0,
         ...animParams,
      }).start();

      Animated.timing(fadeAnim, {
          toValue: 1,
          ...animParams
      }).start();
   }, [])

   async function onGoogleButtonPress() {
      // Get the users ID token
      const { idToken }=await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential=auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
   }

   async function onFacebookButtonPress() {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
       throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
       throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential=auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
   }

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Animated.View style={{transform: [{ translateY: slideAnim }]}}>
            <Logo/>
            <Animated.View style={{opacity: fadeAnim}}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder='Email'
                    placeholderTextColor='#fff'
                    style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
                    maxLength={40}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='next'
                    onChangeText={setEmail}
                />
                <TextInput
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    placeholder='Password'
                    placeholderTextColor='#fff'
                    style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
                    maxLength={40}
                    returnKeyType='go'
                    onChangeText={setPword}
                />
                <TouchableHighlight
                    style={[styles.login, globalStyles.greenButton]}
                    underlayColor={'hsl(56, 45%, 55%)'}
                    onPress={() => auth().signInWithEmailAndPassword(email, pword)}
                >
                    <Text style={[globalStyles.whiteText, globalStyles.fs20]}>Login</Text>
                </TouchableHighlight>
                <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Create an account with Email</Text>
                </TouchableOpacity>
                <View style={globalStyles.socialLogin}>
                   <TouchableOpacity
                     style={[globalStyles.facebookBtn, globalStyles.socialBtn]}
                     onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                   >
                     <FontAwesomeIcon icon={faFacebook} style={[globalStyles.icon, globalStyles.whiteText]} size={ 25 } />
                     <Text style={[globalStyles.whiteText, globalStyles.fs20]}>Sign in</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     style={[globalStyles.googleBtn, globalStyles.socialBtn]}
                     onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                   >
                     <GoogleIcon style={[globalStyles.icon, globalStyles.whiteText]} />
                     <Text style={[{fontFamily: 'Roboto-Medium', color: '#757575'}, globalStyles.fs20]}>Sign in</Text>
                   </TouchableOpacity>
                </View>
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
        backgroundColor: '#0A4267', //0B4D78
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
