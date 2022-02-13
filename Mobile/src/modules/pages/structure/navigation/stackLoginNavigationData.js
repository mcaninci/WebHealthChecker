
import LoginScreen from '../../authenticationAndAuthorization/login/LoginView';
import Signupcreen from '../../authenticationAndAuthorization/signup/SignupView';


import ForgotPasswordScreen from '../../authenticationAndAuthorization/forgotpassword/ForgotPassword';


import { colors, fonts } from '../../../../styles';



const headerBackground = require('../../../../../assets/images/backgrounds/image-background.jpeg');

const StackLoginNavigationData = [
    {
        name: 'Login',
        component: LoginScreen,
     
        headerBackground: { source: headerBackground },
        headerTitleStyle: {
          fontFamily: fonts.primaryRegular,
          color: colors.white,
          fontSize: 18,
        }  },
    
    {
      name: 'Signup',
      component: Signupcreen,
  
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
      }
    },
    {
      name: 'ForgotPassword',
      component: ForgotPasswordScreen,
  
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
      }
    },
  

  

]

export default StackLoginNavigationData;
