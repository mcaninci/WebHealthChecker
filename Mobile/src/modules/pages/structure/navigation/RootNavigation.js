import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image,View, StyleSheet, TouchableOpacity } from 'react-native';

import StackNavigationData from './stackNavigationData';
import StackLoginNavigationData from './stackLoginNavigationData';
import { colors } from '../../../../styles';
const Stack = createStackNavigator();
import {useDispatch, useSelector} from 'react-redux';
export default function NavigatorView(props) {


  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
        
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Image
          source={require('../../../../../assets/images/drawer/menu.png')}
          resizeMode="contain"
          style={{
            height: 20,
          }}
        />
      </TouchableOpacity>    
    )
  }

  const loggedInMenu = () => {
   
     var menus= StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={{
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerRight: item.headerRight ?item.headerRight:null,
            headerStyle: {
               backgroundColor:colors.headerColor
             
           
            },
            headerTitleStyle: item.headerTitleStyle,

          }} 
          
        />
      ));
    return menus;
  }


 
//  const auth = useSelector((state) => { return state.auth;});
//  const {isAuthenticated, user} = auth?auth:{"isAuthenticated":false,user:{}};


  let navigatepage;
  // if (isAuthenticated) //TODOauth istrue
  // {
    navigatepage=  loggedInMenu();


  return (


   
   <Stack.Navigator {...props} screenOptions={{headerShown: true}} >
  
  {navigatepage}

    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: Header.height,
  },
});
