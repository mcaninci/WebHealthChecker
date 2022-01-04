import React from 'react';
import {
  StyleSheet,
  View,

  Dimensions
} from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { fonts, colors } from '../../styles';

import Pdf from 'react-native-pdf';
import { useDispatch, useSelector } from 'react-redux';

export default function AsiKarti(props) {

  const auth = useSelector((state) => { return state.auth; });
  const { isAuthenticated, user } = auth ? auth : { "isAuthenticated": false, user: {} };
  let showPDFviewer = true;
  let source = {};

  const redirectLogin = function () {

    props.navigation && props.navigation.navigate('HES Kodu Güncelleme');

  };
  if (user.asikarti)
      if(user.asikarti.baseData){
        source = {uri:"data:application/pdf;base64,"+user.asikarti.baseData, cache: true };
      
      }
      else
        source = { uri: decodeURI(user.asikarti.uri), cache: true };
  else
    showPDFviewer = false;


  return (
    <View style={styles.container}>
      {showPDFviewer ?
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`)
          }}
          style={styles.pdf} /> : <View> 
            
          <Button
            style={styles.signInButton}
            size='giant'
            onPress={redirectLogin}>
            Aşı Kartı Yükle
          </Button>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    backgroundColor: '#50ad33'
  },
});