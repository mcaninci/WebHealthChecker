import { compose, withState } from 'recompose';

import bagisScreen from './bagisView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  bagisScreen,
);
