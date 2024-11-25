import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    // 定义用户信息的响应式数据
    const userInfo = ref({
        username: '',  // 用户名
        nickname: '',  // 昵称
        age: null,     // 年龄
        email: '',     // 邮箱
        phone: '',     // 手机号码
        avatar: '',    // 头像
        createTime: null // 创建时间
    });

    // 存储用户信息
    const saveUserInfo = (data: typeof userInfo.value) => {
        userInfo.value = { ...data };
    };

    // 删除用户信息
    const clearUserInfo = () => {
        userInfo.value = {
            username: '',
            nickname: '',
            age: null,
            email: '',
            phone: '',
            avatar: '',
            createTime: null
        };
    };

    // 返回定义的状态和操作
    return {
        userInfo,
        saveUserInfo,
        clearUserInfo
    };
}, { persist: true });
