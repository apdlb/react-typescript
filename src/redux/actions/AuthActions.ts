import { createAction } from 'redux-actions';

import { apiFetch } from '../../services';
import { urlAuthToken } from '../../services/urls';
import CONSTANTS from '../../utils/constants';

export const cleanAuth = createAction(CONSTANTS.ACTION_CLEAN_AUTH, () => {});
export const login = createAction(CONSTANTS.ACTION_LOGIN, (body: object) => apiFetch({ method: CONSTANTS.POST, url: urlAuthToken, body }));
