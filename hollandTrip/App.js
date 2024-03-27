import React from 'react';
import {Image, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HollandRoute from './routes/HollandRoute';
import OtherWorldRoute from './routes/OtherWorldRoute';
import ProfileRoute from './routes/ProfileRoute';

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
          component={ProfileRoute}
          options={{
            tabBarActiveBackgroundColor: '#0db561',
            tabBarInactiveBackgroundColor: '#000',
            tabBarLabelStyle: {color: 'gold'},
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={require('./assets/png/free-icon-contact-11456604.png')}
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
          component={HollandRoute}
          options={{
            tabBarActiveBackgroundColor: '#0db561',
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
          name="OtherWorldRoute"
          component={OtherWorldRoute}
          options={{
            tabBarActiveBackgroundColor: '#0db561',
            tabBarInactiveBackgroundColor: '#000',
            tabBarLabelStyle: {color: 'gold'},
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={require('./assets/png/free-icon-earth-3081518.png')}
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
