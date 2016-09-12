import axios from 'axios';
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

export default {
  get(path, options) {
    return axios.get(
      `${API_URL}${path}`,
      { ...options, headers: { Authorization: `Bearer ${token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  post(path, data) {
    return axios.post(
      `${API_URL}${path}`,
      keyTransform(data),
      { headers: { Authorization: `Bearer ${token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  patch(path, data) {
    return axios.patch(
      `${API_URL}${path}`,
      keyTransform(data),
      { headers: { Authorization: `Bearer ${token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  delete(path) {
    return axios.delete(
      `${API_URL}${path}`,
      { headers: { Authorization: `Bearer ${token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  parseError(response, defaultMessage) {
    return get(response, 'data.errors[0].message', defaultMessage);
  },
};
