import axios from "axios";

const $api = axios.create({
    withCredentials: true,
});

const user = JSON.parse(localStorage.getItem('user'));
    
$api.interceptors.request.use(config => {
    config.headers.Authorization = user && user.token ? 'Bearer ' + user.token : '';
    return config;
});

export default $api;