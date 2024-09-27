import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#ddd',
    },
    imageContainer: {
      height: 300,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    petImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    detailsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    petInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    petName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    petType: {
      fontSize: 16,
      color: '#999',
    },
    price: {
      fontSize: 24,
      color: '#FF9D00',
      fontWeight: 'bold',
    },
    specificationsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    specificationBox: {
      alignItems: 'center',
    },
    specTitle: {
      fontSize: 14,
      color: '#999',
    },
    specValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    ownerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    ownerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ccc',
      marginRight: 10,
    },
    ownerName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    locationText: {
      fontSize: 14,
      color: '#999',
    },
    description: {
      marginTop: 20,
      color: '#666',
    },
    readMore: {
      color: '#FF9D00',
      fontWeight: 'bold',
    },
    adoptButton: {
      backgroundColor: '#333',
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 30,
    },
    adoptButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    noPet: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });