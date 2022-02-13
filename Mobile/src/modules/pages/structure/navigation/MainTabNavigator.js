import * as React from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../../../styles';

import tabNavigationData from './tabNavigationData';
const backgrounimage=require('../../../../../assets/images/backgrounds/image-background.jpeg');
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator tabBarOptions={{style: {height: Platform.OS === 'ios' ? 90 : 50,  backgroundColor:colors.tabColor}}}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen 
          key={`tab_item${idx+1}`}
          name={item.name}
          component={item.component}
          options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
            
              <Image
                resizeMode="contain"
                source={item.icon}
                style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => <Text style={{ fontSize: 12, color: focused ? colors.tabIconFocusColor : colors.tabIconColor }}>{item.name}</Text>,
        }}
        />        
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.tabIconColor,
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
    tintColor: colors.tabIconColor,
  },
  tabBarIconFocused: {
    tintColor: colors.tabIconFocusColor,
  },
});
