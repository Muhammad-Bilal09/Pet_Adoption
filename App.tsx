import React, { useEffect } from 'react';
import AuthNavigation from './src/navigation/AuthNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(()=>{
    if(Platform.OS === 'android')
    SplashScreen.hide();
  },[])
  return (
    <>
  <Provider store={store}>
    <AuthNavigation />
      </Provider>
    </>
  );
};

export default App;













