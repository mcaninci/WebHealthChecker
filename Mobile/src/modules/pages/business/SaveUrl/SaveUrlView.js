import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  Platform
} from 'react-native';
import {
  Text,
  Button,
  StyleService,
  Input, Divider, RadioGroup, Radio,Spinner
} from '@ui-kitten/components';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ImageOverlay } from '../../../../components/image-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, saveUrl } from '../../../../services/api/users';





import { login } from '../../../../redux/actions/authActions';

export default function SaveUrlView(props) {
  const netInfo = useNetInfo();
  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user } = auth ? auth : { "isAuthenticated": false, user: {} };


  const [userData, setuserData] = React.useState({});

  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const useInputState = (initialValue = '') => {
    const [urls, setURLS] = React.useState(initialValue);
    return { urls, onChangeText: setURLS };
  };
  const multilineInputState = useInputState();

  const hashCode = function (s) {
    var h = 0, l = s.length, i = 0;
    if (l > 0)
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  };

  const registerUser = () => {
    //this method is used to register user information at server in background.It's a tempory login method.
    var registerData = new Date().toString() + "Salt";
    var hashcode = hashCode(registerData).toString();
    setloading(true);
    userRegister({ hashCode: hashcode }, res => {
      if (res.isSuccess) {


        dispatch(login({ token: res.value.token, hashcode: hashcode }));
        setloading(false);
      }
      else {
        console.log(res.data);
      }
    });

  }


  checkConnectionandRegister = () => {
    var breakFlag = false;
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if (!isAuthenticated) {
          registerUser();
        }

      }
      else {
        Alert.alert('Please check your internet connection and try again.', '', [{
          text: 'Try again', onPress: () => {

            checkConnectionandRegister();

          }
        }]);
      }
    });
  }
  // www.bimcelliymxdx.tk
  // ;www.bim22pazar.com
  // ;www.subegarantibbvacomtr.tk
  // ;www.b2cemllpzraksamlarr.com
  // ;www.mybijiimcelcitlykl.com
  // ;www.destekteb.tk
  // ;www.bimcell043243.com
  // ;www.bimcelleodemelwq.com
  // ;www.internetsubesi.bildirimgirisi.xyz
  // ;www.paributtansferodulleri.com
  // ;www.cpanel.ziraatbanki.info
  // ;www.denizacikv3girisvv.ml
  useEffect(() => {
    checkConnectionandRegister();
  }, [userData]);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const saveUrls = () => {
    setloading(true);
    if (multilineInputState.urls == "" || multilineInputState.urls == undefined) {
      Alert.alert(
        "Please enter web site urls",
      );
      setloading(false);
    }
    else {
      saveUrl({ Urls: multilineInputState.urls, PrefixType: selectedIndex, ScheculeTime: date }, res => {
        setloading(false);
        if (res.isSuccess) {
          var value = res.value.value;

          if (value.errorUrlCound > 0) {
            Alert.alert(value.errorUrlCound + " Urls doesnt save.Please check Urls list.");
          }
          else {
            Alert.alert("All urls saved succesfully.");
          }



        }
        else {
          Alert.alert('Oops, something wrong. The operation failed. Do you want to try again?', '', [
            {
              text: 'Try again', onPress: () => {

                saveUrls();

              }
            },
            {
              text: 'Cancel', onPress: () => {

              }
            }
          ]);
        }
      });


    }

  }

  const showMode = (currentMode) => {
    if (show) {
      setShow(false);
    }
    else {
      setShow(true);
    }
    var b =
      setMode(currentMode);
  };


  const showTimepicker = () => {
    showMode('time');
  };


  var btnextr = show || Platform.OS == "android" ? { marginTop: 0 } : { marginTop: 120 };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <ImageOverlay
        style={{ width: '100%', height: '100%' }}
        source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.headerContainer}>

            <Text style={styles.Urltext}> Web Site Urls:</Text>
            <Input style={styles.urlinput}

              placeholder='www.websiteurl.com;www.websiteurl.com'
              multiline={true}
              textStyle={{ minHeight: 60, maxHeight: 120 }}
              {...multilineInputState}
            />
            <Text style={styles.Urltext}> Web Site Prefix Select:</Text>
          </View>
          <View style={styles.containerRow}>
            <RadioGroup
              selectedIndex={selectedIndex}
              onChange={index => setSelectedIndex(index)}>
              <Radio ><Text style={styles.radio}>Don't add prefix</Text> </Radio>
              <Radio><Text style={styles.radio}> Auto add HTTP prefix</Text> </Radio>
              <Radio><Text style={styles.radio}> Auto add HTTPS prefix</Text> </Radio>
            </RadioGroup>
          </View>
          <View style={styles.container}>



            <View style={styles.containerRow}>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  dateFormat="dd-MM-yyyy HH:mm"
                  onChange={onChange}
                  themeVariant="light"
                  style={{ backgroundColor: 'white', width: 300, height: 120, marginBottom: 5 }}
                />
              )}
            </View>
            <View style={styles.containerRow}>
              <Button style={styles.signInButton}
                onPress={showTimepicker} >
                Set Schecule Time
              </Button>
 
            </View>

            <View style={[styles.containerRow, btnextr]}>
              <Text style={styles.Urltext}>These URLs are checked every day at {date.getHours() + ":" + date.getMinutes()}  by the web health checker.</Text>
              {/* // alignSelf : 'stretch'  */}
              <Divider style={{ backgroundColor: 'white', marginTop: 30, height: 5 }} />
              {loading ?     <View style={styles.loading}>
      <Spinner/>
    </View>:<Button style={styles.signInButton} onPress={saveUrls} >
                Save Urls
              </Button>}  
    
            </View>









          </View>


        </View>


      </ImageOverlay>
    </View>
  );
}


const styles = StyleService.create({
  loading: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  containerRow: {

    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },

  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    alignItems: 'center'
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
    maxHeight: 176,
    marginTop: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  Urltext: {
    color: 'white', justifyContent: 'center', alignItems: 'center',
    marginTop: 10, maxWidth: 300,
  },
  radio: {
    color: 'white', justifyContent: 'center', alignItems: 'center'
  },
  urlinput: {
    minWidth: 250,
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }

});