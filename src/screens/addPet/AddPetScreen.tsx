import React from 'react';
import {TextInput, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import { useAddPet } from './useAddPet'; 
import {styles} from './AddStyles'

const AddPetScreen = () => {
  const {
    petAge, setPetAge,
    petType, setPetType,
    petBreed, setPetBreed,
    amount, setAmount,
    vaccinated, setVaccinated,
    gender, setGender,
    weight, setWeight,
    location, setLocation,
    description, setDescription,
    imageUri, pickImage,
    petTypes, yesNoOptions, genderOptions,
    handleSubmit,
    uploading
  } = useAddPet();

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pet Age"
        value={petAge}
        onChangeText={setPetAge}
      />
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
        {uploading ? 'Uploading...' : 'Add Pet'}
      </Button>
    </ScrollView>
  );
};



export default AddPetScreen;