
import SaveUrl from '../../business/SaveUrl/SaveUrlViewContainer';
import UrlList from '../../business/UrlList/UrlListViewContainer';
import Monitoring from '../../business/UrlMonitoringList/UrlMonitoringViewContainer';


//import EditIcon from '@material-ui/icons/Edit';
//import EditIcon from '../../../../../assets/icons/user.png';
import {IdentityIcon} from '../../../../components/icons';
const iconIdentity = require('../../../../components/iconsvg/identity.png');
const chat = require('../../../../components/iconsvg/chat.png');
const reviews = require('../../../../components/iconsvg/reviews.png');
const payment = require('../../../../components/iconsvg/payments.png');


const tabNavigationData = [

  {
    name: 'SaveUrl',
    component: SaveUrl,
    icon: iconIdentity,
  },
  {
    name: 'UrlList',
    component: UrlList,
    icon: reviews,
  },
  {
    name: 'Monitoring',
    component: Monitoring,
    icon: chat,
  },

  
];
export default tabNavigationData;