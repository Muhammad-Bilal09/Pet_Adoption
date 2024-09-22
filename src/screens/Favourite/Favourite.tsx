// FavoritesScreen.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFavorite } from '../../redux/slice/favoritesSlice';

export default function FavoritesScreen() {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const renderFavorite = ({ item }: any) => (
    <View style={styles.favoriteCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text>{item.petName}</Text>
        <Text>Age: {item.petAge}</Text>
        <Text>{item.type}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeFavorite(item.id))}>
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList data={favorites} renderItem={renderFavorite} keyExtractor={item => item.id} />
  );
}

const styles = StyleSheet.create({
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































// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-ionicons';

// const favoritesData = [
//   {
//     id: '1',
//     name: 'Cavachon',
//     age: '4 Months',
//     location: 'FSD',
//     gender: 'Male',
//     image: 'https://via.placeholder.com/150', 
//   },
//   {
//     id: '2',
//     name: 'Bobtail',
//     age: '4 Months',
//     location: 'FSD',
//     gender: 'Male',
//     image: 'https://via.placeholder.com/150', 
//   },
// ];

// export default function FavoritesScreen() {
//   const renderFavoriteItem = ({ item }:any) => (
//     <View style={styles.cardContainer}>
//       <Image source={{ uri: item.image }} style={styles.petImage} />
//       <View style={styles.petInfo}>
//         <Text style={styles.petName}>{item.name}</Text>
//         <Text style={styles.petDetail}>Age {item.age}</Text>
//         <Text style={styles.petDetail}>{item.location}</Text>
//         <Text style={styles.petDetail}>{item.gender}</Text>
//       </View>

//       {/* Favorite Icon */}
//       <TouchableOpacity style={styles.favoriteIcon}>
//         <Icon name="heart" size={20} color="red" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Favorites</Text>
//         <TouchableOpacity>
//           <Icon name="add" size={30} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Favorites List */}
//       <FlatList
//         data={favoritesData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderFavoriteItem}
//         contentContainerStyle={styles.favoritesList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   favoritesList: {
//     paddingBottom: 80, 
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//     marginBottom: 20,
//     padding: 10,
//   },
//   petImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     backgroundColor: '#ccc',
//     marginRight: 15,
//   },
//   petInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   petName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   petDetail: {
//     fontSize: 14,
//     color: '#777',
//   },
//   favoriteIcon: {
//     justifyContent: 'center',
//     padding: 10,
//   },
//   bottomNav: {
//     position: 'absolute',
//     bottom: 20,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },
// });
