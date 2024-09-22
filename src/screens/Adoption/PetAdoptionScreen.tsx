





















// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const PetAdoptionScreen = () => {
//   return (
//     <View style={styles.container}>

//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton}>
          
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.favoriteButton}>
//         </TouchableOpacity>
//       </View>

//       {/* Image Placeholder */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: 'https://www.shutterstock.com/image-photo/furry-friends-red-cat-corgi-260nw-1992708143.jpg' }} // replace with actual image URL
//           style={styles.petImage}
//         />
//       </View>

//       {/* Pet Details */}
//       <View style={styles.detailsContainer}>
//         <View style={styles.petInfo}>
//           <Text style={styles.petName}>Cavachon</Text>
//           <Text style={styles.petType}>Dog</Text>
//         </View>
//         <Text style={styles.price}>$250</Text>

//         {/* Pet Specifications */}
//         <View style={styles.specificationsContainer}>
//           <View style={styles.specificationBox}>
//             <Text style={styles.specTitle}>Age</Text>
//             <Text style={styles.specValue}>4</Text>
//           </View>
//           <View style={styles.specificationBox}>
//             <Text style={styles.specTitle}>Gender</Text>
//             <Text style={styles.specValue}>Male</Text>
//           </View>
//           <View style={styles.specificationBox}>
//             <Text style={styles.specTitle}>Weight</Text>
//             <Text style={styles.specValue}>2.1</Text>
//           </View>
//           <View style={styles.specificationBox}>
//             <Text style={styles.specTitle}>Vaccine</Text>
//             <Text style={styles.specValue}>Yes</Text>
//           </View>
//         </View>

//         {/* Owner Info */}
//         <View style={styles.ownerInfo}>
//           <View style={styles.ownerAvatar}>
//             {/* Add the owner's image here */}
//           </View>
//           <Text style={styles.ownerName}>Shin Ryujin</Text>
//           <View style={styles.locationContainer}>
//             <Text style={styles.locationText}>FSD</Text>
//             {/* Add location pin icon here */}
//           </View>
//         </View>

//         {/* Pet Description */}
//         <Text style={styles.description}>
//           There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...
//           <Text style={styles.readMore}> Read More</Text>
//         </Text>

//         {/* Adopt Now Button */}
//         <TouchableOpacity style={styles.adoptButton}>
//           <Text style={styles.adoptButtonText}>Adopt Now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Import RootState from your store
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PetAdoptionScreen = () => {
  const selectedPet = useSelector((state: RootState) => state.pets.selectedPet);

  if (!selectedPet) {
    return (
      <View>
        <Text>No pet selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedPet.imageUrl }} style={styles.petImage} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{selectedPet.petName}</Text>
        <Text style={styles.petType}>{selectedPet.type}</Text>
        <Text style={styles.price}>${selectedPet.amount}</Text>
        
        <View style={styles.specificationsContainer}>
          <View style={styles.specificationBox}>
            <Text style={styles.specTitle}>Age</Text>
            <Text style={styles.specValue}>{selectedPet.petAge}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ddd',
  },
  backButton: {
    // Style for back button
  },
  favoriteButton: {
    // Style for favorite button
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  petInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  petType: {
    fontSize: 16,
    color: '#999',
  },
  price: {
    fontSize: 24,
    color: '#FF9D00',
    fontWeight: 'bold',
  },
  specificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  specificationBox: {
    alignItems: 'center',
  },
  specTitle: {
    fontSize: 14,
    color: '#999',
  },
  specValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  ownerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc', 
    marginRight: 10,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#999',
  },
  description: {
    marginTop: 20,
    color: '#666',
  },
  readMore: {
    color: '#FF9D00',
    fontWeight: 'bold',
  },
  adoptButton: {
    backgroundColor: '#333',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PetAdoptionScreen;
