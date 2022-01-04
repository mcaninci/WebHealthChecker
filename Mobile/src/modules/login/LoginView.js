
import React, { ReactElemen } from 'react';
import { StyleSheet, View ,Platform} from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

import { useDispatch, useSelector } from 'react-redux';

import { ImageOverlay } from '../../components/image-overlay';
import { strToHes } from '../../helper/stringHelper';

import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
//Redux actions

import { login } from '../../redux/actions/authActions';


const backgroundlogin = require('../../../assets/images/pages/login/image-background.jpeg');

export default function LoginScreen(props) {

  const dispatch = useDispatch();
  const auth = useSelector((state) => { return state.auth; });
  let defaultValue = "";
  let defaultValuePdf = null;
  let defaultValueHes = null;
  const { isAuthenticated, user } = auth ? auth : { "isAuthenticated": false, user: {} };

  if (isAuthenticated) {
    defaultValue = strToHes(user.hescode);
    defaultValuePdf = user.asikarti;
    defaultValueHes=user.hescodeSS;
  }


  const [hescode, sethescode] = React.useState(defaultValue);
  const [hesAsiSS, setHesAsiSS] = React.useState(defaultValueHes);
  const [asikarti, setAsikarti] = React.useState(defaultValuePdf);






  const onSignInButtonPress = function () {
   
 
    var replacedstr = hescode.replace(/-/g, '');
   
    dispatch(login({ hescode:replacedstr, asikarti,hesAsiSS }));
    if (isAuthenticated)
      props.navigation && props.navigation.goBack();

  };

  const onfileload = async function () {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
   
      if(Platform.OS === 'android'){
        RNFetchBlob.fs
        .readFile(  res.uri, 'base64')
        .then((data) => {
         data;
          setAsikarti({ uri: res.uri, name: res.name,baseData:data });
          console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size,
          );
        }).catch((err) => {});
      }else{

        setAsikarti({ uri: res.uri, name: res.name });
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
      }
      
   
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  };

  
  const onHesfileload = async function () {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setHesAsiSS({ uri: res.uri, name: res.name });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  };

var backgorunimage=Platform.OS === 'ios'?require('../../../assets/images/pages/login/image-backgroundios.jpeg'):require('../../../assets/images/pages/login/image-background.jpeg');
 
  return (
    <>

      <ImageOverlay
        style={{ width: '100%', height: '100%' }}
        source={backgorunimage}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


          <View style={styles.headerContainer}>

            <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              Hes kodunuzu ve aşı kartınızı aşağıdan yükleyebilirsiniz.
            </Text>
          </View>
         
          <View style={styles.formContainer}>
            <Input
              status='control'
              placeholder='Hes Kodu'
      
              value={hescode}
              onChangeText={sethescode}
            />
            {/* <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              YA DA
            </Text>
            {hesAsiSS != null ? <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
             HES Kodu Ekran Görüntsü : {hesAsiSS.name}
            </Text>: <></>}
            <Button
              style={styles.signInButton}
              size='giant'
              onPress={onHesfileload}>
              HES Kodu Ekran Görüntüsü Yükle
            </Button> */}
          </View>
          
          <View style={styles.formContainer}>
            {asikarti != null ? <Text
              style={[styles.signInLabel,{marginBottom:14,alignItems: 'center'}]}
              category='s1'
              status='control'>
              Aşı Kartı : {asikarti.name}
            </Text>: <></>}
          
              <Button
                style={styles.signInButton}
                size='giant'
                onPress={onfileload}>
                Aşı Kartı Yükle
              </Button>
           

          </View>

          <View style={styles.socialAuthButtonsContainer}>
            <Button
            
              style={styles.signInButton}
              size='giant'
              onPress={onSignInButtonPress}>
              
              <Text
              style={styles.signInLabel}
             >
           Kaydet
            </Text>
            </Button>
          </View>




        </View>
      </ImageOverlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    minWidth: 300
  },
  signInLabel: {
    marginTop: 16,

  },
  passwordInput: {
    marginTop: 16,
    minWidth: 300

  },
  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    backgroundColor: '#50ad33'
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 100
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});