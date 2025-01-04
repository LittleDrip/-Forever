<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Sunny, Cloudy, Lightning, Moon } from '@element-plus/icons-vue';

const city = ref('');
const weather = ref<any>(null);
const loading = ref(true);

// 高德地图 Key（请替换成你自己申请的 Key）
const AMAP_KEY = '5fed4316fb8f59b3469b4c9ecde01e97';

// 获取当前位置
const getLocation = async () => {
    try {
        const ipResponse = await axios.get(`https://restapi.amap.com/v3/ip?key=${AMAP_KEY}`);
        if (ipResponse.data.status === '1') {
            city.value = ipResponse.data.city;
            await getWeather(ipResponse.data.adcode);
        }
    } catch (error) {
        ElMessage.error('获取位置信息失败');
        loading.value = false;
    }
};

// 获取天气信息
const getWeather = async (adcode: string) => {
    try {
        const weatherResponse = await axios.get(
            `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${adcode}&extensions=all`
        );
        if (weatherResponse.data.status === '1') {
            weather.value = weatherResponse.data.forecasts[0];
        }
    } catch (error) {
        ElMessage.error('获取天气信息失败');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getLocation();
});

// 获取天气图标
const getWeatherIcon = (weather: string) => {
    if (weather.includes('晴')) return Sunny;
    if (weather.includes('阴') || weather.includes('云')) return Cloudy;
    if (weather.includes('雨') || weather.includes('雪')) return Lightning;
    return Moon;
};
</script>

<template>
    <div class="weather-container">
        <el-skeleton :loading="loading" animated>
            <template #default>
                <template v-if="weather">
                    <div class="location">
                        <el-icon>
                            <Location />
                        </el-icon>
                        {{ city }}
                    </div>
                    <div class="weather-info">
                        <div class="today">
                            <div class="weather-icon">
                                <el-icon :size="40">
                                    <component :is="getWeatherIcon(weather.casts[0].dayweather)" />
                                </el-icon>
                            </div>
                            <div class="temp">
                                {{ weather.casts[0].daytemp }}°C
                            </div>
                            <div class="desc">
                                {{ weather.casts[0].dayweather }}
                            </div>
                        </div>
                        <div class="forecast">
                            <div v-for="(cast, index) in weather.casts.slice(1, 4)" :key="index" class="forecast-item">
                                <div class="date">{{ cast.date.slice(5) }}</div>
                                <el-icon :size="24">
                                    <component :is="getWeatherIcon(cast.dayweather)" />
                                </el-icon>
                                <div class="temp-range">
                                    {{ cast.nighttemp }}° ~ {{ cast.daytemp }}°
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </el-skeleton>
    </div>
</template>

<style lang="scss" scoped>
.weather-container {
    padding: 16px;
    background-color: white;
    // border-radius: 8px;

    .location {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        margin-bottom: 16px;
    }

    .weather-info {
        .today {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;

            .weather-icon {
                margin-bottom: 8px;
            }

            .temp {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 4px;
            }

            .desc {
                color: #666;
            }
        }

        .forecast {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #eee;
            padding-top: 16px;

            .forecast-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;

                .date {
                    font-size: 12px;
                    color: #666;
                }

                .temp-range {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>