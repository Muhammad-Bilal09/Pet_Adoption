import { styles } from './FavouriteStyle';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFavorites } from './useFavorites'; 

export default function FavoritesScreen() {
  const { favorites, removeFavoritePet } = useFavorites(); 

  const renderFavorite = ({ item }: any) => (
    <View style={styles.favoriteCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text>{item.petName}</Text>
        <Text>Age: {item.petAge}</Text>
        <Text>{item.type}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavoritePet(item.id)}>
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.favourite}>
        <Text style={styles.favouriteText}>Favorites</Text>
        <AntDesign name="plus" size={24} style={styles.favouriteText} color="black" />
      </View>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
