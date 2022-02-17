import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Linking,
  Dimensions,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  Text,
  Button,
  StyleService,
  CheckBox,
  Input,
  useStyleSheet,
  Icon, Divider, RadioGroup, Radio
} from '@ui-kitten/components';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ImageOverlay } from '../../../../components/image-overlay';

import { useDispatch, useSelector } from 'react-redux';

import { userGet } from '../../../../services/api/users';





import { login, setUserDetail } from '../../../../redux/actions/authActions';

export default function SaveUrlView(props) {
  const netInfo = useNetInfo();
  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user } = auth ? auth : { "isAuthenticated": false, user: {} };


  const [userData, setuserData] = React.useState({});

  const dispatch = useDispatch();


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const useInputState = (initialValue = '') => {
    const [urls, setURLS] = React.useState(initialValue);
    return { urls, onChangeText: setURLS };
  };
  const multilineInputState = useInputState();


  const registerUser = () => {
    //this method is used to register user information at server in background.It's a tempory login method.
    // // userRegister(user.token, res => {
    // //   if (res.isSuccess) {
    // //     if (Object.getOwnPropertyNames(userData).length == 0) {
    // //       var userobject = {
    // //         userName: res.value.name + " " + res.value.surname,
    // //         userSocial: { instagram: res.value.instagram, twitter: res.value.twitter, linkedin: res.value.linkedIn },
    // //         userVerify: res.value.isVerify,
    // //         verifyLinkQR: "http://localhost:3000/#/verify/" + res.value.hashCode,
    // //         userImg: res.value.image,
    // //         referanceCode: res.value.referenceCode,
    // //         accountType: res.value.userType == 1 ? 'Diamond' : res.value.userType == 2 ? 'Gold' : res.value.userType == 3 ? 'Silver' : res.value.userType == 4 ? 'Bronz' : 'Unknow'
    // //       };
    // //        let userImage=''+userobject.userImg;
    // //       setuserImg(userImage);
    // //       if(userobject.accountType=='Diamond'){
    // //         setAccountIcon(require('../../../../../assets/images/pages/identity/diamond.png'));
    // //       }
    // //      else if(userobject.accountType=='Gold'){
    // //       setAccountIcon( require('../../../../../assets/images/pages/identity/gold.png'));
    // //       }
    // //       else if(userobject.accountType=='Silver'){
    // //         setAccountIcon(  accountIcon=   require('../../../../../assets/images/pages/identity/silver.png'));
    // //       }
    // //       else if(userobject.accountType=='Bronz'){
    // //         setAccountIcon(  accountIcon=   require('../../../../../assets/images/pages/identity/bronz.png'));
    // //       }
    // //       dispatch(setUserDetail(userobject));
    // //       setuserData(userobject);


    // //     }
    // //   } else {
    // //     console.log(res.data);
    // //   }
    // });

  }

  checkConnectionandRegister = () => {
    var breakFlag = false;
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        registerUser();
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

  useEffect(() => {
    if (Object.getOwnPropertyNames(userData).length == 0) {
      // getUserDetail();

    }
    checkConnectionandRegister();
  }, [userData]);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const saveUrls = () => {
    if (multilineInputState.urls == "" || multilineInputState.urls == undefined) {
      Alert.alert(
        "Please enter web site urls",
      );
    }
    else {
      Alert.alert(
        "web site urls" + JSON.stringify(multilineInputState.urls) + " datetime " + date
      );
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


  var btnextr = show || Platform.OS=="android" ? { marginTop: 0 } : { marginTop: 120 };

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
              <Button style={styles.signInButton} onPress={saveUrls} >
                Save Urls
              </Button>
            </View>









          </View>


        </View>


      </ImageOverlay>
    </View>
  );
}


const styles = StyleService.create({

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