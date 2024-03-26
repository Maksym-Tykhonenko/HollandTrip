{
  /** 
import React, { useState, useEffect, useRef } from 'react';
import {View, Animated, ImageBackground} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/Profile';
import HistoryScreen from './screens/History';
import GamesScreen from './screens/Games';
import ByNatureGameScreen from './screens/TipeOfGames/ByNature';
import ByCooperationsScreen from './screens/TipeOfGames/ByCooperations';
import ByMehanicsGameScreen from './screens/TipeOfGames/ByMehanics';
import ByNumberPlayersScreen from './screens/TipeOfGames/ByNumberPlayersScreen';
import IntelectGameScreen from './screens/IntelectTipe/IntelectGameScreen';
import NewTipeOfGame from './screens/NewTipeOfGame';
import OneIntGame from './screens/IntelectTipe/OneIntGame';
import NewGame from './screens/NewGame';
import WV from './screens/WV';

const App = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
      console.log('res.id', res.id);
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

  ///////////// OneSignal.Notifications
  // 7b5481a2-ed8e-4eb2-bc6e-d8efbe5fdbfc
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
  OneSignal.initialize('7b5481a2-ed8e-4eb2-bc6e-d8efbe5fdbfc');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  //OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

  ///////// Loader
  const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
  const ChangeInView = props => {
    // const fadeAnim = useRef(new Animated.Image(require('../../acets/loader1.jpg'))).current;

    const [firstLouderIsOver, setFirstLouderIsOver] = useState(false);
    const appearingAnim1 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0 to 1
    useEffect(() => {
      const animateLoader1 = Animated.timing(appearingAnim1, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      });

      animateLoader1.start(() => {
        setFirstLouderIsOver(true);
      });

      return () => {
        animateLoader1.stop();
      };
    }, []);

    const appearingAnim2 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 1 to 0
    useEffect(() => {
      if (firstLouderIsOver) {
        Animated.timing(appearingAnim2, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setLoaderIsLoaded(true);
          }, 3000);
        });
      }
    }, [firstLouderIsOver]);

    return (
      <View style={{position: 'relative', flex: 1}}>
        <ImageBackground
          source={require('./assets/redisigen/backgr.jpg')}
          style={{flex: 1}}>
          <Animated.Image
            source={require('./assets/redisigen/onbording.jpg')} // Special animatable View
            style={{
              ...props.style,
              opacity: appearingAnim1,
              //width: '100%',
              height: '100%',
              position: 'absolute', // Bind opacity to animated value
            }}
          />
          {firstLouderIsOver && (
            <Animated.Image
              source={require('./assets/redisigen/loader.jpg')} // Special animatable View
              style={{
                opacity: appearingAnim2,
                width: windowWidth,
                height: windowHeight,
                position: 'absolute', // Bind opacity to animated value
              }}
            />
          )}
        </ImageBackground>
      </View>
    );
  };
  ///////// useEffect що виріш який шлях включати
  const [route, setRoute] = useState(false);

  useEffect(() => {
    const checkUrl = `https://amazing-splendorous-victory.space/ktb4C3mJ`;
    const targetData = new Date('2024-03-22T12:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData < targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          console.log('status', r.status);
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
  ///////// Routs в ретерне App.js
  const Routes = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="WV"
            component={WV}
            options={{headerShown: false}}
            initialParams={{idfa: idfa}}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="GamesScreen"
            component={GamesScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ByNatureGameScreen"
            component={ByNatureGameScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ByCooperationsScreen"
            component={ByCooperationsScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ByMehanicsGameScreen"
            component={ByMehanicsGameScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ByNumberPlayersScreen"
            component={ByNumberPlayersScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="IntelectGameScreen"
            component={IntelectGameScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="NewTipeOfGame"
            component={NewTipeOfGame}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="OneIntGame"
            component={OneIntGame}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="NewGame"
            component={NewGame}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
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
*/
}
