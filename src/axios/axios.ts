import axios from 'axios';

const BASE_URL = 'http://34.125.34.1:3000/api/v1/auth';

export default axios.create({
    baseURL: BASE_URL
});
