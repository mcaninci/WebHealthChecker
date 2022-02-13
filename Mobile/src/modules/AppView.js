import React from 'react';

import Navigator from './pages/structure/navigation/Navigator';

import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { ImageOverlay } from '../components/image-overlay';

export default function AppView() {



  return (    <ImageOverlay
    style={  {flex:1} }
    source={require('../../assets/images/backgrounds/image-background.jpeg')}>
 
    <React.Fragment>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigator onNavigationStateChange={() => { }} uriPrefix="/app" >
          </Navigator>
      </ApplicationProvider>
    </React.Fragment>
  </ImageOverlay>);
}
