import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {Dimensions} from 'react-native';

const OtherWorldScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //console.log(windowHeight, windowWidth);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/bgr3.jpeg')}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 200, height: 300}}
            //source={require('../assets/download.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default OtherWorldScreen;
