import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import HomeScreen from '../screens/Home/Home';
import PetAdoptionScreen from '../screens/Adoption/PetAdoptionScreen';

export type RootStackParamList = {
  Home: undefined; // No params are passed to Home
  PetAdoption: { petId: string }; // Params for PetAdoptionScreen
};

// Create Stack
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Adopt a Pet' }}
        />
        {/* <Stack.Screen
          name="PetAdoption"
          component={PetAdoptionScreen}
          options={{ title: 'Pet Details' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
