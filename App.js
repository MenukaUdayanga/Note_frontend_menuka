import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddnoteScreen from './screens/AddnoteScreen';
import UpdatenoteScreen from './screens/UpdatenoteScreen';
import ExampleScreen from './screens/ExampleScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>

        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Addnote" component={AddnoteScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Updatenote" component={UpdatenoteScreen} options={{headerShown:false}}/>
        
        </Stack.Navigator>
    </NavigationContainer>
  )
}