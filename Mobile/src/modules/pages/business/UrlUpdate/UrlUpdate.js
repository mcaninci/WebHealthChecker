import React from 'react';

import { ImageBackground, Platform, View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  Radio,
  RadioGroup,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';



export default function UrlUpdate (props)  {
  let product =props.route.params.itemDatail;

  const [comment, setComment] = React.useState();
  const [selectedColorIndex, setSelectedColorIndex] = React.useState();
  const styles = useStyleSheet(themedStyles);
  const [rating, setRating] = React.useState(product.rating||3);

  

  const onBuyButtonPress = () => {
    navigation && navigation.navigate('Payment');
  };

  const onAddButtonPress = () => {
    navigation && navigation.navigate('ShoppingCart');
  };

  const renderColorItem = (color, index) => (
    <Radio
      key={index}
      style={styles.colorRadio}
    >
      {evaProps => <Text {...evaProps} style={{ color: color.value, marginLeft: 10, }}>{color.description.toUpperCase()}</Text>}
    </Radio>
  );
  const GridsDetailScreen = () => (
    <Layout style={styles.header}>
      <ImageBackground
        style={styles.image}
        source={{ uri: product.image }}
      />
      <Layout
        style={styles.detailsContainer}
        level='1'>
        <Text
          category='h6'>
          {product.title}
        </Text>
        <Text
          style={styles.subtitle}
          appearance='hint'
          category='p2'>
          {product.subtitle}
        </Text>

        <Text
          style={styles.price}
          category='h4'>
          {product.price}
        </Text>
        <Text
          style={styles.description}
          appearance='hint'>
          {product.description}
        </Text>
        <Text
          style={styles.sectionLabel}
          category='h6'>
          Size:
        </Text>
        <Text
          style={styles.size}
          appearance='hint'>
          {product.size}
        </Text>
        <Text
          style={styles.sectionLabel}
          category='h6'>
          Color:
        </Text>
        <RadioGroup
          style={styles.colorGroup}
          selectedIndex={selectedColorIndex}
          onChange={setSelectedColorIndex}>
          {product.badgeColor.map(renderColorItem)}
        </RadioGroup>
        <View style={styles.actionContainer}>
          <Button
            style={styles.actionButton}
            size='giant'
            onPress={onBuyButtonPress}>
            BUY
          </Button>
          <Button
            style={styles.actionButton}
            size='giant'
            status='control'
            onPress={onAddButtonPress}>
            ADD TO BAG
          </Button>
        </View>
      </Layout>
      <Input
        style={styles.commentInput}
        label={evaProps => <Text {...evaProps} style={styles.commentInputLabel}>Comments</Text>}
        placeholder='Write your comment'
        value={comment}
        onChangeText={setComment}
      />
    </Layout>
  );

  return (
    <View>
      <GridsDetailScreen/>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  commentList: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 8,
  },
  image: {
    height: 340,
    width: '100%',
  },
  detailsContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 4,
  },
  price: {
    position: 'absolute',
    top: 24,
    right: 16,
  },
  description: {
    marginVertical: 16,
  },
  size: {
    marginBottom: 16,
  },
  rateBar: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  colorGroup: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  colorRadio: {
    marginHorizontal: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionLabel: {
    marginVertical: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: 'text-basic-color',
  },
  commentInput: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
