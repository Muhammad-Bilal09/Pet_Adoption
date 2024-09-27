// useSignIn.ts
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const useSignIn = (navigation: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Login Successful', `Welcome back, ${email}!`);
        setError('');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setError('No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Incorrect password.');
        } else {
          setError('Login failed. Please try again.');
        }
      });
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useSignIn;
