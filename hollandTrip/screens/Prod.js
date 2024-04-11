import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native';
//import {Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';

const Prod = ({navigation, route}) => {
  const [idfa, setIdfa] = useState(route.params?.idfa);
  console.log('Prod Screen==>', idfa);

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
      await AsyncStorage.setItem('Prod', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Prod');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData in Prod==>', parsedData);
        setIdfa(parsedData.idfa);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  //// кастомний юзерагент
  const deviceInfo = {
    deviceBrand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceModel: DeviceInfo.getModel(),
    deviceSystemName: DeviceInfo.getSystemName(),
    deviceSystemVersion: DeviceInfo.getSystemVersion(),
  };

  const customUserAgent = `Mozilla/5.0 (${deviceInfo.deviceSystemName}; ${deviceInfo.deviceModel}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1`;
  //console.log(customUserAgent);
  useEffect(() => {
    WebView.userAgent = customUserAgent;
  }, []);
  // https://invoices.cryptoprocessing.com/invoice
  // https://rizzcasino.com/en/cashier/deposit
  //
  const urlProd = `https://excellent-regal-joy.space/rKtP8fwP?advertising_id=${idfa}`;
  const refWebview = useRef(null);

  //ф-ція для повернення назад
  const goBackBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPageBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };

  const [redirectUrl, setRedirectUrl] = useState('');

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    console.log('NavigationState: ', url);
    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(
        `https://excellent-regal-joy.space/rKtP8fwP?advertising_id=${idfa}`,
      );
    } else if (
      url.includes('https://interac.express-connect.com/cpi?transaction=')
    ) {
      setRedirectUrl(
        `https://terrific-glorious-delight.space/8qGjYgjH?advertising_id=${idfa}`,
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191d24'}}>
      <WebView
        userAgent={customUserAgent}
        originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
        ]}
        onShouldStartLoadWithRequest={event => {
          const {url} = event;
          console.log('Click==>', url);
          if (url.startsWith('mailto:')) {
            Linking.openURL(url);
            return false;
          } else if (
            url.startsWith('https://m.facebook.com/') ||
            url.startsWith('https://www.facebook.com/') ||
            url.startsWith('https://www.instagram.com/') ||
            url.startsWith('https://twitter.com/') ||
            url.startsWith('https://www.whatsapp.com/') ||
            url.startsWith('https://t.me/')
          ) {
            Linking.openURL(url);
            return false;
          } else if (
            url.includes('bitcoin') ||
            url.includes('litecoin') ||
            url.includes('dogecoin') ||
            url.includes('tether') ||
            url.includes('ethereum') ||
            url.includes('bitcoincash')
          ) {
            return false;
          } else if (url === 'https://zumospin.com/') {
            refWebview.current.injectJavaScript(
              `window.location.href = '${redirectUrl}'`,
            );
            return false;
          } else if (
            url.includes('https://www.luckyelfcasino.com/?identifier=')
          ) {
            refWebview.current.injectJavaScript(
              `window.location.href = '${redirectUrl}'`,
            );
            return false;
          } else if (url === 'https://b7casino.com/') {
            refWebview.current.injectJavaScript(
              `window.location.href = '${redirectUrl}'`,
            );
            return false;
          } else if (url === 'https://brunocasino.com/') {
            refWebview.current.injectJavaScript(
              `window.location.href = '${redirectUrl}'`,
            );
            return false;
          } else {
            return true;
          }
        }}
        onNavigationStateChange={handleNavigationStateChange}
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        source={{uri: urlProd}}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{flex: 1, marginBottom: 7}}
        ref={refWebview}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: -10,
        }}>
        <TouchableOpacity
          style={{marginLeft: 40}}
          onPress={() => {
            goBackBtn();
          }}>
          <AntDesign name="left" style={{color: '#fff', fontSize: 20}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={() => {
            reloadPageBtn();
          }}>
          <AntDesign name="reload1" style={{color: '#fff', fontSize: 20}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Prod;
