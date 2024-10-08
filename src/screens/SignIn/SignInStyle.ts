import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontFamily: 'Montserrat',
      fontSize: 32,
      color: '#101C1D',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 50,
      fontFamily: 'Montserrat',
      borderColor: '#ccc',
      borderBottomWidth: 1,
      borderRadius: 5,
      color: '#101C1D',
      paddingHorizontal: 10,
      marginTop: 20,
      fontSize: 16,
    },
    button: {
      width: 185,
      fontFamily: 'Montserrat',
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#101C1D',
      paddingVertical: 15,
      borderRadius: 37,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signupText: {
      marginTop: 20,
      textAlign: 'center',
      color: '#101C1D',
      fontWeight: 'bold',
      fontSize: 20,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
    forgotPasswordText: {
      fontFamily: 'Montserrat',
      marginBottom: 20,
      marginTop: 5,
      textAlign: 'right',
      color: '#101C1D',
      fontSize: 16,
    },
  });