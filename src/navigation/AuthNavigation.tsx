import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ActivityIndicator, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import LoginScreen from '../screens/signIn/SiginIn';
import SignUpScreen from '../screens/signUp/SignUp';
import HomeScreen from '../screens/Home/Home';
import ProfileScreen from '../screens/Profile/Profile';
import SearchScreen from '../screens/Search/Search';
import FavouriteScreen from '../screens/Favourite/Favourite';
import AddPetScreen from '../screens/addPet/AddPetScreen';
import AdoptScreen from '../screens/Adopt/AdoptScreen';
import DonateScreen from '../screens/Donate/DonateScreen';
import MessageScreen from '../screens/Message/MessageScreen';
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import { AuthStackParamList,AppStackParamList } from '../types/types';


const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

const BottomTabScreens = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'black',
      tabBarActiveBackgroundColor: '#101C1D',
      tabBarInactiveBackgroundColor: 'transparent',
      tabBarStyle: {
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      tabBarItemStyle: {
        margin: 5,
        borderRadius: 15,
        padding: 5,
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <AntDesign name="search1" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Favourite"
      component={FavouriteScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <FontAwesome6 name="heart" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <FontAwesome6 name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const SideBarScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="PetAdoption" component={AdoptScreen} />
    <Stack.Screen name="Donate" component={DonateScreen} />
    <Stack.Screen name="AddPet" component={AddPetScreen} />
    <Stack.Screen name="favourite" component={FavouriteScreen} />
    <Stack.Screen name="Message" component={MessageScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppStackScreens = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="BottomTabs"
      component={BottomTabScreens}
      options={{headerShown: false}}
    />
    <AppStack.Screen
      name="SideBar"
      component={SideBarScreens}
      options={{headerShown: false}}
    />
    <AppStack.Screen name="PetAdoption" component={AdoptScreen} />
    <AppStack.Screen name="Donate" component={DonateScreen} />
    <AppStack.Screen name="AddPet" component={AddPetScreen} />
    <AppStack.Screen name="Message" component={MessageScreen} />
  </AppStack.Navigator>
);

const AuthNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStackScreens /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};

export default AuthNavigation;
