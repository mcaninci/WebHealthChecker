import React from 'react';
import { StyleSheet, View, ViewProps,Image } from 'react-native';
import { Avatar, AvatarProps, ButtonElement, ButtonProps } from '@ui-kitten/components';
import { ImageOverlay } from './image-overlay';


export const ProfileAvatar = (props)=> {

  const renderEditButtonElement = () => {
    const buttonElement = props.editButton();

    return React.cloneElement(buttonElement, {
      style: [buttonElement.props.style, styles.editButton],
    });
  };

  const { style, editButton, ...restProps } = props;
  React.useEffect( () => {
}, [restProps])
  return (
    <View style={[style, styles.avatar]}>
   {props.base64==false ?   <ImageOverlay //avatarda base64 grelmiyor bunu kontrol et
        style={[style, styles.avatar]}
        {...restProps}
      />:
      <Image  source={{
        uri: restProps.source  }} {...restProps}  style={[style, styles.avatar]} ></Image> }
      {editButton && renderEditButtonElement()}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    borderRadius: 100, overflow: 'hidden'
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end', borderRadius: 46,
    bottom: 0,
  },
});