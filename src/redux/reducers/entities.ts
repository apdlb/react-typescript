import { handleActions } from 'redux-actions';

import CONSTANTS from '../../utils/constants';

export const entities = handleActions(
  {
    [CONSTANTS.ACTION_CLEAN_ENTITIES]: (state, action) => ({}),
    [CONSTANTS.ACTION_LIST_ENTITIES]: (state, action) => ({ ...state, paginateEntities: action.payload })
  },
  {}
);
