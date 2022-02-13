

import React, { ReactElement } from 'react';
import { StyleSheet, View, TouchableOpacity,Alert,ScrollView } from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  StyleService,

  Text,
  useStyleSheet,
  Icon
} from '@ui-kitten/components';
import termstext from './terms'

import { ImageOverlay } from '../../../../components/image-overlay';
import { ProfileAvatar } from '../../../../components/ProfileAvatar';

import { userRegister } from '../../../../services/api/users'
import {
  Linkedin, Instagram, TwitterIcon, PersonIcon, PlusIcon, EmailIcon, EyeIcon, EyeOffIcon,IdentityIcon
} from '../../../../components/icons';

import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker'
const pp = require('../../../../../assets/images/pages/profilepic.jpg');
const backgroundlogin = require('../../../../../assets/images/backgrounds/image-background.jpeg');

export default function Signupcreen(props) {

  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [referanceCode, setReferanceCode] = React.useState();
  const [password, setPassword] = React.useState();
  const [repassword, setRePassword] = React.useState();
  const [linkedin, setLinkedin] = React.useState();
  const [twitter, setTwitter] = React.useState();
  const [instagram, setInstagram] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [profilePhoto, setprofilePhoto] = React.useState();
  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {

    userRegister({userName:userName,email:email,password:password,social:{instagram:instagram,linkedin:linkedin,twitter:twitter},profilePhoto:profilePhoto,accountType:3}, (res) => {

      if (res.isSuccess) {
        props.navigation && props.navigation.goBack();
      }
      else {
        Alert.alert(res.message);
      } 
    });


  };

  const onSignInButtonPress = () => {
    props.navigation && props.navigation.goBack();
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onSelectPhotoButtonPress = async () => {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (Platform.OS === 'android') {
        RNFetchBlob.fs
          .readFile(res.uri, 'base64')
          .then((data) => {

            setprofilePhoto({ uri: res.uri, name: res.name, baseData: data });
            // setAsikarti({ uri: res.uri, name: res.name,baseData:data });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size,
            );
          }).catch((err) => { });
      } else {
       var filename="";
        if (Platform.OS === 'ios') {
          filename = res.uri.replace('file:', '')
    } 
        RNFetchBlob.fs
          .readFile(filename, 'base64')
          .then((data) => {
debugger;
            setprofilePhoto({ uri: res.uri, name: res.name, baseData: data });
            // setAsikarti({ uri: res.uri, name: res.name,baseData:data });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size,
            );
          }).catch((err) => { });
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

  const renderPhotoButton = () => (

    <TouchableOpacity style={styles.editAvatarButton} activeOpacity={1.0} onPress={onSelectPhotoButtonPress}>
<PlusIcon style={styles.editAvatarButton}  ></PlusIcon>
    </TouchableOpacity>
  
  );

  const renderPasswordIcon = (props) => (

    <TouchableOpacity  activeOpacity={1.0} onPress={onPasswordIconPress}>
{passwordVisible ?   <EyeOffIcon/>  :  <EyeIcon/>   }
    </TouchableOpacity>
  );

  const onTermsPress = () => {
    Alert.alert('Terms & Conditions',termstext);
  };
  const renderCheckboxLabel = React.useCallback(evaProps => (
    <TouchableOpacity   onPress={onTermsPress}>
    <Text {...evaProps} style={styles.termsCheckBoxText}  >
      I read and agree to Terms & Conditions 
    </Text>
    
     </TouchableOpacity>
  ), []);


  return (
    <>
      <ImageOverlay
        style={{ width: '100%', height: '100%' }}
        source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}>

<ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.headerContainer}>
            <ProfileAvatar
              status='control'
           base64={true}
              style={styles.profileAvatar}
              resizeMode='center'
              source={profilePhoto ? {uri:  "data:image/png;base64,"+profilePhoto?.baseData } : pp}
              //  source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}
              editButton={renderPhotoButton}
            />
          </View>
          <View style={styles.formContainer}>
            <Input
              status='control'
              autoCapitalize='none'
              placeholder='User Name'
              accessoryRight={PersonIcon}
              value={userName}
              onChangeText={setUserName}
            />
            <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              placeholder='Email'
              accessoryRight={EmailIcon}
              value={email}
              onChangeText={setEmail}
            />
                  <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              placeholder='Reference User Code'
              accessoryRight={IdentityIcon}
              value={referanceCode}
              onChangeText={setReferanceCode}
            />
            <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              placeholder='Instagram'
              accessoryRight={Instagram}
              value={instagram}
              onChangeText={setInstagram}
            />

            <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              placeholder='Twitter'
              accessoryRight={TwitterIcon}
              value={twitter}
              onChangeText={setTwitter}
            />
            <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              placeholder='Linkedin'
              accessoryRight={Linkedin}
              value={linkedin}
              onChangeText={setLinkedin}
            />
            <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              secureTextEntry={!passwordVisible}
              placeholder='Password'
              accessoryRight={renderPasswordIcon}
              value={password}
              onChangeText={setPassword}
            />
            <Input
              style={styles.formInput}
              status='control'
              autoCapitalize='none'
              secureTextEntry={!passwordVisible}
              placeholder='RePassword'
              accessoryRight={renderPasswordIcon}
              value={repassword}
              onChangeText={setRePassword}
            />
            <CheckBox
              style={styles.termsCheckBox}
              checked={termsAccepted}
              onChange={(checked) => setTermsAccepted(checked)}>
              {renderCheckboxLabel}
            </CheckBox>
          </View>
          <Button
            style={styles.signUpButton}
            size='giant'
            onPress={onSignUpButtonPress}
          >
            SIGN UP
          </Button>

          <Button
            style={styles.signInButton}
            appearance='ghost'
            status='control'
            onPress={onSignInButtonPress}
          >
            Already have account? Sign In
          </Button>
        </View>
        </ScrollView>
      </ImageOverlay>
    </>
  );




};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  profileAvatar: {
    width: 130,
    height: 130,


    overlayColor:'transparent'

  },
  editAvatarButton: {
    width: 25,
    height: 25,
    marginBottom:50,
    
   backgroundColor:'#8290a6' 
  },
  formContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-control-color',
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
    minWidth: 300,
    marginTop:15,
    backgroundColor:'#01010a',
    borderColor:'#01010a',
    
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});