import React from 'react';
import StackNavigator from './src/navigation/StackNavigator'; 
import SidebarNavigation from './src/navigation/NavigationContainer';
import BottomNavigation from './src/navigation/BottomNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const App = () => {
  return (
    <>
  <Provider store={store}>
      <BottomNavigation />
      {/* <StackNavigator /> */}
      {/* <SidebarNavigation /> */}
      </Provider>
    </>
  );
};

export default App;













