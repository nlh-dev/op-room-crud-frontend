import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://htz3376s-3002.use2.devtunnels.ms/',
    baseURL: 'http://localhost:3000/api',
})

export default axiosInstance;