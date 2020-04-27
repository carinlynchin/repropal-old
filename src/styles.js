import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   greenButton: {
      backgroundColor: '#B1A92F',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 300,
      marginVertical: 8,
      borderRadius: 7,
   },
   input: {
      fontSize: 20,
      height: 50,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 7,
      color: '#565656',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderColor: '#CCC',
      paddingHorizontal: 20,
      marginVertical: 8,
   },

   whiteText: { color: '#fff' },
   fs20: { fontSize: 20 },

   socialLogin: {
      marginVertical: 20,
   },
   socialBtn: {
      flexDirection: 'row',
      marginVertical: 10,
      padding: 10,
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
   },
   facebookBtn: {
      backgroundColor: '#1778F2',
   },
   googleBtn: {
      backgroundColor: '#fff',
   },
   icon: {
      marginHorizontal: 15,
   }
});
