import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, removeFavorite } from '../../redux/slice/favoritesSlice';

type Pet = {
  id: string;
  petName: string;
  type: string; // This is the category (e.g., Cats, Dogs, etc.)
  petAge: string;
  amount: string;
  imageUrl: string; // Assuming the pets have an image URL stored
};

export default function SearchScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const categories = ['All', 'Cats', 'Dogs', 'Birds', 'Others']; // Add categories here

  useEffect(() => {
    const fetchPets = async () => {
      const petsSnapshot = await firestore().collection('pets').get();
      const petsList = petsSnapshot.docs.map(doc => ({
        id: doc.id,
        petName: doc.data().petName,
        type: doc.data().type,
        petAge: doc.data().petAge,
        amount: doc.data().amount,
        imageUrl: doc.data().imageUrl,
      }));
      setPets(petsList);
      setFilteredPets(petsList);
    };
    fetchPets();
  }, []);

  useEffect(() => {
    filterPets();
  }, [searchQuery, selectedCategory]);

  const filterPets = () => {
    let filtered = pets;

    // Filter based on search query
    if (searchQuery) {
      filtered = filtered.filter(pet =>
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter based on category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(pet => pet.type === selectedCategory);
    }

    setFilteredPets(filtered);
  };

  const toggleFavorite = (pet: Pet) => {
    if (favorites.some(favPet => favPet.id === pet.id)) {
      dispatch(removeFavorite(pet.id));
    } else {
      dispatch(addFavorite(pet));
    }
  };

  const renderPet = ({ item }: { item: Pet }) => (
    <View style={styles.petCard}>
      <View>
        <Text>{item.petName}</Text>
        <Text>Age: {item.petAge}</Text>
        <Text>Price: {item.amount}$</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.petImage} />

      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Icon
          name={favorites.some(favPet => favPet.id === item.id) ? 'heart' : 'heart-outline'}
          size={30}
          color={favorites.some(favPet => favPet.id === item.id) ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pet List */}
      <FlatList
        data={filteredPets}
        renderItem={renderPet}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#007BFF',
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
  petImage:{
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    resizeMode: 'cover',
    overflow: 'hidden'
  }
});