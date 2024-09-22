import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home';
import AddPetScreen from '../screens/Add/AddPet'; // Example screen for Adopt
import DonateScreen from '../screens/Donation/DonatePet'; // Example screen for Donate
// import AddPetScreen from './AddPetScreen'; // Example screen for Add Pet
import FavoriteScreen from '../screens/Favourite/Favourite'; // Example screen for Favorite
// import MessageScreen from './MessageScreen'; // Example screen for Message
import ProfileScreen from '../screens/Profile/Profile'; 
const Stack = createStackNavigator();

function SideBarNavigation() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen name="Adopt" component={HomeScreen} />
        <Stack.Screen name="Donate" component={DonateScreen} />
        <Stack.Screen name="AddPet" component={AddPetScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        {/* <Stack.Screen name="Message" component={MessageScreen} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SideBarNavigation;
