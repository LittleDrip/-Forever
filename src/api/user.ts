import request from "@/utils/request.js";
export const userLoginService = (LoginData: any) => {
    return request({
        url: "/user/login",
        method: "post",
        data: LoginData,
    });
};

export const userRegisterService = (RegisterData: any) => {
    return request({
        url: "/user/register",
        method: "post",
        data: RegisterData,
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

export const updateUserInfoService = (nickname?: string, avatar?: string) => {
    return request({
        url: '/user/updateNicknameAndAvatar',
        method: 'post',
        params: {
            nickname,
            avatar
        }
    });
};