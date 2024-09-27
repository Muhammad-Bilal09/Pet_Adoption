import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    messageContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    messageSender: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    userMessage: {
      alignSelf: 'flex-start', 
    },
    ownerMessage: {
      alignSelf: 'flex-end', 
    },
    messageText: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    input: {
      flex: 1,
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    sendButton: {
      backgroundColor: '#333',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginLeft: 10,
      borderRadius: 5,
    },
    sendButtonText: { color: '#fff', fontSize: 16 },
    endButton: {
      backgroundColor: 'red',
      paddingVertical: 15,
      marginTop: 20,
      borderRadius: 5,
    },
    endButtonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    typingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    typingText: {
      marginLeft: 5,
      color: '#888',
    },
  });