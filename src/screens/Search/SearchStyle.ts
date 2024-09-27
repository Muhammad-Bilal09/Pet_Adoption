import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    petName: {
      fontSize: 29,
      fontWeight: '800',
      color: '#FFFFFF',
    },
    petDetails: {
      fontSize: 14,
      color: '#FFFFFF',
      marginVertical: 5,
    },
    petPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111827',
    },
    searchInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 80,
    },
    categoryButton: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#f5f5f5',
      borderRadius: 20,
    },
    selectedCategoryButton: {
      backgroundColor: '#F6A530',
    },
    categoryText: {
      fontSize: 16,
      color: '#333',
    },
    selectedCategoryText: {
      color: '#fff',
    },
    petCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#e5e5e5',
      marginVertical: 5,
      borderRadius: 10,
    },
    flatListContent: {
      paddingBottom: 20,
    },
    petImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
      resizeMode: 'cover',
      overflow: 'hidden',
    },
    favoritedPetCard: {
      backgroundColor: '#fde2e4',
    },
  });