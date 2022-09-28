import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native'

import { SignUp } from './screens';
import Tabs from './navigation/tabs';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  }
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar backgroundColor="#00BA63"/>
      <Stack.Navigator screenOptions=
        {
          { headerShown: false }
        }
        initialRouteName={'SignUp'}
      >
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Tabs */}
        <Stack.Screen  name="Home" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

