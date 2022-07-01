import $api from '../http/index';


    const Login = async (username, password) => {

        return $api
            .post('/api/v1/login', { username, password })
            .then((response) => {
                console.log('Login response: ', response.data);
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    const Logout = () => {
        localStorage.removeItem('user');
            }

    const Signup = async (username, password) => {
        return $api
            .post('/api/v1/signup', { username, password })
            .then((response) => { console.log('SignUp: ', response.data) })
    }

    const AuthService = { Login, Logout, Signup }
    export default AuthService;