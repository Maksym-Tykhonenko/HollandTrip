import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import OtherWorldScreen from '../screens/OtherWorldScreen';
import OtherWorldPlace from '../screens/OtherWorldPlace';

const OtherWorldRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OtherWorldScreen"
        component={OtherWorldScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OtherWorldPlace"
        component={OtherWorldPlace}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OtherWorldRoute;
