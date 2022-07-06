import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  config.headers.Authorization = user && user.token ? `Bearer ${user.token}` : '';  // eslint-disable-line
  return config;
});

export default $api;
