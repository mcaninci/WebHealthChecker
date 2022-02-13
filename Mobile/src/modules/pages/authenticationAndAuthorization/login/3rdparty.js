import React from 'react';
import { ScrollViewProps } from 'react-native';


export const KeyboardAvoidingView = (props) => {
  const lib = require('react-native-keyboard-aware-scroll-view');

  const defaultProps = {
    style: { flex: 1 },
    contentContainerStyle: { flexGrow: 1 },
    bounces: false,
    bouncesZoom: false,
    alwaysBounceVertical: false,
    alwaysBounceHorizontal: false,
  };
  const element = () => (
  React.createElement(lib.KeyboardAwareScrollView, {
    enableOnAndroid: true,
    ...defaultProps,
    ...props,
  })
  );

  return element;
};