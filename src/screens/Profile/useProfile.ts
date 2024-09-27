// useProfile.ts
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setProfile, updateUsername, updateProfileImage } from '../../redux/slice/profileSlice';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';

const useProfile = () => {
  const dispatch = useDispatch();
  const { username, email, profileImage } = useSelector((state: RootState) => state.profile);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      dispatch(
        setProfile({
          username: user.displayName || '',
          email: user.email || '',
          profileImage: user.photoURL || null,
        }),
      );
    }
  }, [dispatch]);

  const handleImagePick = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, async response => {
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
        dispatch(updateProfileImage(downloadURL));
        Alert.alert('Profile Image Updated');
      } catch (error: any) {
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
      } catch (error: any) {
        Alert.alert('Error updating profile', error.message);
      }
    }
  };

  return {
    username,
    email,
    profileImage,
    imageUploading,
    setImageUploading,
    handleImagePick,
    uploadImage,
    handleProfileUpdate,
    updateUsername: (newUsername: string) => dispatch(updateUsername(newUsername)),
  };
};

export default useProfile;
