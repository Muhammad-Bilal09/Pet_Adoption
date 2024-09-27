import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      marginVertical: 10,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    uploadButton: {
      height: 200,
      borderWidth: 1,
      borderColor: '#999',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    button: {
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
  });