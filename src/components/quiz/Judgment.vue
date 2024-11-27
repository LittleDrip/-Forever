<template>
    <div class="judgment">
        <el-radio-group :model-value="modelValue" @change="updateValue">
            <el-radio v-for="(option, index) in options" :key="index" :label="option">
                {{ option }}
            </el-radio>
        </el-radio-group>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 定义 props 和 emits
const props = defineProps({
    modelValue: String, // 绑定的值
    options: Array,     // 选项
});

const emit = defineEmits(["update:modelValue"]); // 声明 v-model 的事件

// 触发更新事件
const updateValue = (value) => {
    emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
.judgment {
    margin-top: 10px;
}
</style>
