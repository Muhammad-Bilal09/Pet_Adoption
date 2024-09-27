import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontFamily: 'Montserrat',
      color: '#101C1D',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      color: '#101C1D',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
      marginBottom: 15,
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
      fontSize: 20,
      fontWeight: 'bold',
    },
  });