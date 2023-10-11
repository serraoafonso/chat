import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Layout from '../Pages/Layout';
import Chat from '../Pages/Chat';
import Profile from '../Pages/Profile';
import People from '../Pages/People';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { UserContext } from '../context/userContext';

const Stack = createStackNavigator()
export default function Navigation() {
        // const { user } = useContext(UserContext); // Use o contexto para acessar o valor de user
        const {user, verifyUser, userFalado} = useContext(UserContext)
        console.log(user)
        return (
              <NavigationContainer>
                {
                 user != ''?
                (<Stack.Navigator  screenOptions={{headerShown: false}}>
                <Stack.Screen name='Layout' component={Layout}/>
                <Stack.Screen name='People' component={People} />     
                <Stack.Screen name='Chat' component={Chat} />     
                <Stack.Screen name='Profile' component={Profile} />
                </Stack.Navigator>)
                :
                <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                </Stack.Navigator>
                }
            </NavigationContainer>
        );
}