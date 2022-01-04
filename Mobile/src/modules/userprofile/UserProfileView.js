

import React, { ReactElement } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
Button,
  CheckBox,
  Input,
  StyleService,
  
  Text,
  useStyleSheet,
  Icon
} from '@ui-kitten/components';

import { LabelInput } from '../../components/LabelInput';
import { ImageOverlay } from '../../components/image-overlay';
import { ProfileAvatar } from '../../components/ProfileAvatar';





//bu scroll neden çalışmıyor bak compoenent create oluyor 
//import { KeyboardAvoidingView } from './3rdparty';

import {
  CameraIcon, PlusIcon, EmailIcon
} from '../../components/icons';

const backgroundlogin = require('../../../assets/images/pages/login/image-background.jpeg');

export default function UserProfileScreen(props) {

  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);


  const renderPhotoButton = () => (
    <Button style={styles.editAvatarButton} size='small' accessoryRight={PlusIcon} />
  );
  const onDoneButtonPress = () => {
    props.navigation && props.navigation.goBack();
  };


  const UserProfileScreen = () => (

 <View style={{padding:10}}>
    <ProfileAvatar
      style={styles.profileAvatar}
      source={require('../../../assets/images/drawer/user.png')}
      editButton={renderPhotoButton}
    />
     <LabelInput
 style={[styles.profileSetting]}
       status='control'
       autoCapitalize='none'
       placeholder='First Name'
       hint='First Name'
     
       value={'heimdall'}
       onChangeText={setUserName}
     />
      <LabelInput
    
    style={[styles.profileSetting]}
       status='control'
       autoCapitalize='none'
       placeholder='Last Name'
       hint='Last Name'
     
       value={'ragnorok'}
       onChangeText={setUserName}
     />
 <LabelInput
   style={[styles.profileSetting]}
       status='control'
       autoCapitalize='none'
       placeholder='Gender'
       hint='Gender'
       value={'Male'}
       onChangeText={setUserName}
     />

 <LabelInput
     style={[styles.profileSetting]}
            status='control'
            autoCapitalize='none'
            placeholder='Age'
            hint='Age'
            value={'24'}
            onChangeText={setUserName}
          />
     <LabelInput
      style={[styles.profileSetting,styles.section]}
            status='control'
            autoCapitalize='none'
            placeholder='Email'
            hint='Email'
            value={'heimdall@asgard.com'}
            onChangeText={setUserName}
          />

       <LabelInput
style={[styles.profileSetting]}
            status='control'
            autoCapitalize='none'
            placeholder='Phone Number'
            hint='Phone Number'
            value={'+958 445 55 66'}
            onChangeText={setUserName}
          />
    <Button
      style={styles.doneButton}
      onPress={onDoneButtonPress}>
      DONE
    </Button>
    </View>
 

  );


  return (
    <>
       <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}>
    <ImageOverlay
    style={{width: '100%', height: '100%'}}
    source={require('../../../assets/images/pages/login/image-background.jpeg')}>
        <UserProfileScreen />
        </ImageOverlay>
        </ScrollView>
    </>
  );




};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    width: '100%', height: '100%',
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 0,
    marginBottom:20
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});