<script setup>

</script>

<template>
    <div class="post-card">
        <slot />
    </div>
</template>

<style scoped>
.post-card {
    background-color: var(--el-bg-color);
    border-radius: 5px;
    padding: 10px;
}
</style>
