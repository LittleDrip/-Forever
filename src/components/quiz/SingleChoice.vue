<template>
    <div class="single-choice">
        <el-radio-group :model-value="modelValue" @change="updateValue">
            <el-radio size="middle" class="radio" v-for="(option, index) in options" :key="index" :label="option">
                {{ option }}
            </el-radio>
        </el-radio-group>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 定义 props 和 emits
const props = defineProps({
    modelValue: String, // 当前选中的值
    options: Array,     // 单选题选项
});

const emit = defineEmits(["update:modelValue"]); // 声明事件

// 触发更新事件
const updateValue = (value) => {
    emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
.single-choice {
    margin-top: 10px;
}
</style>
