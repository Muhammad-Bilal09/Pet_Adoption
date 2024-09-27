import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
      flexGrow: 1,
    },
    avatarContainer: {
      position: 'relative', 
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    avatar: {
      marginBottom: 10,
    },
    inputContainer: {
      marginBottom: 20,
    },
    emailInput: {
      marginTop: 10,
    },
    buttonContainer: {
      padding: 20,
    },
    updateButton: {
      width: '100%',
      padding: 5,
      backgroundColor: '#101C1D',
    },
    iconButtonContainer: {
      position: 'absolute',  
      bottom: 0,
      right: 130,
  
      borderRadius: 50,
    },
    iconButton: {
      backgroundColor: '#ffffff',
    },
  });