<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import TestView from '@/views/TestView.vue';

</script>

<template>
  <transition name="el-fade-in-linear">
    <RouterView />
  </transition>
  <!-- <TestView /> -->
</template>

<style lang="scss" scoped>
::v-deep(.el-switch__core) {
  background: var(--gray-4) !important;
}

.el-fade-in-linear-enter-active,
.el-fade-in-linear-leave-active {
  transition: opacity 0.3s linear; // 设置过渡效果
}

.el-fade-in-linear-enter-from,
.el-fade-in-linear-leave-to {
  opacity: 0; // 初始状态或消失状态
}
</style>
