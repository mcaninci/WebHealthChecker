import { compose, withState } from 'recompose';

import UrlList from './UrlList';

const listData = [
  {
    id: 1,
    
    url: 'www.google.com',
    scheculetime: 'Tue Feb 15 2022 12:35:15 GMT+0300 (GMT+03:00)',
    scheculetimeText:"12:35 per day"
    
  },
  {
    id: 2,
    url: 'www.google2.com',
    scheculetime: 'Tue Feb 15 2022 23:57:15 GMT+0300 (GMT+03:00)',
    scheculetimeText:"23:57 per day"
  },
  {
    id: 3,
    url: 'www.google4.com',
    scheculetime: 'Tue Feb 15 2022 12:57:15 GMT+0300 (GMT+03:00)',
    scheculetimeText:"12:57 per day"
  },
  {
    id: 4,
    url: 'www.google4.com',
    scheculetime: 'Tue Feb 15 2022 15:57:15 GMT+0300 (GMT+03:00)',
    scheculetimeText:"15:57 per day"
  },
  {
    id: 5,
    url: 'www.google5.com',
    scheculetime: 'Tue Feb 15 2022 16:57:15 GMT+0300 (GMT+03:00)',
    scheculetimeText:"16:57 per day"
    },
    {
      id: 6,
      url: 'www.google4.com',
      scheculetime: 'Tue Feb 15 2022 12:57:15 GMT+0300 (GMT+03:00)',
      scheculetimeText:"12:57 per day"
    },
    {
      id: 7,
      url: 'www.google4.com',
      scheculetime: 'Tue Feb 15 2022 15:57:15 GMT+0300 (GMT+03:00)',
      scheculetimeText:"15:57 per day"
    },
    {
      id: 8,
      url: 'www.google5.com',
      scheculetime: 'Tue Feb 15 2022 16:57:15 GMT+0300 (GMT+03:00)',
      scheculetimeText:"16:57 per day"
      },
      {
        id: 9,
        url: 'www.google4.com',
        scheculetime: 'Tue Feb 15 2022 12:57:15 GMT+0300 (GMT+03:00)',
        scheculetimeText:"12:57 per day"
      },
      {
        id: 10,
        url: 'www.google4.com',
        scheculetime: 'Tue Feb 15 2022 15:57:15 GMT+0300 (GMT+03:00)',
        scheculetimeText:"15:57 per day"
      },
      {
        id: 11,
        url: 'www.google5.com',
        scheculetime: 'Tue Feb 15 2022 16:57:15 GMT+0300 (GMT+03:00)',
        scheculetimeText:"16:57 per day"
        },
  
];

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['Grid', 'List 1', 'List 2']),
  withState('data', 'setData', listData),
)(UrlList);
