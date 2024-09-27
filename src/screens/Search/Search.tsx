import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useSearch from './useSearch'; 
import { styles } from './SearchStyle';

export default function SearchScreen() {
  const {
    filteredPets,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    favorites,
    handleToggleFavorite,
  } = useSearch();

  const renderPet = ({ item }:any) => {
    const isFavorite = favorites.some(favPet => favPet.id === item.id);

    return (
      <View style={[styles.petCard, isFavorite && styles.favoritedPetCard]}>
        <View>
          <Text style={styles.petName}>{item.petName}</Text>
          <Text style={styles.petDetails}>Age: {item.petAge}</Text>
          <Text style={styles.petPrice}>Price: {item.amount}$</Text>
        </View>
        <Image source={{ uri: item.imageUrl }} style={styles.petImage} />

        <TouchableOpacity onPress={() => {
          handleToggleFavorite(item);
        }}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={30}
            color={isFavorite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredPets}
        renderItem={renderPet}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

