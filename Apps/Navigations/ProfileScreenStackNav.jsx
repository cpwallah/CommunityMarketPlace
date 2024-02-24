import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyProducts from '../Screens/MyProducts';
import ProfileScreen from '../Screens/ProfileScreen';
import ProductDetail from '../Screens/ProductDetail';

const Stack=createStackNavigator();
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='profile-tab' component={ProfileScreen}
        options={{
            headerShown:false,
        }}
        />
        <Stack.Screen name='my-product' component={MyProducts}/>
        <Stack.Screen name='product-detail' component={ProductDetail}/>
    </Stack.Navigator>
  )
}