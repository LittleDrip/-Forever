import request from "@/utils/request.js";
export const userLoginService = (LoginData: any) => {
    return request({
        url: "/user/login",
        method: "post",
        data: LoginData,
    });
};

export const userInfoService = () => {
    return request({
        url: "/user/getUserInfo",
        method: "get",
    });
};
// 退出登录
export const userLogoutService = () => {
    return request({
        url: "/user/logout",
        method: "get",
    });
}