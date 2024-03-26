import React from 'react';
import {Image, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HollandScreen from './screens/HomeScreen';
import OtherWorldScreen from './screens/HolandMapScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        initialRouteName="Holland">
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarInactiveBackgroundColor: '#000',
            tabBarLabelStyle: {color: 'gold'},
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={require('./assets/png/free-icon-profile-5987424.png')}
                  style={{
                    marginTop: focused ? 5 : 0,
                    width: focused ? 60 : 35,
                    height: focused ? 55 : 35,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Holland"
          component={HollandScreen}
          options={{
            tabBarInactiveBackgroundColor: '#000',
            tabBarLabelStyle: {color: 'gold'},
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={require('./assets/png/free-icon-holland-2766334.png')}
                  style={{
                    marginTop: focused ? 5 : 0,
                    width: focused ? 60 : 35,
                    height: focused ? 55 : 35,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="OtherWorld"
          component={OtherWorldScreen}
          options={{
            tabBarInactiveBackgroundColor: '#000',
            tabBarLabelStyle: {color: 'gold'},
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={require('./assets/png/free-icon-world-chocolate-day-8471091.png')}
                  style={{
                    marginTop: focused ? 5 : 0,
                    width: focused ? 60 : 35,
                    height: focused ? 55 : 35,
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
