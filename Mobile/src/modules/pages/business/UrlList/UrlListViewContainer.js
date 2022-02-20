import { compose, withState } from 'recompose';

import UrlList from './UrlList';



export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['Grid', 'List 1', 'List 2']),
  withState('data', 'setData'),
)(UrlList);
