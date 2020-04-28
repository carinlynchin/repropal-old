import React, {useState} from 'react';
import { View, TextInput, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Logo from 'assets/images/logo.svg';
import globalStyles from 'styles';

export default function Signup() {
   const navigation = useNavigation();
   const [email, setEmail] = useState('');
   const [pword, setPword] = useState('');
   const [pwordValidated, setPwordValidated] = useState(true);
   const [emailErr, setEmailErr] = useState('');
   const [samePword, setSamePword] = useState(true);

   const validatePassword = () => setPwordValidated(pword.length >= 6 ? true : false);
   const isSamePword = () => setSamePword(samePword == pword ? true : false);

   let pwordErr = 'Passwords need to be at minimum 6 characters.'

   async function EmailPasswordSignin(args) {
      auth()
         .createUserWithEmailAndPassword(email, pword)
         .then(() => {
            console.log('User account created & signed in!');
            navigation.navigate('Home');
         })
         .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
               setEmailErr('That email address is already in use!');
            }
            else if (error.code === 'auth/invalid-email') {
               setEmailErr('That email address is invalid!');
            }
            else
               setEmailErr(error);
         });
    }

    let isValid = () => samePword && pwordValidated && email.length > 0

    return (
      <View style={styles.container}>
         <Logo/>
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='First Name'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Last Name'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Email Address'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={setEmail}
         />
         { emailErr != '' &&
            <Text style={globalStyles.formError}>
               {emailErr}
            </Text>
         }
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={setPword}
            onBlur={validatePassword}
         />
         { !pwordValidated &&
            <Text style={globalStyles.formError}>
               {pwordErr}
            </Text>
         }
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Confirm Password'
            secureTextEntry={true}
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
            onChangeText={setSamePword}
            onBlur={isSamePword}
         />
         { !samePword &&
            <Text style={globalStyles.formError}>
               Passwords don't match.
            </Text>
         }
         <TouchableHighlight
            style = {[styles.login, globalStyles.greenButton, !isValid() && globalStyles.disabled]}
            underlayColor = {'hsl(56, 45%, 55%)'}
            onPress={() => EmailPasswordSignin()}
            disabled= {!isValid()}
         >
            <Text style={[globalStyles.whiteText, globalStyles.fs20]}>Signup</Text>
         </TouchableHighlight>
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
