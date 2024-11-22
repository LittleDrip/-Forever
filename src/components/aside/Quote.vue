<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const quote = ref<string>('');
const quote_eng = ref<string>('');
const fetchQuote = async () => {
    try {
        const response = await axios.get('https://api.vvhan.com/api/dailyEnglish');
        quote.value = response.data.data.zh; // 假设API返回的数据结构中包含sentence字段
        quote_eng.value = response.data.data.en
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        quote.value = 'Failed to load quote. Please try again later.';
    }
};

onMounted(fetchQuote);
</script>

<template>
    <div class="quote-container">
        <p class="quote">{{ quote }}</p>
        <p class="quote">{{ quote_eng }}</p>

    </div>
</template>

<style lang="scss" scoped>
.quote-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // min-height: 100vh;
    padding: 20px;
    text-align: center;

    .quote {
        font-size: 1.5em;
        margin-bottom: 20px;
        color: #333;
    }
}
</style>