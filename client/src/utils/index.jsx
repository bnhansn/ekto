import get from 'lodash/get';
import mapKeys from 'lodash/mapKeys';

export function decamelize(str) {
  return str.split(/(?=[A-Z])/).join('_').toLowerCase();
}

export function keyTransform(data) {
  const obj = {};
  mapKeys(data, (value, key) => {
    obj[decamelize(key)] = value;
  });
  return obj;
}

export function isSuccess(response) {
  if (response && response.status && response.status >= 200 && response.status < 400) {
    return true;
  }
  return false;
}

export function parseError(response, defaultMessage) {
  return get(response, 'data.errors[0].title', defaultMessage);
}
