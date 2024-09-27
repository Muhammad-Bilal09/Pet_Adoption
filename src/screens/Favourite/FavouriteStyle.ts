import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    favourite: {
      display: 'flex',
      margin: 30,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    favouriteText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#101C1D',
    },
    favoriteCard: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#f5f5f5',
      marginBottom: 10,
    },
    petImage: {
      width: 80,
      height: 80,
      marginRight: 10,
    },
    petInfo: {
      flex: 1,
      justifyContent: 'center',
    },
  });