import request from "@/utils/request";

// 获取当前用户的所有日记
export const getDiaryList = () => {
    return request({
        url: '/diary/list',
        method: 'get'
    });
};

// 获取日记详情
export const getDiaryById = (id: number) => {
    return request({
        url: `/diary/detail`,
        method: 'get',
        params: { id }
    });
};

// 创建新日记
export const createDiary = (data: {
    mood: string;
    weather: string;
    content: string;
}) => {
    return request({
        url: '/diary/create',
        method: 'post',
        data
    });
};

// 更新日记
export const updateDiary = (id: number, data: {
    mood: string;
    weather: string;
    content: string;
}) => {
    return request({
        url: `/diary/update`,
        method: 'put',
        params: { id },
        data
    });
};

// 删除日记
export const deleteDiary = (id: number) => {
    return request({
        url: `/diary/delete`,
        method: 'delete',
        params: { id }
    });
};
