import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import UrlUpdate from '../../business/UrlUpdate/UrlUpdateViewContainer';
import Monitoring from '../../business/SaveUrl/SaveUrlViewContainer';

import TabNavigator from './MainTabNavigator';
import LoginScreen from '../../authenticationAndAuthorization/login/LoginViewContainer';
import { colors, fonts } from '../../../../styles';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../../../assets/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>    
  )
}

const headerBackground = require('../../../../../assets/images/backgrounds/image-background.jpeg');

const StackNavigationData = [
  {
    name: 'Web Health Checker',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    } ,

  },
  {
    name: 'UrlUpdate',
    component: UrlUpdate,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

]

export default StackNavigationData;
