import React, { useEffect, useState } from 'react';

import { View, Alert } from 'react-native';
import {
  Button,
  Input,
  StyleService,
  Text,
  useStyleSheet,
  Divider,
  Spinner
} from '@ui-kitten/components';
import { updateUrl, deleteUrl } from '../../../../services/api/users';
import { ImageOverlay } from '../../../../components/image-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useDispatch } from 'react-redux';
import { updateUrlFlag } from '../../../../redux/actions/authActions';
import { color } from 'react-native-elements/dist/helpers';
import { TimeIcon, SaveIcon, DeleteIcon } from '../../../../components/icons';
export default function UrlUpdate(props) {
  let urldata = props.route.params.itemDatail;

  const styles = useStyleSheet(themedStyles);
  const [url, setUrl] = useState(urldata.urls || '');
  const [date, setDate] = useState(new Date(urldata.scheculeTime));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ handleSave: () => this.saveDetails() })

  }, []);

  const navigationOptions = ({ navigation }) => {
    const { state } = navigation
    return {
      headerTitle: 'New Task',
      headerRight: <Button title="Save" onPress={() => state.params.handleSave()} />,
    }
  }



  const saveDetails = () => {
    alert('saved');
  }


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
    setloading(true);
    if (url == "" || url == undefined) {
      Alert.alert(
        "Please enter web site url",
      );
    }
    else {
      updateUrl({ Id: urldata.id, Urls: url, ScheculeTime: date }, res => {
        setloading(false);
        if (res.isSuccess) {
          var value = res.value.value;

          if (value.errorUrlCound > 0) {
            Alert.alert(value.errorUrlCound + " url doesnt update.Please check Urls list.");
          }
          else {
            Alert.alert("Url updated succesfully.");
            dispatch(updateUrlFlag(true));
          }



        }
        else {
          Alert.alert('Oops, something wrong. The operation failed. Do you want to try again?', '', [
            {
              text: 'Try again', onPress: () => {

                saveUrls();

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






  }
  const deleteURL = () => {
    setloading(true);


    deleteUrl(urldata.id, res => {
      setloading(false);
      if (res.isSuccess) {
        var value = res.value.value;



        Alert.alert('Url deleted.', '', [
          {
            text: 'Ok', onPress: () => {

              dispatch(updateUrlFlag(true));
              props.navigation.goBack();
            }
          }
        ]);

      }
      else {
        Alert.alert('Oops, something wrong. The operation failed. Do you want to try again?', '', [
          {
            text: 'Try again', onPress: () => {

              deleteURL();

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
              placeholder='www.websiteurl.com'
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
                  onPress={showTimepicker}
                  accessoryLeft={TimeIcon} >
                  <Text style={{ minWidth: 100 }}>Set Schecule Time</Text>

                </Button>
                <Text style={styles.Urltext}>This URL is checked every day at {date.getHours() + ":" + date.getMinutes()}  by the web health checker.</Text>

              </View>


            </View>

            {loading ? <View style={styles.loading}>
              <Spinner />
            </View> : <View><Button accessoryLeft={SaveIcon} style={styles.updateButton} onPress={updateURL} >

              <Text style={{ minWidth: 100 }}>Update URL Detail</Text>
            </Button>
              <Button accessoryLeft={DeleteIcon} style={styles.deleteButton} status='danger' onPress={deleteURL} >

                <Text style={{ minWidth: 100 }}>  Delete URL</Text>
              </Button>
            </View>}

            <Divider style={{ backgroundColor: 'white', marginTop: 10, height: 5 }} />

          </View>


        </View>


      </ImageOverlay>

    </View>
  );
};

const themedStyles = StyleService.create({
  loading: {

    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
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
    marginTop: 70
  },
  deleteButton: {
    marginHorizontal: 16,
    minWidth: 300,
    alignItems: 'center',
    marginTop: 10
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
    marginBottom: 10
  },
  urlinput: {
    minWidth: 250,
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }



});
