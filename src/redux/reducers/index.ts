import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';

import { auth } from './auth';
import { entities } from './entities';

export default combineReducers<any>({
  localize: localizeReducer,
  auth,
  entities
});
