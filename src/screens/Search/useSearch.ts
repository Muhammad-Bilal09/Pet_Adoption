// useSearch.ts
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { RootState, useAppDispatch } from '../../redux/store';
import { toggleFavorite } from '../../redux/slice/favoritesSlice';
import { Pet } from '../../types/types';

const useSearch = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useAppDispatch();

  const categories = ['All', 'Dogs', 'Cats', 'Bunnies', 'Birds', 'Turtles'];

  useEffect(() => {
    const fetchPets = async () => {
      const petsSnapshot = await firestore().collection('pets').get();
      const petsList = petsSnapshot.docs.map(doc => ({
        id: doc.id,
        petName: doc.data().petBreed,
        type: doc.data().petType,
        petAge: doc.data().petAge,
        amount: doc.data().amount,
        imageUrl: doc.data().imageUrl,
        description: doc.data().description,
        ownerId: doc.data().ownerId,
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

    if (searchQuery) {
      filtered = filtered.filter(pet =>
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(pet => pet.type === selectedCategory);
    }

    setFilteredPets(filtered);
  };

  const handleToggleFavorite = (pet: Pet) => {
    dispatch(toggleFavorite(pet));
  };

  return {
    pets,
    filteredPets,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    favorites,
    handleToggleFavorite,
  };
};

export default useSearch;
