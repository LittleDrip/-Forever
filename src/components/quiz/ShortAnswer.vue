<template>
    <div class="short-answer">
        <!-- 使用 :model-value 和 @input 显式绑定和触发事件 -->
        <el-input type="textarea" :model-value="modelValue" placeholder="请输入答案" @input="updateValue" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 定义组件的 props 和 emits
const props = defineProps({
    modelValue: String, // 绑定的值
});

const emit = defineEmits(["update:modelValue"]); // 声明 v-model 的事件

// 当输入发生变化时，触发更新事件
const updateValue = (value) => {
    emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
.short-answer {
    margin-top: 10px;
}
</style>
