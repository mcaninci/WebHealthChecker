import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import StackNavigationData from './stackNavigationData';
import StackLoginNavigationData from './stackLoginNavigationData';

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
          source={require('../../../assets/images/drawer/menu.png')}
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
            headerStyle: {
              backgroundColor: '#50ad33',
             
           
            },
            headerTitleStyle: item.headerTitleStyle,
          }} 
        />
      ));
    return menus;
  }

  const loginMenu = () => {
   
    var menus= StackLoginNavigationData.map((item, idx) => (
       <Stack.Screen
  
         key={`stack_item-${idx+1}`}
         name={item.name} 
         component={item.component} 
         options={{
          headerLeft:null,
    
          headerStyle: {
            backgroundColor: '#50ad33',
           
         
          },
           headerTitleStyle: item.headerTitleStyle,
         }} 
       >      
     
     
         </Stack.Screen>
     ));
   return menus;
 }
 const auth = useSelector((state) => { return state.auth;});
 const {isAuthenticated, user} = auth?auth:{"isAuthenticated":false,user:{}};


  let navigatepage;
  if (isAuthenticated) //TODOauth istrue
  {
    navigatepage=  loggedInMenu();
  }else{

    navigatepage= loginMenu();
  }

  return (


   
   <Stack.Navigator >
  
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
