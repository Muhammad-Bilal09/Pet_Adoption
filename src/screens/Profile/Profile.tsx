import React from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, TextInput, Avatar, IconButton } from 'react-native-paper';
import useProfile from './useProfile'; 
import { styles } from './ProfileStyle';
const ProfileSettingsScreen = () => {
  const {
    username,
    email,
    profileImage,
    imageUploading,
    handleImagePick,
    handleProfileUpdate,
    updateUsername,
  } = useProfile();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <View style={styles.avatarContainer}>
          {profileImage ? (
            <Avatar.Image size={100} source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={100} icon="account" style={styles.avatar} />
          )}
          <Button
            mode="text"
            onPress={handleImagePick}
            loading={imageUploading}
            disabled={imageUploading}>
            {imageUploading ? 'Uploading...' : 'Change Profile Picture'}
          </Button>
        </View> */}

<View style={styles.avatarContainer}>
  {profileImage ? (
    <Avatar.Image size={100} source={{ uri: profileImage }} style={styles.avatar} />
  ) : (
    <Avatar.Icon size={100} icon="account" style={styles.avatar} />
  )}
  {/* Plus icon button */}
  <TouchableOpacity style={styles.iconButtonContainer} onPress={handleImagePick} disabled={imageUploading}>
    <IconButton icon="plus" size={20} style={styles.iconButton} />
  </TouchableOpacity>
</View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={updateUsername}
          />
          <TextInput
            label="Email"
            value={email}
            disabled
            style={styles.emailInput}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleProfileUpdate}
          style={styles.updateButton}>
          Update Profile
        </Button>
      </View>
    </SafeAreaView>
  );
};
export default ProfileSettingsScreen;