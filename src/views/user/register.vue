<template>
    <div class="register-page">
        <div class="background">
            <el-card class="form-card" shadow="hover">
                <div class="title">
                    <h1>欢迎注册心晴卫士</h1>
                    <p>专注青少年心理健康，让我们共同守护</p>
                </div>
                <div class="form-container">
                    <el-form @keyup.enter.native="handleRegister" ref="formRef" :model="form" :rules="rules"
                        label-width="0" class="center-form">
                        <el-form-item prop="username">
                            <el-input placeholder="请输入账号" :maxlength="30" v-model="form.username" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" type="password" :maxlength="30" v-model="form.password"
                                clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input placeholder="请确认密码" type="password" :maxlength="30" v-model="form.confirmPassword"
                                clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="large" class="set-width" @click="handleRegister">
                                立即注册
                            </el-button>
                        </el-form-item>
                        <el-form-item class="text-center">
                            <el-button type="text" @click="handleLogin">
                                已有账号？立即登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormInstance } from 'element-plus';
import router from "@/router";
import { userRegisterService } from "@/api/user";

const formRef = ref<FormInstance>();
const form = ref({
    username: "",
    password: "",
    confirmPassword: "",
});

const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== form.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 30, message: '账号长度应为3-30个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 30, message: '密码长度应为6-30个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, validator: validatePass, trigger: 'blur' }
    ]
};

const handleRegister = async () => {
    if (!formRef.value) return;
    formRef.value.validate(async (valid) => {
        if (valid) {
            // TODO: 调用注册接口
            const res = await userRegisterService(form.value);
            ElMessage.success('注册成功！');
            router.push('/login');
        } else {
            ElMessage.error('请检查填写是否正确');
        }
    });
};

const handleLogin = () => {
    router.push('/login');
};
</script>

<style lang="scss" scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5;

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