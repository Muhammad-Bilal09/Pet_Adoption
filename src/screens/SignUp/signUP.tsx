import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import useSignUp from './useSignUp'; 
import { styles } from './SignUpStyle';
const SignUp = ({ navigation }: any) => {
  const { state, handleChange, handleSignUp } = useSignUp(navigation); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={state.name}
        onChangeText={value => handleChange('name', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={value => handleChange('email', value)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.password}
        onChangeText={value => handleChange('password', value)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupText}> Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;