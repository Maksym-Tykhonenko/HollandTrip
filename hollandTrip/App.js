import React, {useState, useEffect, useRef} from 'react';
import {Image, Text, View, Animated} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HollandRoute from './routes/HollandRoute';
import OtherWorldRoute from './routes/OtherWorldRoute';
import ProfileRoute from './routes/ProfileRoute';

const Tab = createBottomTabNavigator();

const App = () => {
  const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
  const ChangeInView = props => {
    const appearingAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 1 to 0
    useEffect(() => {
      Animated.timing(appearingAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setLoaderIsLoaded(true);
      }, 2500);
    }, []);

    return (
      <View style={{position: 'relative', flex: 1, backgroundColor: '#4d20a6'}}>
        <Animated.Image
          source={require('./assets/apgrDiz/loader.jpg')} // Special animatable View
          style={{
            ...props.style,
            opacity: appearingAnim,
            height: '100%',
            position: 'absolute', // Bind opacity to animated value
          }}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      {!loaderIsLoaded ? (
        <ChangeInView
          style={{
            width: '100%',
            //height: 50,
            backgroundColor: 'powderblue',
          }}></ChangeInView>
      ) : (
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
              tabBarActiveBackgroundColor: '#b20378',
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
              tabBarActiveBackgroundColor: '#b20378',
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
              tabBarActiveBackgroundColor: '#b20378',
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
      )}
    </NavigationContainer>
  );
};

export default App;
