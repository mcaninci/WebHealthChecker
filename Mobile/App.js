import { Provider } from 'react-redux';
import React, {useEffect}  from 'react';
import { View, ActivityIndicator, StyleSheet,Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';

import { store, persistor } from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import AppView from './src/modules/AppViewContainer';

export default function App() {


  useEffect(() => {
    if( Platform.OS === 'ios'){
      setTimeout(() => {
        SplashScreen.hide();
       }, 200);
    }
    else{
    setTimeout(() => {
     SplashScreen.hide();
    }, 300);}
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate
          loading={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <View style={styles.container}>
              <ActivityIndicator color={colors.red} />
            </View>
          }
          persistor={persistor}
        >
          <AppView />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
