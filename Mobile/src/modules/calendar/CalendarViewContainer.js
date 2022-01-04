import { connect } from 'react-redux';
import { compose } from 'recompose';

import { loadItems } from '../../redux/actions/calendarAction';

import CalendarScreen from './CalendarView';

export default compose(
  connect(
    state => ({
      items: state.calendar.items,
    }),  
 
    dispatch => ({
      loadItems: (day) => dispatch(loadItems(day))
     
    }),
  ),
)(CalendarScreen);
