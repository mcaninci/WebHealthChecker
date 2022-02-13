import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';


const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

export const ImageOverlay = (props)=> {

  const { style, children, ...imageBackgroundProps } = props;
  const { overlayColor,borderRadius, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <ImageBackground
      {...imageBackgroundProps}
      resizeMode="stretch"
      style={[style, imageBackgroundStyle]}>
      <View style={[
        StyleSheet.absoluteFill,
        {borderRadius:borderRadius},
        { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR },
      ]}/>
      {children}
    </ImageBackground>
  );
};