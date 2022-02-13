import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Linking,
  Dimensions,
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
  Icon
} from '@ui-kitten/components';
import { ImageOverlay } from '../../../../components/image-overlay';
import { SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileAvatar } from '../../../../components/ProfileAvatar';
import { userGet } from '../../../../services/api/users';
// const verifed = require('../../../../components/iconsvg/verifiedimg.png');
// const shareios = require('../../../../components/iconsvg/shareios.png');
// const shareandroid = require('../../../../components/iconsvg/shareandroid.png');
import {
  Linkedin, Instagram, TwitterIcon, PersonIcon, PlusIcon, EmailIcon, EyeIcon, EyeOffIcon, IdentityIcon, VerifiedIcon
} from '../../../../components/icons';

import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';

import { login, setUserDetail } from '../../../../redux/actions/authActions';

export default function SaveUrlView(props) {

  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user } = auth ? auth : { "isAuthenticated": false, user: {} };
  // const [accountIcon, setAccountIcon] = React.useState(require('../../../../../assets/images/pages/identity/diamond.png'));
  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [userData, setuserData] = React.useState({});
  const [userImg, setuserImg] = React.useState({});
  const dispatch = useDispatch();
  const identityview = useRef();

  const shareImage = async () => {
    console.log('share girdi');
    try {
      debugger;
      const uri = await captureRef(identityview, {
        format: 'png',
        quality: 0.8,
      });
      console.log('uri gelmeli');
      console.log('uri', uri);
      const shareResponse = await Share.open({ url: uri });
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };


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

  // if (user) {
  //   if (user.token && (!user.detail || user.detail == null)) {

  //    // getUserDetail();

  //   }
  //   else
  //   //  props.navigation && props.navigation.navigate('Login');
  // }



  return (
    <View ref={identityview} style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'transparent' }}>
      {/* <ImageOverlay
        style={{ width: '100%', height: '100%' }}
        source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}> */}

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


    <Text> Save URL</Text>   

       
        </View>
     
      {/* </ImageOverlay> */}
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    backgroundColor: '#8290a6'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
    maxHeight: 176,
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 1,
     overflow: 'hidden',
    alignSelf: 'center',
   backgroundColor:'gray',
 
    overlayColor:'transparent'
  },

  formContainer: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },

  tabBarIcon: {
    width: 45,
    height: 45,
    marginBottom: 15,
    tintColor: 'black',
  },
  tabBarIconFocused: {
    tintColor: '#00acee',
  },
  shareIcon: {
    width: 32,
    height: 32,
    marginLeft: 15,
    tintColor: 'black',
  },
  shareIconFocused: {
    tintColor: 'white',
  }
  , textName: {
    margin: 20,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  }
  , textDesc: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  textSub: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    marginTop: 8,
    marginRight: 5
  }
});