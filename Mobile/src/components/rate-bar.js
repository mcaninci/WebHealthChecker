import React from 'react';
import { ImageStyle, StyleSheet, View, ViewProps } from 'react-native';
import { Button, ButtonElement, Icon, IconElement } from '@ui-kitten/components';



export const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export const RateBar = (props)=> {

  const renderRateButtonElement = (value) => {
    const status = value <= props.value ? 'warning' : 'basic';

    return (
      <Button
        key={value}
        style={styles.iconButton}
        appearance='ghost'
        size='tiny'
        status={status}
        accessoryLeft={StarIcon}
        onPress={() => props.onValueChange(value)}
      />
    );
  };

  const { style, ...viewProps } = props;

  return (
    <View
      {...viewProps}
      style={[styles.container, style]}>
      {[1, 2, 3, 4, 5].map(renderRateButtonElement)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});