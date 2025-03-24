<template>
    <div class="single-choice">
        <div class="radio-group">
            <label v-for="(option, index) in options" :key="index" class="radio-label">
                <input type="radio" :value="option" :checked="modelValue === option" @change="updateValue(option)" />
                <span class="custom-radio"></span>
                {{ option }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    modelValue: String,
    options: Array,
});

const emit = defineEmits(["update:modelValue", "answered"]);

const updateValue = (value) => {
    emit("update:modelValue", value);
    emit("answered"); // 通知父组件题目已回答
};
</script>

<style scoped lang="scss">
.single-choice {
    margin-top: 10px;

    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .radio-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
        color: #333;
        padding: 10px;
        border: 1px solid #e8d575;
        border-radius: 8px;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            background-color: #fdfbf2;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        input[type="radio"] {
            display: none;
        }

        .custom-radio {
            width: 20px;
            height: 20px;
            border: 2px solid #e8d575;
            border-radius: 50%;
            margin-right: 10px;
            position: relative;
            transition: background-color 0.3s ease;
        }

        input[type="radio"]:checked+.custom-radio {
            background-color: #e8d575;
        }
    }
}
</style>
