<template>

    <div class="map-container">
        <div id="container" class="map"></div>
        <div class="search-panel">
            <div class="back-button" @click="goBack">
                <svg t="1710747179070" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4250" width="32" height="32">
                    <path
                        d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.052938-18.416442-49.91597-18.416442-68.968908 0L291.910961 480.275316c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.439172 345.70441c19.052938 18.416442 49.91597 18.416442 68.968908 0 19.052938-18.416442 19.052938-48.273447 0-66.660212L395.21518 513.604544z"
                        p-id="4251"></path>
                </svg>
                返回
            </div>
            <el-input style="display: none;" v-model="searchKeyword" placeholder="搜索心理医院" class="search-input"
                @keyup.enter="searchHospitals">
                <template #append>
                    <el-button @click="searchHospitals">搜索</el-button>
                </template>
            </el-input>
            <div class="search-results" v-if="searchResults.length > 0">
                <div class="result-title">附近医院</div>
                <div class="result-list">
                    <div v-for="(poi, index) in searchResults" :key="index" class="result-item" @click="centerMap(poi)">
                        <div class="hospital-name">{{ poi.name }}</div>
                        <div class="hospital-address">{{ poi.address }}</div>
                        <div class="hospital-tel">{{ poi.tel || '暂无电话' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import router from '@/router';
import { Back } from '@element-plus/icons-vue';
// 一定要在加载前设置
window._AMapSecurityConfig = {
    securityJsCode: 'e27a1c53755c1d0b574d8b1425944e26'
}
const searchKeyword = ref('心理')
const currentCity = ref('') // 保存当前城市名
const map = ref(null)
const AMap = ref(null)
const searchResults = ref([])

// 初始化地图
// 初始化地图（增强版）
const initMap = async () => {
    try {
        AMap.value = await AMapLoader.load({
            key: '50d4cb2ffcb9f389c2662ac662e67f3a',
            version: '2.0',
            plugins: ['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Geocoder'] // 加载 Geocoder 插件
        })

        map.value = new AMap.value.Map('container', {
            zoom: 11,
            center: [116.397428, 39.90923]
        })

        const geolocation = new AMap.value.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonPosition: 'RB',
            buttonOffset: new AMap.value.Pixel(10, 20),
            zoomToAccuracy: true
        })
        map.value.addControl(geolocation)

        geolocation.getCurrentPosition((status, result) => {
            if (status === 'complete') {
                const { position } = result
                map.value.setCenter([position.lng, position.lat])
                // 使用 Geocoder 获取城市信息
                const geocoder = new AMap.value.Geocoder()
                geocoder.getAddress([position.lng, position.lat], (status, result) => {
                    if (status === 'complete' && result.regeocode) {
                        const city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
                        currentCity.value = Array.isArray(city) ? city[0] : city
                        console.log('当前城市：', currentCity.value)
                        searchHospitals() // 等城市确定再搜索
                    } else {
                        console.warn('无法解析城市，使用默认城市"北京"')
                        currentCity.value = '北京'
                        searchHospitals()
                    }
                })
            } else {
                console.error('定位失败')
                currentCity.value = '北京'
                searchHospitals()
            }
        })
    } catch (error) {
        console.error('地图加载失败:', error)
    }
}

// 居中显示选中的医院
const centerMap = (poi) => {
    if (map.value && AMap.value) {
        map.value.setCenter([poi.location.lng, poi.location.lat])
        map.value.setZoom(60)
    }
}
const goBack = () => {
    router.push('/emotionalDivision');
};
// 搜索医院
const searchHospitals = () => {
    if (!map.value || !AMap.value) return

    const placeSearch = new AMap.value.PlaceSearch({
        city: currentCity.value || '北京',
        type: '',
        pageSize: 20,
        pageIndex: 1
    })

    placeSearch.search(searchKeyword.value, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
            map.value.clearMap()
            searchResults.value = result.poiList.pois
            result.poiList.pois.forEach(poi => {
                const marker = new AMap.value.Marker({
                    position: [poi.location.lng, poi.location.lat],
                    title: poi.name,
                    map: map.value
                })

                const infoWindow = new AMap.value.InfoWindow({
                    content: `<div>
                        <h4>${poi.name}</h4>
                        <p>地址：${poi.address}</p>
                        <p>电话：${poi.tel || '暂无'}</p>
                    </div>`,
                    offset: new AMap.value.Pixel(0, -30)
                })

                marker.on('click', () => {
                    infoWindow.open(map.value, marker.getPosition())
                })
            })
        }
    })
}

onMounted(() => {
    initMap()
})
</script>

<style lang="scss" scoped>
.back-button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 1.2rem;

    cursor: pointer;

    color: #666;
    transition: all 0.3s ease;

    &:hover {
        color: #E8D575;
        transform: translateX(-5px);
    }

    svg {
        width: 24px;
        height: 24px;
    }
}

.map-container {
    width: 100%;
    height: 100vh;
    position: relative;
}

.map {
    width: 100%;
    height: 100%;
}

.search-panel {
    position: absolute;
    top: 50px;
    left: 20px;
    z-index: 1;
    width: 300px;
    background: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-results {
    margin-top: 10px;
    max-height: 400px;
    overflow-y: auto;
}

.result-title {
    font-weight: bold;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

.result-list {
    .result-item {
        padding: 8px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #f5f7fa;
        }

        .hospital-name {
            font-weight: bold;
            margin-bottom: 4px;
        }

        .hospital-address {
            color: #666;
            font-size: 12px;
            margin-bottom: 4px;
        }

        .hospital-tel {
            color: #409EFF;
            font-size: 12px;
        }
    }
}

.search-input {
    width: 100%;
}
</style>