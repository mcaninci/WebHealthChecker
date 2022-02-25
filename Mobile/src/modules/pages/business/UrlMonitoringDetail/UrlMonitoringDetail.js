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
import { ShareAndroidIcon,ShareIOSIcon } from '../../../../components/icons';


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
    
          {urlitem.screenShot.length>0?    <ImageBackground
        style={styles.image}
        source={{ uri: urlitem.screenShot }}
      />
         :   <ImageBackground
         style={styles.image}
         source={require('../../../../../assets/images/pages/404.jpeg') }  />
   
          
        }
    
      <Layout
        style={styles.detailsContainer}
        level='1'>
        <Text
          category='h6'>
          URL : {urlitem.url}
          <View style={styles.itemThreeMetaContainer}>
            {(
              <View
                style={[
                  styles.badge,
                  urlitem.status == 200 && { backgroundColor: colors.green },
                ]}
              >
                <Text
                  style={{ fontSize: 13, color: colors.white }}
                  styleName="bright"
                >
               { urlitem.status ==200 ?'Healthy':'Unhealthy'}
                </Text>
              </View>
            )}

          </View>
        </Text>
        <Text
          style={styles.description}
          appearance='hint'
        >
          Last Checked : {new Date(urlitem.insertDate).toLocaleString()}
        </Text>


        <Text
          style={styles.size}
          appearance='hint'>
          Response Code : {urlitem.status}
        </Text>
        <Text
          style={styles.size}
          appearance='hint'>
          Response Time: {urlitem.responseTime} ms
        </Text>

        <Button  accessoryLeft={Platform.OS=="android"?ShareAndroidIcon:ShareIOSIcon} style={styles.share} onPress={shareImage} >
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
  share: {
    marginHorizontal: 16,
    minWidth: 300,
    marginTop:50,
    alignItems: 'center'
  },

  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 50
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 25,
    marginTop: 10
  }
});
