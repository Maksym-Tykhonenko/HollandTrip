import React, {useState} from 'react';
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
  console.log(route.params.place);
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
            }}>
            <Text style={{fontSize: 40, fontFamily: 'Chewy-Regular'}}>
              {name}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
                <Image
                  style={{
                    width: windowWidth * 0.9,
                    height: 200,
                    borderWidth: 3,
                    borderRadius: 15,
                  }}
                  source={photo}
                />
              </View>

              <View style={{height: 150}}></View>
            </ScrollView>
          </View>
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
