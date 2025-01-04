<template>
    <div class="login-page">
        <div class="background">
            <el-card class="form-card" shadow="hover">
                <div class="title">
                    <h1>欢迎登录心晴小屋</h1>
                    <p>专注青少年心理健康，让我们共同守护</p>
                </div>
                <div class="form-container">
                    <el-form @keyup.enter.native="handleLogin" ref="formRef" :model="form" :rules="rules"
                        label-width="0" class="center-form">
                        <el-form-item prop="username">
                            <el-input placeholder="请输入账号" :maxlength="30" v-model="form.username" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" type="password" :maxlength="30" v-model="form.password"
                                clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="large" class="set-width" @click="handleLogin">
                                立即登录
                            </el-button>
                        </el-form-item>
                        <el-form-item class="text-center">
                            <el-button type="text" @click="handleForgotPassword">
                                忘记密码？
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { userInfoService, userLoginService } from "@/api/user";
import router from "@/router";
import { storeAccessToken } from "@/stores/token.ts";
import { useUserStore } from '@/stores/user';

import { ref, reactive } from "vue";
// import { FormInstance } from 'element-plus';

const userStore = useUserStore();
// 引用表单实例
const formRef = ref<FormInstance>();
const form = ref({
    username: "",
    password: "",
    remember: true,

});
const userInfo = ref({
    username: '',  // 用户名
    nickname: '',  // 昵称
    age: null,     // 年龄
    email: '',     // 邮箱
    phone: '',     // 手机号码
    avatar: '',    // 头像
    createTime: null // 创建时间
});

// 引用表单实例

const handleLogin = async () => {
    if (!formRef.value) return; // 表单实例不存在，直接返回
    formRef.value.validate(async (valid) => {
        if (valid) {
            // 模拟登录逻辑
            const { username, password } = form.value;
            const requestData = { username, password }; // 使用解构得到的变量构建 requestData 对象
            let res = await userLoginService(requestData);
            storeAccessToken(res.data.token, form.value.remember, res.data.expire);
            let userInfo = await userInfoService();
            console.log('userInfo', userInfo);
            userStore.saveUserInfo(userInfo.data);
            router.push("/");
            ElMessage.success('登录成功！');

            console.log('登录表单数据：', form);
        } else {
            ElMessage.error('请检查填写是否正确');
        }
    });

};

// 表单验证规则
const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 30, message: '账号长度应为3-30个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 30, message: '密码长度应为6-30个字符', trigger: 'blur' }
    ]
};


const handleForgotPassword = () => {
    console.log("忘记密码功能");
};
</script>

<style lang="scss" scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5; // 背景色可以根据需要修改

    .background {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .form-card {
        width: 400px;
        padding: 20px;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .title {
        text-align: center;
        margin-bottom: 20px;

        h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }

        p {
            font-size: 14px;
            color: #777;
        }
    }

    .form-container {
        .center-form {
            display: flex;
            flex-direction: column;
            gap: 20px;

            .el-form-item {
                margin: 0;

                input {
                    width: 100%;
                }
            }

            .set-width {
                width: 100%;
                margin-top: 20px;
            }

            .text-center {
                text-align: center;
            }
        }
    }
}
</style>