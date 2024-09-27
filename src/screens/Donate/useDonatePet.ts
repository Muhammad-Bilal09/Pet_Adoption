import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const useDonatePet = () => {
  const [petType, setPetType] = useState<string | null>(null);
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [amount, setAmount] = useState('');
  const [vaccinated, setVaccinated] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const petTypes = [
    { label: 'Dogs', value: 'dogs' },
    { label: 'Cats', value: 'cats' },
    { label: 'Bunnies', value: 'Bunnies' },
    { label: 'Birds', value: 'Birds' },
    { label: 'Turtles', value: 'Turtles' },
  ];

  const yesNoOptions = [{ label: 'Donation', value: 'Donation' }];

  const vaccinationOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const pickImage = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const uploadImage = async (uri: string) => {
    if (!uri) return null;

    const uploadUri = uri;
    const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`pets/${fileName}`);
    setUploading(true);

    try {
      const task = storageRef.putFile(uploadUri);
      await task;

      const downloadURL = await storageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Image upload error: ', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!petType || !petBreed || !amount || !location || !description || !imageUri) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      const uploadedImageUrl = await uploadImage(imageUri);

      if (!uploadedImageUrl) {
        Alert.alert('Image upload failed. Please try again.');
        return;
      }

      const formData = {
        petType,
        petBreed,
        petAge,
        amount,
        vaccinated,
        gender,
        weight,
        location,
        description,
        imageUrl: uploadedImageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('pets').add(formData);
      Alert.alert('Pet added successfully');
    } catch (error) {
      console.error('Error adding pet: ', error);
      Alert.alert('Error adding pet. Please try again.');
    }
  };

  return {
    petType,
    setPetType,
    petBreed,
    setPetBreed,
    petAge,
    setPetAge,
    amount,
    setAmount,
    vaccinated,
    setVaccinated,
    gender,
    setGender,
    weight,
    setWeight,
    location,
    setLocation,
    description,
    setDescription,
    imageUri,
    pickImage,
    uploadImage,
    handleSubmit,
    uploading,
    petTypes,
    yesNoOptions,
    vaccinationOptions,
    genderOptions,
  };
};
