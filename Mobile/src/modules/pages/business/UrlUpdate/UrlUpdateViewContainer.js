import { compose, withState } from 'recompose';

import UrlUpdate from './UrlUpdate';



export default compose(withState('isExtended', 'setIsExtended', false))(
    UrlUpdate
);
