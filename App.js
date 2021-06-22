import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import { Component } from 'react';


import LoginScreen from './App/Screens/LoginScreen';
import RegisterScreen from './App/Screens/RegisterScreen';
import HomeScreen from  './App/Screens/HomeScreen';
import MyGames from './App/Screens/Mygames';

const Stack = createStackNavigator();



export default  class App extends Component {
    render(){
      return (
        <NavigationContainer>
        <Stack.Navigator
         screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MyGames" component={MyGames} />
      </Stack.Navigator>
    </NavigationContainer>
      )
    }
}



