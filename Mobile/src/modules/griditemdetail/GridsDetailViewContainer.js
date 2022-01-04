import { compose, withState } from 'recompose';

import GridsDetailScreen from './GridsDetailView';



export default compose(withState('isExtended', 'setIsExtended', false))(
    GridsDetailScreen,
);
