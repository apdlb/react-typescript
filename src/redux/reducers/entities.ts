import { handleActions } from 'redux-actions';

import CONSTANTS from '../../utils/constants';

const initialValues = {
  paginateEntities: {},
  paginateEntitiesParams: {}
};
export const entities = handleActions(
  {
    [CONSTANTS.ACTION_CLEAN_ENTITIES]: (state, action) => initialValues,
    [CONSTANTS.ACTION_LIST_ENTITIES]: (state, action) => ({ ...state, paginateEntities: action.payload }),
    [CONSTANTS.ACTION_SET_LIST_ENTITIES_PARAMS]: (state, action) => ({ ...state, paginateEntitiesParams: action.payload })
  },
  {}
);
