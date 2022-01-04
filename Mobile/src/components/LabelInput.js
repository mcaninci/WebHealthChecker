import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Divider, Text, LayoutProps, Input } from '@ui-kitten/components';


export const LabelInput = (props)=> {

  const { styleLabel,style, hint,onChangeText, value,placeholder, ...layoutProps } = props;

  return (
    <React.Fragment>
      <View
        level='1'
        {...layoutProps}
           style={styles.container, style}
    >
        <Text
          appearance='hint'
          style={{marginBottom:8}}
          category='s1'>
          {hint}
        </Text>
        <Input
      
            status='control'
            autoCapitalize='none'
            placeholder='placeholder'
         
            value={value}
            onChangeText={onChangeText}
          />
      </View>
      <Divider/>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width:400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'transparent',
  }
});