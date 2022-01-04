import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch, useSelector} from 'react-redux';
import { strToHes } from '../../helper/stringHelper';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'react-native-admob'
export default function HomeScreen({ isExtended, setIsExtended }) {
  const auth = useSelector((state) => {return state.auth;});
    const {isAuthenticated, user} = auth?auth:{"isAuthenticated":false,user:{}};

    dispatch = useDispatch();
    const onFailToRecieveAd = (error) => console.log(error);


  return (
    <View style={styles.container}>
     
    
        <View style={styles.sectionHes}>
        
        <Text size={20}   style={styles.title}>
         HES Kodu : 
          </Text>
        
       
          <Text size={20} bold  style={styles.title}>
         {strToHes(user.hescode)}
          </Text>
    
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
        <QRCode
       size={300}
      value={"1234|"+user.hescode}
    />
         
        </View>
   
        {/* <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-4354964663705097/6537124315"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={onFailToRecieveAd}
/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
    width:'100%'
  },
  section: {
    flex: 1,
 marginTop:-400,

    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHes: {
    flex: 1,
    marginTop:-300,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft:20
  },
  sectionLarge: {
    flex: 1,
    marginHorizontal: -400,
    justifyContent: 'center',
  },
 

 
  title: {
    marginTop: 10,
    color:'#50ad33'
  }

});
