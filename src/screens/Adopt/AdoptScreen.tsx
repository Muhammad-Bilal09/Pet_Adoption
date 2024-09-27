import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import {startConversation} from '../../redux/slice/conversationSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamAdoptList} from '../../types/types';
import { styles } from './AdoptStyle';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamAdoptList,
  'Home'
>;

const AdoptScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const selectedPet = useSelector((state: RootState) => state.pets.selectedPet);

  const handleAdoptNow = () => {
    if (selectedPet) {
      dispatch(
        startConversation({
          petOwnerId: selectedPet.ownerId,
          petName: selectedPet.petName,
        }),
      );
      navigation.navigate('Message', {
        petOwnerId: selectedPet.ownerId,
        petName: selectedPet.petName,
      });
    }
  };

  if (!selectedPet) {
    return (
      <View style={styles.noPet}>
        <Text>No pet selected</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: selectedPet.imageUrl}} style={styles.petImage} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{selectedPet.petName}</Text>
          <Text style={styles.price}>${selectedPet.amount}</Text>
        </View>

        <View style={styles.specificationsContainer}>
          <View style={styles.specificationBox}>
            <Text style={styles.specTitle}>Age</Text>
            <Text style={styles.specValue}>{selectedPet.petAge}</Text>
          </View>
          <View style={styles.specificationBox}>
            <Text style={styles.specTitle}>Gender</Text>
            <Text style={styles.specValue}>Male</Text>
          </View>
          <View style={styles.specificationBox}>
            <Text style={styles.specTitle}>Weight</Text>
            <Text style={styles.specValue}>2.1</Text>
          </View>
          <View style={styles.specificationBox}>
            <Text style={styles.specTitle}>Vaccine</Text>
            <Text style={styles.specValue}>Yes</Text>
          </View>
        </View>

        <View style={styles.ownerInfo}>
          <View style={styles.ownerAvatar}></View>
          <Text style={styles.ownerName}>Shin Ryujin</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>FSD</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {selectedPet.description}
          <Text style={styles.readMore}> Read More</Text>
        </Text>

        <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptNow}>
          <Text style={styles.adoptButtonText}>Adopt Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdoptScreen;
