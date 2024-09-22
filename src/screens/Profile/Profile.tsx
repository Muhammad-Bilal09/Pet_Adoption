import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const ProfileSettingsScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUsername(user.displayName || '');
      setEmail(user.email || '');
      setProfileImage(user.photoURL || null);
    }
  }, []);

  const handleImagePick = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo', // Use specific type from 'photo' | 'video' | 'mixed'
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel || !response.assets) return;

      const image = response.assets[0].uri;
      if (image) {
        uploadImage(image);
      } else {
        Alert.alert('Error', 'No image selected.');
      }
    });
  };

  const uploadImage = async (imageUri: string) => {
    setImageUploading(true);
    const user = auth().currentUser;
    if (user && imageUri) {
      const storageRef = storage().ref(`profile_images/${user.uid}`);
      try {
        await storageRef.putFile(imageUri);
        const downloadURL = await storageRef.getDownloadURL();
        await user.updateProfile({ photoURL: downloadURL });
        setProfileImage(downloadURL);
        Alert.alert('Profile Image Updated');
      } catch (error:any) {
        Alert.alert('Error uploading image', error.message);
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleProfileUpdate = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        await user.updateProfile({
          displayName: username,
          photoURL: profileImage,
        });
        Alert.alert('Profile Updated Successfully');
      } catch (error:any) {
        Alert.alert('Error updating profile', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          {profileImage ? (
            <Avatar.Image size={100} source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={100} icon="account" style={styles.avatar} />
          )}
          <Button mode="text" onPress={handleImagePick} loading={imageUploading} disabled={imageUploading}>
            {imageUploading ? 'Uploading...' : 'Change Profile Picture'}
          </Button>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={(text: React.SetStateAction<string>) => setUsername(text)}
          />
          <TextInput
            label="Email"
            value={email}
            disabled // Email should be non-editable
            style={styles.emailInput}
          />
        </View>
        <Button mode="contained" onPress={handleProfileUpdate}>
          Update Profile
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: '#ccc',
  },
  inputContainer: {
    marginBottom: 20,
  },
  emailInput: {
    marginTop: 10,
  },
});

export default ProfileSettingsScreen;



























// import React, { useState } from 'react';
// import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// import { Button, TextInput, Avatar } from 'react-native-paper';
// import Icon from 'react-native-ionicons'

// const ProfileSettingsScreen = () => {
//   const [username, setUsername] = useState('Muhammad Talha');
//   const [email, setEmail] = useState('info@techcloset.com');

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <View style={styles.avatarContainer}>
//           <Avatar.Icon size={100} icon="account" style={styles.avatar} />
//         </View>
//         <View style={styles.inputContainer}>
//           <TextInput
//             label="Username"
//             value={username}
//             onChangeText={(text: React.SetStateAction<string>) => setUsername(text)}
//           />
//           <TextInput
//             label="Email"
//             value={email}
//             onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
           
//             style={styles.emailInput}
//           />
//         </View>
//         <Button mode="contained" onPress={() => console.log('Profile Updated')}>
//           Update Profile
//         </Button>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   avatar: {
//     backgroundColor: '#ccc',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   emailInput: {
//     marginTop: 10,
//   },
// });

// export default ProfileSettingsScreen;
