import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
//import {holandPlaces} from '../data/holandPlaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uid} from 'uid';

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
  const [selectPhoto, setSelectPhoto] = useState([]);
  console.log('selectPhoto==>', selectPhoto);
  const [modalWithPhoto, setModalWithPhoto] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [placeRaiting, selectPhoto]);
  //placeRaiting
  const setData = async () => {
    try {
      const data = {
        placeRaiting,
        selectPhoto,
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
        setSelectPhoto(parsedData.selectPhoto);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const ImagePicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectPhoto([response.assets[0].uri, ...selectPhoto]);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setPlaceRaiting(rating);
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/apgrDiz/backgr.jpg')}>
        <SafeAreaView style={{position: 'relative', flex: 1}}>
          <View style={{marginBottom: 10}}>
            <TouchableOpacity activeOpacity={0.7}></TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              //backgroundColor: 'rgba(255, 255, 255, 0.5)',
              //borderColor: '#000',
              //borderWidth: 3,
              margin: 10,
              //borderRadius: 15,
              paddingHorizontal: 7,
            }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#fff',
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
                    //borderWidth: 3,
                    //borderRadius: 15,
                  }}
                  source={photo}
                />

                {placeRaiting < 1 && (
                  <View style={{alignItems: 'center', marginBottom: -30}}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#fff',
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
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>Description: </Text>
                  {briefDescription}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>What to do: </Text>
                  {whatToDo}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 25,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff'}}>Price: </Text>
                  {price}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
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
                  marginBottom: 20,
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => {
                    setModalWithPhoto(true);
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    borderWidth: 3,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: '#b20378',
                  }}>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/png/free-icon-folder-2521820.png')}
                  />
                  <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                    Photo album
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{height: 150}}></View>
            </ScrollView>
          </View>

          {/**Photo gallare */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalWithPhoto}>
            <View
              style={{
                backgroundColor: '#b20378',
                flex: 1,
                marginTop: '10%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderColor: '#000',
                borderWidth: 3,
              }}>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                  style={{marginTop: 10, marginRight: 10, marginBottom: 10}}
                  onPress={() => {
                    setModalWithPhoto(false);
                  }}>
                  <Image
                    source={require('../assets/png/free-icon-cross-391219.png')}
                    style={{width: 60, height: 60}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 25,
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      ImagePicer();
                    }}
                    style={{
                      width: 350,
                      height: 80,
                      borderWidth: 3,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f87c',
                    }}>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 25}}>
                      Press for
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 25}}>
                      add photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {selectPhoto.map(i => {
                    return (
                      <Image
                        source={{uri: i}}
                        key={uid()}
                        style={{
                          width: '45%',
                          height: 150,
                          marginLeft: '3%',
                          marginBottom: 10,
                          borderRadius: 15,
                          borderWidth: 3,
                          borderColor: '#000',
                        }}
                      />
                    );
                  })}
                </View>
                <View style={{marginBottom: 100}}></View>
              </ScrollView>
            </View>
          </Modal>

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
              backgroundColor: '#b20378',
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
