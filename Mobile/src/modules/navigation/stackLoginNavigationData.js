
import LoginScreen from '../login/LoginView';


import { colors, fonts } from '../../styles';



const headerBackground = require('../../../assets/images/topBarBg.png');

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
  

  

]

export default StackLoginNavigationData;
