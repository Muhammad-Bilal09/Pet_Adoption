import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { selectPet } from '../../redux/slice/petsSlice';

type RootStackParamList = {
  Home: undefined;
  Adopt: undefined;
  Donate: undefined;
  AddPet: undefined;
  Favorite: undefined;
  Message: undefined;
  Profile: undefined;
  PetAdoption: { pet: Pet }; // Pass selected pet as a parameter
};

type Pet = {
  id: string;
  petName: string;
  type: string; // This is the category (e.g., Cats, Dogs, etc.)
  petAge: string;
  amount: string;
  imageUrl: string; // Assuming the pets have an image URL stored
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]); // Store fetched pets
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]); // Pets to display
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Current category
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [categories, setCategories] = useState<string[]>(['All']); // Dynamic categories
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();

  // Fetch pets from Firestore on component mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
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

        // Dynamically set categories based on pet types
        const distinctCategories = ['All', ...new Set(petsList.map(pet => pet.type))];
        setCategories(distinctCategories);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let updatedPets = pets;

    // Filter by category
    if (selectedCategory !== 'All') {
      updatedPets = updatedPets.filter(pet => pet.type === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      updatedPets = updatedPets.filter(pet =>
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPets(updatedPets);
  }, [selectedCategory, searchQuery, pets]);

  // Function to handle category selection
  const filterPetsByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // Function to handle pet selection and navigation
  const handlePetSelection = (item: Pet) => {
    dispatch(selectPet(item)); // Set the selected pet in the Redux state
    navigation.navigate('PetAdoption', { pet: item }); // Navigate to the PetAdoption screen with pet details
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

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.categoryCircle, selectedCategory === item && styles.selectedCategory]}
      onPress={() => filterPetsByCategory(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderPet = ({ item }: { item: Pet }) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => handlePetSelection(item)} // Pass pet details
    >
      <View>
        <Text style={styles.petName}>{item.petName}</Text>
        <Text style={styles.petDetails}>Age: {item.petAge}</Text>
        <Text style={styles.petPrice}>Price: {item.amount}$</Text>
      </View>
      <View>
        <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require('../../assets/Images/toggle.png')} />
        </TouchableOpacity>
        <View style={styles.profileIcon} />
      </View>

      <Text style={styles.title}>
        Find an <Text style={styles.boldText}>Awesome</Text> Pet for You
      </Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a pet"
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search query
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Image source={require('../../assets/Images/search.png')} style={styles.menuSearchIcon} />
        </TouchableOpacity>
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        style={styles.categoryList}
      />

      <Text style={styles.forYouTitle}>For you</Text>

      {/* Render filtered pets based on category and search */}
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={renderPet}
        style={styles.petList}
      />

      {/* Side Menu */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require('../../assets/Images/cross.png')} />
        </TouchableOpacity>
        <TextInput style={styles.menuSearchInput} placeholder="Search for a pet" />
        <Image source={require('../../assets/Images/search.png')} style={styles.menuSearchIcon} />
        <View style={styles.menuItems}>
          <TouchableOpacity onPress={() => navigation.navigate('Adopt')}>
            <Text style={styles.menuItem}>Adopt</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
            <Text style={styles.menuItem}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddPet')}>
            <Text style={styles.menuItem}>Add Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
            <Text style={styles.menuItem}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Text style={styles.menuItem}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 28,
    fontWeight: '300',
    width: 150,
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  searchIcon: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryCircle: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#000',
    color: '#fff',
  },
  forYouTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  petCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petDetails: {
    fontSize: 14,
    color: '#888',
  },
  petPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1000,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  menuSearchInput: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  menuSearchIcon: {
    width: 24,
    height: 24,
  },
    petList: {
    marginBottom: 20,
  },
});
































// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useDispatch } from 'react-redux';
// import { selectPet } from '../../redux/slice/petsSlice'; 
// import PetAdoptionScreen from '../Adoption/PetAdoptionScreen';

// // Update the RootStackParamList to include the new screen and pet details
// type RootStackParamList = {
//   Home: undefined;
//   Adopt: undefined;
//   Donate: undefined;
//   AddPet: undefined;
//   Favorite: undefined;
//   Message: undefined;
//   Profile: undefined;
//   PetAdoption: { pet: Pet }; // Pass selected pet as a parameter
// };


// type Pet = {
//   id: string;
//   petName: string;
//   type: string; // This is the category (e.g., Cats, Dogs, etc.)
//   petAge: string;
//   amount: string;
//   imageUrl: string; // Assuming the pets have an image URL stored
// };

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// export default function HomeScreen() {
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [pets, setPets] = useState<Pet[]>([]); // Store fetched pets
//   const [filteredPets, setFilteredPets] = useState<Pet[]>([]); // Pets to display
//   const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Current category
//   const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
//   const [categories, setCategories] = useState<string[]>(['All']); // Dynamic categories
//   const slideAnim = useRef(new Animated.Value(-250)).current;
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   // Fetch pets from Firestore on component mount
 
//   const dispatch = useDispatch();
 
//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const petsSnapshot = await firestore().collection('pets').get();
//         const petsList = petsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           petName: doc.data().petName,
//           type: doc.data().type,
//           petAge: doc.data().petAge,
//           amount: doc.data().amount,
//           imageUrl: doc.data().imageUrl,
//         }));

//         setPets(petsList);
//         setFilteredPets(petsList);

//         // Dynamically set categories based on pet types
//         const distinctCategories = ['All', ...new Set(petsList.map(pet => pet.type))];
//         setCategories(distinctCategories);

//       } catch (error) {
//         console.error('Error fetching pets:', error);
//       }
//     };

//     fetchPets();
//   }, []);

//   useEffect(() => {
//     let updatedPets = pets;

//     // Filter by category
//     if (selectedCategory !== 'All') {
//       updatedPets = updatedPets.filter(pet => pet.type === selectedCategory);
//     }

//     // Filter by search query
//     if (searchQuery) {
//       updatedPets = updatedPets.filter(pet =>
//         pet.petName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredPets(updatedPets);
//   }, [selectedCategory, searchQuery, pets]);





//   // Function to filter pets by category and search query
//   const filterPets = () => {
//     let updatedPets = pets;

//     // Filter by category
//     if (selectedCategory !== 'All') {
//       updatedPets = updatedPets.filter(pet => pet.type === selectedCategory);
//     }

//     // Filter by search query
//     if (searchQuery) {
//       updatedPets = updatedPets.filter(pet =>
//         pet.petName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredPets(updatedPets);
//   };

//   // Trigger filtering whenever the category or search query changes
//   useEffect(() => {
//     filterPets();
//   }, [selectedCategory, searchQuery]);

//   // Function to handle category selection
//   const filterPetsByCategory = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const toggleMenu = () => {
//     if (menuVisible) {
//       Animated.timing(slideAnim, {
//         toValue: -250,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setMenuVisible(false));
//     } else {
//       setMenuVisible(true);
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const handlePetSelection = () => {
//     dispatch(selectPet(item)); // Set the selected pet in the Redux state
//     navigation.navigate('PetAdoptionScreen'); // Navigate to the PetAdoption screen
//   };

//   const renderCategory = ({ item }: { item: string }) => (
//     <TouchableOpacity
//       style={[styles.categoryCircle, selectedCategory === item && styles.selectedCategory]}
//       onPress={() => filterPetsByCategory(item)}
//     >
//       <Text>{item}</Text>
//     </TouchableOpacity>
//   );

//   const renderPet = ({ item }: { item: Pet }) => (
//     <TouchableOpacity
//       style={styles.petCard}
//       onPress={handlePetSelection} // Pass pet details
//     >
//       <View>
//         <Text style={styles.petName}>{item.petName}</Text>
//         <Text style={styles.petDetails}>Age: {item.petAge}</Text>
//         <Text style={styles.petPrice}>Price: {item.amount}$</Text>
//       </View>
//       <View>
//         <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={toggleMenu}>
//           <Image source={require('../../assets/Images/toggle.png')} />
//         </TouchableOpacity>
//         <View style={styles.profileIcon} />
//       </View>

//       <Text style={styles.title}>
//         Find an <Text style={styles.boldText}>Awesome</Text> Pet for You
//       </Text>

//       {/* Search Input */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for a pet"
//           value={searchQuery}
//           onChangeText={setSearchQuery} // Update search query
//         />
//         <TouchableOpacity style={styles.searchIcon}>
//           <Image source={require('../../assets/Images/search.png')} style={styles.menuSearchIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Category List */}
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item}
//         renderItem={renderCategory}
//         style={styles.categoryList}
//       />

//       <Text style={styles.forYouTitle}>For you</Text>

//       {/* Render filtered pets based on category and search */}
//       <FlatList
//         data={filteredPets}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPet}
//         style={styles.petList}
//       />

//       {/* Side Menu */}
//       <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
//         <TouchableOpacity onPress={toggleMenu}>
//           <Image source={require('../../assets/Images/cross.png')} />
//         </TouchableOpacity>
//         <TextInput style={styles.menuSearchInput} placeholder="Search for a pet" />
//         <Image source={require('../../assets/Images/search.png')} style={styles.menuSearchIcon} />
//         <View style={styles.menuItems}>
//           {/* Navigation options */}
//           <TouchableOpacity onPress={() => navigation.navigate('Adopt')}>
//             <Text style={styles.menuItem}>Adopt</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
//             <Text style={styles.menuItem}>Donate</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('AddPet')}>
//             <Text style={styles.menuItem}>Add Pet</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
//             <Text style={styles.menuItem}>Favorite</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Message')}>
//             <Text style={styles.menuItem}>Message</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//             <Text style={styles.menuItem}>Profile</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.logoutButton}>
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   profileIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#ccc',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '300',
//     width: 150,
//     marginVertical: 20,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 8,
//     fontSize: 16,
//   },
//   searchIcon: {
//     backgroundColor: '#000',
//     borderRadius: 8,
//     padding: 10,
//     marginLeft: 10,
//   },
//   categoryList: {
//     marginBottom: 20,
//   },
//   categoryCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 8,
//     marginBottom: 40,
//   },
//   forYouTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   petList: {
//     marginBottom: 20,
//   },
//   petCard: {
//     display: 'flex',
//     flexDirection:"row",
//     justifyContent:"space-between",
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#E5E7EB',
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   petName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   petDetails: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginVertical: 5,
//   },
//   petPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   // Menu Styles
//   menuContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: 250,
//     height: '100%',
//     backgroundColor: '#fff',
//     zIndex: 1,
//     padding: 20,
//     paddingTop: 40,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   closeIcon: {
//     marginBottom: 20,
//   },
//   menuSearchInput: {
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   menuSearchIcon: {
//     position: 'absolute',
//     right: 20,
//     top: 70,
//   },
//   menuItems: {
//     flex: 1,
//   },
//   menuItem: {
//     fontSize: 18,
//     paddingVertical: 15,
//   },
//   logoutButton: {
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   logoutText: {
//     color: 'red',
//     fontSize: 18,
//   },
//   selectedCategory: {
//     backgroundColor: '#6B7280',
//     color: '#fff',
//   },
//   petImage:{
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//     resizeMode: 'cover',
//     overflow: 'hidden'
//   }
// });