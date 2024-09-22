import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';


const initialValue = {
  name: '',
  email: '',
  password: ''
};

const SignUp = () => {
  const [state, setState] = useState(initialValue);

  const handleChange = (key: keyof typeof initialValue, value: string) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={state.name}
        onChangeText={(value) => handleChange('name', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry={true}
      />
      
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default SignUp;