import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://smart-feed-be-code.herokuapp.com/'
});

instance.interceptors.request.use(
    async (config) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU1LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NDYxOTUyNjJ9.eUNo4zjHXFq4ge6QR5j6x_Cj4PhVDJwQPKbUYfhnKto";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

export default instance;