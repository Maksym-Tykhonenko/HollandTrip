import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Dimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uid} from 'uid';

const ProfileScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.log(windowHeight, windowWidth);
  const [wallpaper, setWallpaper] = useState(null);
  const [avatar, setAvatart] = useState(null);
  /////////////
  const [visited1, setVisited1] = useState(false);
  const [visited2, setVisited2] = useState(false);
  const [visited3, setVisited3] = useState(false);
  const [visited4, setVisited4] = useState(false);
  const [visited5, setVisited5] = useState(false);
  const [visited6, setVisited6] = useState(false);
  const [visited7, setVisited7] = useState(false);
  const [visited8, setVisited8] = useState(false);
  const [visited10, setVisited10] = useState(false);
  //////////////
  const [onChangeName, setOnChangeName] = useState('');
  //console.log('onChangeName==>', onChangeName);
  const [name, setName] = useState();
  //console.log('name==>', name);
  //////////////
  const [rollUpBlock, setRollUpBlock] = useState(false);
  const [modalClose, setModalClose] = useState(false);

  const [selected, setSelected] = useState('');
  const [place, setPlace] = useState('');
  const [fidback, setFidback] = useState('');
  //console.log('selected', selected);
  const [eventPlace, setEventPlace] = useState([]);
  console.log('eventPlace', eventPlace);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    name,
    wallpaper,
    avatar,
    visited1,
    visited2,
    visited3,
    visited4,
    visited5,
    visited6,
    visited7,
    visited8,
    visited10,
    eventPlace,
  ]);
  //, selectPhoto
  const setData = async () => {
    try {
      const data = {
        name,
        wallpaper,
        avatar,
        visited1,
        visited2,
        visited3,
        visited4,
        visited5,
        visited6,
        visited7,
        visited8,
        visited10,
        eventPlace,
      };
      //const dataPhoto = [selectPhoto];
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
      //console.log('55', jsonData);
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setName(parsedData.name);
        setWallpaper(parsedData.wallpaper);
        setAvatart(parsedData.avatar);
        setVisited1(parsedData.visited1);
        setVisited2(parsedData.visited2);
        setVisited3(parsedData.visited3);
        setVisited4(parsedData.visited4);
        setVisited5(parsedData.visited5);
        setVisited6(parsedData.visited6);
        setVisited7(parsedData.visited7);
        setVisited8(parsedData.visited8);
        setVisited10(parsedData.visited10);
        setEventPlace(parsedData.eventPlace);
        //setSelectPhoto(parsedData.selectPhoto);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const handleSeveName = () => {
    setName(onChangeName);
    setOnChangeName('');
  };

  const WallpaperPicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        console.log('response==>', response.assets[0].uri);
        setWallpaper(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const AvatartPicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        console.log('response==>', response.assets[0].uri);
        setAvatart(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const handleAddDataAboutEventPlace = () => {
    let newEventPlace = {
      place,
      fidback,
      selected,
    };
    //console.log('newFishingPlace', newFishingPlace);

    setEventPlace([newEventPlace, ...eventPlace]);

    modalPopUpClose();
  };

  const modalPopUpClose = () => {
    setModalClose(false);
    setPlace('');
    setFidback('');
    setSelected('');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/bgr3.jpeg')}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <ScrollView>
            {/**AVATAR BLOCK */}
            <View style={{position: 'relative'}}>
              {!wallpaper ? (
                <TouchableOpacity
                  onPress={() => {
                    WallpaperPicker();
                  }}
                  style={{
                    width: windowWidth * 0.95,
                    height: 250,
                    borderWidth: 3,
                    borderRadius: 15,
                    backgroundColor: 'rgba(128, 128, 128, 0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontFamily: 'Chewy-Regular', fontSize: 35}}>
                    Tab for change
                  </Text>
                  <Text style={{fontFamily: 'Chewy-Regular', fontSize: 35}}>
                    background
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    WallpaperPicker();
                  }}
                  style={{
                    width: windowWidth * 0.95,
                    height: 250,
                    borderWidth: 3,
                    borderRadius: 15,
                    backgroundColor: 'rgba(128, 128, 128, 0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: wallpaper}}
                    style={{
                      width: windowWidth * 0.95,
                      height: 250,
                      borderWidth: 3,
                      borderRadius: 15,
                    }}
                  />
                </TouchableOpacity>
              )}

              {!avatar ? (
                <TouchableOpacity
                  onPress={() => {
                    AvatartPicker();
                  }}
                  style={{position: 'absolute', bottom: -90, right: 10}}>
                  <Image
                    source={require('../assets/png/free-icon-contact-11456604.png')}
                    style={{width: 180, height: 180}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    AvatartPicker();
                  }}
                  style={{position: 'absolute', bottom: -90, right: 10}}>
                  <Image
                    source={{uri: avatar}}
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 150,
                      borderWidth: 3,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>

            {!name ? (
              <View
                style={{
                  marginTop: 100,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                }}>
                <TextInput
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  placeholder="Enter your name..."
                  value={onChangeName}
                  onChangeText={setOnChangeName}
                  style={{
                    shadowOffset: {width: 3, height: 4},
                    shadowOpacity: 0.8,
                    elevation: 9,
                    marginTop: 5,
                    marginBottom: 15,
                    paddingLeft: 10,
                    fontSize: 20,
                    borderWidth: 3,
                    //borderColor: '#fff',
                    color: '#000',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: 15,
                    width: 280,
                    height: 60,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    handleSeveName();
                  }}
                  style={{marginBottom: 9}}>
                  <Image
                    source={require('../assets/png/free-icon-check-box-4561593.png')}
                    style={{width: 60, height: 70}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  marginTop: 20,
                  width: 170,
                  height: 50,
                  borderWidth: 3,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0db561',
                }}>
                <Text style={{fontFamily: 'Chewy-Regular', fontSize: 25}}>
                  {name}
                </Text>
              </View>
            )}
            {/**INTERACTIVE MAP BLOCK position: 'absolute'*/}

            <View
              style={{
                alignItems: 'center',
                marginTop: 25,
              }}>
              <View
                style={{
                  marginBottom: 5,
                  width: 350,
                  height: 50,
                  borderWidth: 3,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0db561',
                }}>
                <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                  If you visited some place, press on it!!!
                </Text>
              </View>

              <View
                style={{
                  position: 'relative',
                }}>
                <Image
                  source={require('../assets/imgonline-com-ua-Resize-h6TgyVUby81X6x.jpg')}
                  style={{
                    width: 350,
                    height: 350,
                    borderRadius: 15,
                    borderWidth: 3,
                  }}
                />

                {/**1 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited1(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited1 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 150,
                    top: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>1</Text>
                </TouchableOpacity>

                {/**2 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited2(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited2 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 120,
                    top: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>2</Text>
                </TouchableOpacity>

                {/**3 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited3(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited3 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 120,
                    top: 180,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>3</Text>
                </TouchableOpacity>

                {/**4 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited4(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited4 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 130,
                    top: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>4</Text>
                </TouchableOpacity>

                {/**5 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited5(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited5 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 130,
                    top: 90,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>5</Text>
                </TouchableOpacity>

                {/**6 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited6(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited6 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 160,
                    top: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>6</Text>
                </TouchableOpacity>

                {/**7 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited7(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited7 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 100,
                    top: 210,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>7</Text>
                </TouchableOpacity>

                {/**8 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited8(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited8 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 140,
                    top: 210,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>8</Text>
                </TouchableOpacity>

                {/**9 BTN */}
                <TouchableOpacity
                  onPress={() => setVisited10(true)}
                  style={{
                    position: 'absolute',
                    backgroundColor: !visited10 ? 'red' : 'green',
                    borderWidth: 3,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    left: 185,
                    top: 145,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>9</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/**List of places */}
            <View
              style={{
                alignItems: 'center',
                marginTop: 5,
                borderBottomWidth: 3,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  padding: 5,
                  width: 350,
                  //height: 50,
                  borderWidth: 3,
                  borderRadius: 15,

                  backgroundColor: '#0db561',
                }}>
                <View
                  style={{
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setRollUpBlock(!rollUpBlock);
                    }}
                    style={{position: 'absolute', right: 10}}>
                    {rollUpBlock ? (
                      <Image
                        source={require('../assets/png/free-icon-arrow-14025285.png')}
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: 15,
                          borderWidth: 3,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../assets/png/free-icon-arrow-14025545.png')}
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: 15,
                          borderWidth: 3,
                        }}
                      />
                    )}
                  </TouchableOpacity>

                  <Text style={{fontFamily: 'Chewy-Regular', fontSize: 25}}>
                    List of places:
                  </Text>
                </View>

                {!rollUpBlock && (
                  <View>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 1.Rijksmuseum. Museumstraat 1, 1071 XX Amsterdam
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 2.Anne Frank House. Prinsengracht 263-267, 1016 GV
                      Amsterdam
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 3.Keukenhof Gardens. Stationsweg 166A, 2161 AM Lisse
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 4.Van Gogh Museum. Museumplein 6, 1071 DJ Amsterdam
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 5.Zaanse Schans. Schansend 7, 1509 AW Zaandam
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 6.A'DAM Lookout. Overhoeksplein 5, 1031 KS Amsterdam
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 7.Kinderdijk. Nederwaard 1, 2961 AS Kinderdijk
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 8.Efteling Theme Park Resort. Europalaan 1, 5171 KW
                      Kaatsheuvel
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 20}}>
                      - 9.Hotel Pulitzer Amsterdam. Prinsengracht 315-331, 1016
                      GZ Amsterdam
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/**calendar block */}
            <View
              style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setModalClose(true);
                  //console.log('hello');
                }}
                style={{
                  borderWidth: 3,
                  borderRadius: 15,
                  backgroundColor: '#0db561',
                  height: 50,
                  width: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontFamily: 'Chewy-Regular', fontSize: 25}}>
                  Add your event
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              {eventPlace.map(i => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.9,
                      marginBottom: 10,
                      padding: 10,
                      borderWidth: 3,
                      borderRadius: 15,
                      backgroundColor: '#0db561',
                    }}
                    key={uid()}>
                    <Text>{i.selected}</Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 18}}>
                      {i.place}
                    </Text>
                    <Text style={{fontFamily: 'Chewy-Regular', fontSize: 18}}>
                      {i.fidback}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/**LOWER INDEN */}
            <View style={{height: 100}}></View>

            <Modal animationType="fade" transparent={true} visible={modalClose}>
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 40,
                  backgroundColor: '#0db561',
                  flex: 1,
                  marginRight: '5%',
                  marginLeft: '5%',
                  marginTop: '10%',
                  marginBottom: '10%',
                  borderRadius: 15,
                  borderWidth: 3,
                  borderColor: '#000',
                }}>
                {/**BTN SideBar Close */}
                <TouchableOpacity
                  onPress={() => {
                    modalPopUpClose();
                  }}
                  style={{position: 'absolute', top: 20, left: 10}}>
                  <Text style={{color: '#000', fontSize: 30}}>X</Text>
                </TouchableOpacity>

                <KeyboardAvoidingView
                  style={{flex: 1}}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={{marginBottom: 50}}>
                      <View>
                        {/** */}
                        <Calendar
                          onDayPress={day => {
                            setSelected(day.dateString);
                          }}
                          markedDates={{
                            [selected]: {
                              selected: true,
                              disableTouchEvent: true,
                              selectedDotColor: 'orange',
                            },
                          }}
                        />

                        <TextInput
                          placeholderTextColor="rgba(0, 0, 0, 0.5)"
                          placeholder="Event place..."
                          value={place}
                          onChangeText={setPlace}
                          style={{
                            shadowOffset: {width: 3, height: 4},
                            shadowOpacity: 0.8,
                            elevation: 9,
                            marginTop: 20,
                            marginBottom: 15,
                            paddingLeft: 10,
                            fontSize: 20,
                            borderWidth: 3,
                            borderColor: '#000',
                            color: '#000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 10,
                            width: 250,
                            height: 40,
                          }}
                        />

                        <TextInput
                          placeholderTextColor="rgba(0, 0, 0, 0.5)"
                          placeholder="My feedback..."
                          multiline={true}
                          value={fidback}
                          onChangeText={setFidback}
                          style={{
                            shadowOffset: {width: 3, height: 4},
                            shadowOpacity: 0.8,
                            elevation: 9,
                            marginTop: 5,
                            marginBottom: 15,
                            paddingLeft: 10,
                            fontSize: 20,
                            borderWidth: 3,
                            borderColor: '#000',
                            color: '#000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 10,
                            width: 250,
                            height: 80,
                          }}
                        />

                        <View style={{alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              handleAddDataAboutEventPlace();
                            }}
                            style={{
                              shadowOffset: {width: 3, height: 4},
                              shadowOpacity: 0.8,
                              elevation: 9,
                              marginTop: 20,
                              marginBottom: 15,
                              paddingLeft: 10,
                              fontSize: 20,
                              borderWidth: 3,
                              borderColor: '#000',
                              color: '#000',
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                              borderRadius: 15,
                              width: 100,
                              height: 40,
                            }}>
                            <Text style={{color: '#000', fontSize: 30}}>
                              SAVE
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{height: 150}}></View>
                    </ScrollView>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
