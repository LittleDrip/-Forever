<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TestView from '@/views/TestView.vue';
import { useDarkMode } from './utils/useDarkMode';
const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <div class="darkMode">
    <el-button @click="toggleDarkMode">
      {{ isDarkMode ? ' 🔆 ' : ' 🌙 ' }}
    </el-button>
  </div>
  <RouterView />
  <!-- <TestView /> -->
</template>

<style scoped>
.darkMode {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999;
}
</style>
