import { compose, withState } from 'recompose';

import UrlMonitoringDetail from './UrlMonitoringDetail';



export default compose(withState('isExtended', 'setIsExtended', false))(
    UrlMonitoringDetail,
);
