import { compose, withState } from 'recompose';

import SaveUrl from './SaveUrlView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  SaveUrl,
);
