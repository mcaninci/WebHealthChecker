import { compose, withState } from 'recompose';

import ForgotPasswordScreen from './ForgotPassword';
export default compose(withState('isExtended', 'setIsExtended', false))(
  ForgotPasswordScreen,
);
