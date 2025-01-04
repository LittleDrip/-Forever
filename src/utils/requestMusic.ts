//定制请求的实例
import axios from "axios";

const baseURL = 'http://150.158.20.179:3000';
const instance = axios.create({ baseURL })
// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {

        return config;
    },
    (err) => {
        //请求错误的回调
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    (result) => {
        return result.data;
    }

);

export default instance;