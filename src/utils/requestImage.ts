
import axios from "axios";
const baseURL = "/image"; //这个是在前端配置同源策略
const instance = axios.create({ baseURL })
import router from "@/router/index.js";
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


    },
    (err) => {

        ElMessage.error("服务异常");
        return Promise.reject(err); //异步的状态转化成失败的状态

    }
);

export default instance;
