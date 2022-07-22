import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  config.headers.Authorization = user && user.token ? `Bearer ${user.token}` : '';  // eslint-disable-line
  return config;
});

// $api.interceptors.response.use(
//   (response) => response.data,
//   (error) => { if (error?.response?.status === 401) { console.log(error.response); } },
// );

export default $api;
