import React from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';

const HollandScreen = () => {
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

export default HollandScreen;
