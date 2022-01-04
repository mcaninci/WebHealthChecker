

import React, { ReactElement } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {
Button,
  CheckBox,
  Input,
  StyleService,
  
  Text,
  useStyleSheet,
  Icon
} from '@ui-kitten/components';


import { ImageOverlay } from '../../components/image-overlay';
import { ProfileAvatar } from '../../components/ProfileAvatar';





//bu scroll neden çalışmıyor bak compoenent create oluyor 
//import { KeyboardAvoidingView } from './3rdparty';

import {
  FacebookIcon, GoogleIcon, TwitterIcon, PersonIcon, PlusIcon, EmailIcon
} from '../../components/icons';

const backgroundlogin = require('../../../assets/images/pages/login/image-background.jpeg');

export default function Signupcreen(props) {

  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    props.navigation && props.navigation.goBack();
  };

  const onSignInButtonPress = () => {
    props.navigation && props.navigation.goBack();
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPhotoButton = () => (
    <Button style={styles.editAvatarButton} size='small' accessoryRight={PlusIcon} />
  );

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCheckboxLabel = React.useCallback(evaProps => (
    <Text {...evaProps} style={styles.termsCheckBoxText}>
      I read and agree to Terms & Conditions
    </Text>
  ), []);
  const SignupScreen = () => (



      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.headerContainer}>
        <ProfileAvatar
           status='control'
            style={styles.profileAvatar}
            resizeMode='center'
            source={require('../../../assets/images/pages/login/image-person.png')}
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
            secureTextEntry={!passwordVisible}
            placeholder='Password'
            accessoryRight={renderPasswordIcon}
            value={password}
            onChangeText={setPassword}
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
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status='control'>
            Or Register Using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              accessoryLeft={FacebookIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              accessoryLeft={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signInButton}
          appearance='ghost'
          status='control'
          onPress={onSignInButtonPress}
        >
          Already have account? Sign In
        </Button>
      </View>
 

  );


  return (
    <>
    <ImageOverlay
    style={{width: '100%', height: '100%'}}
    source={require('../../../assets/images/pages/login/image-background.jpeg')}>
        <SignupScreen />
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
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
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
    minWidth:300
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