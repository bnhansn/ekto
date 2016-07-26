import axios from 'axios';
import { API_URL } from 'config'; // eslint-disable-line

export default {
  token() {
    return JSON.parse(localStorage.getItem('token'));
  },

  get(path) {
    return axios.get(
      `${API_URL}${path}`,
      { headers: { Authorization: `Bearer ${this.token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  post(path, data) {
    return axios.post(
      `${API_URL}${path}`,
      data,
      { headers: { Authorization: `Bearer ${this.token()}` } })
      .then(response => response)
      .catch(error => error.response);
  },

  patch(path, data) {
    return axios.patch(
      `${API_URL}${path}`,
      data,
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
