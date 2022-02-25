
import SaveUrl from '../../business/SaveUrl/SaveUrlViewContainer';
import UrlList from '../../business/UrlList/UrlListViewContainer';
import Monitoring from '../../business/UrlMonitoringList/UrlMonitoringViewContainer';


//import EditIcon from '@material-ui/icons/Edit';
//import EditIcon from '../../../../../assets/icons/user.png';
import {IdentityIcon} from '../../../../components/icons';

const monitoring = require('../../../../components/iconsvg/monitoring.png');
const urllist = require('../../../../components/iconsvg/urllist.png');
const saveurl = require('../../../../components/iconsvg/saveurl.png');


const tabNavigationData = [

  {
    name: 'Save Url',
    component: SaveUrl,
    icon: saveurl,
  },
  {
    name: 'Url List',
    component: UrlList,
    icon: urllist,
  },
  {
    name: 'Monitoring',
    component: Monitoring,
    icon: monitoring,
  },

  
];
export default tabNavigationData;