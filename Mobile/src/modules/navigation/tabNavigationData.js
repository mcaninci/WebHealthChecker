import HomeScreen from '../home/HomeViewContainer';
import AsiKarti from '../asikarti/AsiKartiViewContainer';

import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';


const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [

  {
    name: 'Hes Kodu',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Aşı Kartı',
    component: AsiKarti,
    icon: iconCalendar,
  },

  // {
  //   name: 'Components',
  //   component: ComponentsScreen,
  //   icon: iconComponents,
  // },
];
//splash screen yapıkacaj
//sqllite db connection açalım configler vsler için
//slide menu kaydırmalı tanırım
//popup yana kaydırmalı ekran 
export default tabNavigationData;