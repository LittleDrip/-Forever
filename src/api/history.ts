import request from '@/utils/request';

// 添加浏览历史记录
export function addBrowsingHistory(data: any) {
    return request({
        url: '/history/browse',
        method: 'post',
        data: data
    });
}

// 获取用户浏览历史
export function getUserBrowsingHistory(userId) {
    return request({
        url: `/history/list/${userId}`,
        method: 'get',
    });
}



// 清空用户浏览历史
export function clearBrowsingHistory() {
    return request({
        url: '/history/clear',
        method: 'delete'
    });
}

// /ai/resetChatMemory
// 清空Ai记录
export function clearAiMemory() {
    return request({
        url: '/ai/resetChatMemory',
        method: 'get'
    })
}