import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import Interface from './src/Screens/Interface';
import ForgetPassword from './src/Screens/ForgetPassword';
import CodeVerif from './src/Screens/CodeVerif';
import ChangePass from './src/Screens/ChangePass';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="LoginScreen" component={LoginScreen}   options={{ headerShown: false }} 
        /> 
        <Stack.Screen name="InterfacePrincipale" component={Interface} options={{ headerShown: false }}  />
        <Stack.Screen name="ForgetPass" component={ForgetPassword} options={{ headerShown: false }}  />
        <Stack.Screen name="CodeVerif" component={CodeVerif} options={{ headerShown: false }}  />
        <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
