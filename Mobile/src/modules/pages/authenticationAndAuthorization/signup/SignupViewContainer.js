import { compose, withState } from 'recompose';

 import Signupcreen from './SignupView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  Signupcreen,
);
