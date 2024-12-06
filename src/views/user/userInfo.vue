<script lang="ts" setup>


import { Message, Refresh, Select, User } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import axios from "axios";
const desc = ref('')
const baseFormRef = ref()
const emailFormRef = ref()

const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))
    } else {
        callback()
    }
}

const rules = {
    username: [
        { validator: validateUsername, trigger: ['blur', 'change'] },
        { min: 2, max: 10, message: '用户名的长度必须在2-10个字符之间', trigger: ['blur', 'change'] },
    ],
    email: [
        { required: true, message: '请输入邮件地址', trigger: 'blur' },
        { type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change'] }
    ]
}

const loading = reactive({
    form: true,
    base: true
})

const baseForm = reactive({
    username: '',
    gender: 1,
    phone: '',
    qq: '',
    wx: '',
    desc: ''
})

const emailForm = reactive({
    email: '',
    code: ''
})




const coldTime = ref(0)
const isEmailValid = ref(true)



function beforeAvatarUpload(rawFile) {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('头像只能是 JPG/PNG 格式的!')
        return false
    } else if (rawFile.size / 1024 > 100) {
        ElMessage.error('头像大小不能大于 100KB!')
        return false
    }
    return true
}

function uploadSuccess(response) {
    ElMessage.success('头像上传成功！')

}
</script>

<template>
    <div style="display: flex;margin: auto;max-width: 950px">
        <div class="settings-left">
            <card :icon="User" v-loading="loading.form" title="账号信息设置" desc="在这里编辑您的个人信息，您可以在隐私设置中选择是否展示这些信息">
                <el-form :model="baseForm" label-position="top" :rules="rules" ref="baseFormRef"
                    style="margin: 0 10px 10px 10px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="baseForm.username" maxlength="10" />
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="baseForm.gender">
                            <el-radio :label="0" size="large">男</el-radio>
                            <el-radio :label="1" size="large">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="baseForm.phone" maxlength="11" />
                    </el-form-item>
                    <el-form-item label="QQ号">
                        <el-input v-model="baseForm.qq" maxlength="10" />
                    </el-form-item>
                    <el-form-item label="微信号">
                        <el-input v-model="baseForm.wx" maxlength="20" />
                    </el-form-item>
                    <el-form-item label="个人简介">
                        <el-input type="textarea" :rows="6" v-model="baseForm.desc" maxlength="200" />
                    </el-form-item>
                    <div>
                        <el-button :icon="Select" type="success" :loading="loading.base">保存用户信息</el-button>
                    </div>
                </el-form>
            </card>
            <card style="margin-top: 10px" v-loading="loading.form" :icon="Message" title="电子邮件设置"
                desc="您可以在这里修改默认绑定的电子邮件地址">
                <el-form :model="emailForm" label-position="top" :rules="rules" ref="emailFormRef"
                    style="margin: 0 10px 10px 10px">
                    <el-form-item label="电子邮件" prop="email">
                        <el-input v-model="emailForm.email" />
                    </el-form-item>
                    <el-form-item>
                        <el-row style="width: 100%" :gutter="10">
                            <el-col :span="18">
                                <el-input placeholder="请获取验证码" v-model="emailForm.code" />
                            </el-col>
                            <el-col :span="6">
                                <el-button type="success" style="width: 100%;"
                                    :disabled="!isEmailValid || coldTime > 0">
                                    {{ coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码' }}
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <div>
                        <el-button :disabled="!emailForm.email" :icon="Refresh" type="success">保存电子邮件</el-button>
                    </div>
                </el-form>
            </card>
        </div>
        <div class="settings-right">
            <div style="position: sticky;top: 20px">
                <card v-loading="loading.form">
                    <div style="text-align: center;padding: 5px 15px 0 15px">
                        <div style="display: inline-block">
                            <el-avatar :size="70" src="" />
                            <div style="margin: 5px 0">
                                <el-upload :action="axios.defaults.baseURL + '/api/image/avatar'"
                                    :show-file-list="false" :before-upload="beforeAvatarUpload"
                                    :on-success="uploadSuccess">
                                    <el-button size="small" round>修改头像</el-button>
                                </el-upload>

                            </div>
                            <div style="font-weight: bold">你好, 234</div>
                        </div>
                    </div>
                    <el-divider style="margin: 10px 0" />
                    <div style="padding: 10px;font-size: 14px;color: grey">
                        {{ desc || '该用户比较懒，还没有设置个人介绍哦~' }}
                    </div>
                </card>
                <card style="margin-top: 10px;font-size: 14px">
                    <div>账号注册时间: 2024年11月27日16:23:05</div>
                    <div style="color: grey">欢迎加入我们的学习论坛！</div>
                </card>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings-left {
    flex: 1;
    margin: 20px;
}

.settings-right {
    width: 300px;
    margin: 20px;
}
</style>
