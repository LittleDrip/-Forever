
import axios from "axios";
const baseURL = "/api"; //这个是在前端配置同源策略
const instance = axios.create({ baseURL })
import router from "@/router/index.js";
import { getAccessToken } from "@/stores/token.ts";
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    //判断有没有token
    if (token) {
      config.headers.satoken = `Bearer ${token}`
    }
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
    if (result.data.code === 200) {
      return result.data;
    }
    else {
      ElMessage.error(result.data.msg);
      return Promise.reject(result.data.msg);
    }
  },
  (err) => {
    if (err.response.status === 401) {
      ElMessage.error("请先登录");
      router.push({ name: "登录" });

    }
    else {
      ElMessage.error("服务异常");
      return Promise.reject(err); //异步的状态转化成失败的状态
    }
  }
);

export default instance;
