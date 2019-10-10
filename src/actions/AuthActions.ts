import { createAction } from 'redux-actions';

import { urlAuthToken } from '../api/urls';
import CONSTANTS from '../constants';
import { apiFetch } from './../api';

export const cleanAuth = createAction(CONSTANTS.ACTION_CLEAN_AUTH, () => {});
export const login = createAction(CONSTANTS.ACTION_LOGIN, (body: object) => apiFetch({ method: CONSTANTS.POST, url: urlAuthToken, body }));
