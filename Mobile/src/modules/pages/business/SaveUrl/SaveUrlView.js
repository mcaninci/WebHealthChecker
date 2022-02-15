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
  Icon, Divider
} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ImageOverlay } from '../../../../components/image-overlay';

import { useDispatch, useSelector } from 'react-redux';

import { userGet } from '../../../../services/api/users';
// const verifed = require('../../../../components/iconsvg/verifiedimg.png');
// const shareios = require('../../../../components/iconsvg/shareios.png');
// const shareandroid = require('../../../../components/iconsvg/shareandroid.png');




import { login, setUserDetail } from '../../../../redux/actions/authActions';

export default function SaveUrlView(props) {

  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user } = auth ? auth : { "isAuthenticated": false, user: {} };
  // const [accountIcon, setAccountIcon] = React.useState(require('../../../../../assets/images/pages/identity/diamond.png'));

  const [userData, setuserData] = React.useState({});

  const dispatch = useDispatch();
 
 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const useInputState = (initialValue = '') => {
    const [urls, setURLS] = React.useState(initialValue);
    return { urls, onChangeText: setURLS };
  };
  const multilineInputState = useInputState();

  const getUserDetail = () => {
    //burası loginden dönen toke ve hashid ile yapılacak
    // // userGet(user.token, res => {
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

  useEffect(() => {
    if (Object.getOwnPropertyNames(userData).length == 0) {
      // getUserDetail();

    }

  }, [userData]);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const saveUrls=()=>{
    if (multilineInputState.urls== ""|| multilineInputState.urls==undefined){
    Alert.alert(
      "Please enter web site urls",
    );
  }
  else {
    Alert.alert(
      "web site urls"+JSON.stringify(multilineInputState.urls)+" datetime "+date
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

    setMode(currentMode);
  };


  const showTimepicker = () => {
    showMode('time');
  };




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
              textStyle={{ minHeight: 60 ,maxHeight:120}}
              {...multilineInputState}
            />

          </View>
          <View style={styles.container}>
            <View style={styles.container}>
              <Text style={styles.Urltext}>Selected Checker Schedule Time : {date.getHours() + ":" + date.getMinutes()}</Text>
              <View style={styles.container}>
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
                    style={{ backgroundColor: 'white', width: 200, height: 200, marginBottom: 10 }}
                  />
                )}
                <Button style={styles.signInButton}
                  onPress={showTimepicker} >
                  Set Schecule Time
                </Button>
                <Text style={styles.Urltext}>These URLs are checked every day at {date.getHours() + ":" + date.getMinutes()}  by the web health checker.</Text>

              </View>


            </View>


            <Button style={styles.signInButton} onPress={saveUrls} > 
              Save Urls
            </Button>
            <Divider style={{ backgroundColor: 'white', marginTop: 10, height: 5 }} />
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
    marginTop: 15,
    flex: 1,
    justifyContent: 'space-between'
  },
  Urltext: {
    color: 'white', justifyContent: 'center', alignItems: 'center',
    marginTop: 40, maxWidth: 300,
  },
  urlinput: {
    minWidth: 250,
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }

});