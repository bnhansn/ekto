import axios from 'axios';
import { API_URL } from 'config'; // eslint-disable-line
import mapKeys from 'lodash/mapKeys';

export default {
  decamelize(str) {
    return str.split(/(?=[A-Z])/).join('_').toLowerCase();
  },

  keyTransform(data) {
    const obj = {};
    mapKeys(data, (value, key) => {
      obj[this.decamelize(key)] = value;
    });
    return obj;
  },

  token() {
    return JSON.parse(localStorage.getItem('token'));
  },

  get(path, options) {
    return axios.get(
      `${API_URL}${path}`,
      { ...options, headers: { Authorization: `Bearer ${this.token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  post(path, data) {
    return axios.post(
      `${API_URL}${path}`,
      this.keyTransform(data),
      { headers: { Authorization: `Bearer ${this.token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  patch(path, data) {
    return axios.patch(
      `${API_URL}${path}`,
      this.keyTransform(data),
      { headers: { Authorization: `Bearer ${this.token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  delete(path) {
    return axios.delete(
      `${API_URL}${path}`,
      { headers: { Authorization: `Bearer ${this.token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },
};
