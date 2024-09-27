import React from 'react';
import { styles } from './ForgotStyle';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useForgotPassword } from './useForgotPassword'; // Import the custom hook

const ForgotPassword = ({ navigation }: any) => {
  const { email, setEmail, error, handlePasswordReset } = useForgotPassword(navigation); // Use the custom hook

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ForgotPassword;