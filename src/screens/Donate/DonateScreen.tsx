import React from 'react';
import { styles } from './DonateStyle';
import {
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import { useDonatePet } from './useDonatePet'; 

const DonateScreen = () => {
  const {
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
    handleSubmit,
    uploading,
    petTypes,
    yesNoOptions,
    vaccinationOptions,
    genderOptions,
  } = useDonatePet();

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
      <Dropdown
        style={styles.input}
        data={yesNoOptions}
        labelField="label"
        valueField="value"
        placeholder="Amount $"
        value={amount}
        onChange={(item) => setAmount(item.value)}
      />
      <Dropdown
        style={styles.input}
        data={vaccinationOptions}
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
        placeholder="Age"
        keyboardType="numeric"
        value={petAge}
        onChangeText={setPetAge}
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
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Donate pet'}
      </Button>
    </ScrollView>
  );
};

export default DonateScreen;