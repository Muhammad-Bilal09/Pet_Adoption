import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/Home'; 
import ProfileScreen from '../screens/Profile/Profile'; 
import SearchScreen from '../screens/Search/Search';
import FavouriteScreen from '../screens/Favourite/Favourite';
import AddPetScreen from '../screens/Add/AddPet';
// import DetialPetScreen from '../screen/PetAdoptionScreen';

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        // tabBarIcon:({})=>(
          // <Entypo name="home" size={24} color="black" />
        // )
      }}/>
      <Tab.Screen name="Serach" component={SearchScreen} options={{
        // tabBarIcon:({})=>(
          // <FontAwesome6 name="plant-wilt" size={24} color="black" />
        // )
      }} />
         <Tab.Screen name="Favourite" component={FavouriteScreen} options={{
        // tabBarIcon:({})=>(
          // <FontAwesome6 name="plant-wilt" size={24} color="black" />
        // )
      }} />
         <Tab.Screen name="Plants" component={ProfileScreen} options={{
        // tabBarIcon:({})=>(
          // <FontAwesome6 name="plant-wilt" size={24} color="black" />
        // )
      }} />
        <Tab.Screen name="Pet" component={AddPetScreen} options={{
        // tabBarIcon:({})=>(
          // <FontAwesome6 name="plant-wilt" size={24} color="black" />
        // )
      }} />
           {/* <Tab.Screen name="Detial" component={DetialPetScreen} options={{ */}
        {/* // tabBarIcon:({})=>( */}
          {/* // <FontAwesome6 name="plant-wilt" size={24} color="black" /> */}
        {/* // ) */}
      {/* }} /> */}
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:"white",
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});















