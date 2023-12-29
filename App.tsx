import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import Description from './src/Description';
import ResizeImageScreen from './src/ResizeImageScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Description">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Description"
          component={Description}
          options={{ title: 'Description' }}
        />
        {/* Add the ResizeImageScreen as a new screen */}
        <Stack.Screen
          name="ResizeImage"
          component={ResizeImageScreen}
          options={{ title: 'Resize Image' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
