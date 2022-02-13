
import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Linking } from 'react-native';
import { Button, Input, Text, Icon } from '@ui-kitten/components';

import { useDispatch } from 'react-redux';
import { userLogin } from '../../../../services/api/users'
import { ImageOverlay } from '../../../../components/image-overlay';


// import { AuthProvider, useAuthData } from '../../components/context/AuthContext';
//bu scroll neden çalışmıyor bak compoenent create oluyor 
//import { KeyboardAvoidingView } from './3rdparty';

//Redux actions

import { login, register, loadUser } from '../../../../redux/actions/authActions';
import { SocialIcon } from 'react-native-elements';
import {
  FacebookIcon, Linkedin, TwitterIcon, PersonIcon, EyeIcon, EyeOffIcon
} from '../../../../components/icons';

const backgroundlogin = require('../../../../../assets/images/backgrounds/image-background.jpeg');

export default function LoginScreen(props) {

  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);



  const onSignInButtonPress = async function () {

    if (email == "" || password == "") {
      Alert.alert(
        "Please enter username and password",
      );
      return;
    }
    else {

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        Alert.alert(
          "Please enter valid email",
        );
        return;
      }

    }
 
    try {
      userLogin({ email, password }, (res) => {
        if (res.isSuccess) {
          var value = res.value;
          dispatch(login({ email, password, token: 'value.token' }));
        }
        else {
          Alert.alert(
            "Warning",
            "The username or password is incorrect."
          );
        }

      });


    } catch (e) {
      debugger;

      console.log({ state: true, message: "Invalid credentials", type: "error" });
      Alert.alert(
        "Error",
        "Operation Failed.Plese try again.",
        // [
        //   {
        //     text: "Ask me later",
        //     onPress: () => console.log("Ask me later pressed")
        //   },
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //     style: "cancel"
        //   },
        //   { text: "OK", onPress: () => console.log("OK Pressed") }
        // ]
      );


    }

  };

  const onSignUpButtonPress = () => {
    props.navigation && props.navigation.navigate('Signup');
  };

  const onForgotPasswordButtonPress = () => {
    props.navigation && props.navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = () => {

    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props) => (
    <TouchableOpacity activeOpacity={1.0} onPress={onPasswordIconPress}>
      {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
    </TouchableOpacity>
  );


  return (
    <>

      <ImageOverlay
        style={{ width: '100%', height: '100%' }}
        source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


          <View style={styles.headerContainer}>
            <Text
              category='h4'
              status='control'>
              Welcome to SocialID.Network
            </Text>

            <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              Sign in to your account
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              status='control'
              placeholder='Email'
              accessoryRight={PersonIcon}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              style={styles.passwordInput}
              status='control'
              placeholder='Password'
              accessoryRight={renderPasswordIcon}
              value={password}
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance='ghost'
                status='control'
                onPress={onForgotPasswordButtonPress}>
                Forgot your password?
              </Button>
            </View>
          </View>
          <Button
            style={styles.signInButton}
            size='giant'
            onPress={onSignInButtonPress}>
            SIGN IN
          </Button>
          <View style={styles.socialAuthContainer}>
            {/* <Text
      style={styles.socialAuthHintText}
      status='control'>
      Or Sign In using Social Media
    </Text> */}
            <View style={styles.socialAuthButtonsContainer}>

              <SocialIcon
                bgColor='red'
                fgColor='red'
                onPress={() => Linking.openURL('https://www.youtube.com/channel/UCOrb3xwN6g3xevTSsbX1WNg')}
                type='youtube'
              />
              <SocialIcon
                bgColor='red'
                fgColor='red'
                onPress={() => Linking.openURL('https://www.youtube.com/channel/UCOrb3xwN6g3xevTSsbX1WNg')}
                type='linkedin'
              />
              <SocialIcon
                bgColor='red'
                fgColor='red'
                onPress={() => Linking.openURL('https://www.youtube.com/channel/UCOrb3xwN6g3xevTSsbX1WNg')}
                type='twitter'
              />

            </View>
          </View>
          <Button
            style={styles.signUpButton}
            appearance='ghost'
            status='control'
            onPress={onSignUpButtonPress}>
            Don't have an account? Sign Up
          </Button>

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
    backgroundColor:'#01010a',
    borderColor:'#01010a'
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
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});