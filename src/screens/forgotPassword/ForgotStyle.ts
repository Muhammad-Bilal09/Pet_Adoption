import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderBottomWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007BFF',
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    backToLoginText: {
      marginTop: 20,
      textAlign: 'center',
      color: '#007BFF',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
  });