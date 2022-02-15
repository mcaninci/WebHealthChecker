import React, {  useRef } from 'react';

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


import { colors, fonts } from '../../../../styles';

import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
const shareios = require('../../../../components/iconsvg/shareios.png');
 const shareandroid = require('../../../../components/iconsvg/shareandroid.png');


export default function UrlMonitoringDetail(props) {
  let urlitem = props.route.params.itemDatail;
  const resultview = useRef();
  const styles = useStyleSheet(themedStyles);

  const shareImage = async () => {
    console.log('share girdi');
    try {
      debugger;
      const uri = await captureRef(resultview, {
        format: 'png',
        quality: 0.8,
      });
      console.log('uri gelmeli');
      console.log('uri', uri);
      const shareResponse = await Share.open({ url: uri });
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };


  const GridsDetailScreen = () => (
    <Layout style={styles.header}>
      <ImageBackground
        style={styles.image}
        source={{ uri: urlitem.image }}
      />
      <Layout
        style={styles.detailsContainer}
        level='1'>
        <Text
          category='h6'>
          URL : {urlitem.url}
          <View style={styles.itemThreeMetaContainer}>
            {urlitem.status && (
              <View
                style={[
                  styles.badge,
                  urlitem.responseCode == 200 && { backgroundColor: colors.green },
                ]}
              >
                <Text
                  style={{ fontSize: 13, color: colors.white }}
                  styleName="bright"
                >
                  {urlitem.status}
                </Text>
              </View>
            )}

          </View>
        </Text>
        <Text
          style={styles.description}
          appearance='hint'
        >
          Last Checked : {urlitem.lastcheckDateText}
        </Text>


        <Text
          style={styles.size}
          appearance='hint'>
          Response Code : {urlitem.responseCode}
        </Text>
        <Text
          style={styles.size}
          appearance='hint'>
          Response Time: {urlitem.responseTime}
        </Text>


        <Button style={styles.updateButton} onPress={shareImage} >
              Share Result
            </Button>
      </Layout>

    </Layout>
  );

  return (
    <View ref={resultview}>
      <GridsDetailScreen />
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
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
    height: '100%',
  },

  description: {
    marginVertical: 8,
  },
  size: {
    marginBottom: 8,
  },


  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 50
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 25
  }
});
