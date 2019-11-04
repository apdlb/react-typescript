import { createAction } from 'redux-actions';

import { apiFetch } from '../../services';
import { urlAuthLogin } from '../../services/urls';
import CONSTANTS from '../../utils/constants';

export const cleanAuth = createAction(CONSTANTS.ACTION_CLEAN_AUTH, () => {});
export const login = createAction(CONSTANTS.ACTION_LOGIN, (body: object) => {
  return apiFetch({ method: CONSTANTS.POST, url: urlAuthLogin, body }).then(r => {
    localStorage.setItem('jwtToken', r.access_token);
    return r;
  });
});
export const logout = createAction(CONSTANTS.ACTION_CLEAN_AUTH, () => {
  localStorage.removeItem('jwtToken');
  return {};
});
