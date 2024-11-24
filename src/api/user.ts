import request from "@/utils/request.js";
export const userLoginService = (LoginData: any) => {
    return request({
        url: "/user/login",
        method: "post",
        data: LoginData,
    });
};