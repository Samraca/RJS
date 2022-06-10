import axios from 'axios';
axios.defaults.baseURL='http://localhost:4000/';

const axiosInstance = axios.create({
    baseURL : 'http://localhost:4000/'
});

export {
    axiosInstance,
}