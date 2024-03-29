import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//import {holandPlaces} from '../data/holandPlaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HolandPlace = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {
    name,
    photo,
    address,
    latitude,
    longitude,
    briefDescription,
    whatToDo,
    price,
  } = route.params.place;
  const [placeRaiting, setPlaceRaiting] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [placeRaiting]);

  const setData = async () => {
    try {
      const data = {
        placeRaiting,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`HolandPlace${name}`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`HolandPlace${name}`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setPlaceRaiting(parsedData.placeRaiting);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setPlaceRaiting(rating);
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/bgr3.jpeg')}>
        <SafeAreaView style={{position: 'relative', flex: 1}}>
          <View style={{marginBottom: 10}}>
            <TouchableOpacity activeOpacity={0.7}></TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'rgba(13, 181, 97, 0.6)',
              borderColor: '#000',
              borderWidth: 3,
              margin: 10,
              borderRadius: 15,
              paddingHorizontal: 7,
            }}>
            <Text
              style={{
                fontSize: 40,
                fontFamily: 'Chewy-Regular',
                //color: '#fff',
                marginBottom: 5,
              }}>
              {name}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginBottom: 10}}>
                <Image
                  style={{
                    width: windowWidth * 0.9,
                    height: 200,
                    borderWidth: 3,
                    borderRadius: 15,
                  }}
                  source={photo}
                />

                {placeRaiting < 1 && (
                  <View style={{alignItems: 'center', marginBottom: -30}}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: 'Chewy-Regular',
                        //color: '#fff',
                      }}>
                      Please select raiting!
                    </Text>
                  </View>
                )}
                <AirbnbRating
                  style={{color: '#000'}}
                  onFinishRating={ratingCompleted}
                  defaultRating={placeRaiting}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontFamily: 'Chewy-Regular',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>Description: </Text>
                  {briefDescription}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Chewy-Regular',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>What to do: </Text>
                  {whatToDo}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Chewy-Regular',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>Price: </Text>
                  {price}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Chewy-Regular',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>Address: </Text>
                  {address}
                </Text>
              </View>
              <MapView
                style={{
                  height: 200,
                  marginBottom: 5,
                  borderRadius: 10,
                  borderWidth: 3,
                }}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </MapView>
              <View></View>
              <View style={{height: 150}}></View>
            </ScrollView>
          </View>

          {/**BTN BAck */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              bottom: 10,
              right: 5,
              borderWidth: 3,
              width: 90,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: '#0db561',
            }}>
            <Text
              style={{
                fontSize: 40,
                fontFamily: 'Chewy-Regular',
                color: '#fff',
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HolandPlace;
