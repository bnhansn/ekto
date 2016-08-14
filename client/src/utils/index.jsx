import get from 'lodash/get';

export function isSuccess(response) {
  if (response && response.status && response.status >= 200 && response.status < 400) {
    return true;
  }
  return false;
}

export function parseError(response, defaultMessage) {
  return get(response, 'data.errors[0].message', defaultMessage);
}
