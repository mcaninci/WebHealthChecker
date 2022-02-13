

import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import {
 Button,

  Input,

  
  Text,

} from '@ui-kitten/components';



import { ImageOverlay } from '../../../../components/image-overlay';





//bu scroll neden çalışmıyor bak compoenent create oluyor 
//import { KeyboardAvoidingView } from './3rdparty';

// import {
//   EmailIcon
// } from '../../components/icons';

const backgroundlogin = require('../../../../../assets/images/backgrounds/image-background.jpeg');

export default function ForgotPasswordScreen(props) {
  const [email, setEmail] = React.useState();

  const onResetPasswordButtonPress = () => {
    props.navigation && props.navigation.goBack();
  };

  const ForgotScreen = () => (


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
          style={styles.forgotPasswordLabel}
          category='h4'
          status='control'>
          Forgot Password
        </Text>
        <Text
          style={styles.enterEmailLabel}
          status='control'>
          Please enter your email address
        </Text>
        <View style={styles.formContainer}>
          <Input
            status='control'
            placeholder='Email'
           // accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Button
          style={styles.signInButton}
       
          size='giant'
          onPress={onResetPasswordButtonPress}>
          RESET PASSWORD
        </Button>
      </View>


  );


  return (
    <>
         <ImageOverlay
    style={{width: '100%', height: '100%'}}
    source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}>
        <ForgotScreen />
        </ImageOverlay>
    </>
  );




};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    backgroundColor:'#01010a',
    borderColor:'#01010a',
    marginBottom:50
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
    minWidth:300
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 24,
    
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 64,
    minWidth:300
  },
});
