import { createAction } from 'redux-actions';

import { apiFetch } from '../../services';
import { urlEntities } from '../../services/urls';
import CONSTANTS from '../../utils/constants';

export const cleanEntities = createAction(CONSTANTS.ACTION_CLEAN_ENTITIES, () => {});
export const listEntities = createAction(CONSTANTS.ACTION_LIST_ENTITIES, () => apiFetch({ method: CONSTANTS.GET, url: urlEntities }));
