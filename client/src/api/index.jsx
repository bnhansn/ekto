import axios from 'axios';
import { API_URL } from 'config'; // eslint-disable-line
import mapKeys from 'lodash/mapKeys';

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
};
