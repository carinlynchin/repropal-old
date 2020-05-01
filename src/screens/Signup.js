import React, {useState} from 'react';
import { View, TextInput, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Logo from 'assets/images/logo.svg';
import globalStyles from 'styles';

export default function Signup() {
   const navigation = useNavigation();
   const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      email: '',
      emailErr: '',
      pword: '',
      pwordErr: '',
      confirmPwrod: '',
      confirmErr: '',
   })

   const validatePassword = () => setForm({...form, pwordErr: form.pword.length < 6 ? 'Passwords need to be at minimum 6 characters.' : ''})//setPwordValidated(pword.length >= 6 ? true : false);
   const isSamePword = () => setForm({...form, confirmErr: form.confirmPword != form.pword ? 'Passwords don\'t match' : ''})//setSamePword(samePword == pword ? true : false);
   const checkEmail = () => setForm({...form, emailErr: form.email.length == 0 ? 'Email is required' : ''});
   const isFormValid = () => form.emailErr == '' && form.pwordErr == '' && form.confirmErr == '';

   const updateField = (value, name) => {
      setForm ({
         ...form,
         [name]: value
      });
   };

   async function EmailPasswordSignin(args) {
      debugger
      auth()
         .createUserWithEmailAndPassword(email, pword)
         .then(() => {
            let meta = {
               'creationTime': Date.now(),
               //'displayName':
            }
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

    return (
      <View style={styles.container}>
         <Logo/>
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='First Name'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'firstName')}
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Last Name'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'lastName')}
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Email Address'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'email')}
            onBlur={checkEmail}
         />
         { form.emailErr != '' &&
            <Text style={globalStyles.formError}>
               {form.emailErr}
            </Text>
         }
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'pword')}
            onBlur={validatePassword}
         />
         { form.pwordErr != '' &&
            <Text style={globalStyles.formError}>
               {form.pwordErr}
            </Text>
         }
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Confirm Password'
            secureTextEntry={true}
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
            onChangeText={e => updateField(e, 'confirmPword')}
            onBlur={isSamePword}
         />
         { form.confirmErr != '' &&
            <Text style={globalStyles.formError}>
               {form.confirmErr}
            </Text>
         }
         <TouchableHighlight
            style = {[styles.login, globalStyles.greenButton, !isFormValid() && globalStyles.disabled]}
            underlayColor = {'hsl(56, 45%, 55%)'}
            onPress={() => EmailPasswordSignin()}
            disabled= {!isFormValid()}
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
