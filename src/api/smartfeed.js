import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://smart-feed-be-code.herokuapp.com/'
});

export default instance;