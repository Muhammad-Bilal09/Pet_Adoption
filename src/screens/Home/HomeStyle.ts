import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    profileIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ccc',
    },
    title: {
      fontSize: 36,
      fontWeight: '800',
      width: 240,
      color:"#101C1D",
      fontFamily:"Montserrat",
      marginVertical: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: 10,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 62,
      paddingVertical: 8,
      fontSize: 16,
    },
    searchIcon: {
      backgroundColor: '#101C1D',
      borderRadius: 20,
      width: 80,
      padding: 13,
      marginLeft: 10,
    },
    categoryList: {
      color:"#FFFFF",
      marginBottom: 10,
    },
    categoryCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      color:"#FFFFFF",
      backgroundColor: '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      marginBottom: 10,
    },
    forYouTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    petList: {
      marginBottom: 20,
    },
    petCard: {
      display: 'flex',
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#E5E7EB',
      borderRadius: 20,
      marginBottom: 10,
    },
    petName: {
      fontSize: 29,
      fontWeight: '800',
      color:"#FFFFFF"
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
    menuContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 250,
      height: '100%',
      backgroundColor: '#fff',
      zIndex: 1,
      padding: 20,
      paddingTop: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    closeIcon: {
      marginBottom: 20,
    },
    menuSearchInput: {
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    menuSearchIcon: {
     
    },
    menuItems: {
      flex: 1,
    },
    menuItem: {
      fontSize: 18,
      paddingVertical: 15,
    },
    logoutButton: {
      paddingVertical: 15,
      borderTopWidth: 1,
      borderColor: '#E5E7EB',
    },
    logoutText: {
      color: 'red',
      fontSize: 18,
    },
    selectedCategory: {
      color:"#FFFFFF",
      backgroundColor: '#101C1D',
     
    },
    crossToggle: {
    margin: 15,
    },
    petImage:{
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
      resizeMode: 'cover',
      overflow: 'hidden'
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ccc',
    },
    categoryText: {
      color: '#000', 
    },
    selectedCategoryText: {
      color: '#FFFFFF', 
    },
  });