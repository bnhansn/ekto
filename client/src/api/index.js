import mapKeys from 'lodash/mapKeys';
import get from 'lodash/get';

const API_URL = process.env.REACT_APP_EKTO_API;

const decamelize = (str) => str.split(/(?=[A-Z])/).join('_').toLowerCase();

const keyTransform = (data) => {
  const obj = {};
  mapKeys(data, (value, key) => {
    obj[decamelize(key)] = value;
  });
  return obj;
};

const token = () => JSON.parse(localStorage.getItem('token'));

const queryString = (params) => {
  const query = Object.keys(params)
                      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
};

export default {
  fetch(path, params = {}) {
    return fetch(
      `${API_URL}${path}${queryString(params)}`,
      { headers: { Authorization: `Bearer ${token()}` } }
    )
      .then(response =>
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      );
  },

  post(path, data) {
    return fetch(
      `${API_URL}${path}`,
      {
        method: 'POST',
        body: JSON.stringify(keyTransform(data)),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      }
    )
      .then(response =>
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      );
  },

  patch(path, data) {
    return fetch(
      `${API_URL}${path}`,
      {
        method: 'PATCH',
        body: JSON.stringify(keyTransform(data)),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      }
    )
      .then(response =>
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      );
  },

  delete(path) {
    return fetch(
      `${API_URL}${path}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    )
      .then(response =>
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      );
  },

  parseError(response, defaultMessage) {
    return get(response, 'errors[0].message', defaultMessage);
  },
};
