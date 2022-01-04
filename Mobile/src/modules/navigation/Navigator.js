import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { 
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import LoginScreen from '../login/LoginView';
import drawerData from './drawerNavigationData';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions/authActions';
const iconSettings = require('../../../assets/images/drawer/settings.png');
const iconBlog = require('../../../assets/images/drawer/blog.png')
import { ImageOverlay } from '../../components/image-overlay';

const Drawer = createDrawerNavigator();
let dispatch={} ;
function CustomDrawerContent(props) {
  return (
    <ImageOverlay
    style={styles.container}
    source={require('../../../assets/images/pages/login/image-background.jpeg')}>
<DrawerContentScrollView {...props} style={{padding: 0}}>

      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx+1}`}
          label={() => (
            <View
              style={styles.menuLabelFlex}>
              <Image
                style={{ width: 20, height: 20}}
                source={item.icon}
              />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconBlog}
            />
            <Text style={styles.menuTitle}>Bağış Yap</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Bağış Yap')}
      />
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconSettings} 
            />
            <Text style={styles.menuTitle}>Hes Kodu Güncelle</Text>
          </View>
        )}
        onPress={() =>   {props.navigation.navigate('HES Kodu Güncelleme');  } }
      />
    </DrawerContentScrollView>
    </ImageOverlay>
  );
}
//logout dispatchde props.navigation.navigate('Login'); bununla render ettirmiş oldum tekrardan :D

function LoginDrawerContent(props) {
  //this background image is drawer menu backgroun
  return (
    <ImageOverlay
    style={styles.container}
    source={require('../../../assets/images/pages/login/image-background.jpeg')}>
  
  
         <DrawerContentScrollView {...props} >
  <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconSettings} 
            />
            <Text style={styles.menuTitle}>About Us</Text>
          </View>
        )}
        onPress={() =>  props.navigation.navigate('login') }
      />
    </DrawerContentScrollView>
    </ImageOverlay>
     
  );
}

export default function App() {
  const auth = useSelector((state) => {return state.auth;});
    const {isAuthenticated, user} = auth?auth:{"isAuthenticated":false,user:{}};
    dispatch = useDispatch();


  return (

    <Drawer.Navigator
      drawerStyle={{
    backgroundColor: 'transparent' 
      }}
      drawerContent={props =>{  if (isAuthenticated) //TODOauth istrue
        {
      return    <CustomDrawerContent {...props} />;
        }
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
