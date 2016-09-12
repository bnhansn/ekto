import debounce from 'lodash/debounce';

export function isSuccess(response) {
  if (response && response.status && response.status >= 200 && response.status < 400) {
    return true;
  }
  return false;
}

export function debouncedHandler(...args) {
  const debounced = debounce(...args);
  return function persistedDebounce(e) {
    e.persist();
    return debounced(e);
  };
}
