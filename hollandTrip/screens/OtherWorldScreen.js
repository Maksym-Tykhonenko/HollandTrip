import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {holandPlaces} from '../data/holandPlaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {uid} from 'uid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherWorldScreen = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [initialPlace, setInitialPlace] = useState(holandPlaces);
  const [newPlaces, setNewPlaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //console.log('initialPlace', initialPlace);
  const [placeName, setPlaceName] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [placeWhatToDo, setPlaceWhatToDo] = useState('');
  const [placePrice, setPlacePrice] = useState('');
  const [selectPhoto, setSelectPhoto] = useState(null);
  console.log('newPlace==>', newPlaces);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [newPlaces]);
  //placeRaiting
  const setData = async () => {
    try {
      const data = {
        newPlaces,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`HolandPlace`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`HolandPlace`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNewPlaces(parsedData.newPlaces);
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
        console.log('response==>', response.assets[0].uri);
        setSelectPhoto(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const handleModalCloce = () => {
    setPlaceName('');
    setPlaceAddress('');
    setPlaceDescription('');
    setPlaceWhatToDo('');
    setPlacePrice('');
    setSelectPhoto(null);

    setModalVisible(false);
  };

  const handleAddNewPlace = () => {
    let newPlace = {
      name: placeName,
      address: placeAddress,
      briefDescription: placeDescription,
      whatToDo: placeWhatToDo,
      price: placePrice,
      photo: selectPhoto,
    };

    setNewPlaces([...newPlaces, newPlace]);

    handleModalCloce();
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/bgr3.jpeg')}>
        <SafeAreaView style={{}}>
          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              activeOpacity={0.7}>
              <Image
                source={require('../assets/png/free-icon-add-button-9486129.png')}
                style={{
                  marginLeft: 5,
                  width: 60,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {newPlaces.map(place => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OtherWorldPlace', {place: place});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: 300,
                      height: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#0db561',
                      borderRadius: 10,
                      borderWidth: 3,
                      borderColor: '#000',
                      marginBottom: 10,
                    }}
                    key={uid()}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 22,
                      }}>
                      {place.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <View style={{height: 150}}></View>
            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View
                style={{
                  position: 'relative',
                  backgroundColor: '#fff',
                  flex: 1,
                  marginTop: '30%',
                  borderColor: '#000',
                  borderWidth: 3,
                  borderRadius: 40,
                }}>
                <Image
                  style={{
                    position: 'absolute',
                    width: windowWidth - 6,
                    borderRadius: 40,
                  }}
                  source={require('../assets/bgr3.jpeg')}
                />
                <View style={{flexDirection: 'row-reverse'}}>
                  <TouchableOpacity
                    style={{marginRight: 10, marginTop: 10}}
                    onPress={() => {
                      handleModalCloce();
                    }}>
                    <Image
                      source={require('../assets/png/free-icon-cross-391219.png')}
                      style={{width: 50, height: 50}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', width: '100%'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 42,
                      textAlign: 'center',
                      fontFamily: 'Chewy-Regular',
                    }}>
                    Add Place
                  </Text>

                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          alignItems: 'center',
                          width: 380,
                        }}
                        style={{}}>
                        <TextInput
                          //multiline={true}
                          placeholder="Name"
                          style={{
                            color: '#000',
                            backgroundColor: '#0db561',
                            width: '80%',
                            height: 60,
                            borderColor: '#000',
                            borderWidth: 3,
                            padding: 8,
                            borderRadius: 15,
                            marginTop: 20,
                            fontSize: 20,
                          }}
                          onChangeText={setPlaceName}
                          value={placeName}
                        />

                        <TextInput
                          multiline={true}
                          placeholder="Address"
                          style={{
                            color: '#000',
                            backgroundColor: '#0db561',
                            width: '80%',
                            height: 60,
                            borderColor: '#000',
                            borderWidth: 3,
                            padding: 8,
                            borderRadius: 15,
                            marginTop: 20,
                            fontSize: 20,
                          }}
                          onChangeText={setPlaceAddress}
                          value={placeAddress}
                        />

                        <TextInput
                          multiline={true}
                          placeholder="Description"
                          style={{
                            color: '#000',
                            backgroundColor: '#0db561',
                            width: '80%',
                            height: 120,
                            borderColor: '#000',
                            borderWidth: 3,
                            padding: 8,
                            borderRadius: 15,
                            marginTop: 20,
                            fontSize: 20,
                          }}
                          onChangeText={setPlaceDescription}
                          value={placeDescription}
                        />

                        <TextInput
                          multiline={true}
                          placeholder="What to do"
                          style={{
                            color: '#000',
                            backgroundColor: '#0db561',
                            width: '80%',
                            height: 120,
                            borderColor: '#000',
                            borderWidth: 3,
                            padding: 8,
                            borderRadius: 15,
                            marginTop: 20,
                            fontSize: 20,
                          }}
                          onChangeText={setPlaceWhatToDo}
                          value={placeWhatToDo}
                        />

                        <TextInput
                          multiline={true}
                          placeholder="Price"
                          style={{
                            color: '#000',
                            backgroundColor: '#0db561',
                            width: '80%',
                            height: 120,
                            borderColor: '#000',
                            borderWidth: 3,
                            padding: 8,
                            borderRadius: 15,
                            marginTop: 20,
                            fontSize: 20,
                          }}
                          onChangeText={setPlacePrice}
                          value={placePrice}
                        />

                        {!selectPhoto ? (
                          <TouchableOpacity
                            onPress={() => {
                              ImagePicer();
                            }}
                            style={{
                              width: '80%',
                              height: 60,
                              borderWidth: 3,
                              borderRadius: 15,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#0db561',
                              marginTop: 20,
                              marginBottom: 20,
                              //marginLeft: 10,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontFamily: 'Chewy-Regular',
                                fontSize: 40,
                              }}>
                              Add photo
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <Image
                            source={{uri: selectPhoto}}
                            style={{
                              width: '80%',
                              height: 200,
                              marginTop: 20,
                              borderRadius: 15,
                              borderWidth: 3,
                              borderColor: '#000',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#0db561',
                            }}
                          />
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            handleAddNewPlace();
                          }}
                          style={{
                            width: 150,
                            height: 60,
                            borderWidth: 3,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0db561',
                            marginTop: 20,
                            marginBottom: 20,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontFamily: 'Chewy-Regular',
                              fontSize: 40,
                            }}>
                            Add
                          </Text>
                        </TouchableOpacity>

                        <View style={{height: 250}}></View>
                      </ScrollView>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default OtherWorldScreen;
