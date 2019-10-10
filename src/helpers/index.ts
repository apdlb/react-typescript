import { IErrorControl } from '../utils/interfaces';

export const errorControl = ({ props, err, redirect = false }: IErrorControl) => {
  let code, details, message;

  code = err.code;
  message = err.message;
  details = err.details;

  if (code === 401) {
    if (props.auth && props.auth.tfa && props.auth.tfa.refresh_token) {
      // TODO refresh token
    } else {
      // TODO logout
    }
  } else if (code === 400 || code === 404) {
    // TODO show modal
  } else {
    // TODO error generico
  }
};
