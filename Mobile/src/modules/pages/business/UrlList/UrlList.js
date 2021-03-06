import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Spinner,
  Button
} from '@ui-kitten/components';

import { colors, fonts } from '../../../../styles';
import { getUrls } from '../../../../services/api/users';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrlFlag } from '../../../../redux/actions/authActions';


export default function UrlList(props) {

  const [urlListData, setUrlListData] = useState(undefined);
  const [loading, setloading] = useState(true);
  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user, updateurl } = auth ? auth : { "isAuthenticated": false, user: {}, updateurl: true };

  const dispatch = useDispatch();


  const redirectSaveurl=()=>{ 
    props.navigation.navigate('Save Url', {
    
    });
  }

  const getUrlList = () => {
    getUrls(res => {
      if (res.isSuccess) {
        var value = res.value.value;
   
        setUrlListData(value);
        setloading(false);

      }
      else {
        setloading(false);
        Alert.alert('Oops, something wrong. The operation failed. Do you want to try again?', '', [
          {
            text: 'Try again', onPress: () => {

              getUrls();

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

  useEffect(() => {
    dispatch(updateUrlFlag(false));
    if (urlListData==undefined || updateurl) {
      getUrlList();
    }


  }, [urlListData,updateurl]);




  const _getRenderUrlItemFunction = () =>
    [UrlListItem][
    props.tabIndex
    ];

  const _openUrlUpdate = itemDatail => {
    props.navigation.navigate('Url Update', {
      itemDatail,
    });
  };




  const UrlListItem = ({ item }) => (

    <TouchableOpacity
      key={item.id}
      style={styles.itemTwoContainer}
      onPress={() => _openUrlUpdate(item)}
    >
      <View style={styles.itemTwoContent}>

        <View style={styles.itemTwoOverlay} />
        <Text style={styles.itemTwoTitle}>URL: {item.urls}</Text>
        <Text style={styles.itemTwoSubTitle}>Schecule Time: {"Every day at " + (new Date(item.scheculeTime)).getHours() + ":" + (new Date(item.scheculeTime)).getMinutes()}</Text>
      </View>
    </TouchableOpacity>
  );


  const renderLoading = () => (
    <View style={styles.loading}>
      <Spinner />
    </View>
  );


  const renderData = () => (
    <View style={styles.container}>
      {urlListData.length > 0 ?
        <FlatList
          keyExtractor={item =>
            item.id
              ? `${props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
          style={{ backgroundColor: colors.black, paddingHorizontal: 15 }}
          data={urlListData}
          renderItem={_getRenderUrlItemFunction()}
        />
        : <View style={styles.loading}>
          <Button style={styles.signInButton}
                onPress={redirectSaveurl}
                >
                Add New Url
              </Button>
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
  },  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },

  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'black',
    marginVertical: 5,

  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,

  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
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
    backgroundColor: '#3366ff',
    opacity: 0.8,

  },

  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
