// useSignUp.ts
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const useSignUp = (navigation: any) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (key: keyof typeof state, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSignUp = () => {
    const { email, password } = state;

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        // Optionally navigate to a different screen after signing up
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        }

        console.error(error);
      });

    console.log('Signing Up', state);
  };

  return {
    state,
    handleChange,
    handleSignUp,
  };
};

export default useSignUp;
