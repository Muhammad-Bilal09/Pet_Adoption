import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const useForgotPassword = (navigation: any) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Password Reset',
          'A password reset link has been sent to your email.',
        );
        setError('');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.error('Error sending password reset email:', error);
        handleAuthError(error);
      });
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleAuthError = (error: any) => {
    if (error.code === 'auth/user-not-found') {
      setError('No user found with this email.');
    } else if (error.code === 'auth/invalid-email') {
      setError('Invalid email format.');
    } else {
      setError('Failed to send reset email. Please try again later.');
    }
  };

  return {
    email,
    setEmail,
    error,
    handlePasswordReset,
  };
};
