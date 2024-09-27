import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {selectPet} from '../../redux/slice/petsSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import auth from '@react-native-firebase/auth';
import {logout} from '../../redux/slice/authSlice';
import {Pet, RootStackParamList} from '../../types/types';
import {styles} from './HomeStyle';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(['All']);
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();

  const {username, profileImage} = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsSnapshot = await firestore().collection('pets').get();
        const petsList = petsSnapshot.docs.map(doc => ({
          id: doc.id,
          petName: doc.data().petBreed,
          type: doc.data().petType,
          petAge: doc.data().petAge,
          amount: doc.data().amount,
          gender: doc.data().gender,
          imageUrl: doc.data().imageUrl,
          description: doc.data().description,
          ownerId: doc.data().ownerId,
        }));

        setPets(petsList);
        setFilteredPets(petsList);

        const distinctCategories = [
          'All',
          ...new Set(petsList.map(pet => pet.type)),
        ];
        console.log(distinctCategories);
        setCategories(distinctCategories);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let updatedPets = pets;

    if (selectedCategory !== 'All') {
      updatedPets = updatedPets.filter(pet => pet.type === selectedCategory);
    }

    if (searchQuery) {
      updatedPets = updatedPets.filter(pet =>
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredPets(updatedPets);
  }, [selectedCategory, searchQuery, pets]);

  const filterPetsByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePetSelection = (item: Pet) => {
    dispatch(selectPet(item));
    navigation.navigate('PetAdoption', {pet: item});
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logout());
        Alert.alert('Logout Successful', 'You have been logged out.');
      })
      .catch(error => {
        Alert.alert('Logout Failed', 'Please try again.');
        console.error(error);
      });
  };

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderCategory = ({item}: {item: string}) => (
    <TouchableOpacity
      style={[
        styles.categoryCircle,
        selectedCategory === item && styles.selectedCategory,
      ]}
      onPress={() => filterPetsByCategory(item)}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const renderPet = ({item}: {item: Pet}) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => handlePetSelection(item)}>
      <View>
        <Text style={styles.petName}>{item.petName}</Text>
        <Text style={styles.petDetails}>Age: {item.petAge}</Text>
        <Text style={styles.petPrice}>Price: {item.amount}$</Text>
      </View>
      <View>
        <Image source={{uri: item.imageUrl}} style={styles.petImage} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require('../../assets/Images/toggle.png')} />
        </TouchableOpacity>
        {profileImage ? (
          <Avatar.Image
            size={40}
            source={{uri: profileImage}}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Icon size={40} icon="account" style={styles.avatar} />
        )}
      </View>

      <Text style={styles.title}>Find an Awesome Pet for You</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a pet"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Image
            source={require('../../assets/Images/search.png')}
            style={styles.menuSearchIcon}
          />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={renderCategory}
          style={styles.categoryList}
        />

        <Text style={styles.forYouTitle}>For you</Text>

        <FlatList
          data={filteredPets}
          keyExtractor={item => item.id}
          renderItem={renderPet}
          style={styles.petList}
        />
      </View>

      <Animated.View
        style={[styles.menuContainer, {transform: [{translateX: slideAnim}]}]}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={require('../../assets/Images/cross.png')}
            style={styles.crossToggle}
          />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.menuSearchInput}
            placeholder="Search for a pet"
          />

          <TouchableOpacity style={styles.searchIcon}>
            <Image
              source={require('../../assets/Images/search.png')}
              style={styles.menuSearchIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity onPress={() => navigation.navigate('PetAdoption')}>
            <Text style={styles.menuItem}>Adopt</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
            <Text style={styles.menuItem}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddPet')}>
            <Text style={styles.menuItem}>Add Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
            <Text style={styles.menuItem}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Text style={styles.menuItem}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
