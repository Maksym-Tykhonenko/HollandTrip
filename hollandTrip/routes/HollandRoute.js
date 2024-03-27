import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HollandScreen from '../screens/HollandScreen';
import HolandPlace from '../screens/HolandPlace';

const HollandRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HollandScreen"
        component={HollandScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HolandPlace"
        component={HolandPlace}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HollandRoute;
