import React from 'react';

import Navigator from './navigation/Navigator';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { ImageOverlay } from '../components/image-overlay';

export default function AppView() {



  return (    <ImageOverlay
    style={  {flex:1} }
    source={require('../../assets/images/pages/login/image-background.jpeg')}>
 

    <ApplicationProvider {...eva} theme={eva.light}>

      <Navigator onNavigationStateChange={() => { }} uriPrefix="/app" >
        </Navigator>
  
    </ApplicationProvider>

  </ImageOverlay>);
}
