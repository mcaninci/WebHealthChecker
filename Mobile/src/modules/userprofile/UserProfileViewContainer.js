import { compose, withState } from 'recompose';

 import UserProfileScreen from './UserProfileView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  UserProfileScreen,
);
