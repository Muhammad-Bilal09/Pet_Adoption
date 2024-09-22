import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const PetDonationForm = () => {
  const [petType, setPetType] = useState<string | null>(null);
  const [petBreed, setPetBreed] = useState('');
  const [amount, setAmount] = useState('');
  const [vaccinated, setVaccinated] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const petTypes = [{ label: 'Dog', value: 'dog' }, { label: 'Cat', value: 'cat' }];
  const yesNoOptions = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
  const genderOptions = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }];

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
    const storageRef = storage().ref(`DonatePets/${fileName}`);
    setUploading(true);

    try {
      const task = storageRef.putFile(uploadUri);
      await task;

      // Get download URL
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
      // alert('Please fill in all fields');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const uploadedImageUrl = await uploadImage(imageUri);

      if (!uploadedImageUrl) {
        // alert('Image upload failed. Please try again.');
        return;
      }

      const formData = {
        petType,
        petBreed,
        amount,
        vaccinated,
        gender,
        weight,
        location,
        description,
        imageUrl: uploadedImageUrl, // Store image URL in Firestore
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      // Store data in Firestore
      await firestore().collection('DonatePets').add(formData);
      // alert('Pet added successfully');
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error('Error adding pet: ', error);
      // alert('Error adding pet. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Dropdown
        style={styles.input}
        data={petTypes}
        labelField="label"
        valueField="value"
        placeholder="Pet Type"
        value={petType}
        onChange={(item) => setPetType(item.value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pet Breed"
        value={petBreed}
        onChangeText={setPetBreed}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount $"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Dropdown
        style={styles.input}
        data={yesNoOptions}
        labelField="label"
        valueField="value"
        placeholder="Vaccinated"
        value={vaccinated}
        onChange={(item) => setVaccinated(item.value)}
      />

      <Dropdown
        style={styles.input}
        data={genderOptions}
        labelField="label"
        valueField="value"
        placeholder="Gender"
        value={gender}
        onChange={(item) => setGender(item.value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight KG"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Upload Image</Text>
        )}
      </TouchableOpacity>

      <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Donate pet'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  uploadButton: {
    height: 200,
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default PetDonationForm;