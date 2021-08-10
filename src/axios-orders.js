import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-24757-default-rtdb.firebaseio.com/'

});

export default instance;