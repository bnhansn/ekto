import get from 'lodash/get';
import debounce from 'lodash/debounce';

export function isSuccess(response) {
  if (response && response.status && response.status >= 200 && response.status < 400) {
    return true;
  }
  return false;
}

export function parseError(response, defaultMessage) {
  return get(response, 'data.errors[0].message', defaultMessage);
}

export function debouncedHandler(...args) {
  const debounced = debounce(...args);
  return function persistedDebounce(e) {
    e.persist();
    return debounced(e);
  };
}
