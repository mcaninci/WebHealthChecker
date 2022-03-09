import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Spinner
} from '@ui-kitten/components';
import { colors, fonts } from '../../../../styles';

import { getMonitoringList } from '../../../../services/api/users';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrlFlag } from '../../../../redux/actions/authActions';



export default function UrlMonitoring(props) {

  const [urlMonitoringData, setUrlMonitoringData] = useState([]);
  const [loading, setloading] = useState(true);
  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user, updateurl } = auth ? auth : { "isAuthenticated": false, user: {}, updateurl: true };

  const dispatch = useDispatch();



  const getMonitoringUrlList = () => {

    props.navigation.setParams({ handleSave: testevent });
    getMonitoringList(res => {
      if (res.isSuccess) {
        var value = res.value.value;
        dispatch(updateUrlFlag(false));
        setUrlMonitoringData(value);
        setloading(false);




      }
      else {
        setloading(false);
        Alert.alert('Oops, something wrong. The operation failed. Do you want to try again?', '', [
          {
            text: 'Try again', onPress: () => {

              getMonitoringUrlList();

            }
          },
          {
            text: 'Cancel', onPress: () => {

            }
          }
        ]);
      }
    });
  }

  const testevent = () => {

    Alert.alert('Oops, something wrong. The operation failed. Do you want to try again?');
  }
  useEffect(() => {
    if (urlMonitoringData.length == 0 || updateurl) {
      getMonitoringUrlList();
    }



  }, [urlMonitoringData]);


  if (updateurl) {
    getMonitoringUrlList();
  }


  const _getRenderMonitoringItemFunction = () =>
    [MonitoringListItem][
    props.tabIndex
    ];

  const _openMonitoringDetail = itemDatail => {
    props.navigation.navigate('Url Monitoring Detail', {
      itemDatail,
    });
  };


  MonitoringListItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => _openMonitoringDetail(item)}
    >
      <View style={styles.itemThreeSubContainer}>
        {item.screenShot.length > 0 ? <Image source={{ uri: item.screenShot }} style={styles.itemThreeImage} />
          : <Image source={require('../../../../../assets/images/pages/404.jpeg')} style={styles.itemThreeImage} />

        }

        <View style={styles.itemThreeContent}>


          <Text style={styles.itemThreeTitle}>{item.url}</Text>
          <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
            Last Checked : {new Date(item.insertDate).toLocaleString()}
          </Text>

          <View style={styles.itemThreeMetaContainer}>
            {(
              <View
                style={[
                  styles.badge,
                  item.status == 200 && { backgroundColor: colors.green }
                ]}
              >
                <Text
                  style={{ fontSize: 13, color: colors.white }}
                  styleName="bright"
                >
                  {item.status == 200 ? 'Healthy' : 'Unhealthy'}
                </Text>
              </View>
            )}

          </View>
        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );



  const renderLoading = () => (
    <View style={styles.loading}>
      <Spinner />
    </View>
  );


  const renderData = () => (
    <View style={styles.container}>
      {urlMonitoringData.length > 0 ?
        <FlatList
          keyExtractor={item =>
            item.id
              ? `${props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={urlMonitoringData}
          renderItem={_getRenderMonitoringItemFunction()}
        /> : <View style={styles.loading}>
          <Text style={styles.recordnot} numberOfLines={1}>
          No Records Found
        </Text>
        
        </View>}
    </View>
  );


  return loading == false ? renderData() : renderLoading();

}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  recordnot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.primaryBold,
    fontSize: 25,
    color: 'white',
    marginTop:150
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
