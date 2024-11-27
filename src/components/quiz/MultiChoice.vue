<template>
    <div class="multiple-choice">
        <el-checkbox-group :model-value="modelValue" @change="updateValue">
            <el-checkbox v-for="(option, index) in options" :key="index" :label="option">
                {{ option }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 定义 props 和 emits
const props = defineProps({
    modelValue: Array, // 当前选中的选项
    options: Array,    // 多选题选项
});

const emit = defineEmits(["update:modelValue"]); // 声明事件

// 触发更新事件
const updateValue = (value) => {
    emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
.multiple-choice {
    margin-top: 10px;
}
</style>
