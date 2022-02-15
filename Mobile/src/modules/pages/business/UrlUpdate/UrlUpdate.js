import React, { useEffect, useState } from 'react';

import { View, Alert } from 'react-native';
import {
  Button,
  Input,
  StyleService,
  Text,
  useStyleSheet,
  Divider
} from '@ui-kitten/components';

import { ImageOverlay } from '../../../../components/image-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UrlUpdate(props) {
  let urldata = props.route.params.itemDatail;

  const styles = useStyleSheet(themedStyles);
  const [url, setUrl] = useState(urldata.url || '');
  const [date, setDate] = useState(new Date(urldata.scheculetime));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    if (show) {
      setShow(false);
    }
    else {
      setShow(true);
    }

    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const updateURL = () => {
    if (url == "" || url == undefined) {
      Alert.alert(
        "Please enter web site url",
      );
    }
    else {
      Alert.alert(
        "web site urls" + JSON.stringify(url) + " datetime " + date
      );
    }

  }



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <ImageOverlay
        style={{ width: '100%', height: '100%' }}
        source={require('../../../../../assets/images/backgrounds/image-background.jpeg')}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.headerContainer}>

            <Text style={styles.Urltext}> Web Site Url:</Text>
            <Input style={styles.urlinput}
              onChangeText={(text) => setUrl(text)}
              value={url}
              placeholder='www.websiteurl.com;www.websiteurl.com'
              multiline={false}
            />

          </View>
          <View style={styles.container}>
            <View style={styles.containerRow}>
              <Text style={styles.Urltext}>Selected Checker Schedule Time : {date.getHours() + ":" + date.getMinutes()}</Text>
              <View style={styles.containerRow} >
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    dateFormat="dd-MM-yyyy HH:mm"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                    themeVariant="light"
                    style={{ backgroundColor: 'white', width: 200, height: 200, marginBottom: 10 }}
                  />
                )}
                <Button style={styles.signInButton}
                  onPress={showTimepicker} >
                  Set Schecule Time
                </Button>
                <Text style={styles.Urltext}>This URL is checked every day at {date.getHours() + ":" + date.getMinutes()}  by the web health checker.</Text>

              </View>


            </View>


            <Button style={styles.updateButton} onPress={updateURL} >
              Update URL Detail
            </Button>
            <Divider style={{ backgroundColor: 'white', marginTop: 10, height: 5 }} />
          </View>


        </View>


      </ImageOverlay>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  containerRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  
  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    alignItems: 'center',
  },
  updateButton: {
    marginHorizontal: 16,
    minWidth: 300,
    alignItems: 'center',
    marginTop:80
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
    maxHeight: 176,
    marginTop: 15,
    flex: 1,
    justifyContent: 'space-between'
  },
  Urltext: {
    color: 'white', justifyContent: 'center', alignItems: 'center',
    marginTop: 40, maxWidth: 300,
    marginBottom:10
  },
  urlinput: {
    minWidth: 250,
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }



});
