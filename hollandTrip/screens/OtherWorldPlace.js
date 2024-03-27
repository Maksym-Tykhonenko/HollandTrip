import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {holandPlaces} from '../data/holandPlaces';
import {SafeAreaView} from 'react-native-safe-area-context';

const OtherWorldPlace = ({navigation, route}) => {
  console.log(route.params.place.name);
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
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 40, fontFamily: 'Chewy-Regular'}}>
              OtherWorldPlace
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
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

export default OtherWorldPlace;
