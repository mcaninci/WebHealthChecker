
import SaveUrl from '../../business/SaveUrl/SaveUrlViewContainer';
import UrlList from '../../business/UrlList/UrlListViewContainer';

import Monitoring from '../../business/UrlMonitoringList/UrlMonitoringViewContainer';

const monitoring = require('../../../../components/iconsvg/monitoring.png');
const urllist = require('../../../../components/iconsvg/urllist.png');
const saveurl = require('../../../../components/iconsvg/saveurl.png');


const drawerData = [
  {
    name: 'Save Url',
    component: SaveUrl,
    icon: saveurl,
  },
  {
    name: 'Url List',
    component: UrlList,
    icon:  urllist,
  },
  {
    name: 'Monitoring',
    component: Monitoring,
    icon: monitoring,
  },

  ];
  export default drawerData;