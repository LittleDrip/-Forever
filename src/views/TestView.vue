<template>
    <el-card class="upload-card">
        <h2>图片上传</h2>
        <el-upload class="upload-demo" drag action="#" :auto-upload="false" :on-change="handleUpload"
            :before-upload="beforeUpload" :show-file-list="true">
            <el-icon class="el-icon--upload">
                <upload />
            </el-icon>
            <div class="el-upload__text">
                拖拽文件到此处或 <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    只能上传jpg/png文件，且不超过2MB
                </div>
            </template>
        </el-upload>
    </el-card>
</template>

<script setup lang="ts">
import { uploadImg } from '@/api/image';
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';


const handleUpload = async (file: UploadFile) => {
    try {
        const res = await uploadImg(file.raw as File);
        const response = res;
        if (response.status === 'success' && response.detections.length > 0) {
            const result = response.detections[0].class_name;
            console.log('识别结果：', result);
            ElMessage.success(`图片识别成功,心情状态:${result}`);
        } else {
            ElMessage.error('未能识别图片内容');
        }
    } catch (error) {
        console.error('上传错误：', error);
        ElMessage.error('图片上传失败');
    }
}

const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isImage) {
        ElMessage.error('只能上传图片文件！')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB！')
        return false
    }
    return true
}
</script>

<style scoped></style>