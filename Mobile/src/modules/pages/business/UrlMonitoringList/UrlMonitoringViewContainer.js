import { compose, withState } from 'recompose';

import UrlMonitoring from './UrlMonitoring';

const listData = [
  {
    id: 1,
    url: 'www.google.com',
    lastcheckDateText: '15/02/2022 14:35',
    status: 'Healty',
    responseCode: 200,
    responseTime:'10 ms',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  },
  {
    id: 2,
    url: 'www.google3.com',
    lastcheckDateText: '15/02/2022 12:35',
    status: 'Not Healty',
    responseCode: 404,
    responseTime:'10 ms',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-26549.jpg',
  },
  {
    id: 3,
    url: 'www.google2.com',
    lastcheckDateText: '15/02/2022 16:35',
    status: 'Not Healty',
    responseCode: 502,
    responseTime:'10 ms',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-30360.jpg',
  },
  {
    id: 4,

    url: 'www.google2.com',
    lastcheckDateText: '15/02/2022 16:35',
    status: 'Healty',
    responseCode: 200,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-37839.jpg',
  },
  {
    id: 5,

    url: 'www.google2.com',
    lastcheckDateText: '15/02/2022 16:35',
    status: 'Healty',
    responseCode: 200,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-69212.jpg',
  },
  {
    id: 6,

    url: 'www.google2.com',
    lastcheckDateText: '15/02/2022 16:35',
    status: 'Healty',
    responseCode: 200,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-108061.jpg',
  },
  {
    id: 7,

    url: 'www.google2.com',
    lastcheckDateText: '15/02/2022 16:35',
    status: 'Healty',
    responseCode: 200,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-126371.jpg',
  },
  
];

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['Grid', 'List 1', 'List 2']),
  withState('data', 'setData', listData),
)(UrlMonitoring);
