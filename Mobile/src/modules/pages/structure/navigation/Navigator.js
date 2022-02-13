import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { 
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import LoginScreen from '../../authenticationAndAuthorization/login/LoginView';
import drawerData from './drawerNavigationData';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../../redux/actions/authActions';
const iconSettings = require('../../../../../assets/images/drawer/settings.png');
import { colors } from '../../../../styles';
import { ImageOverlay } from '../../../../components/image-overlay';

const Drawer = createDrawerNavigator();
let dispatch={} ;
let userDetailData={};
let userData={};

function CustomDrawerContent(props) {
  return (
    <ImageOverlay
    style={styles.container}
    source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}>
<DrawerContentScrollView {...props} style={{padding: 0}}>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx+1}`}
          label={() => (
            <View
              style={styles.menuLabelFlex}>
              <Image
                style={{ width: 20, height: 20,tintColor: colors.white}}
                source={item.icon}
              />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}
      <View style={styles.divider} />
    </DrawerContentScrollView>
    </ImageOverlay>
  );
}

export default function App() {
  const auth = useSelector((state) => {return state.auth;});
  const {isAuthenticated, userDetail,user} = auth?auth:{"isAuthenticated":false,userDetail:{},user:{}};
 userDetailData=userDetail;
 userData=user;
  dispatch = useDispatch();


return (

  <Drawer.Navigator
    drawerStyle={{
  backgroundColor: 'transparent' 
    }}
    drawerContent={props =>{ 
   
  return  (<CustomDrawerContent {...props} />);
    } }
  >
<Drawer.Screen   
    name="Login" component={ NavigatorView} />
  </Drawer.Navigator>

);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
