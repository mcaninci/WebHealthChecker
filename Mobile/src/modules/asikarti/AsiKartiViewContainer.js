import { compose, withState } from 'recompose';

import AsiKarti from './AsiKartiView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  AsiKarti,
);
